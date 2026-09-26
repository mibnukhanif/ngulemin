/**
 * =========================================================================
 * NGULEMIN — Frontend Main Script (Landing Page & Order Flow)
 * =========================================================================
 */

// State Default (Digunakan jika API belum terhubung atau saat offline)
const DEFAULT_STATE = {
  settings: {
    siteName: "NGULEMIN",
    tagline: "Undangan Digital Elegan untuk Momen Istimewa",
    whatsappAdmin: "6281234567890",
    emailAdmin: "halo@ngulemin.id",
    instagramAdmin: "ngulemin.id",
    footerDescription: "NGULEMIN adalah layanan pembuatan undangan digital untuk membantu Anda membagikan momen bahagia dengan cara yang elegan, praktis, dan modern.",
    copyrightText: "© 2026 NGULEMIN. All Rights Reserved.",
    primaryColor: "#8C6D46",
    secondaryColor: "#B59A74",
    accentColor: "#D4AF37"
  },
  home: {
    badge: "UNDANGAN DIGITAL",
    title: "Bagikan Momen Bahagia dengan Undangan Digital Elegan",
    description: "NGULEMIN membantu Anda membuat undangan digital yang modern, elegan, mudah dibagikan, dan siap digunakan untuk momen istimewa pernikahan Anda.",
    button1Text: "Lihat Tema",
    button1Link: "#tema",
    button2Text: "Pesan Sekarang",
    button2Link: "#pesan",
    heroImage: "/assets/images/hero_mockup.jpg"
  },
  themes: [
    {
      ID: "THM-01",
      Nama: "Elegant Rose",
      Gambar: "/assets/images/theme_rose.jpg",
      Deskripsi: "Nuansa romantis bernuansa soft rose gold dengan aksen floral watercolor yang mewah dan memikat.",
      Harga: 99000,
      PreviewURL: "https://ngulemin.id/preview/elegant-rose",
      Status: "Aktif",
      Urutan: 1
    },
    {
      ID: "THM-02",
      Nama: "Royal Heritage",
      Gambar: "/assets/images/theme_gold.jpg",
      Deskripsi: "Perpaduan klasik adat nusantara dengan sentuhan ornamen batik emas modern berkelas tinggi.",
      Harga: 129000,
      PreviewURL: "https://ngulemin.id/preview/royal-heritage",
      Status: "Aktif",
      Urutan: 2
    },
    {
      ID: "THM-03",
      Nama: "Pure Botanical",
      Gambar: "/assets/images/theme_sage.jpg",
      Deskripsi: "Konsep minimalis kontemporer dengan daun eucalyptus segar, tipografi serif modern, dan monogram emas.",
      Harga: 99000,
      PreviewURL: "https://ngulemin.id/preview/pure-botanical",
      Status: "Aktif",
      Urutan: 3
    }
  ],
  pricing: [
    {
      ID: "PRC-01",
      Nama: "BASIC",
      Harga: 99000,
      Deskripsi: "Cocok untuk perayaan sederhana nan berkesan dengan fitur esensial lengkap.",
      Fitur: "Pilihan Tema Standar\nAktif 3 Bulan\nRSVP & Buku Tamu\nNavigasi Google Maps\nBackground Music\nGaleri Foto (5 Foto)\nAmplop Digital",
      Label: "Hemat",
      Featured: "Tidak",
      Status: "Aktif",
      Urutan: 1
    },
    {
      ID: "PRC-02",
      Nama: "STANDARD",
      Harga: 149000,
      Deskripsi: "Paket terpopuler untuk calon mempelai yang menginginkan fitur lebih leluasa.",
      Fitur: "Semua Fitur Basic\nAktif 6 Bulan\nGaleri Foto (12 Foto) & Video\nCountdown Timer\nFitur Love Story\nUcapan & Doa Real-time\nCustom Nama Tamu Tanpa Batas\nFilter Musik Lengkap",
      Label: "Terpopuler",
      Featured: "Ya",
      Status: "Aktif",
      Urutan: 2
    },
    {
      ID: "PRC-03",
      Nama: "PREMIUM",
      Harga: 199000,
      Deskripsi: "Pengalaman undangan digital termewah tanpa batasan dengan domain kustom.",
      Fitur: "Semua Fitur Standard\nAktif Selamanya\nFoto Galeri Tanpa Batas\nQR Code Check-in Tamu\nIntegrasi Siaran Langsung (Live)\nKirim Pengingat WhatsApp Otomatis\nRevisi Desain Prioritas\nCustom Musik & Font Favorit",
      Label: "Eksklusif",
      Featured: "Tidak",
      Status: "Aktif",
      Urutan: 3
    }
  ],
  features: [
    { ID: "F1", Icon: "Sparkles", Judul: "Desain Elegan", Deskripsi: "Visual eksklusif dengan tipografi berkelas yang menonjolkan keanggunan pernikahan Anda.", Status: "Aktif" },
    { ID: "F2", Icon: "Smartphone", Judul: "Responsive Mobile", Deskripsi: "Tampilan sempurna dan sangat nyaman diakses di smartphone, tablet, maupun desktop.", Status: "Aktif" },
    { ID: "F3", Icon: "CheckSquare", Judul: "RSVP & Tamu", Deskripsi: "Ketahui kepastian kehadiran tamu undangan secara rapi dan otomatis.", Status: "Aktif" },
    { ID: "F4", Icon: "Clock", Judul: "Countdown Timer", Deskripsi: "Hitung mundur menuju hari bahagia pernikahan Anda secara presisi.", Status: "Aktif" },
    { ID: "F5", Icon: "Camera", Judul: "Galeri Foto & Video", Deskripsi: "Abadikan momen prewedding terindah dalam galeri interaktif dengan lightbox jernih.", Status: "Aktif" },
    { ID: "F6", Icon: "MapPin", Judul: "Google Maps Navigasi", Deskripsi: "Pandu tamu undangan menuju lokasi resepsi dengan satu ketukan tombol rute.", Status: "Aktif" },
    { ID: "F7", Icon: "Music", Judul: "Musik Romantis", Deskripsi: "Alunan melodi romantis pilihan untuk mengiringi tamu saat membaca undangan.", Status: "Aktif" },
    { ID: "F8", Icon: "Heart", Judul: "Love Story", Deskripsi: "Ceritakan perjalanan cinta Anda dan pasangan menuju jenjang pernikahan suci.", Status: "Aktif" },
    { ID: "F9", Icon: "CreditCard", Judul: "Amplop Digital", Deskripsi: "Kemudahan bagi tamu untuk memberikan kado via transfer bank dan QRIS.", Status: "Aktif" },
    { ID: "F10", Icon: "MessageSquare", Judul: "Ucapan & Doa", Deskripsi: "Wadah bagi keluarga dan kerabat untuk menyampaikan doa restu hangat.", Status: "Aktif" },
    { ID: "F11", Icon: "Share2", Judul: "Share WhatsApp", Deskripsi: "Bagikan undangan ke WhatsApp kerabat secara mudah dengan teks personal.", Status: "Aktif" },
    { ID: "F12", Icon: "Users", Judul: "Custom Nama Tamu", Deskripsi: "Sebut nama setiap tamu secara personal di sampul undangan digital Anda.", Status: "Aktif" }
  ],
  testimonials: [
    {
      ID: "T1",
      Nama: "Dimas & Sarah",
      Foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      Testimoni: "Pelayanan NGULEMIN cepat banget dan hasilnya sangat elegan. Para tamu banyak yang memuji undangannya karena lagunya bagus dan mudah dibuka di HP!",
      Rating: 5,
      Status: "Aktif"
    },
    {
      ID: "T2",
      Nama: "Rizky & Amanda",
      Foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      Testimoni: "Fitur amplop digital dan RSVP-nya ngebantu banget dalam pendataan katering. Desain temanya bener-bener berkelas dan nggak pasaran!",
      Rating: 5,
      Status: "Aktif"
    },
    {
      ID: "T3",
      Nama: "Budi & Novita",
      Foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      Testimoni: "Sangat puas dengan paket Premium! Admin sangat ramah membimbing dari pengisian data sampai revisi selesai dalam hitungan jam.",
      Rating: 5,
      Status: "Aktif"
    }
  ],
  howToOrder: [
    { Nomor: "01", Judul: "Pilih Tema", Deskripsi: "Telusuri katalog tema elegan kami dan pilih desain yang paling sesuai impian Anda." },
    { Nomor: "02", Judul: "Isi Formulir", Deskripsi: "Lengkapi detail nama mempelai, tanggal akad/resepsi, lokasi acara, dan cerita cinta." },
    { Nomor: "03", Judul: "Lakukan Pembayaran", Deskripsi: "Konfirmasi ke WhatsApp admin dan selesaikan pembayaran dengan metode pilihan Anda." },
    { Nomor: "04", Judul: "Undangan Siap Dibagikan", Deskripsi: "Undangan diproses cepat dalam 1-24 jam dan siap disebarkan ke keluarga tercinta." }
  ],
  faq: [
    { ID: "F1", Pertanyaan: "Apa itu undangan digital NGULEMIN?", Jawaban: "Undangan digital NGULEMIN adalah website undangan pernikahan interaktif modern yang dapat diakses dengan mudah melalui tautan browser di semua perangkat." },
    { ID: "F2", Pertanyaan: "Berapa lama proses pembuatan?", Jawaban: "Proses pembuatan berkisar antara 1 hingga 24 jam setelah data pernikahan dan konfirmasi pembayaran kami terima secara lengkap." },
    { ID: "F3", Pertanyaan: "Apakah bisa custom musik dan foto?", Jawaban: "Tentu bisa! Anda bebas menggunakan lagu pengiring favorit dan menyertakan foto-foto prewedding terbaik Anda." },
    { ID: "F4", Pertanyaan: "Apakah bisa revisi jika ada perubahan acara?", Jawaban: "Ya, kami memberikan garansi revisi teks, tanggal, rundown acara, hingga Anda merasa puas." },
    { ID: "F5", Pertanyaan: "Berapa lama masa aktif undangan?", Jawaban: "Masa aktif bergantung paket pilihan: Basic (3 bulan), Standard (6 bulan), dan Premium aktif selamanya." }
  ]
};

