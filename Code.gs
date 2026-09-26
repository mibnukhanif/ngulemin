/**
 * =========================================================================
 * NGULEMIN — Google Apps Script Backend API
 * Undangan Digital Elegan untuk Momen Istimewa
 * 
 * Versi: 1.0.0
 * Framework: Google Apps Script + Google Spreadsheet
 * Author: NGULEMIN Development Team
 * =========================================================================
 * 
 * PANDUAN SINGKAT PEMASANGAN:
 * 1. Buat Google Spreadsheet baru di Google Drive (misal beri nama "Database NGULEMIN").
 * 2. Di Spreadsheet, buka menu: Ekstensi > Apps Script.
 * 3. Hapus kode default, paste seluruh isi file Code.gs ini.
 * 4. Atur SPREADSHEET_ID di bawah (jika dikosongkan, otomatis menggunakan Spreadsheet aktif tempat script berada).
 * 5. Jalankan fungsi 'initDatabase()' satu kali di Apps Script untuk menginisialisasi seluruh sheet & data awal.
 * 6. Klik tombol "Terapkan" (Deploy) > "Kelola Penerapan" > "Penerapan Baru" (New Deployment).
 * 7. Pilih jenis "Aplikasi Web" (Web app):
 *    - Deskripsi: API NGULEMIN
 *    - Jalankan sebagai: Saya (Email Anda)
 *    - Siapa yang memiliki akses: Siapa saja (Anyone) -> WAJIB agar frontend bisa fetch!
 * 8. Salin URL Aplikasi Web (Web App URL) yang dihasilkan, lalu masukkan ke frontend (config.js).
 * =========================================================================
 */

// Konfigurasi ID Spreadsheet (opsional jika script terikat langsung dengan Spreadsheet, cukup biarkan "")
var SPREADSHEET_ID = "";

// Helper untuk mengambil Spreadsheet
function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Endpoint GET: Digunakan untuk mengambil data publik & verifikasi sesi
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "getAllData";
  var token = (e && e.parameter && e.parameter.token) ? e.parameter.token : "";

  try {
    var ss = getSpreadsheet();
    if (!ss) {
      return jsonResponse({
        success: false,
        message: "Spreadsheet tidak ditemukan. Pastikan script terikat dengan Spreadsheet atau SPREADSHEET_ID sudah benar."
      });
    }

    switch (action) {
      case "init":
      case "initDatabase":
        initDatabase();
        return jsonResponse({ success: true, message: "Inisialisasi database berhasil selesai!" });

      case "getAllData":
  // Pastikan kolom tambahan tersedia pada database lama
  ensureSheetColumns(ss, "Themes", [
    "ID", "Nama", "Gambar", "Deskripsi", "Harga",
    "PreviewURL", "Category", "Status", "Urutan"
  ]);

  ensureSheetColumns(ss, "Testimonials", [
    "ID", "Nama", "Foto", "Testimoni", "Rating",
    "Lokasi", "Status", "Urutan"
  ]);

  var data = {
    settings: getSettingsData(ss),
    home: getHomeData(ss),
    themes: getThemesData(ss),
    pricing: getPricingData(ss),
    features: getFeaturesData(ss),
    testimonials: getTestimonialsData(ss),
    howToOrder: getHowToOrderData(ss),
    faq: getFAQData(ss)
  };

  return jsonResponse({
    success: true,
    data: data
  });

      case "getSettings":
        return jsonResponse({ success: true, data: getSettingsData(ss) });

      case "getHome":
        return jsonResponse({ success: true, data: getHomeData(ss) });

      case "getThemes":
        return jsonResponse({ success: true, data: getThemesData(ss) });

      case "getPricing":
        return jsonResponse({ success: true, data: getPricingData(ss) });

      case "getFeatures":
        return jsonResponse({ success: true, data: getFeaturesData(ss) });

      case "getTestimonials":
        return jsonResponse({ success: true, data: getTestimonialsData(ss) });

      case "getHowToOrder":
        return jsonResponse({ success: true, data: getHowToOrderData(ss) });

      case "getFAQ":
        return jsonResponse({ success: true, data: getFAQData(ss) });

      case "getOrders":
        if (!validateSessionToken(ss, token)) {
          return jsonResponse({ success: false, message: "Akses ditolak: Sesi admin tidak valid atau telah berakhir." });
        }
        return jsonResponse({ success: true, data: getOrdersData(ss) });

      case "validateSession":
        var isValid = validateSessionToken(ss, token);
        return jsonResponse({
          success: isValid,
          message: isValid ? "Sesi valid" : "Sesi tidak valid / kedaluwarsa"
        });

      default:
        return jsonResponse({ success: false, message: "Aksi GET '" + action + "' tidak dikenali." });
    }
  } catch (error) {
    return jsonResponse({
      success: false,
      message: "Terjadi kesalahan server: " + error.toString()
    });
  }
}

