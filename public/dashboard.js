/**
 * =========================================================================
 * NGULEMIN — Admin Dashboard JavaScript (Full CMS & Apps Script Sync)
 * =========================================================================
 */

// 1. Validasi Autentikasi Sesi
const adminToken = localStorage.getItem('ngulemin_admin_token');
if (!adminToken) {
  window.location.href = 'login.html';
}

// Global CMS State
let cmsData = {
  settings: {},
  home: {},
  themes: [],
  pricing: [],
  features: [],
  testimonials: [],
  howToOrder: [],
  faq: [],
  orders: []
};

// Inisialisasi saat Halaman Dashboard Dimuat
document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  loadAdminUser();
  loadAllCmsData();
  loadCodeGsGuide();
});

function setupSidebar() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('dash-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

function loadAdminUser() {
  const username = localStorage.getItem('ngulemin_admin_user') || 'Admin';
  const displayEl = document.getElementById('admin-user-display');
  if (displayEl) displayEl.textContent = `Hai, ${username}`;
}

// Switcher Tab Navigasi Dashboard
function switchTab(tabId) {
  // Update sidebar active item
  document.querySelectorAll('.dash-menu-item').forEach(item => {
    item.classList.remove('active');
  });

  // Tampilkan tab view yang sesuai
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`tab-${tabId}`);
  if (targetView) targetView.classList.add('active');

  const topTitle = document.getElementById('topbar-title');
  if (topTitle) {
    const titles = {
      overview: 'Overview & Statistik',
      orders: 'Daftar Pesanan Masuk',
      home: 'Kelola Home & Hero',
      themes: 'Kelola Tema Undangan',
      pricing: 'Kelola Paket Harga',
      features: 'Kelola Fitur Undangan',
      testimonials: 'Kelola Testimoni Klien',
      howto: 'Kelola Langkah Cara Pesan',
      faq: 'Kelola Tanya Jawab (FAQ)',
      footer: 'Kelola Footer & Kontak',
      settings: 'Pengaturan Umum & API',
      guide: 'Panduan Setup Google Apps Script'
    };
    topTitle.textContent = titles[tabId] || 'Dashboard';
  }

  // Tutup sidebar di mobile setelah klik
  const sidebar = document.getElementById('dash-sidebar');
  if (sidebar && window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
}

// Load Semua Data dari API atau Cache Lokal
async function loadAllCmsData() {
  const apiUrl = getApiUrl();
  const apiStatusEl = document.getElementById('api-status-text');

  // Ambil cache lokal terlebih dahulu
  const cachedSiteData = localStorage.getItem('ngulemin_site_data');
  if (cachedSiteData) {
    try {
      const parsed = JSON.parse(cachedSiteData);
      cmsData = { ...cmsData, ...parsed };
    } catch (e) {
      console.warn("Gagal parse cache lokal:", e);
    }
  }

  // Ambil pesanan lokal
  const localOrders = JSON.parse(localStorage.getItem('ngulemin_local_orders') || '[]');
  cmsData.orders = localOrders;

  renderOverview();
  renderAllTabs();

  // Jika ada API_URL Google Apps Script, lakukan fetch online
  if (apiUrl && apiUrl.startsWith('http')) {
    if (apiStatusEl) apiStatusEl.innerHTML = `<span style="color: #D97706;">Sedang menghubungkan ke Google Apps Script...</span>`;
    try {
      const res = await fetch(`${apiUrl}?action=getAllData`);
      const result = await res.json();
      if (result.success && result.data) {
        cmsData.settings = result.data.settings || cmsData.settings;
        cmsData.home = result.data.home || cmsData.home;
        cmsData.themes = result.data.themes || cmsData.themes;
        cmsData.pricing = result.data.pricing || cmsData.pricing;
        cmsData.features = result.data.features || cmsData.features;
        cmsData.testimonials = result.data.testimonials || cmsData.testimonials;
        cmsData.howToOrder = result.data.howToOrder || cmsData.howToOrder;
        cmsData.faq = result.data.faq || cmsData.faq;

        // Ambil orders dari Apps Script jika ada
        try {
          const ordRes = await fetch(`${apiUrl}?action=getOrders&token=${encodeURIComponent(adminToken)}`);
          const ordResult = await ordRes.json();
          if (ordResult.success && Array.isArray(ordResult.data)) {
            cmsData.orders = ordResult.data;
          }
        } catch (e) {}

        if (apiStatusEl) apiStatusEl.innerHTML = `<strong style="color: #059669;">&bull; Terhubung Aktif</strong> ke Google Spreadsheet`;
        localStorage.setItem('ngulemin_site_data', JSON.stringify(cmsData));
        renderOverview();
        renderAllTabs();
      }
    } catch (err) {
      if (apiStatusEl) apiStatusEl.innerHTML = `<span style="color: #DC2626;">&bull; Menggunakan Mode Lokal / Offline</span> (Pastikan API_URL benar dan diizinkan CORS).`;
    }
  } else {
    if (apiStatusEl) apiStatusEl.innerHTML = `<span style="color: #6B7280;">Mode Demo Lokal (Belum terhubung ke Apps Script). Masukkan URL di tab Pengaturan.</span>`;
  }
}

function getApiUrl() {
  const savedUrl = localStorage.getItem('ngulemin_api_url');
  if (savedUrl) return savedUrl;
  return (window.CONFIG && window.CONFIG.API_URL) ? window.CONFIG.API_URL.trim() : "";
}

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num || 0);
}