// Global Store State
let appData = { ...DEFAULT_STATE };

// Format Rupiah Helper
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Inisialisasi saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  loadData();
  initOrderModal();
});

// Setup Mobile Navigation Drawer
function initNavbar() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    // Tutup drawer jika link di klik
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }
}

// Load Data dari API atau LocalStorage Cache
async function loadData() {
  const apiUrl = (window.CONFIG && window.CONFIG.API_URL) ? window.CONFIG.API_URL.trim() : "";

  // 1. Cek LocalStorage terlebih dahulu (agar instan)
  const cached = localStorage.getItem('ngulemin_site_data');
  if (cached) {
    try {
      appData = JSON.parse(cached);
      renderAllSections();
    } catch (e) {
      console.warn("Gagal parse cache lokal:", e);
    }
  } else {
    renderAllSections();
  }

  // 2. Jika API_URL dikonfigurasi, fetch data terbaru dari Google Apps Script
  if (apiUrl && apiUrl.startsWith('http')) {
    try {
      const response = await fetch(`${apiUrl}?action=getAllData`);
      const result = await response.json();
      if (result.success && result.data) {
        appData = {
          settings: { ...appData.settings, ...(result.data.settings || {}) },
          home: { ...appData.home, ...(result.data.home || {}) },
          themes: (result.data.themes && result.data.themes.length > 0) ? result.data.themes : appData.themes,
          pricing: (result.data.pricing && result.data.pricing.length > 0) ? result.data.pricing : appData.pricing,
          features: (result.data.features && result.data.features.length > 0) ? result.data.features : appData.features,
          testimonials: (result.data.testimonials && result.data.testimonials.length > 0) ? result.data.testimonials : appData.testimonials,
          howToOrder: (result.data.howToOrder && result.data.howToOrder.length > 0) ? result.data.howToOrder : appData.howToOrder,
          faq: (result.data.faq && result.data.faq.length > 0) ? result.data.faq : appData.faq
        };
        localStorage.setItem('ngulemin_site_data', JSON.stringify(appData));
        renderAllSections();
      }
    } catch (err) {
      console.log("Menggunakan fallback lokal (Google Apps Script API belum tersambung):", err);
    }
  }
}