/**
 * Endpoint POST: Digunakan untuk autentikasi, order, dan seluruh operasi CRUD admin
 */
function doPost(e) {
  try {
    var ss = getSpreadsheet();
    if (!ss) {
      return jsonResponse({ success: false, message: "Spreadsheet tidak terhubung." });
    }

    var payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    var action = payload.action;
    var token = payload.token || "";

    // 1. Aksi Publik: LOGIN
    if (action === "login") {
      var username = (payload.username || "").trim();
      var password = (payload.password || "").trim();
      var authResult = handleLogin(ss, username, password);
      return jsonResponse(authResult);
    }

    // 2. Aksi Publik: ORDER (Pemesanan Undangan)
    if (action === "createOrder") {
      var orderResult = handleCreateOrder(ss, payload.data || payload);
      return jsonResponse(orderResult);
    }

    // 3. Aksi Publik: LOGOUT
    if (action === "logout") {
      handleLogout(ss, token);
      return jsonResponse({ success: true, message: "Berhasil logout." });
    }

    // Validasi token untuk semua aksi Admin CRUD di bawah
    if (!validateSessionToken(ss, token)) {
      return jsonResponse({
        success: false,
        message: "Autentikasi gagal. Sesi Anda telah berakhir, silakan login kembali."
      });
    }

    // --- Aksi-Aksi Admin Terproteksi ---
    switch (action) {
      case "updateSettings":
        return jsonResponse(updateSettingsData(ss, payload.data));

      case "updateHome":
        return jsonResponse(updateHomeData(ss, payload.data));

      case "updateAdminUsername":
        return jsonResponse(
          handleUpdateAdminUsername(ss, payload.username)
        );

      // THEMES CRUD
      case "createTheme":
        ensureSheetColumns(ss, "Themes", ["ID", "Nama", "Gambar", "Deskripsi", "Harga", "PreviewURL", "Category", "Status", "Urutan"]);
      return jsonResponse(
        createRow(ss, "Themes", payload.data, ["ID", "Nama", "Gambar", "Deskripsi", "Harga", "PreviewURL", "Category", "Status", "Urutan"])
      );
      case "updateTheme":
        return jsonResponse(updateRow(ss, "Themes", payload.data));
      case "deleteTheme":
        return jsonResponse(deleteRow(ss, "Themes", payload.id));

      // PRICING CRUD
      case "createPricing":
        return jsonResponse(createRow(ss, "Pricing", payload.data, ["ID", "Nama", "Harga", "Deskripsi", "Fitur", "Label", "Featured", "Status", "Urutan"]));
      case "updatePricing":
        return jsonResponse(updateRow(ss, "Pricing", payload.data));
      case "deletePricing":
        return jsonResponse(deleteRow(ss, "Pricing", payload.id));

      // FEATURES CRUD
      case "createFeature":
        return jsonResponse(createRow(ss, "Features", payload.data, ["ID", "Icon", "Judul", "Deskripsi", "Status", "Urutan"]));
      case "updateFeature":
        return jsonResponse(updateRow(ss, "Features", payload.data));
      case "deleteFeature":
        return jsonResponse(deleteRow(ss, "Features", payload.id));

      // TESTIMONIALS CRUD
      case "createTestimonial":
  ensureSheetColumns(ss, "Testimonials", ["ID", "Nama", "Foto", "Testimoni", "Rating", "Lokasi", "Status", "Urutan"]);
  return jsonResponse(
    createRow(ss, "Testimonials", payload.data, ["ID", "Nama", "Foto", "Testimoni", "Rating", "Lokasi", "Status", "Urutan"])
  );
      case "updateTestimonial":
        return jsonResponse(updateRow(ss, "Testimonials", payload.data));
      case "deleteTestimonial":
        return jsonResponse(deleteRow(ss, "Testimonials", payload.id));

      // HOW TO ORDER CRUD
      case "createHowToOrder":
        return jsonResponse(createRow(ss, "HowToOrder", payload.data, ["Nomor", "Judul", "Deskripsi", "Icon", "Status", "Urutan"]));
      case "updateHowToOrder":
        return jsonResponse(updateRow(ss, "HowToOrder", payload.data, "Nomor"));
      case "deleteHowToOrder":
        return jsonResponse(deleteRow(ss, "HowToOrder", payload.id, "Nomor"));

      // FAQ CRUD
      case "createFAQ":
        return jsonResponse(createRow(ss, "FAQ", payload.data, ["ID", "Pertanyaan", "Jawaban", "Status", "Urutan"]));
      case "updateFAQ":
        return jsonResponse(updateRow(ss, "FAQ", payload.data));
      case "deleteFAQ":
        return jsonResponse(deleteRow(ss, "FAQ", payload.id));

      // ORDERS ADMIN CRUD
      case "updateOrderStatus":
        return jsonResponse(updateOrderStatus(ss, payload.id, payload.status));
      case "deleteOrder":
        return jsonResponse(deleteRow(ss, "Orders", payload.id));

      // GANTI PASSWORD
      case "changePassword":
        return jsonResponse(handleChangePassword(ss, payload.oldPassword, payload.newPassword));

      default:
        return jsonResponse({ success: false, message: "Aksi POST '" + action + "' tidak didukung." });
    }
  } catch (error) {
    return jsonResponse({
      success: false,
      message: "Terjadi kesalahan saat memproses data: " + error.toString()
    });
  }
}