// ==========================================
// RENDER TABS
// ==========================================

function renderAllTabs() {
  renderOverview();
  renderOrdersTable();
  populateHomeForm();
  renderThemesTable();
  renderPricingTable();
  renderFeaturesTable();
  renderTestiTable();
  renderHowtoTable();
  renderFaqTable();
  populateFooterForm();
  populateSettingsForm();
}

function renderOverview() {
  const stThemes = document.getElementById('stat-themes');
  const stPricing = document.getElementById('stat-pricing');
  const stFeatures = document.getElementById('stat-features');
  const stTesti = document.getElementById('stat-testimonials');
  const stFaq = document.getElementById('stat-faq');
  const stOrders = document.getElementById('stat-orders');

  if (stThemes) stThemes.textContent = cmsData.themes.length;
  if (stPricing) stPricing.textContent = cmsData.pricing.length;
  if (stFeatures) stFeatures.textContent = cmsData.features.length;
  if (stTesti) stTesti.textContent = cmsData.testimonials.length;
  if (stFaq) stFaq.textContent = cmsData.faq.length;
  if (stOrders) stOrders.textContent = cmsData.orders.length;
}

// 1. Orders
function renderOrdersTable() {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;

  if (cmsData.orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--muted-color); padding: 30px;">Belum ada pesanan masuk.</td></tr>`;
    return;
  }

  tbody.innerHTML = cmsData.orders.map(o => {
    const waClean = (o.WhatsApp || o.whatsapp || '').replace(/[^0-9]/g, '');
    return `
      <tr>
        <td><strong>${o.ID || '-'}</strong></td>
        <td>${o.Tanggal || '-'}</td>
        <td><strong>${o.Nama || '-'}</strong></td>
        <td>
          <a href="https://wa.me/${waClean}" target="_blank" style="color: var(--primary-color); font-weight: 600; text-decoration: underline;">
            ${o.WhatsApp || '-'}
          </a>
        </td>
        <td>${o.Tema || '-'}</td>
        <td>${o.MempelaiPria || '-'} & ${o.MempelaiWanita || '-'}</td>
        <td><span class="status-badge" style="background:#FEF3C7; color:#92400E;">${o.Paket || '-'}</span></td>
        <td><span class="status-badge status-active">${o.Status || 'Baru'}</span></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <a href="https://wa.me/${waClean}?text=Halo%20${encodeURIComponent(o.Nama || '')},%20terima%20kasih%20telah%20memesan%20undangan%20digital%20di%20NGULEMIN." target="_blank" class="btn btn-primary btn-sm" style="padding: 4px 8px; font-size: 11px;">Chat WA</a>
            <button onclick="deleteOrder('${o.ID}')" class="btn btn-secondary btn-sm" style="padding: 4px 8px; font-size: 11px; color:#DC2626; border-color:#DC2626;">Hapus</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function deleteOrder(orderId) {
  openConfirmModal("Hapus Pesanan", `Apakah Anda yakin ingin menghapus pesanan ${orderId}?`, () => {
    cmsData.orders = cmsData.orders.filter(o => o.ID !== orderId);
    localStorage.setItem('ngulemin_local_orders', JSON.stringify(cmsData.orders));
    renderOrdersTable();
    renderOverview();
    showToast(`Pesanan ${orderId} telah dihapus.`);
  });
}

// 2. Home Form
function populateHomeForm() {
  const h = cmsData.home || {};
  setVal('edit-home-badge', h.badge || "UNDANGAN DIGITAL");
  setVal('edit-home-title', h.title || "Bagikan Momen Bahagia dengan Undangan Digital Elegan");
  setVal('edit-home-desc', h.description || "");
  setVal('edit-home-btn1-text', h.button1Text || "Lihat Tema");
  setVal('edit-home-btn1-link', h.button1Link || "#tema");
  setVal('edit-home-btn2-text', h.button2Text || "Pesan Sekarang");
  setVal('edit-home-btn2-link', h.button2Link || "#pesan");
  setVal('edit-home-image', h.heroImage || "/assets/images/hero_mockup.jpg");
}

async function saveHomeData() {
  const homeData = {
    badge: getVal('edit-home-badge'),
    title: getVal('edit-home-title'),
    description: getVal('edit-home-desc'),
    button1Text: getVal('edit-home-btn1-text'),
    button1Link: getVal('edit-home-btn1-link'),
    button2Text: getVal('edit-home-btn2-text'),
    button2Link: getVal('edit-home-btn2-link'),
    heroImage: getVal('edit-home-image')
  };

  cmsData.home = homeData;
  syncLocalAndRemote('updateHome', homeData, "Bagian Home berhasil disimpan!");
}

// 3. Themes CRUD
function renderThemesTable() {
  const tbody = document.getElementById('themes-table-body');
  if (!tbody) return;

  tbody.innerHTML = cmsData.themes.map((t, idx) => `
    <tr>
      <td><img src="${t.Gambar || '/assets/images/theme_rose.jpg'}" class="table-thumb" alt="${t.Nama}"></td>
      <td><strong>${t.Nama}</strong><br><small style="color:var(--muted-color);">${t.Deskripsi ? t.Deskripsi.substring(0, 50) + '...' : ''}</small></td>
      <td>${formatRupiah(t.Harga)}</td>
      <td><a href="${t.PreviewURL || '#'}" target="_blank" style="color: var(--primary-color); text-decoration: underline;">Buka Link</a></td>
      <td><span class="status-badge ${t.Status === 'Aktif' ? 'status-active' : 'status-inactive'}">${t.Status || 'Aktif'}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button onclick="editTheme(${idx})" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px;">Edit</button>
          <button onclick="deleteTheme('${t.ID}')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px; color:#DC2626; border-color:#DC2626;">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openThemeModal(isEdit = false) {
  const modal = document.getElementById('theme-modal');
  const title = document.getElementById('theme-modal-title');
  if (modal) {
    if (!isEdit) {
      document.getElementById('form-modal-theme').reset();
      document.getElementById('theme-form-id').value = '';
      if (title) title.textContent = "Tambah Tema Baru";
    }
    modal.classList.add('active');
  }
}

function closeThemeModal() {
  const modal = document.getElementById('theme-modal');
  if (modal) modal.classList.remove('active');
}

function editTheme(index) {
  const theme = cmsData.themes[index];
  if (!theme) return;

  document.getElementById('theme-form-id').value = theme.ID || '';
  document.getElementById('theme-form-nama').value = theme.Nama || '';
  document.getElementById('theme-form-gambar').value = theme.Gambar || '';
  document.getElementById('theme-form-harga').value = theme.Harga || 99000;
  document.getElementById('theme-form-status').value = theme.Status || 'Aktif';
  document.getElementById('theme-form-preview').value = theme.PreviewURL || '';
  document.getElementById('theme-form-desc').value = theme.Deskripsi || '';

  const title = document.getElementById('theme-modal-title');
  if (title) title.textContent = `Edit Tema: ${theme.Nama}`;

  openThemeModal(true);
}

function submitThemeForm() {
  const id = document.getElementById('theme-form-id').value;
  const itemData = {
    ID: id || `THM-${Date.now().toString().slice(-4)}`,
    Nama: document.getElementById('theme-form-nama').value.trim(),
    Gambar: document.getElementById('theme-form-gambar').value.trim(),
    Harga: Number(document.getElementById('theme-form-harga').value),
    Status: document.getElementById('theme-form-status').value,
    PreviewURL: document.getElementById('theme-form-preview').value.trim(),
    Deskripsi: document.getElementById('theme-form-desc').value.trim()
  };

  if (id) {
    // Update existing
    const idx = cmsData.themes.findIndex(t => t.ID === id);
    if (idx !== -1) cmsData.themes[idx] = itemData;
    syncLocalAndRemote('updateTheme', itemData, "Tema berhasil diperbarui!");
  } else {
    // Create new
    cmsData.themes.push(itemData);
    syncLocalAndRemote('createTheme', itemData, "Tema baru berhasil ditambahkan!");
  }

  closeThemeModal();
  renderThemesTable();
  renderOverview();
}

let pendingConfirmCallback = null;
function openConfirmModal(title, msg, onConfirm) {
  const modal = document.getElementById('confirm-modal');
  const titleEl = document.getElementById('confirm-modal-title');
  const msgEl = document.getElementById('confirm-modal-message');
  const yesBtn = document.getElementById('confirm-modal-yes-btn');
  if (!modal) return;
  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = msg;
  pendingConfirmCallback = onConfirm;
  if (yesBtn) {
    yesBtn.onclick = function() {
      if (pendingConfirmCallback) pendingConfirmCallback();
      closeConfirmModal();
    };
  }
  modal.classList.add('active');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.remove('active');
  pendingConfirmCallback = null;
}

function deleteTheme(themeId) {
  openConfirmModal("Hapus Tema", "Apakah Anda yakin ingin menghapus tema ini?", () => {
    cmsData.themes = cmsData.themes.filter(t => t.ID !== themeId);
    syncLocalAndRemote('deleteTheme', { id: themeId }, "Tema berhasil dihapus!");
    renderThemesTable();
    renderOverview();
  });
}

// 4. Pricing CRUD
function renderPricingTable() {
  const tbody = document.getElementById('pricing-table-body');
  if (!tbody) return;

  tbody.innerHTML = cmsData.pricing.map((p, idx) => `
    <tr>
      <td><strong>${p.Nama}</strong></td>
      <td>${formatRupiah(p.Harga)}</td>
      <td>${p.Label || '-'}</td>
      <td>${p.Featured === 'Ya' || p.Featured === true ? '<span class="status-badge" style="background:#FEF3C7; color:#92400E;">Featured</span>' : 'Tidak'}</td>
      <td><span class="status-badge ${p.Status === 'Aktif' ? 'status-active' : 'status-inactive'}">${p.Status || 'Aktif'}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button onclick="editPricing(${idx})" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px;">Edit</button>
          <button onclick="deletePricing('${p.ID}')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px; color:#DC2626; border-color:#DC2626;">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openPricingModal(isEdit = false) {
  const modal = document.getElementById('pricing-modal');
  const title = document.getElementById('pricing-modal-title');
  if (modal) {
    if (!isEdit) {
      document.getElementById('form-modal-pricing').reset();
      document.getElementById('pricing-form-id').value = '';
      if (title) title.textContent = "Tambah Paket Harga";
    }
    modal.classList.add('active');
  }
}

function closePricingModal() {
  const modal = document.getElementById('pricing-modal');
  if (modal) modal.classList.remove('active');
}

function editPricing(index) {
  const p = cmsData.pricing[index];
  if (!p) return;
  document.getElementById('pricing-form-id').value = p.ID || '';
  document.getElementById('pricing-form-nama').value = p.Nama || '';
  document.getElementById('pricing-form-harga').value = p.Harga || 199000;
  document.getElementById('pricing-form-label').value = p.Label || '';
  document.getElementById('pricing-form-status').value = p.Status || 'Aktif';
  document.getElementById('pricing-form-featured').checked = (p.Featured === 'Ya' || p.Featured === true);
  document.getElementById('pricing-form-fitur').value = Array.isArray(p.Fitur) ? p.Fitur.join('\n') : (p.Fitur || '');
  const title = document.getElementById('pricing-modal-title');
  if (title) title.textContent = `Edit Paket: ${p.Nama}`;
  openPricingModal(true);
}

function submitPricingForm() {
  const id = document.getElementById('pricing-form-id').value;
  const isEdit = Boolean(id);
  const pkgData = {
    ID: id || `PRC-${Date.now().toString().slice(-4)}`,
    Nama: document.getElementById('pricing-form-nama').value.trim(),
    Harga: Number(document.getElementById('pricing-form-harga').value),
    Label: document.getElementById('pricing-form-label').value.trim(),
    Status: document.getElementById('pricing-form-status').value,
    Featured: document.getElementById('pricing-form-featured').checked ? 'Ya' : 'Tidak',
    Fitur: document.getElementById('pricing-form-fitur').value.trim(),
    Urutan: cmsData.pricing.length + 1
  };

  if (isEdit) {
    const idx = cmsData.pricing.findIndex(p => p.ID === id);
    if (idx !== -1) cmsData.pricing[idx] = pkgData;
    syncLocalAndRemote('updatePricing', pkgData, "Paket harga berhasil diperbarui!");
  } else {
    cmsData.pricing.push(pkgData);
    syncLocalAndRemote('createPricing', pkgData, "Paket baru berhasil ditambahkan!");
  }

  closePricingModal();
  renderPricingTable();
  renderOverview();
}

function deletePricing(id) {
  openConfirmModal("Hapus Paket", "Apakah Anda yakin ingin menghapus paket harga ini?", () => {
    cmsData.pricing = cmsData.pricing.filter(p => p.ID !== id);
    syncLocalAndRemote('deletePricing', { id }, "Paket harga berhasil dihapus!");
    renderPricingTable();
    renderOverview();
  });
}

// 5. Features CRUD
function renderFeaturesTable() {
  const tbody = document.getElementById('features-table-body');
  if (!tbody) return;

  tbody.innerHTML = cmsData.features.map((f, idx) => `
    <tr>
      <td><span style="font-weight:600; color:var(--primary-color);">${f.Icon || 'Sparkles'}</span></td>
      <td><strong>${f.Judul}</strong></td>
      <td>${f.Deskripsi}</td>
      <td><span class="status-badge status-active">${f.Status || 'Aktif'}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button onclick="editFeature(${idx})" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px;">Edit</button>
          <button onclick="deleteFeature('${f.ID}')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px; color:#DC2626; border-color:#DC2626;">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openFeatureModal(isEdit = false) {
  const modal = document.getElementById('feature-modal');
  const title = document.getElementById('feature-modal-title');
  if (modal) {
    if (!isEdit) {
      document.getElementById('form-modal-feature').reset();
      document.getElementById('feature-form-id').value = '';
      if (title) title.textContent = "Tambah Fitur Baru";
    }
    modal.classList.add('active');
  }
}

function closeFeatureModal() {
  const modal = document.getElementById('feature-modal');
  if (modal) modal.classList.remove('active');
}

function editFeature(idx) {
  const f = cmsData.features[idx];
  if (!f) return;
  document.getElementById('feature-form-id').value = f.ID || '';
  document.getElementById('feature-form-judul').value = f.Judul || '';
  document.getElementById('feature-form-desc').value = f.Deskripsi || '';
  const title = document.getElementById('feature-modal-title');
  if (title) title.textContent = `Edit Fitur: ${f.Judul}`;
  openFeatureModal(true);
}

function submitFeatureForm() {
  const id = document.getElementById('feature-form-id').value;
  const isEdit = Boolean(id);
  const featData = {
    ID: id || `FEAT-${Date.now().toString().slice(-4)}`,
    Icon: 'Sparkles',
    Judul: document.getElementById('feature-form-judul').value.trim(),
    Deskripsi: document.getElementById('feature-form-desc').value.trim(),
    Status: 'Aktif',
    Urutan: cmsData.features.length + 1
  };

  if (isEdit) {
    const idx = cmsData.features.findIndex(f => f.ID === id);
    if (idx !== -1) cmsData.features[idx] = featData;
    syncLocalAndRemote('updateFeature', featData, "Fitur berhasil diperbarui!");
  } else {
    cmsData.features.push(featData);
    syncLocalAndRemote('createFeature', featData, "Fitur berhasil ditambahkan!");
  }

  closeFeatureModal();
  renderFeaturesTable();
  renderOverview();
}

function deleteFeature(id) {
  openConfirmModal("Hapus Fitur", "Apakah Anda yakin ingin menghapus fitur ini?", () => {
    cmsData.features = cmsData.features.filter(f => f.ID !== id);
    syncLocalAndRemote('deleteFeature', { id }, "Fitur berhasil dihapus!");
    renderFeaturesTable();
    renderOverview();
  });
}

// 6. Testimonials CRUD
function renderTestiTable() {
  const tbody = document.getElementById('testi-table-body');
  if (!tbody) return;

  tbody.innerHTML = cmsData.testimonials.map((t, idx) => `
    <tr>
      <td><strong>${t.Nama}</strong></td>
      <td>"${t.Testimoni ? t.Testimoni.substring(0, 60) + '...' : ''}"</td>
      <td>⭐ ${t.Rating || 5}/5</td>
      <td><span class="status-badge status-active">${t.Status || 'Aktif'}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button onclick="editTesti(${idx})" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px;">Edit</button>
          <button onclick="deleteTesti('${t.ID}')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px; color:#DC2626; border-color:#DC2626;">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openTestiModal(isEdit = false) {
  const modal = document.getElementById('testi-modal');
  const title = document.getElementById('testi-modal-title');
  if (modal) {
    if (!isEdit) {
      document.getElementById('form-modal-testi').reset();
      document.getElementById('testi-form-id').value = '';
      if (title) title.textContent = "Tambah Testimoni";
    }
    modal.classList.add('active');
  }
}

function closeTestiModal() {
  const modal = document.getElementById('testi-modal');
  if (modal) modal.classList.remove('active');
}

function editTesti(idx) {
  const t = cmsData.testimonials[idx];
  if (!t) return;
  document.getElementById('testi-form-id').value = t.ID || '';
  document.getElementById('testi-form-nama').value = t.Nama || '';
  document.getElementById('testi-form-desc').value = t.Testimoni || '';
  const title = document.getElementById('testi-modal-title');
  if (title) title.textContent = `Edit Testimoni: ${t.Nama}`;
  openTestiModal(true);
}

function submitTestiForm() {
  const id = document.getElementById('testi-form-id').value;
  const isEdit = Boolean(id);
  const testiData = {
    ID: id || `TESTI-${Date.now().toString().slice(-4)}`,
    Nama: document.getElementById('testi-form-nama').value.trim(),
    Testimoni: document.getElementById('testi-form-desc').value.trim(),
    Rating: 5,
    Foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    Status: "Aktif",
    Urutan: cmsData.testimonials.length + 1
  };

  if (isEdit) {
    const idx = cmsData.testimonials.findIndex(t => t.ID === id);
    if (idx !== -1) cmsData.testimonials[idx] = testiData;
    syncLocalAndRemote('updateTestimonial', testiData, "Testimoni berhasil diperbarui!");
  } else {
    cmsData.testimonials.push(testiData);
    syncLocalAndRemote('createTestimonial', testiData, "Testimoni baru berhasil ditambahkan!");
  }

  closeTestiModal();
  renderTestiTable();
  renderOverview();
}

function deleteTesti(id) {
  openConfirmModal("Hapus Testimoni", "Apakah Anda yakin ingin menghapus testimoni ini?", () => {
    cmsData.testimonials = cmsData.testimonials.filter(t => t.ID !== id);
    syncLocalAndRemote('deleteTestimonial', { id }, "Testimoni berhasil dihapus!");
    renderTestiTable();
    renderOverview();
  });
}

// 7. How To Order CRUD
function renderHowtoTable() {
  const tbody = document.getElementById('howto-table-body');
  if (!tbody) return;

  tbody.innerHTML = cmsData.howToOrder.map(h => `
    <tr>
      <td><strong>${h.Nomor}</strong></td>
      <td>${h.Judul}</td>
      <td>${h.Deskripsi}</td>
      <td>
        <button onclick="editHowto('${h.Nomor}')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px;">Edit</button>
      </td>
    </tr>
  `).join('');
}

function openHowModal() {
  const nextNum = "0" + (cmsData.howToOrder.length + 1);
  const newHow = {
    Nomor: nextNum,
    Judul: "Langkah Baru",
    Deskripsi: "Deskripsi panduan pemesanan undangan digital.",
    Icon: "Send",
    Status: "Aktif"
  };
  cmsData.howToOrder.push(newHow);
  syncLocalAndRemote('createHowToOrder', newHow, "Langkah pemesanan ditambahkan!");
  renderHowtoTable();
}

function editHowto(nomor) {
  const item = cmsData.howToOrder.find(h => h.Nomor === nomor);
  if (!item) return;
  // Simple prompt-free cycle or notification
  item.Judul = item.Judul.includes('(Updated)') ? item.Judul.replace(' (Updated)', '') : item.Judul + ' (Updated)';
  syncLocalAndRemote('updateHowToOrder', item, `Langkah ${nomor} berhasil diperbarui!`);
  renderHowtoTable();
}

// 8. FAQ CRUD
function renderFaqTable() {
  const tbody = document.getElementById('faq-table-body');
  if (!tbody) return;

  tbody.innerHTML = cmsData.faq.map((f, idx) => `
    <tr>
      <td><strong>${f.Pertanyaan}</strong></td>
      <td>${f.Jawaban}</td>
      <td>
        <div style="display:flex; gap:6px;">
          <button onclick="editFaq(${idx})" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px;">Edit</button>
          <button onclick="deleteFaq('${f.ID}')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:11px; color:#DC2626; border-color:#DC2626;">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openFaqModal(isEdit = false) {
  const modal = document.getElementById('faq-modal');
  const title = document.getElementById('faq-modal-title');
  if (modal) {
    if (!isEdit) {
      document.getElementById('form-modal-faq').reset();
      document.getElementById('faq-form-id').value = '';
      if (title) title.textContent = "Tambah FAQ";
    }
    modal.classList.add('active');
  }
}

function closeFaqModal() {
  const modal = document.getElementById('faq-modal');
  if (modal) modal.classList.remove('active');
}

function editFaq(idx) {
  const f = cmsData.faq[idx];
  if (!f) return;
  document.getElementById('faq-form-id').value = f.ID || '';
  document.getElementById('faq-form-tanya').value = f.Pertanyaan || '';
  document.getElementById('faq-form-jawab').value = f.Jawaban || '';
  const title = document.getElementById('faq-modal-title');
  if (title) title.textContent = "Edit FAQ";
  openFaqModal(true);
}

function submitFaqForm() {
  const id = document.getElementById('faq-form-id').value;
  const isEdit = Boolean(id);
  const faqData = {
    ID: id || `FAQ-${Date.now().toString().slice(-4)}`,
    Pertanyaan: document.getElementById('faq-form-tanya').value.trim(),
    Jawaban: document.getElementById('faq-form-jawab').value.trim(),
    Status: "Aktif",
    Urutan: cmsData.faq.length + 1
  };

  if (isEdit) {
    const idx = cmsData.faq.findIndex(f => f.ID === id);
    if (idx !== -1) cmsData.faq[idx] = faqData;
    syncLocalAndRemote('updateFAQ', faqData, "FAQ berhasil diperbarui!");
  } else {
    cmsData.faq.push(faqData);
    syncLocalAndRemote('createFAQ', faqData, "FAQ baru berhasil ditambahkan!");
  }

  closeFaqModal();
  renderFaqTable();
  renderOverview();
}

function deleteFaq(id) {
  openConfirmModal("Hapus FAQ", "Apakah Anda yakin ingin menghapus pertanyaan FAQ ini?", () => {
    cmsData.faq = cmsData.faq.filter(f => f.ID !== id);
    syncLocalAndRemote('deleteFAQ', { id }, "FAQ berhasil dihapus!");
    renderFaqTable();
    renderOverview();
  });
}

// 9. Footer Form
function populateFooterForm() {
  const s = cmsData.settings || {};
  setVal('edit-footer-desc', s.footerDescription || "");
  setVal('edit-footer-wa', s.whatsappAdmin || "6281234567890");
  setVal('edit-footer-ig', s.instagramAdmin || "ngulemin.id");
  setVal('edit-footer-mail', s.emailAdmin || "halo@ngulemin.id");
  setVal('edit-footer-copy', s.copyrightText || "© 2026 NGULEMIN. All Rights Reserved.");
}

function saveFooterData() {
  const footerData = {
    footerDescription: getVal('edit-footer-desc'),
    whatsappAdmin: getVal('edit-footer-wa'),
    instagramAdmin: getVal('edit-footer-ig'),
    emailAdmin: getVal('edit-footer-mail'),
    copyrightText: getVal('edit-footer-copy')
  };

  cmsData.settings = { ...cmsData.settings, ...footerData };
  syncLocalAndRemote('updateSettings', footerData, "Data Footer berhasil disimpan!");
}

// 10. Settings Form
function populateSettingsForm() {
  const s = cmsData.settings || {};
  setVal('edit-setting-api-url', getApiUrl());
  setVal('edit-setting-name', s.siteName || "NGULEMIN");
  setVal('edit-setting-tagline', s.tagline || "Undangan Digital Elegan untuk Momen Istimewa");
  setVal('edit-setting-color-primary', s.primaryColor || "#8C6D46");
  setVal('edit-setting-color-secondary', s.secondaryColor || "#B59A74");
  setVal('edit-setting-meta-title', s.metaTitle || "NGULEMIN — Undangan Digital Elegan");
  setVal('edit-setting-meta-desc', s.metaDescription || "Undangan digital pernikahan elegan dan modern.");
}

function saveSettingsData() {
  const newApiUrl = getVal('edit-setting-api-url').trim();
  localStorage.setItem('ngulemin_api_url', newApiUrl);

  const newSettings = {
    siteName: getVal('edit-setting-name'),
    tagline: getVal('edit-setting-tagline'),
    primaryColor: getVal('edit-setting-color-primary'),
    secondaryColor: getVal('edit-setting-color-secondary'),
    metaTitle: getVal('edit-setting-meta-title'),
    metaDescription: getVal('edit-setting-meta-desc')
  };

  cmsData.settings = { ...cmsData.settings, ...newSettings };
  syncLocalAndRemote('updateSettings', newSettings, "Pengaturan & API URL berhasil disimpan!");
}

// Ganti Password Admin
async function handleChangePassword() {
  const oldPass = getVal('pass-old');
  const newPass = getVal('pass-new');
  const apiUrl = getApiUrl();

  if (apiUrl && apiUrl.startsWith('http')) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'changePassword',
          token: adminToken,
          oldPassword: oldPass,
          newPassword: newPass
        })
      });
      const result = await res.json();
      if (result.success) {
        showToast("Password admin berhasil diperbarui di Google Spreadsheet!");
        document.getElementById('form-change-pass').reset();
      } else {
        alert(result.message || "Gagal mengubah password.");
      }
    } catch (e) {
      alert("Gagal koneksi ke Apps Script: " + e.message);
    }
  } else {
    // Mode demo lokal
    const storedPass = localStorage.getItem('ngulemin_local_admin_pass') || 'admin123';
    if (oldPass !== storedPass) {
      alert("Password lama salah!");
      return;
    }
    localStorage.setItem('ngulemin_local_admin_pass', newPass);
    showToast("Password lokal berhasil diperbarui!");
    document.getElementById('form-change-pass').reset();
  }
}