// Render Seluruh Bagian Halaman
function renderAllSections() {
  renderHome();
  renderThemes();
  renderPricing();
  renderFeatures();
  renderTestimonials();
  renderHowToOrder();
  renderFAQ();
  renderFooter();
  applyCustomColors();
}

function applyCustomColors() {
  if (appData.settings.primaryColor) {
    document.documentElement.style.setProperty('--primary-color', appData.settings.primaryColor);
  }
  if (appData.settings.secondaryColor) {
    document.documentElement.style.setProperty('--secondary-color', appData.settings.secondaryColor);
  }
}

// 1. Render Hero / Home
function renderHome() {
  const h = appData.home;
  const badgeEl = document.getElementById('hero-badge');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-desc');
  const btn1El = document.getElementById('hero-btn-1');
  const btn2El = document.getElementById('hero-btn-2');
  const imgEl = document.getElementById('hero-img');

  if (badgeEl) badgeEl.textContent = h.badge || "UNDANGAN DIGITAL";
  if (titleEl) titleEl.textContent = h.title || "Bagikan Momen Bahagia";
  if (descEl) descEl.textContent = h.description || "";
  if (btn1El) {
    btn1El.textContent = h.button1Text || "Lihat Tema";
    btn1El.href = h.button1Link || "#tema";
  }
  if (btn2El) {
    btn2El.textContent = h.button2Text || "Pesan Sekarang";
    btn2El.href = h.button2Link || "#pesan";
  }
  if (imgEl && h.heroImage) {
    imgEl.src = h.heroImage;
  }
}