/**
 * Inisialisasi struktur sheet dan seed data awal secara otomatis
 */
function initDatabase() {
  var ss = getSpreadsheet();

  // 1. Sheet Settings
  var settingsHeaders = ["Key", "Value"];
  var settingsRows = [
    ["siteName", "NGULEMIN"],
    ["tagline", "Undangan Digital Elegan untuk Momen Istimewa"],
    ["whatsappAdmin", "6281234567890"],
    ["emailAdmin", "halo@ngulemin.id"],
    ["instagramAdmin", "ngulemin.id"],
    ["footerDescription", "NGULEMIN adalah layanan pembuatan undangan digital untuk membantu Anda membagikan momen bahagia dengan cara yang elegan, praktis, dan modern."],
    ["copyrightText", "© 2026 NGULEMIN. All Rights Reserved."],
    ["primaryColor", "#8C6D46"],
    ["secondaryColor", "#B59A74"],
    ["accentColor", "#D4AF37"],
    ["metaTitle", "NGULEMIN — Undangan Digital Elegan untuk Momen Istimewa"],
    ["metaDescription", "Buat undangan pernikahan digital modern, responsive, dan eksklusif bersama NGULEMIN. Fitur lengkap RSVP, Maps, Musik, & Amplop Digital."],
    ["lastUpdated", new Date().toISOString()]
  ];
  ensureSheetWithData(ss, "Settings", settingsHeaders, settingsRows);

  // 2. Sheet Home
  var homeHeaders = ["Key", "Value"];
  var homeRows = [
    ["badge", "UNDANGAN DIGITAL"],
    ["title", "Bagikan Momen Bahagia dengan Undangan Digital Elegan"],
    ["description", "NGULEMIN membantu Anda membuat undangan digital yang modern, elegan, mudah dibagikan, dan siap digunakan untuk momen istimewa pernikahan Anda."],
    ["button1Text", "Lihat Tema"],
    ["button1Link", "#tema"],
    ["button2Text", "Pesan Sekarang"],
    ["button2Link", "#pesan"],
    ["heroImage", "/assets/images/hero_wedding_mockup_1790268938457.jpg"],
    ["background", "linear-gradient(135deg, #FAF8F5 0%, #F4EFEA 100%)"]
  ];
  ensureSheetWithData(ss, "Home", homeHeaders, homeRows);

  // 3. Sheet Themes
  var themesHeaders = ["ID", "Nama", "Gambar", "Deskripsi", "Harga", "PreviewURL", "Category", "Status", "Urutan"];
  var themesRows = [
  [
    "THM-01",
    "Elegant Rose",
    "/assets/images/theme_rose_luxury_1790268952948.jpg",
    "Nuansa romantis bernuansa soft rose gold dengan aksen floral watercolor yang mewah dan memikat.",
    99000,
    "https://ngulemin.id/preview/elegant-rose",
    "Floral & Romantic",
    "Aktif",
    1
  ],
  [
    "THM-02",
    "Royal Heritage",
    "/assets/images/theme_javanese_gold_1790268966316.jpg",
    "Perpaduan klasik adat nusantara dengan sentuhan ornamen batik emas modern berkelas tinggi.",
    129000,
    "https://ngulemin.id/preview/royal-heritage",
    "Adat & Traditional",
    "Aktif",
    2
  ],
  [
    "THM-03",
    "Pure Botanical",
    "/assets/images/theme_minimalist_sage_1790268978210.jpg",
    "Konsep minimalis kontemporer dengan daun eucalyptus segar, tipografi serif modern, dan monogram emas.",
    99000,
    "https://ngulemin.id/preview/pure-botanical",
    "Minimalist Modern",
    "Aktif",
    3
  ]
];
  ensureSheetWithData(ss, "Themes", themesHeaders, themesRows);

  // 4. Sheet Pricing
  var pricingHeaders = ["ID", "Nama", "Harga", "Deskripsi", "Fitur", "Label", "Featured", "Status", "Urutan"];
  var pricingRows = [
    ["PRC-01", "BASIC", 99000, "Cocok untuk perayaan sederhana nan berkesan dengan fitur esensial lengkap.", "Pilihan Tema Standar\nAktif 3 Bulan\nRSVP & Buku Tamu\nNavigasi Google Maps\nBackground Music\nGaleri Foto (5 Foto)\nAmplop Digital", "Hemat", "Tidak", "Aktif", 1],
    ["PRC-02", "STANDARD", 149000, "Paket terpopuler untuk calon mempelai yang menginginkan fitur lebih leluasa.", "Semua Fitur Basic\nAktif 6 Bulan\nGaleri Foto (12 Foto) & Video\nCountdown Timer\nFitur Love Story\nUcapan & Doa Real-time\nCustom Nama Tamu Undangan Tanpa Batas\nFilter Musik Lengkap", "Terpopuler", "Ya", "Aktif", 2],
    ["PRC-03", "PREMIUM", 199000, "Pengalaman undangan digital termewah tanpa batasan dengan domain kustom.", "Semua Fitur Standard\nAktif Selamanya\nFoto Galeri Tanpa Batas\nQR Code Check-in Tamu\nIntegrasi Siaran Langsung (Live Stream)\nKirim Pengingat WhatsApp Otomatis\nRevisi Desain Prioritas\nCustom Musik & Font Favorit", "Eksklusif", "Tidak", "Aktif", 3]
  ];
  ensureSheetWithData(ss, "Pricing", pricingHeaders, pricingRows);

  // 5. Sheet Features
  var featuresHeaders = ["ID", "Icon", "Judul", "Deskripsi", "Status", "Urutan"];
  var featuresRows = [
    ["FEAT-01", "Sparkles", "Desain Elegan", "Visual eksklusif dengan tipografi berkelas yang menonjolkan keanggunan pernikahan.", "Aktif", 1],
    ["FEAT-02", "Smartphone", "Responsive Mobile", "Tampilan sempurna dan sangat nyaman diakses di smartphone, tablet, maupun desktop.", "Aktif", 2],
    ["FEAT-03", "CheckSquare", "RSVP & Konfirmasi Tamu", "Ketahui kepastian kehadiran tamu undangan Anda secara rapi dan otomatis.", "Aktif", 3],
    ["FEAT-04", "Clock", "Countdown Timer", "Hitung mundur menuju hari bahagia pernikahan Anda secara interaktif dan presisi.", "Aktif", 4],
    ["FEAT-05", "Camera", "Galeri Foto & Video", "Abadikan momen prewedding terindah dalam galeri interaktif dengan lightbox jernih.", "Aktif", 5],
    ["FEAT-06", "MapPin", "Google Maps Navigasi", "Pandu tamu undangan menuju lokasi akad dan resepsi dengan satu ketukan tombol rute.", "Aktif", 6],
    ["FEAT-07", "Music", "Background Musik Romantis", "Alunan melodi romantis pilihan untuk mengiringi tamu saat membaca undangan.", "Aktif", 7],
    ["FEAT-08", "Heart", "Love Story", "Ceritakan kisah cinta pertama, pertunangan, hingga menuju jenjang pernikahan suci.", "Aktif", 8],
    ["FEAT-09", "CreditCard", "Amplop Digital", "Kemudahan bagi tamu untuk mengirimkan kado pernikahan melalui transfer bank atau e-wallet.", "Aktif", 9],
    ["FEAT-10", "MessageSquare", "Ucapan & Doa", "Wadah bagi keluarga dan sahabat untuk menyampaikan ucapan selamat serta doa restu.", "Aktif", 10],
    ["FEAT-11", "Share2", "Share WhatsApp Praktis", "Bagikan undangan ke WhatsApp kerabat secara mudah dengan teks pengantar yang rapi.", "Aktif", 11],
    ["FEAT-12", "Users", "Custom Nama Tamu", "Sebut nama setiap tamu secara personal di sampul undangan digital Anda.", "Aktif", 12]
  ];
  ensureSheetWithData(ss, "Features", featuresHeaders, featuresRows);

  // 6. Sheet Testimonials
  var testimonialsHeaders = [
  "ID",
  "Nama",
  "Foto",
  "Testimoni",
  "Rating",
  "Lokasi",
  "Status",
  "Urutan"
];
  var testimonialsRows = [
  [
    "TESTI-01",
    "Dimas & Sarah",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "Pelayanan NGULEMIN cepat banget dan hasilnya sangat elegan. Para tamu banyak yang memuji undangannya karena lagunya bagus dan mudah dibuka di HP!",
    5,
    "Jakarta Selatan",
    "Aktif",
    1
  ],
  [
    "TESTI-02",
    "Rizky & Amanda",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "Fitur amplop digital dan RSVP-nya ngebantu banget dalam pendataan katering. Desain temanya bener-bener berkelas dan nggak pasaran!",
    5,
    "Surabaya",
    "Aktif",
    2
  ],
  [
    "TESTI-03",
    "Budi & Novita",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "Sangat puas dengan paket Premium! Admin sangat ramah membimbing dari pengisian data sampai revisi selesai dalam hitungan jam.",
    5,
    "Bandung",
    "Aktif",
    3
  ]
];
  ensureSheetWithData(ss, "Testimonials", testimonialsHeaders, testimonialsRows);

  // 7. Sheet HowToOrder
  var howHeaders = ["Nomor", "Judul", "Deskripsi", "Icon", "Status", "Urutan"];
  var howRows = [
    ["01", "Pilih Tema", "Telusuri katalog tema elegan kami dan pilih desain yang paling mencerminkan impian pernikahan Anda.", "Palette", "Aktif", 1],
    ["02", "Isi Formulir", "Lengkapi detail mempelai, tanggal akad/resepsi, lokasi acara, dan cerita cinta melalui form yang disediakan.", "FileText", "Aktif", 2],
    ["03", "Pembayaran & Konfirmasi", "Lakukan konfirmasi pemesanan ke WhatsApp admin dan selesaikan pembayaran dengan metode pilihan Anda.", "CreditCard", "Aktif", 3],
    ["04", "Undangan Siap Dibagikan", "Undangan langsung diproses dalam 1-24 jam dan siap disebarkan ke keluarga tercinta via WhatsApp.", "Send", "Aktif", 4]
  ];
  ensureSheetWithData(ss, "HowToOrder", howHeaders, howRows);

  // 8. Sheet FAQ
  var faqHeaders = ["ID", "Pertanyaan", "Jawaban", "Status", "Urutan"];
  var faqRows = [
    ["FAQ-01", "Apa itu undangan digital NGULEMIN?", "Undangan digital NGULEMIN adalah website undangan pernikahan modern berbasis tautan (link) yang dapat diakses dengan mudah di smartphone, tablet, maupun komputer.", "Aktif", 1],
    ["FAQ-02", "Berapa lama proses pembuatannya?", "Proses pengerjaan berkisar antara 1 hingga 24 jam setelah data pernikahan dan konfirmasi pembayaran kami terima secara lengkap.", "Aktif", 2],
    ["FAQ-03", "Apakah saya bisa melakukan revisi?", "Tentu saja! Kami memberikan garansi revisi teks, tanggal, foto, maupun lagu pengiring hingga Anda merasa benar-benar puas.", "Aktif", 3],
    ["FAQ-04", "Apakah foto dan video bisa diganti sendiri?", "Ya, Anda dapat mengirimkan foto dan video terbaik Anda kepada tim kami untuk dipasangkan ke dalam tema pilihan Anda.", "Aktif", 4],
    ["FAQ-05", "Apakah bisa menggunakan lagu favorit kami?", "Bisa. Anda dapat memilih daftar lagu yang kami rekomendasikan atau memberikan judul lagu favorit Anda sendiri.", "Aktif", 5],
    ["FAQ-06", "Bagaimana cara membagikannya ke WhatsApp?", "Kami menyediakan template pesan WhatsApp yang rapi beserta generator nama tamu undangan otomatis, sehingga Anda cukup klik 'Kirim'.", "Aktif", 6],
    ["FAQ-07", "Berapa lama undangan digital ini aktif?", "Masa aktif bergantung pada paket yang dipilih: Basic (3 bulan), Standard (6 bulan), dan Premium (Aktif Selamanya).", "Aktif", 7]
  ];
  ensureSheetWithData(ss, "FAQ", faqHeaders, faqRows);

  // 9. Sheet Orders
  var ordersHeaders = ["ID", "Tanggal", "Nama", "WhatsApp", "Tema", "MempelaiPria", "MempelaiWanita", "TanggalNikah", "Lokasi", "Paket", "Catatan", "Status"];
  var ordersRows = [
    ["ORD-202609-001", "2026-09-24 10:00", "Aditya Pratama", "6281298765432", "Elegant Rose", "Aditya Pratama", "Dian Sastro", "2026-12-20", "Hotel Mulia, Jakarta Pusat", "PREMIUM", "Tolong tambahkan lagu A Thousand Years", "Diproses"]
  ];
  ensureSheetWithData(ss, "Orders", ordersHeaders, ordersRows);

  // 10. Sheet Admin
  var adminHeaders = ["Username", "PasswordHash", "Salt", "Token", "TokenExpires"];
  var salt = "ngulemin_secure_salt_2026";
  // Password default awal: admin123
  var hash = hashPassword("admin123", salt);
  var adminRows = [
    ["admin", hash, salt, "", ""]
  ];
  ensureSheetWithData(ss, "Admin", adminHeaders, adminRows);
}

