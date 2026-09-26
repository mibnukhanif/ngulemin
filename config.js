/**
 * =========================================================================
 * NGULEMIN — Konfigurasi Utama
 * =========================================================================
 * Masukkan URL Web App Google Apps Script Anda pada variabel API_URL di bawah.
 * 
 * CARA MENDAPATKAN API_URL:
 * 1. Buka Google Spreadsheet Anda > Ekstensi > Apps Script.
 * 2. Masukkan kode dari Code.gs.
 * 3. Klik "Deploy" / "Terapkan" > "Penerapan Baru" (New Deployment).
 * 4. Pilih tipe: "Aplikasi Web" (Web app).
 * 5. Siapa yang memiliki akses: "Siapa saja" (Anyone).
 * 6. Salin URL yang dihasilkan (berakhiran /exec).
 * 
 * CATATAN PENTING:
 * - Jika API_URL masih dikosongkan (""), sistem akan otomatis menggunakan
 *   Database Lokal (Local Storage) untuk demo instan sehingga website tetap
 *   bisa dicoba tanpa error sebelum backend Apps Script dideploy.
 * =========================================================================
 */

const CONFIG = {
  // Ganti string kosong di bawah dengan URL Web App Apps Script Anda:
  // Contoh: "https://script.google.com/macros/s/AKfycbx.../exec"
  API_URL: "https://script.google.com/macros/s/AKfycbyeNECo4qhH22GI43mxpr_PixVsLnE39wjJsXEdo6PhoIHd2mJxWKYOpiQGf7-aJXuC/exec",

  // Nama Brand
  SITE_NAME: "NGULEMIN",
  TAGLINE: "Undangan Digital Elegan untuk Momen Istimewa",

  // Nomor WhatsApp Admin Default (Format internasional tanpa '+' atau spasi, contoh: 6281234567890)
  DEFAULT_WA_ADMIN: "6281234567890",

  // Kredensial Default Admin (hanya untuk referensi awal)
  DEFAULT_ADMIN_USER: "admin",
  DEFAULT_ADMIN_PASS: "admin123"
};

// Pastikan CONFIG tersedia di window scope
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