// 2. Render Tema Cards
function renderThemes() {
  const container = document.getElementById('themes-container');
  if (!container) return;

  const activeThemes = appData.themes.filter(t => (t.Status || "Aktif") === "Aktif");
  container.innerHTML = activeThemes.map(t => `
    <article class="theme-card">
      <div class="theme-thumbnail-wrap">
        <img src="${t.Gambar || '/assets/images/theme_rose.jpg'}" alt="${t.Nama}" loading="lazy" onerror="this.src='/assets/images/theme_rose.jpg'">
        <span class="theme-badge">Eksklusif</span>
      </div>
      <div class="theme-body">
        <h3 class="theme-title">${t.Nama}</h3>
        <p class="theme-desc">${t.Deskripsi || ''}</p>
        <div class="theme-footer">
          <div class="theme-price">${formatRupiah(t.Harga || 99000)}</div>
          <div class="theme-actions">
            <a href="${t.PreviewURL || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Preview</a>
            <button onclick="openOrderModalWithTheme('${t.Nama}')" class="btn btn-primary btn-sm">Pesan</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Update dropdown pilihan tema di modal pemesanan
  const themeSelect = document.getElementById('order-tema');
  if (themeSelect) {
    themeSelect.innerHTML = activeThemes.map(t => `
      <option value="${t.Nama}">${t.Nama} — ${formatRupiah(t.Harga)}</option>
    `).join('');
  }
}

// 3. Render Paket Harga
function renderPricing() {
  const container = document.getElementById('pricing-container');
  if (!container) return;

  const activePlans = appData.pricing.filter(p => (p.Status || "Aktif") === "Aktif");
  container.innerHTML = activePlans.map(p => {
    const isFeatured = (p.Featured === "Ya" || p.Featured === true || p.Featured === "true");
    const featuresList = (p.Fitur || '').split('\n').filter(f => f.trim() !== '');

    return `
      <div class="pricing-card ${isFeatured ? 'featured' : ''}">
        ${p.Label ? `<span class="pricing-tag">${p.Label}</span>` : ''}
        <div class="pricing-name">${p.Nama}</div>
        <div class="pricing-amount">${formatRupiah(p.Harga || 99000)}</div>
        <div class="pricing-desc">${p.Deskripsi || ''}</div>
        <ul class="pricing-features">
          ${featuresList.map(item => `
            <li class="pricing-feature-item">
              <svg class="pricing-feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
        <button onclick="openOrderModalWithPackage('${p.Nama}')" class="btn ${isFeatured ? 'btn-primary' : 'btn-secondary'} btn-block">Pesan Paket ${p.Nama}</button>
      </div>
    `;
  }).join('');

  // Update pilihan paket di modal form
  const packageSelect = document.getElementById('order-paket');
  if (packageSelect) {
    packageSelect.innerHTML = activePlans.map(p => `
      <option value="${p.Nama}">${p.Nama} (${formatRupiah(p.Harga)})</option>
    `).join('');
  }
}

// 4. Render Fitur Icons
function renderFeatures() {
  const container = document.getElementById('features-container');
  if (!container) return;

  const activeFeats = appData.features.filter(f => (f.Status || "Aktif") === "Aktif");
  container.innerHTML = activeFeats.map(f => `
    <div class="feature-box">
      <div class="feature-icon-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <h3 class="feature-title">${f.Judul}</h3>
      <p class="feature-desc">${f.Deskripsi}</p>
    </div>
  `).join('');
}

// 5. Render Testimoni
function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  const activeTestis = appData.testimonials.filter(t => (t.Status || "Aktif") === "Aktif");
  container.innerHTML = activeTestis.map(t => `
    <div class="testi-card">
      <div class="testi-stars">
        ${Array.from({ length: t.Rating || 5 }).map(() => `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        `).join('')}
      </div>
      <p class="testi-text">"${t.Testimoni}"</p>
      <div class="testi-author">
        <img class="testi-avatar" src="${t.Foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${t.Nama}">
        <div>
          <div class="testi-name">${t.Nama}</div>
          <div class="testi-badge">Klien Bahagia NGULEMIN</div>
        </div>
      </div>
    </div>
  `).join('');
}