/**
 * Membuat sheet jika belum ada atau memperbarui header
 */
function ensureSheetWithData(ss, sheetName, headers, defaultRows) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Format header
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F4EFEA");
    sheet.setFrozenRows(1);

    if (defaultRows && defaultRows.length > 0) {
      for (var i = 0; i < defaultRows.length; i++) {
        sheet.appendRow(defaultRows[i]);
      }
    }
  }
}

// ==========================================
// PENGAMBILAN DATA (READ)
// ==========================================

function getSettingsData(ss) {
  var sheet = ss.getSheetByName("Settings");
  if (!sheet) return {};
  var data = sheet.getDataRange().getValues();
  var settings = {};
  for (var i = 1; i < data.length; i++) {
    var key = data[i][0];
    var val = data[i][1];
    if (key) {
      settings[key] = val;
    }
  }
  return settings;
}

function getHomeData(ss) {
  var sheet = ss.getSheetByName("Home");
  if (!sheet) return {};
  var data = sheet.getDataRange().getValues();
  var home = {};
  for (var i = 1; i < data.length; i++) {
    var key = data[i][0];
    var val = data[i][1];
    if (key) {
      home[key] = val;
    }
  }
  return home;
}

function getThemesData(ss) {
  return getSheetObjects(ss, "Themes");
}