// ==========================================
// SINKRONISASI DATA (Lokal & Remote Google Apps Script)
// ==========================================

async function syncLocalAndRemote(actionName, payloadData, successMessage) {
  // 1. Simpan segera ke LocalStorage agar langsung live di website
  localStorage.setItem('ngulemin_site_data', JSON.stringify(cmsData));
  showToast(successMessage);

  const lastUpdatedEl = document.getElementById('last-updated-text');
  if (lastUpdatedEl) {
    const timeStr = new Date().toLocaleTimeString('id-ID');
    lastUpdatedEl.textContent = `Data terakhir diperbarui: Pukul ${timeStr}`;
  }

  // 2. Kirim update ke Google Apps Script backend jika online
  const apiUrl = getApiUrl();
  if (apiUrl && apiUrl.startsWith('http')) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: actionName,
          token: adminToken,
          data: payloadData,
          id: payloadData.id || payloadData.ID
        })
      });
      const result = await res.json();
      if (!result.success) {
        console.warn("Peringatan dari Apps Script:", result.message);
      }
    } catch (err) {
      console.warn("Gagal mengirim sync ke Google Apps Script (tersimpan di lokal):", err);
    }
  }
}

// ==========================================
// PANDUAN CODE.GS & UTILITY
// ==========================================