// 6. Render Cara Pesan
function renderHowToOrder() {
  const container = document.getElementById('how-container');
  if (!container) return;

  container.innerHTML = appData.howToOrder.map(h => `
    <div class="how-card">
      <div class="how-num">${h.Nomor}</div>
      <h3 class="how-title">${h.Judul}</h3>
      <p class="how-desc">${h.Deskripsi}</p>
    </div>
  `).join('');
}

// 7. Render FAQ Accordion
function renderFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = appData.faq.map((item, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}" id="faq-item-${idx}">
      <button type="button" class="faq-question-btn" onclick="toggleFaq(${idx})">
        <span>${item.Pertanyaan}</span>
        <svg class="faq-icon-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="faq-answer-panel">
        <p class="faq-answer-text">${item.Jawaban}</p>
      </div>
    </div>
  `).join('');
}

function toggleFaq(index) {
  const el = document.getElementById(`faq-item-${index}`);
  if (el) {
    el.classList.toggle('active');
  }
}

// 8. Render Footer & Settings
function renderFooter() {
  const s = appData.settings;
  const brandEl = document.getElementById('footer-brand-title');
  const descEl = document.getElementById('footer-desc');
  const copyEl = document.getElementById('footer-copyright');
  const waEl = document.getElementById('footer-wa');
  const igEl = document.getElementById('footer-ig');
  const mailEl = document.getElementById('footer-mail');

  if (brandEl) brandEl.textContent = s.siteName || "NGULEMIN";
  if (descEl) descEl.textContent = s.footerDescription || "";
  if (copyEl) copyEl.textContent = s.copyrightText || "© 2026 NGULEMIN. All Rights Reserved.";

  if (waEl) {
    waEl.href = `https://wa.me/${s.whatsappAdmin || '6281234567890'}`;
    waEl.textContent = `+${s.whatsappAdmin || '6281234567890'}`;
  }
  if (igEl) {
    igEl.href = `https://instagram.com/${s.instagramAdmin || 'ngulemin.id'}`;
    igEl.textContent = `@${s.instagramAdmin || 'ngulemin.id'}`;
  }
  if (mailEl) {
    mailEl.href = `mailto:${s.emailAdmin || 'halo@ngulemin.id'}`;
    mailEl.textContent = s.emailAdmin || 'halo@ngulemin.id';
  }
}