function getPricingData(ss) {
  return getSheetObjects(ss, "Pricing");
}

function getFeaturesData(ss) {
  return getSheetObjects(ss, "Features");
}

function getTestimonialsData(ss) {
  return getSheetObjects(ss, "Testimonials");
}

function getHowToOrderData(ss) {
  return getSheetObjects(ss, "HowToOrder");
}

function getFAQData(ss) {
  return getSheetObjects(ss, "FAQ");
}

function getOrdersData(ss) {
  return getSheetObjects(ss, "Orders");
}

function getSheetObjects(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var headerKey = headers[j].toString().trim();
      obj[headerKey] = row[j];
    }
    list.push(obj);
  }
  return list;
}

// ==========================================
// OPERASI PEMESANAN (ORDER)
// ==========================================

function handleCreateOrder(ss, order) {
  var sheet = ss.getSheetByName("Orders");
  if (!sheet) {
    initDatabase();
    sheet = ss.getSheetByName("Orders");
  }

  var now = new Date();
  var dateStr = Utilities.formatDate(now, Session.getScriptTimeZone() || "GMT+7", "yyyy-MM-dd HH:mm");
  var orderId = "ORD-" + Utilities.formatDate(now, "GMT+7", "yyyyMM") + "-" + ("000" + Math.floor(Math.random() * 900 + 100)).slice(-3);

  var newRow = [
    orderId,
    dateStr,
    order.Nama || order.nama || "",
    order.WhatsApp || order.whatsapp || order.noWhatsapp || "",
    order.Tema || order.tema || "",
    order.MempelaiPria || order.mempelaiPria || "",
    order.MempelaiWanita || order.mempelaiWanita || "",
    order.TanggalNikah || order.tanggalNikah || "",
    order.Lokasi || order.lokasi || "",
    order.Paket || order.paket || "",
    order.Catatan || order.catatan || "",
    "Baru"
  ];

  sheet.appendRow(newRow);

  return {
    success: true,
    message: "Pesanan berhasil disimpan di Google Spreadsheet.",
    data: {
      orderId: orderId,
      tanggal: dateStr
    }
  };
}