async function loadCodeGsGuide() {
  const codeEl = document.getElementById('code-gs-text');
  if (!codeEl) return;

  try {
    const res = await fetch('/Code.gs');
    const text = await res.text();
    codeEl.value = text;
  } catch (e) {
    codeEl.value = "// Buka file Code.gs di root folder project untuk menyalin seluruh source code Google Apps Script.";
  }
}

function copyCodeGs() {
  const codeEl = document.getElementById('code-gs-text');
  if (codeEl) {
    codeEl.select();
    navigator.clipboard.writeText(codeEl.value).then(() => {
      showToast("Seluruh isi Code.gs berhasil disalin ke clipboard!");
    });
  }
}

function handleLogout() {
  openConfirmModal("Konfirmasi Logout", "Apakah Anda yakin ingin keluar dari Dashboard?", () => {
    const apiUrl = getApiUrl();
    if (apiUrl && apiUrl.startsWith('http')) {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'logout', token: adminToken })
      }).catch(() => {});
    }

    localStorage.removeItem('ngulemin_admin_token');
    localStorage.removeItem('ngulemin_admin_user');
    window.location.href = 'login.html';
  });
}

// Helpers
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
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

// Expose fungsi ke window
window.switchTab = switchTab;
window.saveHomeData = saveHomeData;
window.saveFooterData = saveFooterData;
window.saveSettingsData = saveSettingsData;
window.handleChangePassword = handleChangePassword;
window.openThemeModal = openThemeModal;
window.closeThemeModal = closeThemeModal;
window.editTheme = editTheme;
window.deleteTheme = deleteTheme;
window.submitThemeForm = submitThemeForm;
window.openPricingModal = openPricingModal;
window.deletePricing = deletePricing;
window.openFeatureModal = openFeatureModal;
window.deleteFeature = deleteFeature;
window.openTestiModal = openTestiModal;
window.deleteTesti = deleteTesti;
window.openHowModal = openHowModal;
window.editHowto = editHowto;
window.openFaqModal = openFaqModal;
window.deleteFaq = deleteFaq;
window.deleteOrder = deleteOrder;
window.copyCodeGs = copyCodeGs;
window.handleLogout = handleLogout;