// =========================================================================
// MODAL PEMESANAN & KIRIM KE WHATSAPP & APPS SCRIPT SPREADSHEET
// =========================================================================
function initOrderModal() {
  const modal = document.getElementById('order-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const orderForm = document.getElementById('order-form');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', handleOrderSubmit);
  }
}

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) modal.classList.add('active');
}

function openOrderModalWithTheme(themeName) {
  openOrderModal();
  const themeSelect = document.getElementById('order-tema');
  if (themeSelect && themeName) {
    themeSelect.value = themeName;
  }
}

function openOrderModalWithPackage(packageName) {
  openOrderModal();
  const pkgSelect = document.getElementById('order-paket');
  if (pkgSelect && packageName) {
    pkgSelect.value = packageName;
  }
}

async function handleOrderSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('order-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Menyimpan & Menghubungkan...";
  }

  const orderData = {
    Nama: document.getElementById('order-nama').value.trim(),
    WhatsApp: document.getElementById('order-whatsapp').value.trim(),
    Tema: document.getElementById('order-tema').value,
    MempelaiPria: document.getElementById('order-pria').value.trim(),
    MempelaiWanita: document.getElementById('order-wanita').value.trim(),
    TanggalNikah: document.getElementById('order-tanggal').value,
    Lokasi: document.getElementById('order-lokasi').value.trim(),
    Paket: document.getElementById('order-paket').value,
    Catatan: document.getElementById('order-catatan').value.trim()
  };

  // 1. Simpan ke Google Spreadsheet melalui Google Apps Script (jika ada API_URL)
  const apiUrl = (window.CONFIG && window.CONFIG.API_URL) ? window.CONFIG.API_URL.trim() : "";
  let orderSavedSuccess = false;

  if (apiUrl && apiUrl.startsWith('http')) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Sesuai standar CORS Google Apps Script
        body: JSON.stringify({
          action: 'createOrder',
          data: orderData
        })
      });
      const result = await res.json();
      if (result.success) {
        orderSavedSuccess = true;
      }
    } catch (err) {
      console.warn("Gagal mengirim ke Google Apps Script, mencadangkan ke lokal:", err);
    }
  }

  // 2. Simpan juga cadangan ke LocalStorage (Orders Demo)
  const localOrders = JSON.parse(localStorage.getItem('ngulemin_local_orders') || '[]');
  localOrders.unshift({
    ID: "ORD-" + Date.now().toString().slice(-6),
    Tanggal: new Date().toISOString().replace('T', ' ').slice(0, 16),
    ...orderData,
    Status: "Baru"
  });
  localStorage.setItem('ngulemin_local_orders', JSON.stringify(localOrders));

  // 3. Tampilkan Notifikasi Berhasil
  showToast("Pesanan Anda berhasil dicatat! Menghubungkan ke WhatsApp admin...");

  // 4. Buat Pesan WhatsApp Terformat
  const waText = 
`Halo NGULEMIN, saya ingin memesan undangan digital.

Nama: ${orderData.Nama}
No. WhatsApp: ${orderData.WhatsApp}
Tema: ${orderData.Tema}
Mempelai Pria: ${orderData.MempelaiPria}
Mempelai Wanita: ${orderData.MempelaiWanita}
Tanggal: ${orderData.TanggalNikah}
Lokasi: ${orderData.Lokasi}
Paket: ${orderData.Paket}
Catatan: ${orderData.Catatan || '-'}`;

  const adminPhone = (appData.settings.whatsappAdmin || "6281234567890").replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`;

  // Reset form & tutup modal
  setTimeout(() => {
    const modal = document.getElementById('order-modal');
    if (modal) modal.classList.remove('active');
    document.getElementById('order-form').reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Kirim Pesanan";
    }

    // Alihkan ke WhatsApp admin
    window.open(waUrl, '_blank');
  }, 1000);
}

// Toast Notifikasi Helper
function showToast(message) {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const div = document.createElement('div');
  div.id = 'toast-container';
  div.className = 'toast-container';
  document.body.appendChild(div);
  return div;
}

// Expose fungsi ke window untuk inline onclick handlers
window.openOrderModal = openOrderModal;
window.openOrderModalWithTheme = openOrderModalWithTheme;
window.openOrderModalWithPackage = openOrderModalWithPackage;
window.toggleFaq = toggleFaq;