// ==========================================
// AUTENTIKASI ADMIN
// ==========================================

function handleLogin(ss, username, password) {
  var sheet = ss.getSheetByName("Admin");
  if (!sheet) {
    initDatabase();
    sheet = ss.getSheetByName("Admin");
  }

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var u = data[i][0];
    var hash = data[i][1];
    var salt = data[i][2];

    if (u === username) {
      var inputHash = hashPassword(password, salt);
      if (inputHash === hash) {
        // Buat token sesi baru
        var token = "NGU_" + Utilities.getUuid() + "_" + (new Date().getTime());
        var expires = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString(); // 24 jam

        sheet.getRange(i + 1, 4).setValue(token);
        sheet.getRange(i + 1, 5).setValue(expires);

        return {
          success: true,
          message: "Login berhasil!",
          data: {
            username: username,
            token: token,
            expires: expires
          }
        };
      }
    }
  }

  return {
    success: false,
    message: "Username atau password salah."
  };
}

function validateSessionToken(ss, token) {
  if (!token || token.trim() === "") return false;

  var sheet = ss.getSheetByName("Admin");
  if (!sheet) return false;

  var data = sheet.getDataRange().getValues();
  var now = new Date().getTime();

  for (var i = 1; i < data.length; i++) {
    var storedToken = data[i][3];
    var expires = data[i][4];

    if (storedToken === token) {
      if (expires && new Date(expires).getTime() > now) {
        return true;
      }
    }
  }
  return false;
}

function handleLogout(ss, token) {
  if (!token) return;
  var sheet = ss.getSheetByName("Admin");
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][3] === token) {
      sheet.getRange(i + 1, 4).setValue("");
      sheet.getRange(i + 1, 5).setValue("");
      break;
    }
  }
}
function handleUpdateAdminUsername(ss, username) {
  var cleanUsername = (username || "").toString().trim();

  if (!cleanUsername) {
    return {
      success: false,
      message: "Username admin tidak boleh kosong."
    };
  }

  var sheet = ss.getSheetByName("Admin");

  if (!sheet) {
    return {
      success: false,
      message: "Sheet Admin tidak ditemukan."
    };
  }

  var data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return {
      success: false,
      message: "Akun admin belum diinisialisasi."
    };
  }

  sheet.getRange(2, 1).setValue(cleanUsername);

  return {
    success: true,
    message: "Username admin berhasil diperbarui."
  };
}
function handleChangePassword(ss, oldPassword, newPassword) {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: "Password baru minimal 6 karakter." };
  }

  var sheet = ss.getSheetByName("Admin");
  if (!sheet) return { success: false, message: "Sheet Admin tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { success: false, message: "Akun admin belum diinisialisasi." };

  var salt = data[1][2];
  var currentHash = data[1][1];

  if (hashPassword(oldPassword, salt) !== currentHash) {
    return { success: false, message: "Password lama tidak sesuai." };
  }

  var newSalt = "ngulemin_" + (new Date().getTime());
  var newHash = hashPassword(newPassword, newSalt);

  sheet.getRange(2, 2).setValue(newHash);
  sheet.getRange(2, 3).setValue(newSalt);

  return { success: true, message: "Password admin berhasil diperbarui!" };
}

function hashPassword(password, salt) {
  var raw = (password || "") + (salt || "");
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw, Utilities.Charset.UTF_8);
  var hex = "";
  for (var i = 0; i < digest.length; i++) {
    var b = digest[i];
    if (b < 0) b += 256;
    var byteString = b.toString(16);
    if (byteString.length === 1) byteString = "0" + byteString;
    hex += byteString;
  }
  return hex;
}

// ==========================================
// OPERASI CRUD UMUM & UPDATE
// ==========================================

function updateSettingsData(ss, newSettings) {
  var sheet = ss.getSheetByName("Settings");
  if (!sheet) return { success: false, message: "Sheet Settings tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  var existingKeys = {};
  for (var i = 1; i < data.length; i++) {
    existingKeys[data[i][0]] = i + 1; // row index in spreadsheet
  }

  for (var key in newSettings) {
    if (existingKeys[key]) {
      sheet.getRange(existingKeys[key], 2).setValue(newSettings[key]);
    } else {
      sheet.appendRow([key, newSettings[key]]);
    }
  }

  // Update timestamp
  if (existingKeys["lastUpdated"]) {
    sheet.getRange(existingKeys["lastUpdated"], 2).setValue(new Date().toISOString());
  } else {
    sheet.appendRow(["lastUpdated", new Date().toISOString()]);
  }

  return { success: true, message: "Pengaturan berhasil diperbarui." };
}

function updateHomeData(ss, newHome) {
  var sheet = ss.getSheetByName("Home");
  if (!sheet) return { success: false, message: "Sheet Home tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  var existingKeys = {};
  for (var i = 1; i < data.length; i++) {
    existingKeys[data[i][0]] = i + 1;
  }

  for (var key in newHome) {
    if (existingKeys[key]) {
      sheet.getRange(existingKeys[key], 2).setValue(newHome[key]);
    } else {
      sheet.appendRow([key, newHome[key]]);
    }
  }

  return { success: true, message: "Bagian Home hero berhasil diperbarui." };
}
function ensureSheetColumns(ss, sheetName, requiredHeaders) {
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) return false;

  var lastColumn = sheet.getLastColumn();

  if (lastColumn < 1) return false;

  var headers = sheet
    .getRange(1, 1, 1, lastColumn)
    .getValues()[0]
    .map(function(header) {
      return header.toString().trim();
    });

  for (var i = 0; i < requiredHeaders.length; i++) {
    var requiredHeader = requiredHeaders[i];

    if (headers.indexOf(requiredHeader) === -1) {
      var newColumn = sheet.getLastColumn() + 1;

      sheet
        .getRange(1, newColumn)
        .setValue(requiredHeader)
        .setFontWeight("bold")
        .setBackground("#F4EFEA");

      headers.push(requiredHeader);
    }
  }

  return true;
}
function createRow(ss, sheetName, itemData, headerOrder) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return { success: false, message: "Sheet " + sheetName + " tidak ditemukan." };

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var row = [];

  // Generate ID jika belum ada
  if (!itemData.ID && !itemData.Nomor) {
    var prefix = sheetName.substring(0, 3).toUpperCase();
    itemData.ID = prefix + "-" + (sheet.getLastRow());
  }

  for (var j = 0; j < headers.length; j++) {
    var key = headers[j].toString().trim();
    row.push(itemData[key] !== undefined ? itemData[key] : "");
  }

  sheet.appendRow(row);
  return { success: true, message: "Data berhasil ditambahkan ke " + sheetName, data: itemData };
}

function updateRow(ss, sheetName, itemData, idKey) {
  var keyName = idKey || "ID";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return { success: false, message: "Sheet " + sheetName + " tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var targetId = itemData[keyName];

  if (!targetId) {
    return { success: false, message: "Field '" + keyName + "' harus diisi untuk memperbarui data." };
  }

  var idColIdx = -1;
  for (var h = 0; h < headers.length; h++) {
    if (headers[h].toString().trim() === keyName) {
      idColIdx = h;
      break;
    }
  }

  if (idColIdx === -1) {
    return { success: false, message: "Kolom " + keyName + " tidak ditemukan di sheet " + sheetName };
  }

  for (var i = 1; i < data.length; i++) {
    if (data[i][idColIdx].toString().trim() === targetId.toString().trim()) {
      var rowNumber = i + 1;
      for (var j = 0; j < headers.length; j++) {
        var hName = headers[j].toString().trim();
        if (itemData[hName] !== undefined) {
          sheet.getRange(rowNumber, j + 1).setValue(itemData[hName]);
        }
      }
      return { success: true, message: "Data " + targetId + " berhasil diperbarui di " + sheetName };
    }
  }

  return { success: false, message: "Data dengan " + keyName + " " + targetId + " tidak ditemukan." };
}

function deleteRow(ss, sheetName, targetId, idKey) {
  var keyName = idKey || "ID";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return { success: false, message: "Sheet " + sheetName + " tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var idColIdx = -1;
  for (var h = 0; h < headers.length; h++) {
    if (headers[h].toString().trim() === keyName) {
      idColIdx = h;
      break;
    }
  }

  if (idColIdx === -1) {
    return { success: false, message: "Kolom " + keyName + " tidak ditemukan." };
  }

  for (var i = 1; i < data.length; i++) {
    if (data[i][idColIdx].toString().trim() === targetId.toString().trim()) {
      sheet.deleteRow(i + 1);
      return { success: true, message: "Data " + targetId + " berhasil dihapus dari " + sheetName };
    }
  }

  return { success: false, message: "Data dengan " + keyName + " " + targetId + " tidak ditemukan untuk dihapus." };
}

function updateOrderStatus(ss, orderId, status) {
  var sheet = ss.getSheetByName("Orders");
  if (!sheet) return { success: false, message: "Sheet Orders tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString().trim() === orderId.toString().trim()) {
      sheet.getRange(i + 1, 12).setValue(status);
      return { success: true, message: "Status pesanan " + orderId + " diubah menjadi " + status };
    }
  }
  return { success: false, message: "Pesanan " + orderId + " tidak ditemukan." };
}

// ==========================================
// UTILITY RESPONSE JSON
// ==========================================

function jsonResponse(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
