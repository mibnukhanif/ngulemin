import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Smartphone,
  CheckSquare,
  Clock,
  Camera,
  MapPin,
  Music,
  Heart,
  CreditCard,
  MessageSquare,
  Share2,
  Users,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  Palette,
  FileText,
  Settings,
  HelpCircle,
  Home as HomeIcon,
  Package,
  Layers,
  ArrowRight,
  EyeOff,
  Lock,
  User,
  Tag,
  Image as ImageIcon,
  Key,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Image Assets
import heroMockup from './assets/images/hero_wedding_mockup_1790268938457.jpg';
import themeRose from './assets/images/theme_rose_luxury_1790268952948.jpg';
import themeGold from './assets/images/theme_javanese_gold_1790268966316.jpg';
import themeSage from './assets/images/theme_minimalist_sage_1790268978210.jpg';

// Initial Data Structure
const INITIAL_DATA = {
  settings: {
    siteName: "NGULEMIN",
    tagline: "Undangan Digital Elegan untuk Momen Istimewa",
    logoUrl: "",
    adminUsername: "admin",
    adminPassword: "admin123",
    whatsappAdmin: "6281234567890",
    emailAdmin: "halo@ngulemin.id",
    instagramAdmin: "ngulemin.id",
    footerDescription: "NGULEMIN adalah layanan undangan digital untuk membantu Anda membagikan momen bahagia dengan cara yang elegan, praktis, dan modern.",
    copyrightText: "© 2026 NGULEMIN. All Rights Reserved.",
    primaryColor: "#8C6D46",
    secondaryColor: "#B59A74",
    accentColor: "#D4AF37",
    metaTitle: "NGULEMIN — Undangan Digital Elegan untuk Momen Istimewa",
    metaDescription: "Buat undangan pernikahan digital modern, responsive, dan eksklusif dengan fitur lengkap RSVP, Maps, Musik & Amplop Digital.",
    apiUrl: ((import.meta as any).env?.VITE_API_URL as string) || ""
  },
  categories: [
    "Floral & Romantic",
    "Adat & Traditional",
    "Minimalist Modern",
    "Luxury Gold"
  ],
  home: {
    badge: "UNDANGAN DIGITAL",
    title: "Bagikan Momen Bahagia dengan Undangan Digital Elegan",
    description: "NGULEMIN membantu Anda membuat undangan digital yang modern, elegan, mudah dibagikan, dan siap digunakan untuk momen istimewa pernikahan Anda.",
    button1Text: "Lihat Tema",
    button1Link: "#tema",
    button2Text: "Pesan Sekarang",
    button2Link: "#pesan",
    heroImage: heroMockup
  },
  themes: [
    {
      ID: "THM-01",
      Nama: "Elegant Rose",
      Gambar: themeRose,
      Deskripsi: "Nuansa romantis bernuansa soft rose gold dengan aksen floral watercolor yang mewah dan memikat.",
      Harga: 99000,
      PreviewURL: "https://ngulemin.id/preview/elegant-rose",
      Category: "Floral & Romantic",
      Status: "Aktif",
      Urutan: 1
    },
    {
      ID: "THM-02",
      Nama: "Royal Heritage",
      Gambar: themeGold,
      Deskripsi: "Perpaduan klasik adat nusantara dengan sentuhan ornamen batik emas modern berkelas tinggi.",
      Harga: 129000,
      PreviewURL: "https://ngulemin.id/preview/royal-heritage",
      Category: "Adat & Traditional",
      Status: "Aktif",
      Urutan: 2
    },
    {
      ID: "THM-03",
      Nama: "Pure Botanical",
      Gambar: themeSage,
      Deskripsi: "Konsep minimalis kontemporer dengan daun eucalyptus segar, tipografi serif modern, dan monogram emas.",
      Harga: 99000,
      PreviewURL: "https://ngulemin.id/preview/pure-botanical",
      Category: "Minimalist Modern",
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
      Fitur: [
        "Pilihan Tema Standar",
        "Aktif 3 Bulan",
        "RSVP & Konfirmasi Tamu",
        "Navigasi Google Maps",
        "Background Musik Pilihan",
        "Galeri Foto (5 Foto)",
        "Amplop Digital & Rekening"
      ],
      Label: "Hemat",
      Featured: false,
      Status: "Aktif",
      Urutan: 1
    },
    {
      ID: "PRC-02",
      Nama: "STANDARD",
      Harga: 149000,
      Deskripsi: "Paket terpopuler untuk calon mempelai yang menginginkan fitur lebih leluasa.",
      Fitur: [
        "Semua Fitur Basic",
        "Aktif 6 Bulan",
        "Galeri Foto (12 Foto) & Video",
        "Countdown Timer Interaktif",
        "Fitur Cerita Cinta (Love Story)",
        "Ucapan & Doa Real-time",
        "Custom Nama Tamu Tanpa Batas",
        "Filter Musik Lengkap"
      ],
      Label: "Terpopuler",
      Featured: true,
      Status: "Aktif",
      Urutan: 2
    },
    {
      ID: "PRC-03",
      Nama: "PREMIUM",
      Harga: 199000,
      Deskripsi: "Pengalaman undangan digital termewah tanpa batasan dengan domain kustom.",
      Fitur: [
        "Semua Fitur Standard",
        "Aktif Selamanya",
        "Foto Galeri Tanpa Batas",
        "QR Code Check-in Tamu",
        "Integrasi Siaran Langsung (Live)",
        "Kirim Pengingat WhatsApp Otomatis",
        "Revisi Desain Prioritas VIP",
        "Bebas Request Musik & Font Sendiri"
      ],
      Label: "Eksklusif",
      Featured: false,
      Status: "Aktif",
      Urutan: 3
    }
  ],
  features: [
    { id: "1", icon: "Sparkles", title: "Desain Elegan", desc: "Visual eksklusif dengan tipografi berkelas yang menonjolkan keanggunan pernikahan Anda.", status: "Aktif" },
    { id: "2", icon: "Smartphone", title: "Responsive Mobile", desc: "Tampilan sempurna dan sangat nyaman diakses di smartphone, tablet, maupun desktop.", status: "Aktif" },
    { id: "3", icon: "CheckSquare", title: "RSVP & Buku Tamu", desc: "Ketahui kepastian kehadiran tamu undangan Anda secara rapi dan otomatis.", status: "Aktif" },
    { id: "4", icon: "Clock", title: "Countdown Timer", desc: "Hitung mundur menuju hari bahagia pernikahan Anda secara presisi dan interaktif.", status: "Aktif" },
    { id: "5", icon: "Camera", title: "Galeri Foto & Video", desc: "Abadikan momen prewedding terindah dalam galeri interaktif dengan lightbox jernih.", status: "Aktif" },
    { id: "6", icon: "MapPin", title: "Google Maps Navigasi", desc: "Pandu tamu undangan menuju lokasi resepsi dengan satu ketukan tombol rute.", status: "Aktif" },
    { id: "7", icon: "Music", title: "Musik Romantis", desc: "Alunan melodi romantis pilihan untuk mengiringi tamu saat membaca undangan.", status: "Aktif" },
    { id: "8", icon: "Heart", title: "Love Story", desc: "Ceritakan perjalanan cinta Anda dan pasangan menuju jenjang pernikahan suci.", status: "Aktif" },
    { id: "9", icon: "CreditCard", title: "Amplop Digital", desc: "Kemudahan bagi tamu untuk memberikan kado via transfer bank dan scan QRIS.", status: "Aktif" },
    { id: "10", icon: "MessageSquare", title: "Ucapan & Doa", desc: "Wadah bagi keluarga dan kerabat untuk menyampaikan doa restu hangat.", status: "Aktif" },
    { id: "11", icon: "Share2", title: "Share WhatsApp", desc: "Bagikan undangan ke WhatsApp kerabat secara mudah dengan teks personal.", status: "Aktif" },
    { id: "12", icon: "Users", title: "Custom Nama Tamu", desc: "Sebut nama setiap tamu secara personal di sampul undangan digital Anda.", status: "Aktif" }
  ],
  testimonials: [
    {
      id: "1",
      name: "Dimas & Sarah",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      testi: "Pelayanan NGULEMIN cepat banget dan hasilnya sangat elegan. Para tamu banyak yang memuji undangannya karena lagunya bagus dan lancar dibuka di HP!",
      rating: 5,
      location: "Jakarta Selatan",
      status: "Aktif"
    },
    {
      id: "2",
      name: "Rizky & Amanda",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      testi: "Fitur amplop digital dan RSVP-nya ngebantu banget dalam pendataan katering. Desain temanya bener-bener berkelas dan nggak pasaran!",
      rating: 5,
      location: "Surabaya",
      status: "Aktif"
    },
    {
      id: "3",
      name: "Budi & Novita",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      testi: "Sangat puas dengan paket Premium! Admin sangat ramah membimbing dari pengisian data sampai revisi selesai dalam hitungan jam.",
      rating: 5,
      location: "Bandung",
      status: "Aktif"
    }
  ],
  howToOrder: [
    { num: "01", title: "Pilih Tema", desc: "Telusuri katalog tema elegan kami dan pilih desain yang paling mencerminkan impian pernikahan Anda." },
    { num: "02", title: "Isi Formulir", desc: "Lengkapi detail nama mempelai, tanggal akad/resepsi, lokasi acara, dan cerita cinta melalui form." },
    { num: "03", title: "Lakukan Pembayaran", desc: "Konfirmasi ke WhatsApp admin dan selesaikan pembayaran dengan metode pilihan Anda." },
    { num: "04", title: "Undangan Siap Dibagikan", desc: "Undangan diproses cepat dalam 1-24 jam dan siap disebarkan ke keluarga tercinta via WhatsApp." }
  ],
  faq: [
    {
      id: "1",
      question: "Apa itu undangan digital NGULEMIN?",
      answer: "Undangan digital NGULEMIN adalah website undangan pernikahan interaktif modern yang dapat diakses dengan mudah melalui tautan browser di semua perangkat (smartphone, tablet, PC)."
    },
    {
      id: "2",
      question: "Berapa lama proses pembuatannya?",
      answer: "Proses pengerjaan normal berkisar antara 1 hingga 24 jam setelah data pernikahan dan konfirmasi pembayaran kami terima secara lengkap."
    },
    {
      id: "3",
      question: "Apakah saya bisa melakukan revisi?",
      answer: "Tentu saja! Kami memberikan garansi revisi teks, tanggal, lokasi, hingga foto prewedding sebelum undangan disebarkan."
    },
    {
      id: "4",
      question: "Apakah bisa request musik dan font khusus?",
      answer: "Bisa, terutama pada paket Standard dan Premium. Anda dapat memilih lagu favorit atau mengirimkan judul audio yang diinginkan."
    },
    {
      id: "5",
      question: "Bagaimana cara membagikannya ke WhatsApp?",
      answer: "Kami menyediakan template teks WhatsApp otomatis beserta generator nama tamu undangan perorangan agar Anda cukup klik 'Kirim'."
    },
    {
      id: "6",
      question: "Berapa lama masa aktif undangan?",
      answer: "Masa aktif sesuai paket pilihan: Basic (3 bulan), Standard (6 bulan), dan Premium aktif selamanya tanpa batas."
    }
  ],
  orders: [
    {
      id: "ORD-202609-001",
      date: "2026-09-24 10:15",
      customerName: "Aditya Pratama",
      whatsapp: "081298765432",
      theme: "Elegant Rose",
      groom: "Aditya Pratama",
      bride: "Dian Sastrowardoyo",
      weddingDate: "2026-12-20",
      location: "Hotel Mulia, Senayan Jakarta",
      package: "PREMIUM",
      notes: "Tolong tambahkan lagu A Thousand Years dan doa adat Jawa",
      status: "Diproses"
    }
  ]
};

// Rupiah Formatter
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num || 0);
};
const getConfiguredApiUrl = () => {
  return (
    ((import.meta as any).env?.VITE_API_URL as string) ||
    ((window as any).CONFIG?.API_URL as string) ||
    ""
  ).trim();
};

const cleanApiUrlValue = (value: any) => {
  const text = (value || "").toString().trim();

  const markdownMatch = text.match(/^\[.*\]\((.*)\)$/);

  return markdownMatch ? markdownMatch[1] : text;
};

const normalizeApiData = (apiData: any, currentData: any) => {
  const currentThemes = currentData.themes || [];
  const currentTestimonials = currentData.testimonials || [];

  const themeMap: Record<string, any> = {};
  currentThemes.forEach((theme: any) => {
    themeMap[theme.ID] = theme;
  });

  const testiMap: Record<string, any> = {};
  currentTestimonials.forEach((testi: any) => {
    testiMap[testi.id] = testi;
  });

  return {
    ...currentData,

    settings: {
      ...currentData.settings,
      ...(apiData.settings || {}),
      apiUrl: (
        apiData.settings?.apiUrl ||
        currentData.settings?.apiUrl ||
        getConfiguredApiUrl()
      ).toString().trim()
    },

    home: {
      ...currentData.home,
      ...(apiData.home || {})
    },

    themes: Array.isArray(apiData.themes)
      ? apiData.themes.map((theme: any) => {
          const old = themeMap[theme.ID] || {};

          return {
            ...old,
            ...theme,
            PreviewURL: cleanApiUrlValue(
              theme.PreviewURL || old.PreviewURL
            ),
            Category:
              theme.Category ||
              old.Category ||
              ""
          };
        })
      : currentData.themes,

    pricing: Array.isArray(apiData.pricing)
      ? apiData.pricing
      : currentData.pricing,

    features: Array.isArray(apiData.features)
      ? apiData.features.map((feature: any) => ({
          id: feature.ID ?? feature.id ?? "",
          icon: feature.Icon ?? feature.icon ?? "Sparkles",
          title: feature.Judul ?? feature.title ?? "",
          desc: feature.Deskripsi ?? feature.desc ?? "",
          status: feature.Status ?? feature.status ?? "Aktif"
        }))
      : currentData.features,

    testimonials: Array.isArray(apiData.testimonials)
      ? apiData.testimonials.map((testi: any) => {
          const id = testi.ID ?? testi.id ?? "";
          const old = testiMap[id] || {};

          return {
            ...old,
            id,
            name: testi.Nama ?? testi.name ?? "",
            photo: testi.Foto ?? testi.photo ?? "",
            testi: testi.Testimoni ?? testi.testi ?? "",
            rating: Number(testi.Rating ?? testi.rating ?? 5),
            location:
              testi.Lokasi ??
              testi.location ??
              old.location ??
              "Indonesia",
            status: testi.Status ?? testi.status ?? "Aktif"
          };
        })
      : currentData.testimonials,

    howToOrder: Array.isArray(apiData.howToOrder)
      ? apiData.howToOrder.map((step: any) => ({
          num: step.Nomor ?? step.num ?? "",
          title: step.Judul ?? step.title ?? "",
          desc: step.Deskripsi ?? step.desc ?? "",
          icon: step.Icon ?? step.icon ?? "FileText",
          status: step.Status ?? step.status ?? "Aktif"
        }))
      : currentData.howToOrder,

    faq: Array.isArray(apiData.faq)
      ? apiData.faq.map((item: any) => ({
          id: item.ID ?? item.id ?? "",
          question: item.Pertanyaan ?? item.question ?? "",
          answer: item.Jawaban ?? item.answer ?? "",
          status: item.Status ?? item.status ?? "Aktif"
        }))
      : currentData.faq
  };
};
export default function App() {
  // Navigation View State: 'public' | 'login' | 'dashboard' | 'guide'
  const [currentView, setCurrentView] = useState<'public' | 'login' | 'dashboard' | 'guide'>('public');
  
  // Mobile Nav Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Data (Loaded from LocalStorage or Default)
  const [data, setData] = useState(() => {
    const envApi =
  ((import.meta as any).env?.VITE_API_URL as string) ||
  ((window as any).CONFIG?.API_URL as string) ||
  "";
    const saved = localStorage.getItem('ngulemin_site_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if ((!parsed.settings?.apiUrl || parsed.settings.apiUrl.trim() === '') && envApi) {
          if (!parsed.settings) parsed.settings = { ...INITIAL_DATA.settings };
          parsed.settings.apiUrl = envApi;
        }
        return parsed;
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  // Auth State
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('ngulemin_admin_token'));
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Order Modal State
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    nama: '',
    whatsapp: '',
    tema: 'Elegant Rose',
    mempelaiPria: '',
    mempelaiWanita: '',
    tanggalNikah: '',
    lokasi: '',
    paket: 'STANDARD',
    catatan: ''
  });
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState(false);
  const [lastGeneratedWaUrl, setLastGeneratedWaUrl] = useState('');

  // Category Sort & Form State
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [newCategoryInput, setNewCategoryInput] = useState<string>('');
  const [showAdminPassword, setShowAdminPassword] = useState<boolean>(false);

  // Admin Dashboard Sidebar State
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // CRUD Modals State (eliminates browser prompt/confirm restrictions)
  const [themeModal, setThemeModal] = useState<{
    open: boolean;
    isEdit: boolean;
    data: {
      ID: string;
      Nama: string;
      Gambar: string;
      Deskripsi: string;
      Harga: number;
      PreviewURL: string;
      Category: string;
      Status: string;
    };
  }>({
    open: false,
    isEdit: false,
    data: { ID: '', Nama: '', Gambar: themeRose, Deskripsi: '', Harga: 99000, PreviewURL: 'https://ngulemin.id/preview/demo', Category: 'Baru', Status: 'Aktif' }
  });

  const [pricingModal, setPricingModal] = useState<{
    open: boolean;
    isEdit: boolean;
    data: {
      ID: string;
      Nama: string;
      Harga: number;
      Deskripsi: string;
      FiturText: string;
      Label: string;
      Featured: boolean;
      Status: string;
    };
  }>({
    open: false,
    isEdit: false,
    data: { ID: '', Nama: '', Harga: 149000, Deskripsi: '', FiturText: 'Aktif 6 Bulan\nRSVP & Buku Tamu\nNavigasi Google Maps\nMusik Romantis\nAmplop Digital', Label: 'Pilihan', Featured: false, Status: 'Aktif' }
  });

  const [featureModal, setFeatureModal] = useState<{
    open: boolean;
    isEdit: boolean;
    data: { id: string; icon: string; title: string; desc: string; status: string };
  }>({
    open: false,
    isEdit: false,
    data: { id: '', icon: 'Sparkles', title: '', desc: '', status: 'Aktif' }
  });

  const [testiModal, setTestiModal] = useState<{
    open: boolean;
    isEdit: boolean;
    data: { id: string; name: string; photo: string; testi: string; rating: number; location: string; status: string };
  }>({
    open: false,
    isEdit: false,
    data: { id: '', name: '', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', testi: '', rating: 5, location: 'Indonesia', status: 'Aktif' }
  });

  const [faqModal, setFaqModal] = useState<{
    open: boolean;
    isEdit: boolean;
    data: { id: string; question: string; answer: string };
  }>({
    open: false,
    isEdit: false,
    data: { id: '', question: '', answer: '' }
  });

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const openDeleteConfirm = (title: string, message: string, onConfirm: () => void) => {
    setDeleteModal({
      open: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setDeleteModal(prev => ({ ...prev, open: false }));
      }
    });
  };

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dashboard Active Tab
  const [dashTab, setDashTab] = useState<'overview' | 'orders' | 'home' | 'themes' | 'pricing' | 'features' | 'testimonials' | 'howto' | 'faq' | 'footer' | 'settings'>('overview');

  // Copy Status
  const [codeCopied, setCodeCopied] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ngulemin_site_data', JSON.stringify(data));
  }, [data]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };
  const callApi = async (
  action: string,
  payload: Record<string, any> = {},
  requireAuth: boolean = true
) => {
  const apiUrl = (
    data.settings.apiUrl ||
    getConfiguredApiUrl()
  ).trim();

  if (!apiUrl) {
    throw new Error(
      "URL Google Apps Script belum dikonfigurasi."
    );
  }

  if (requireAuth && !adminToken) {
    throw new Error(
      "Sesi admin tidak tersedia. Silakan login kembali."
    );
  }

  const body: Record<string, any> = {
    action,
    ...payload
  };

  if (requireAuth) {
    body.token = adminToken;
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Operasi API gagal."
    );
  }

  return result;
};

const deleteEntity = (
  action: string,
  id: string,
  onSuccess: () => void,
  successMessage: string
) => {
  void (async () => {
    try {
      await callApi(action, { id });
      onSuccess();
      triggerToast(successMessage);
    } catch (error: any) {
      console.error(action, error);
      triggerToast(
        error.message || "Gagal menghapus data."
      );
    }
  })();
};

useEffect(() => {
  let cancelled = false;

  const loadBackendData = async () => {
    const apiUrl = getConfiguredApiUrl();

    if (!apiUrl) return;

    try {
      const response = await fetch(
        `${apiUrl}?action=getAllData`
      );

      const result = await response.json();

      if (
        !cancelled &&
        result.success &&
        result.data
      ) {
        setData((prev: typeof INITIAL_DATA) =>
          normalizeApiData(result.data, prev)
        );
      }
    } catch (error) {
      console.warn(
        "Gagal memuat data Google Spreadsheet:",
        error
      );
    }
  };

  loadBackendData();

  return () => {
    cancelled = true;
  };
}, []);

useEffect(() => {
  if (!adminToken) return;

  let cancelled = false;

  const loadOrders = async () => {
    try {
      const result = await callApi(
        "getOrders",
        {},
        true
      );

      if (!cancelled && result.success) {
        const orders = Array.isArray(result.data)
          ? result.data.map((ord: any) => ({
              id: ord.ID ?? ord.id ?? "",
              date: ord.Tanggal ?? ord.date ?? "",
              customerName:
                ord.Nama ??
                ord.customerName ??
                "",
              whatsapp:
                ord.WhatsApp ??
                ord.whatsapp ??
                "",
              theme:
                ord.Tema ??
                ord.theme ??
                "",
              groom:
                ord.MempelaiPria ??
                ord.groom ??
                "",
              bride:
                ord.MempelaiWanita ??
                ord.bride ??
                "",
              weddingDate:
                ord.TanggalNikah ??
                ord.weddingDate ??
                "",
              location:
                ord.Lokasi ??
                ord.location ??
                "",
              package:
                ord.Paket ??
                ord.package ??
                "",
              notes:
                ord.Catatan ??
                ord.notes ??
                "",
              status:
                ord.Status ??
                ord.status ??
                "Baru"
            }))
          : [];

        setData((prev: typeof INITIAL_DATA) => ({
          ...prev,
          orders
        }));
      }
    } catch (error) {
      console.warn(
        "Gagal memuat Orders dari Spreadsheet:",
        error
      );
    }
  };

  loadOrders();

  return () => {
    cancelled = true;
  };
}, [adminToken]);

const updateOrderStatus = (
  orderId: string,
  newStatus: string
) => {
  void (async () => {
    try {
      await callApi("updateOrderStatus", {
        id: orderId,
        status: newStatus
      });

      setData((prev: typeof INITIAL_DATA) => ({
        ...prev,
        orders: prev.orders.map((order: any) =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      }));

      triggerToast(
        `Status pesanan ${orderId} diubah ke ${newStatus}`
      );
    } catch (error: any) {
      console.error(
        "Update Order Status Error:",
        error
      );

      triggerToast(
        error.message ||
        "Gagal memperbarui status pesanan."
      );
    }
  })();
};

const savePricing = async () => {
  const d = pricingModal.data;

  if (!d.Nama.trim()) {
    triggerToast("Nama paket tidak boleh kosong");
    return;
  }

  const finalPkg = {
    ID: d.ID,
    Nama: d.Nama,
    Harga: Number(d.Harga),
    Deskripsi: d.Deskripsi,
    Fitur: d.FiturText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    Label: d.Label,
    Featured: d.Featured,
    Status: d.Status,
    Urutan: 1
  };

  try {
    await callApi(
      pricingModal.isEdit
        ? "updatePricing"
        : "createPricing",
      { data: finalPkg }
    );

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      pricing: pricingModal.isEdit
        ? prev.pricing.map((item: any) =>
            item.ID === d.ID ? finalPkg : item
          )
        : [...prev.pricing, finalPkg]
    }));

    setPricingModal((prev) => ({
      ...prev,
      open: false
    }));

    triggerToast(
      pricingModal.isEdit
        ? "Paket berhasil diperbarui di Spreadsheet!"
        : "Paket berhasil ditambahkan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error("Pricing API Error:", error);
    triggerToast(
      error.message ||
      "Gagal menyimpan paket ke Spreadsheet."
    );
  }
};

const saveFeature = async () => {
  const d = featureModal.data;

  if (!d.title.trim()) {
    triggerToast("Judul fitur tidak boleh kosong");
    return;
  }

  const apiFeature = {
    ID: d.id,
    Icon: d.icon,
    Judul: d.title,
    Deskripsi: d.desc,
    Status: d.status,
    Urutan: 1
  };

  try {
    await callApi(
      featureModal.isEdit
        ? "updateFeature"
        : "createFeature",
      { data: apiFeature }
    );

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      features: featureModal.isEdit
        ? prev.features.map((item: any) =>
            item.id === d.id ? d : item
          )
        : [...prev.features, d]
    }));

    setFeatureModal((prev) => ({
      ...prev,
      open: false
    }));

    triggerToast(
      featureModal.isEdit
        ? "Fitur berhasil diperbarui di Spreadsheet!"
        : "Fitur berhasil ditambahkan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error("Feature API Error:", error);
    triggerToast(
      error.message ||
      "Gagal menyimpan fitur."
    );
  }
};

const saveTestimonial = async () => {
  const d = testiModal.data;

  if (!d.name.trim() || !d.testi.trim()) {
    triggerToast(
      "Nama dan isi ulasan wajib diisi"
    );
    return;
  }

  const apiTestimonial = {
    ID: d.id,
    Nama: d.name,
    Foto: d.photo,
    Testimoni: d.testi,
    Rating: Number(d.rating),
    Lokasi: d.location,
    Status: d.status,
    Urutan: 1
  };

  try {
    await callApi(
      testiModal.isEdit
        ? "updateTestimonial"
        : "createTestimonial",
      { data: apiTestimonial }
    );

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      testimonials: testiModal.isEdit
        ? prev.testimonials.map((item: any) =>
            item.id === d.id ? d : item
          )
        : [...prev.testimonials, d]
    }));

    setTestiModal((prev) => ({
      ...prev,
      open: false
    }));

    triggerToast(
      testiModal.isEdit
        ? "Testimoni berhasil diperbarui di Spreadsheet!"
        : "Testimoni berhasil ditambahkan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error("Testimonial API Error:", error);
    triggerToast(
      error.message ||
      "Gagal menyimpan testimoni."
    );
  }
};

const saveFaq = async () => {
  const d = faqModal.data;

  if (!d.question.trim() || !d.answer.trim()) {
    triggerToast(
      "Pertanyaan dan jawaban wajib diisi"
    );
    return;
  }

  const apiFaq = {
    ID: d.id,
    Pertanyaan: d.question,
    Jawaban: d.answer,
    Status: "Aktif",
    Urutan: 1
  };

  try {
    await callApi(
      faqModal.isEdit
        ? "updateFAQ"
        : "createFAQ",
      { data: apiFaq }
    );

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      faq: faqModal.isEdit
        ? prev.faq.map((item: any) =>
            item.id === d.id
              ? {
                  ...d,
                  status: "Aktif"
                }
              : item
          )
        : [
            ...prev.faq,
            {
              ...d,
              status: "Aktif"
            }
          ]
    }));

    setFaqModal((prev) => ({
      ...prev,
      open: false
    }));

    triggerToast(
      faqModal.isEdit
        ? "FAQ berhasil diperbarui di Spreadsheet!"
        : "FAQ berhasil ditambahkan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error("FAQ API Error:", error);
    triggerToast(
      error.message ||
      "Gagal menyimpan FAQ."
    );
  }
};

const saveHowToOrder = async () => {
  const rows = data.howToOrder.map(
    (step: any, index: number) => ({
      Nomor:
        step.num ||
        String(index + 1).padStart(2, "0"),
      Judul: step.title,
      Deskripsi: step.desc,
      Icon: step.icon || "FileText",
      Status: step.status || "Aktif",
      Urutan: index + 1
    })
  );

  try {
    for (const row of rows) {
      await callApi(
        "updateHowToOrder",
        { data: row }
      );
    }

    triggerToast(
      "Cara Pesan berhasil disimpan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error(
      "HowToOrder API Error:",
      error
    );

    triggerToast(
      error.message ||
      "Gagal menyimpan Cara Pesan."
    );
  }
};

const saveHome = async () => {
  try {
    await callApi("updateHome", {
      data: data.home
    });

    triggerToast(
      "Home & Hero berhasil disimpan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error("Home API Error:", error);

    triggerToast(
      error.message ||
      "Gagal menyimpan Home."
    );
  }
};

const saveSettings = async () => {
  try {
    const {
      adminPassword,
      ...settingsToSave
    } = data.settings as any;

    await callApi("updateSettings", {
      data: settingsToSave
    });

    triggerToast(
      "Pengaturan berhasil disimpan ke Spreadsheet!"
    );
  } catch (error: any) {
    console.error(
      "Settings API Error:",
      error
    );

    triggerToast(
      error.message ||
      "Gagal menyimpan pengaturan."
    );
  }
};

const saveAdminUsername = async () => {
  const username = (
    data.settings.adminUsername || ""
  ).trim();

  if (!username) {
    triggerToast(
      "Username admin tidak boleh kosong."
    );
    return;
  }

  try {
    await callApi("updateAdminUsername", {
      username
    });

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      settings: {
        ...prev.settings,
        adminUsername: username
      }
    }));

    triggerToast(
      "Username admin berhasil diperbarui."
    );
  } catch (error: any) {
    console.error(
      "Admin Username API Error:",
      error
    );

    triggerToast(
      error.message ||
      "Gagal memperbarui username admin."
    );
  }
};
  // Handle Order Submit
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder = {
      id: "ORD-" + new Date().getFullYear() + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + Math.floor(100 + Math.random() * 900),
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      customerName: orderForm.nama,
      whatsapp: orderForm.whatsapp,
      theme: orderForm.tema,
      groom: orderForm.mempelaiPria,
      bride: orderForm.mempelaiWanita,
      weddingDate: orderForm.tanggalNikah,
      location: orderForm.lokasi,
      package: orderForm.paket,
      notes: orderForm.catatan,
      status: "Baru"
    };

    // Update state & persist orders
    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));

    // If API URL is provided, try POST to Google Apps Script
    if (data.settings.apiUrl && data.settings.apiUrl.startsWith('http')) {
      try {
        fetch(data.settings.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'createOrder', data: newOrder })
        }).catch(err => console.warn("Sync Google Apps Script warning:", err));
      } catch (err) {}
    }

    // Format WhatsApp message
    const waText = 
`Halo NGULEMIN, saya ingin memesan undangan digital.

Nama: ${orderForm.nama}
No. WhatsApp: ${orderForm.whatsapp}
Tema: ${orderForm.tema}
Mempelai Pria: ${orderForm.mempelaiPria}
Mempelai Wanita: ${orderForm.mempelaiWanita}
Tanggal: ${orderForm.tanggalNikah}
Lokasi: ${orderForm.lokasi}
Paket: ${orderForm.paket}
Catatan: ${orderForm.catatan || '-'}`;

    const adminPhone = (data.settings.whatsappAdmin || "6281234567890").replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`;
    setLastGeneratedWaUrl(waUrl);

    setOrderSubmittedSuccess(true);
    triggerToast("Pesanan berhasil dicatat!");
  };

  const openOrderWithTheme = (themeName: string) => {
    setOrderForm(prev => ({ ...prev, tema: themeName }));
    setOrderSubmittedSuccess(false);
    setOrderModalOpen(true);
  };

  const openOrderWithPackage = (pkgName: string) => {
    setOrderForm(prev => ({ ...prev, paket: pkgName }));
    setOrderSubmittedSuccess(false);
    setOrderModalOpen(true);
  };

  // Handle Admin Login
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoginLoading(true);
  setLoginError('');

  const apiUrl = (
    data.settings.apiUrl ||
    ((window as any).CONFIG?.API_URL as string) ||
    ''
  ).trim();

  if (!apiUrl) {
    setLoginError('URL Google Apps Script belum dikonfigurasi.');
    setLoginLoading(false);
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action: 'login',
        username: loginUser.trim(),
        password: loginPass
      })
    });

    const result = await response.json();

    if (!result.success || !result.data?.token) {
      throw new Error(
        result.message || 'Username atau password salah.'
      );
    }

    const token = result.data.token;

    localStorage.setItem(
      'ngulemin_admin_token',
      token
    );

    localStorage.setItem(
      'ngulemin_admin_user',
      result.data.username || loginUser.trim()
    );

    setAdminToken(token);
    setCurrentView('dashboard');

    triggerToast(
      'Login berhasil. Terhubung ke Google Apps Script.'
    );
  } catch (error: any) {
    console.error('Login Error:', error);

    setLoginError(
      error.message ||
      'Gagal terhubung ke Google Apps Script.'
    );
  } finally {
    setLoginLoading(false);
  }
};

  const handleLogout = () => {
    void (async () => {
      try {
        if (adminToken) {
          await callApi(
            "logout",
            {},
            true
          );
        }
      } catch (error) {
        console.warn(
          "Logout API warning:",
          error
        );
      } finally {
        localStorage.removeItem(
          "ngulemin_admin_token"
        );
  
        localStorage.removeItem(
          "ngulemin_admin_user"
        );
  
        setAdminToken(null);
        setCurrentView("public");
  
        triggerToast(
          "Berhasil keluar dari dashboard."
        );
      }
    })();
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="w-5 h-5" />;
      case "Smartphone": return <Smartphone className="w-5 h-5" />;
      case "CheckSquare": return <CheckSquare className="w-5 h-5" />;
      case "Clock": return <Clock className="w-5 h-5" />;
      case "Camera": return <Camera className="w-5 h-5" />;
      case "MapPin": return <MapPin className="w-5 h-5" />;
      case "Music": return <Music className="w-5 h-5" />;
      case "Heart": return <Heart className="w-5 h-5" />;
      case "CreditCard": return <CreditCard className="w-5 h-5" />;
      case "MessageSquare": return <MessageSquare className="w-5 h-5" />;
      case "Share2": return <Share2 className="w-5 h-5" />;
      case "Users": return <Users className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const DASHBOARD_TABS = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'orders', label: 'Pesanan Masuk', icon: <Package className="w-4 h-4" />, badge: data.orders?.length },
    { id: 'home', label: 'Home & Hero', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'themes', label: 'Tema Undangan', icon: <Palette className="w-4 h-4" />, badge: data.themes?.length },
    { id: 'pricing', label: 'Paket Harga', icon: <CreditCard className="w-4 h-4" />, badge: data.pricing?.length },
    { id: 'features', label: 'Fitur Undangan', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimoni', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'howto', label: 'Cara Pesan', icon: <FileText className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'settings', label: 'Pengaturan & API', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2723] flex flex-col font-sans-clean selection:bg-[#E8DCCB] selection:text-[#5E4424]">
      
      {/* =========================================================================
          TOP BAR (Sticky with Brand Wordmark, Nav Links, Mode Switcher & CTA)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E1D9] transition-all">
        {currentView === 'dashboard' ? (
          /* ================= ADMIN DASHBOARD TOPBAR ================= */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
            {/* Left: Sidebar Toggle, Brand & Active Breadcrumb */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Desktop Sidebar Toggle Button */}
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E8E1D9] bg-white hover:bg-[#FAF8F5] text-[#2D2723] hover:text-[#8C6D46] transition-colors shadow-2xs cursor-pointer"
                title={sidebarCollapsed ? "Tampilkan Sidebar" : "Sembunyikan Sidebar"}
              >
                {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4 text-[#8C6D46]" /> : <PanelLeftClose className="w-4 h-4 text-[#766E65]" />}
                <span className="text-xs font-semibold text-[#766E65]">
                  {sidebarCollapsed ? "Tampilkan Sidebar" : "Sembunyikan Sidebar"}
                </span>
              </button>

              {/* Mobile Sidebar Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E8E1D9] bg-white text-[#2D2723] hover:text-[#8C6D46] transition-colors cursor-pointer shadow-2xs"
                title={mobileSidebarOpen ? "Sembunyikan Sidebar" : "Buka Menu Admin"}
              >
                {mobileSidebarOpen ? <PanelLeftClose className="w-4 h-4 text-amber-600" /> : <PanelLeftOpen className="w-4 h-4 text-[#8C6D46]" />}
                <span className="text-xs font-semibold text-[#766E65]">
                  {mobileSidebarOpen ? "Tutup" : "Menu"}
                </span>
              </button>

              {/* Brand Logo / Wordmark */}
              <button 
                onClick={() => {
                  setCurrentView('public');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 text-left focus:outline-none"
                title="Kembali ke Beranda Website"
              >
                {data.settings.logoUrl && data.settings.logoUrl.trim() !== '' ? (
                  <img 
                    src={data.settings.logoUrl} 
                    alt={data.settings.siteName || "NGULEMIN"} 
                    className="h-7 sm:h-8 w-auto max-w-[130px] sm:max-w-[160px] object-contain transition-transform group-hover:scale-105"
                  />
                ) : null}
                <span className={`text-xl sm:text-2xl font-bold tracking-wider font-serif-luxury text-[#8C6D46] group-hover:opacity-85 transition-opacity ${data.settings.logoUrl && data.settings.logoUrl.trim() !== '' ? 'hidden sm:inline-block' : 'inline-block'}`}>
                  {data.settings.siteName || "NGULEMIN"}
                </span>
              </button>

              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider bg-[#8C6D46]/10 text-[#8C6D46] px-2.5 py-0.5 rounded-full border border-[#8C6D46]/20">
                CMS Admin
              </span>

              {/* Active Tab Breadcrumb */}
              <div className="hidden lg:flex items-center gap-2 text-xs text-[#766E65] pl-3 border-l border-[#E8E1D9]">
                <span className="text-[#8C6D46] font-semibold">Dashboard</span>
                <span>/</span>
                <span className="font-semibold text-[#2D2723]">
                  {DASHBOARD_TABS.find(t => t.id === dashTab)?.label || 'Overview'}
                </span>
              </div>
            </div>

            {/* Right: Actions (No Public Website Menus Here!) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => setCurrentView('public')}
                className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-[#8C6D46] border border-[#8C6D46] hover:bg-[#8C6D46]/10 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
                title="Buka Website Publik"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lihat Website</span>
                <span className="sm:hidden">Web</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
                title="Keluar dari Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= PUBLIC WEBSITE TOPBAR ================= */
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
            {/* Zone 1: Single text element wordmark in serif or custom logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setCurrentView('public');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-2.5 text-left focus:outline-none"
                title="Kembali ke Beranda"
              >
                {data.settings.logoUrl && data.settings.logoUrl.trim() !== '' ? (
                  <img 
                    src={data.settings.logoUrl} 
                    alt={data.settings.siteName || "NGULEMIN"} 
                    className="h-8 sm:h-9 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-transform group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fb = document.getElementById('navbar-brand-name-text');
                      if (fb) fb.style.display = 'inline-block';
                    }}
                  />
                ) : null}
                <span 
                  id="navbar-brand-name-text" 
                  className={`text-2xl sm:text-3xl font-bold tracking-wider font-serif-luxury text-[#8C6D46] group-hover:opacity-85 transition-opacity ${data.settings.logoUrl && data.settings.logoUrl.trim() !== '' ? 'hidden sm:inline-block' : 'inline-block'}`}
                >
                  {data.settings.siteName || "NGULEMIN"}
                </span>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Public View Only) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#766E65]">
              <a href="#home" className="hover:text-[#8C6D46] transition-colors">Home</a>
              <a href="#tema" className="hover:text-[#8C6D46] transition-colors">Tema</a>
              <a href="#harga" className="hover:text-[#8C6D46] transition-colors">Harga</a>
              <a href="#fitur" className="hover:text-[#8C6D46] transition-colors">Fitur</a>
              <a href="#testimoni" className="hover:text-[#8C6D46] transition-colors">Testimoni</a>
              <a href="#cara-pesan" className="hover:text-[#8C6D46] transition-colors">Cara Pesan</a>
              <a href="#faq" className="hover:text-[#8C6D46] transition-colors">FAQ</a>
            </nav>

            {/* Zone 3: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setOrderSubmittedSuccess(false);
                  setOrderModalOpen(true);
                }}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Pesan Sekarang
              </button>

              {/* Mobile Hamburger Toggle Box */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[#E8E1D9] text-[#2D2723] hover:text-[#8C6D46] hover:bg-[#FAF8F5] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer for Public Website */}
        {currentView === 'public' && mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8E1D9] px-6 py-4 flex flex-col gap-3 shadow-lg">
            <a 
              href="#home" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              Home
            </a>
            <a 
              href="#tema" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              Tema Undangan
            </a>
            <a 
              href="#harga" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              Paket Harga
            </a>
            <a 
              href="#fitur" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              Fitur Lengkap
            </a>
            <a 
              href="#testimoni" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              Testimoni
            </a>
            <a 
              href="#cara-pesan" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              Cara Pesan
            </a>
            <a 
              href="#faq" 
              onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
              className="py-2 text-sm font-medium border-b border-[#E8E1D9]"
            >
              FAQ
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOrderSubmittedSuccess(false);
                  setOrderModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#8C6D46] rounded-xl shadow-sm"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          MOBILE ADMIN SIDEBAR DRAWER (Full Viewport Overlay, Left Slide-In)
          ========================================================================= */}
      {currentView === 'dashboard' && mobileSidebarOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop click to hide/close sidebar */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fadeIn cursor-pointer"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Tutup Menu Admin"
          />

          {/* Drawer container - Left Sidebar */}
          <div className="fixed inset-y-0 left-0 w-[285px] max-w-[85vw] bg-[#24201D] text-[#ECE7E1] z-[101] flex flex-col shadow-2xl border-r border-[#3D3732] animate-slideInLeft">
            {/* Header */}
            <div className="p-4 border-b border-[#3D3732] flex items-center justify-between">
              <div>
                <div className="text-base font-serif-luxury font-bold text-[#D4AF37]">NGULEMIN CMS</div>
                <div className="text-[11px] text-[#8C847B]">Panel Kontrol Admin</div>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-[#8C847B] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Tutup Menu Admin"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {DASHBOARD_TABS.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setDashTab(tab.id as any);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                    dashTab === tab.id
                      ? 'bg-[#D4AF37]/25 text-[#D4AF37] font-semibold border-l-3 border-[#D4AF37] shadow-xs'
                      : 'text-[#A9A198] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{tab.icon}</span>
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="text-[10px] bg-[#D4AF37]/25 text-[#D4AF37] font-bold px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-[#38332E] space-y-2 bg-[#1C1917]">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('guide');
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Panduan Code.gs</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('public');
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Lihat Website Publik</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 1: PUBLIC LANDING PAGE
          ========================================================================= */}
      {currentView === 'public' && (
        <main className="flex-1">
          
          {/* HERO SECTION */}
          <section id="home" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Clean unboxed editorial badge */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold tracking-widest text-[#8C6D46] uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  <span>{data.home.badge || "UNDANGAN DIGITAL"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#2D2723] leading-[1.15] tracking-tight mb-6">
                  {data.home.title}
                </h1>

                <p className="text-base sm:text-lg text-[#766E65] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  {data.home.description}
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                  <a
                    href="#tema"
                    className="px-6 py-3 text-sm font-semibold text-[#8C6D46] border border-[#8C6D46] hover:bg-[#8C6D46]/10 rounded-xl transition-all"
                  >
                    {data.home.button1Text || "Lihat Tema"}
                  </a>
                  <button
                    onClick={() => {
                      setOrderSubmittedSuccess(false);
                      setOrderModalOpen(true);
                    }}
                    className="px-7 py-3 text-sm font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    {data.home.button2Text || "Pesan Sekarang"}
                  </button>
                </div>

                {/* Social Proof Claim */}
                <div className="mt-10 pt-6 border-t border-[#E8E1D9] flex items-center justify-center lg:justify-start gap-6 text-xs text-[#766E65]">
                  <div>
                    <span className="font-bold text-sm text-[#2D2723]">500+</span> Pasangan Bahagia
                  </div>
                  <span aria-hidden="true">·</span>
                  <div>
                    <span className="font-bold text-sm text-[#2D2723]">4.9/5</span> Rating Kepuasan
                  </div>
                  <span aria-hidden="true">·</span>
                  <div>
                    <span className="font-bold text-sm text-[#2D2723]">1-24 Jam</span> Proses Cepat
                  </div>
                </div>
              </div>

              {/* Hero Image Mockup Carrier */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#E8E1D9] bg-white group">
                  <img
                    src={data.home.heroImage || heroMockup}
                    alt="Mockup Undangan Digital NGULEMIN"
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8E1D9] shadow-sm flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#2D2723]">Preview Langsung di Smartphone</div>
                      <div className="text-[11px] text-[#766E65]">Responsif · Dilengkapi Musik & Navigasi</div>
                    </div>
                    <a 
                      href={data.themes[0]?.PreviewURL || "https://ngulemin.id/preview/demo"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#8C6D46] hover:underline flex items-center gap-1"
                    >
                      Buka Demo <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* =========================================================================
              SECTION 2: TEMA UNDANGAN (Catalogue Cards)
              ========================================================================= */}
          <section id="tema" className="py-20 px-4 sm:px-6 bg-[#F4EFEA]/60 border-y border-[#E8E1D9]">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">KATALOG DESAIN</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2D2723] mt-2 mb-4">
                  Pilihan Tema Undangan
                </h2>
                <p className="text-sm sm:text-base text-[#766E65]">
                  Temukan desain undangan yang sesuai dengan konsep pernikahan impian Anda. Setiap tema dilengkapi animasi halus, countdown, dan lagu romantis.
                </p>
              </div>

              {/* Category Filter Menu Buttons */}
              <div className="w-full max-w-4xl mx-auto mb-10 px-2 sm:px-0">
                <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2.5 sm:pb-0 px-1 sm:px-0 sm:flex-wrap no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Semua')}
                    className={`h-9.5 sm:h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 shadow-2xs ${
                      selectedCategory === 'Semua'
                        ? 'bg-[#8C6D46] text-white shadow-md font-semibold ring-2 ring-[#8C6D46]/25'
                        : 'bg-white text-[#766E65] border border-[#E8E1D9] hover:border-[#8C6D46] hover:text-[#8C6D46] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>Semua</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      selectedCategory === 'Semua' ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#8C6D46]'
                    }`}>
                      {data.themes.filter((t: any) => (t.Status || "Aktif") === "Aktif").length}
                    </span>
                  </button>

                  {(data.categories || []).map((cat: string) => {
                    const count = data.themes.filter(
                      (t: any) => (t.Status || "Aktif") === "Aktif" && (t.Category || "").toLowerCase() === cat.toLowerCase()
                    ).length;
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`h-9.5 sm:h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 shadow-2xs ${
                          isSelected
                            ? 'bg-[#8C6D46] text-white shadow-md font-semibold ring-2 ring-[#8C6D46]/25'
                            : 'bg-white text-[#766E65] border border-[#E8E1D9] hover:border-[#8C6D46] hover:text-[#8C6D46] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#8C6D46]'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Themes Grid with 1:1 Aspect Ratio Images */}
              {(() => {
                const activeThemes = data.themes.filter((t: any) => (t.Status || "Aktif") === "Aktif");
                const filtered = activeThemes.filter((t: any) => {
                  if (selectedCategory === 'Semua') return true;
                  return (t.Category || "").toLowerCase() === selectedCategory.toLowerCase();
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#E8E1D9] max-w-md mx-auto">
                      <Palette className="w-10 h-10 text-[#8C6D46]/40 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-[#2D2723]">Belum ada tema pada kategori "{selectedCategory}"</h4>
                      <p className="text-xs text-[#766E65] mt-1 mb-4">Silakan pilih kategori lainnya atau tampilkan seluruh katalog tema kami.</p>
                      <button
                        onClick={() => setSelectedCategory('Semua')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] rounded-lg shadow-sm hover:bg-[#735735]"
                      >
                        Tampilkan Semua Tema
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((theme: any) => (
                      <article 
                        key={theme.ID} 
                        className="bg-white rounded-2xl overflow-hidden border border-[#E8E1D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                      >
                        {/* 1:1 Aspect Ratio Preview Image */}
                        <div className="relative aspect-square overflow-hidden bg-[#FAF8F5]">
                          <img
                            src={theme.Gambar}
                            alt={theme.Nama}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#8C6D46] shadow-sm">
                            {theme.Category || "Eksklusif"}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-serif-luxury font-bold text-[#2D2723] mb-2">{theme.Nama}</h3>
                          <p className="text-xs sm:text-sm text-[#766E65] leading-relaxed mb-6 flex-1">
                            {theme.Deskripsi}
                          </p>

                          {/* Clean Symmetrical Action Buttons without price */}
                          <div className="pt-4 border-t border-[#E8E1D9] grid grid-cols-2 gap-3 mt-auto">
                            <a
                              href={theme.PreviewURL || "https://ngulemin.id/preview/demo"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-10 px-3 text-xs font-semibold text-[#8C6D46] border border-[#8C6D46] hover:bg-[#8C6D46]/10 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:-translate-y-0.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Preview
                            </a>
                            <button
                              type="button"
                              onClick={() => openOrderWithTheme(theme.Nama)}
                              className="h-10 px-3 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5 cursor-pointer"
                            >
                              Pesan
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                );
              })()}

            </div>
          </section>

          {/* =========================================================================
              SECTION 3: PAKET HARGA (Pricing Tier Cards)
              ========================================================================= */}
          <section id="harga" className="py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">PENAWARAN TERBAIK</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2D2723] mt-2 mb-4">
                  Paket Harga Undangan
                </h2>
                <p className="text-sm sm:text-base text-[#766E65]">
                  Pilihan harga transparan tanpa biaya tersembunyi. Dapatkan fitur eksklusif untuk menyempurnakan hari bahagia Anda.
                </p>
              </div>

              <div className="flex flex-wrap justify-center items-stretch gap-8 max-w-5xl mx-auto">
                {data.pricing.filter((p: any) => (p.Status || "Aktif") === "Aktif").map((pkg: any) => {
                  const isFeatured = pkg.Featured === true || pkg.Featured === "Ya";
                  const featureList = Array.isArray(pkg.Fitur) ? pkg.Fitur : (pkg.Fitur || '').split('\n').filter((f: string) => f.trim() !== '');

                  return (
                    <div
                      key={pkg.ID}
                      className={`w-full sm:w-[320px] md:w-[340px] flex-1 min-w-[280px] max-w-[360px] relative bg-white rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                        isFeatured
                          ? 'border-[#8C6D46] shadow-xl md:-translate-y-2 ring-1 ring-[#8C6D46]'
                          : 'border-[#E8E1D9] shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider text-white bg-[#8C6D46] uppercase">
                          {pkg.Label || "Terpopuler"}
                        </span>
                      )}

                      <div className="text-xs font-bold tracking-widest uppercase text-[#766E65] mb-2">{pkg.Nama}</div>
                      <div className="text-4xl font-serif-luxury font-bold text-[#2D2723] mb-3 font-mono tabular-nums">
                        {formatRupiah(pkg.Harga)}
                      </div>
                      <p className="text-xs text-[#766E65] mb-6 leading-relaxed">
                        {pkg.Deskripsi}
                      </p>

                      <ul className="space-y-3 mb-8 flex-1">
                        {featureList.map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D2723]">
                            <Check className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => openOrderWithPackage(pkg.Nama)}
                        className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          isFeatured
                            ? 'bg-[#8C6D46] hover:bg-[#735735] text-white shadow-md'
                            : 'border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46]/10'
                        }`}
                      >
                        Pesan Paket {pkg.Nama}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* =========================================================================
              SECTION 4: FITUR LENGKAP (Grid with Wedding Icons)
              ========================================================================= */}
          <section id="fitur" className="py-20 px-4 sm:px-6 bg-[#F4EFEA]/60 border-y border-[#E8E1D9]">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">FITUR LENGKAP</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2D2723] mt-2 mb-4">
                  Kemudahan & Keanggunan dalam Satu Tautan
                </h2>
                <p className="text-sm sm:text-base text-[#766E65]">
                  Seluruh fitur dirancang untuk memberikan pengalaman membaca undangan yang romantis dan interaktif bagi para tamu Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.features.filter((f: any) => (f.status || "Aktif") === "Aktif").map((feat: any) => (
                  <div
                    key={feat.id}
                    className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm hover:border-[#8C6D46] hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E1D9] flex items-center justify-center text-[#8C6D46] mb-4">
                      {renderIcon(feat.icon)}
                    </div>
                    <h3 className="text-base font-bold text-[#2D2723] mb-1.5">{feat.title}</h3>
                    <p className="text-xs text-[#766E65] leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* =========================================================================
              SECTION 5: TESTIMONI KLIEN
              ========================================================================= */}
          <section id="testimoni" className="py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">KATA MEREKA</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2D2723] mt-2 mb-4">
                  Kebahagiaan Calon Pengantin
                </h2>
                <p className="text-sm sm:text-base text-[#766E65]">
                  Testimoni nyata dari para pasangan yang telah mempercayakan undangan pernikahan digital mereka kepada NGULEMIN.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.testimonials.filter((t: any) => (t.status || "Aktif") === "Aktif").map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white p-8 rounded-2xl border border-[#E8E1D9] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      {/* Rating Stars */}
                      <div className="flex gap-1 text-[#D4AF37] mb-4">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-[#2D2723] italic leading-relaxed mb-6">
                        "{item.testi}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-[#E8E1D9]">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E8E1D9]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#2D2723]">{item.name}</div>
                        <div className="text-xs text-[#766E65]">{item.location || "Klien NGULEMIN"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* =========================================================================
              SECTION 6: CARA PESAN (4 Steps)
              ========================================================================= */}
          <section id="cara-pesan" className="py-20 px-4 sm:px-6 bg-[#F4EFEA]/60 border-y border-[#E8E1D9]">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">ALUR SEDERHANA</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2D2723] mt-2 mb-4">
                  Cara Pesan Undangan Digital
                </h2>
                <p className="text-sm sm:text-base text-[#766E65]">
                  Hanya 4 langkah mudah untuk mewujudkan website undangan pernikahan idaman Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.howToOrder.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white p-7 rounded-2xl border border-[#E8E1D9] shadow-sm relative group hover:border-[#8C6D46] transition-all"
                  >
                    <div className="text-4xl font-serif-luxury font-bold text-[#B59A74] mb-3">
                      {step.num}
                    </div>
                    <h3 className="text-base font-bold text-[#2D2723] mb-2">{step.title}</h3>
                    <p className="text-xs text-[#766E65] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* =========================================================================
              SECTION 7: FAQ (Accordion)
              ========================================================================= */}
          <section id="faq" className="py-20 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">TANYA JAWAB</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2D2723] mt-2 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm sm:text-base text-[#766E65]">
                  Pertanyaan yang sering diajukan mengenai layanan undangan pernikahan digital kami.
                </p>
              </div>

              <div className="space-y-4">
                {data.faq.map((item: any, index: number) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={item.id || index}
                      className="bg-white rounded-xl border border-[#E8E1D9] overflow-hidden transition-all shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#2D2723] hover:text-[#8C6D46] transition-colors"
                      >
                        <span>{item.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#8C6D46] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#766E65] leading-relaxed border-t border-[#E8E1D9]/50 bg-[#FAF8F5]/40">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* CTA BANNER */}
          <section className="py-16 px-4 sm:px-6 bg-[#24201D] text-[#ECE7E1]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#D4AF37] mb-4">
                Siap Membagikan Hari Bahagia Anda?
              </h2>
              <p className="text-sm sm:text-base text-[#A9A198] max-w-xl mx-auto mb-8">
                Konsultasikan konsep pernikahan Anda bersama tim NGULEMIN sekarang. Undangan siap dibagikan dalam hitungan jam.
              </p>
              <button
                onClick={() => {
                  setOrderSubmittedSuccess(false);
                  setOrderModalOpen(true);
                }}
                className="px-8 py-3.5 text-sm font-semibold text-[#24201D] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                Pesan Undangan Digital Sekarang
              </button>
            </div>
          </section>

        </main>
      )}

      {/* =========================================================================
          VIEW 2: ADMIN LOGIN
          ========================================================================= */}
      {currentView === 'login' && (
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#F5EFEB] via-[#FAF8F5] to-[#EFE9E2]">
          <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E1D9] shadow-xl">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif-luxury font-bold text-[#8C6D46] tracking-wider mb-2">
                NGULEMIN
              </h1>
              <p className="text-xs text-[#766E65]">Masuk ke Panel Administrasi & CMS Konten</p>
            </div>

            {loginError && (
              <div className="p-3 mb-5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D2723] mb-1.5">Username / Email</label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2723] mb-1.5">Password</label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 text-sm font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-md transition-colors"
              >
                {loginLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
              </button>
            </form>

            {/* Quick Demo Fill */}
            <div className="mt-6 pt-5 border-t border-[#E8E1D9] text-center">
              <button
                type="button"
                onClick={() => {
                  setLoginUser(data.settings.adminUsername || 'admin');
                  setLoginPass(data.settings.adminPassword || 'admin123');
                }}
                className="text-xs text-[#8C6D46] hover:underline font-semibold"
              >
                Isi Otomatis Akun Admin ({data.settings.adminUsername || 'admin'} / {data.settings.adminPassword ? '••••••••' : 'admin123'})
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCurrentView('public')}
                className="text-xs text-[#766E65] hover:text-[#2D2723]"
              >
                &larr; Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 3: ADMIN DASHBOARD CMS
          ========================================================================= */}
      {currentView === 'dashboard' && (
        <main className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-72px)] bg-[#F7F5F0]">
          
          {/* Dashboard Desktop Sidebar (Collapsible) */}
          {!sidebarCollapsed && (
            <aside className="hidden md:flex flex-col w-64 bg-[#24201D] text-[#ECE7E1] p-4 shrink-0 border-r border-[#38332E] transition-all duration-300">
              <div className="p-3 border-b border-[#3D3732] mb-3 flex items-center justify-between">
                <div>
                  <div className="text-base font-serif-luxury font-bold text-[#D4AF37]">NGULEMIN CMS</div>
                  <div className="text-[11px] text-[#8C847B]">Panel Kontrol Web</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1.5 rounded-lg text-[#8C847B] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Sembunyikan Sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto">
                {DASHBOARD_TABS.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDashTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      dashTab === tab.id
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold border-l-2 border-[#D4AF37]'
                        : 'text-[#A9A198] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] font-bold px-1.5 py-0.2 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#38332E] space-y-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('guide')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#D4AF37] hover:bg-white/5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Panduan Code.gs</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar (Logout)</span>
                </button>
              </div>
            </aside>
          )}

          {/* Dashboard Main Workspace */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            
            {/* Desktop Collapsed Sidebar Bar (Re-open Trigger) */}
            {sidebarCollapsed && (
              <div className="hidden md:flex items-center justify-between p-3 mb-6 bg-white rounded-xl border border-[#E8E1D9] shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-[#766E65]">
                  <span className="font-semibold text-[#2D2723]">Sidebar Disembunyikan</span>
                  <span>·</span>
                  <span>Tab Aktif: <strong className="text-[#8C6D46]">{DASHBOARD_TABS.find(t => t.id === dashTab)?.label || 'Overview'}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#E8E1D9] rounded-lg text-xs font-semibold text-[#8C6D46] transition-colors cursor-pointer"
                >
                  <PanelLeftOpen className="w-4 h-4" /> Tampilkan Sidebar
                </button>
              </div>
            )}

            {/* Mobile Top Bar (Quick Switch Tab & Hide/Show Sidebar) */}
            <div className="md:hidden flex items-center justify-between p-3 mb-4 bg-white rounded-xl border border-[#E8E1D9] shadow-2xs">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#766E65]">Menu:</span>
                <span className="font-bold text-[#8C6D46] bg-[#8C6D46]/10 px-2.5 py-0.5 rounded-full">
                  {DASHBOARD_TABS.find(t => t.id === dashTab)?.label || 'Overview'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title={mobileSidebarOpen ? "Sembunyikan Sidebar" : "Buka Menu Admin"}
              >
                {mobileSidebarOpen ? <PanelLeftClose className="w-3.5 h-3.5" /> : <PanelLeftOpen className="w-3.5 h-3.5" />}
                <span>{mobileSidebarOpen ? "Sembunyikan Sidebar" : "Menu Admin"}</span>
              </button>
            </div>
            
            {/* Top Stat Bar for Overview */}
            {dashTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif-luxury font-bold text-[#2D2723]">Overview Statistik</h2>
                  <p className="text-xs text-[#766E65]">Data terakhir diperbarui: {new Date().toLocaleTimeString('id-ID')}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Total Tema", val: data.themes.length },
                    { label: "Total Paket", val: data.pricing.length },
                    { label: "Total Fitur", val: data.features.length },
                    { label: "Testimoni", val: data.testimonials.length },
                    { label: "Total FAQ", val: data.faq.length },
                    { label: "Total Pesanan", val: data.orders.length, highlight: true }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-[#E8E1D9] shadow-sm text-center">
                      <div className={`text-3xl font-serif-luxury font-bold mb-1 ${stat.highlight ? 'text-emerald-700' : 'text-[#8C6D46]'}`}>
                        {stat.val}
                      </div>
                      <div className="text-[11px] font-semibold text-[#766E65] uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Connection Box */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm">
                  <h3 className="text-base font-bold text-[#2D2723] mb-2">Status Koneksi Google Apps Script</h3>
                  <p className="text-xs text-[#766E65] mb-4">
                    {data.settings.apiUrl ? (
                      <span className="text-emerald-600 font-semibold">● Terhubung ke API URL Apps Script</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">● Berjalan dalam Mode Demo Lokal (LocalStorage). Masukkan URL Web App di tab Pengaturan untuk sinkronisasi ke Spreadsheet.</span>
                    )}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDashTab('orders')}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] rounded-lg"
                    >
                      Lihat Pesanan Masuk ({data.orders.length})
                    </button>
                    <button
                      onClick={() => setCurrentView('guide')}
                      className="px-4 py-2 text-xs font-semibold text-[#8C6D46] border border-[#8C6D46] rounded-lg"
                    >
                      Buka Panduan Code.gs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS MANAGEMENT */}
            {dashTab === 'orders' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Daftar Pesanan Tamu</h2>
                    <p className="text-xs text-[#766E65]">Kelola pesanan masuk dan hubungi klien langsung via WhatsApp.</p>
                  </div>
                  <span className="text-xs bg-[#FAF8F5] border border-[#E8E1D9] px-3 py-1 rounded-full font-semibold">
                    {data.orders.length} Pesanan
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#E8E1D9] text-[#766E65] uppercase">
                        <th className="p-3">ID & Tanggal</th>
                        <th className="p-3">Nama Pemesan</th>
                        <th className="p-3">WhatsApp</th>
                        <th className="p-3">Tema & Paket</th>
                        <th className="p-3">Mempelai & Lokasi</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E1D9]">
                      {data.orders.map((ord: any) => {
                        const cleanWa = (ord.whatsapp || '').replace(/[^0-9]/g, '');
                        return (
                          <tr key={ord.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                            <td className="p-3">
                              <span className="font-bold text-[#2D2723]">{ord.id}</span>
                              <div className="text-[10px] text-[#766E65]">{ord.date}</div>
                            </td>
                            <td className="p-3 font-semibold text-[#2D2723]">{ord.customerName}</td>
                            <td className="p-3">
                              <a
                                href={`https://wa.me/${cleanWa}?text=Halo%20${encodeURIComponent(ord.customerName)},%20terima%20kasih%20telah%20memesan%20undangan%20di%20NGULEMIN.`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#8C6D46] hover:underline font-semibold"
                              >
                                {ord.whatsapp}
                              </a>
                            </td>
                            <td className="p-3">
                              <div>{ord.theme}</div>
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                                {ord.package}
                              </span>
                            </td>
                            <td className="p-3">
                              <div>{ord.groom} & {ord.bride}</div>
                              <div className="text-[10px] text-[#766E65]">{ord.location}</div>
                            </td>
                            <td className="p-3">
                              <select
                                value={ord.status || "Baru"}
                                onChange={(e) => {
                                  updateOrderStatus(
                                    ord.id,
                                    e.target.value
                                  );
                                }}
                                className="px-2 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold"
                              >
                                <option value="Baru">Baru</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => {
                                  openDeleteConfirm("Hapus Pesanan", `Apakah Anda yakin ingin menghapus pesanan ${ord.id} (${ord.customerName})?`, () => {
                                    deleteEntity(
                                      "deleteOrder",
                                      ord.id,
                                      () => {
                                        setData((prev: typeof INITIAL_DATA) => ({
                                          ...prev,
                                          orders: prev.orders.filter(
                                            (o: any) => o.id !== ord.id
                                          )
                                        }));
                                      },
                                      "Pesanan berhasil dihapus dari Spreadsheet."
                                    );
                                }}
                                className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded"
                                title="Hapus pesanan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* HOME EDITOR */}
            {dashTab === 'home' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E1D9] pb-4">
                  <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Hero & Home Section</h2>
                  <button
                    onClick={() => {void saveHome();}}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg shadow-sm"
                  >
                    Simpan Perubahan
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Badge Teks</label>
                    <input
                      type="text"
                      value={data.home.badge}
                      onChange={(e) => setData({ ...data, home: { ...data.home, badge: e.target.value } })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Judul Utama Hero</label>
                    <input
                      type="text"
                      value={data.home.title}
                      onChange={(e) => setData({ ...data, home: { ...data.home, title: e.target.value } })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg font-serif-luxury text-base focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Deskripsi Hero</label>
                    <textarea
                      value={data.home.description}
                      onChange={(e) => setData({ ...data, home: { ...data.home, description: e.target.value } })}
                      rows={3}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Teks Tombol 1</label>
                    <input
                      type="text"
                      value={data.home.button1Text}
                      onChange={(e) => setData({ ...data, home: { ...data.home, button1Text: e.target.value } })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Teks Tombol 2</label>
                    <input
                      type="text"
                      value={data.home.button2Text}
                      onChange={(e) => setData({ ...data, home: { ...data.home, button2Text: e.target.value } })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* THEMES & CATEGORY MANAGEMENT */}
            {dashTab === 'themes' && (
              <div className="space-y-6">
                {/* Form & Card Tambah Kategori */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E1D9] pb-4">
                    <div>
                      <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723] flex items-center gap-2">
                        <Tag className="w-5 h-5 text-[#8C6D46]" /> Kelola Kategori Tema
                      </h2>
                      <p className="text-xs text-[#766E65] mt-1">
                        Kategori ini akan tampil di menu sortir bagian katalog tema dan form input tema baru.
                      </p>
                    </div>
                  </div>

                  {/* Form Tambah Kategori */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const trimmed = newCategoryInput.trim();
                      if (!trimmed) {
                        triggerToast("Nama kategori tidak boleh kosong");
                        return;
                      }
                      const existing = data.categories || [];
                      if (existing.some((c: string) => c.toLowerCase() === trimmed.toLowerCase())) {
                        triggerToast("Kategori tersebut sudah ada!");
                        return;
                      }
                      const updated = [...existing, trimmed];
                      setData((prev: typeof INITIAL_DATA) => ({ ...prev, categories: updated }));
                      setNewCategoryInput('');
                      triggerToast(`Kategori "${trimmed}" berhasil ditambahkan!`);
                    }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        placeholder="Ketik nama kategori baru (contoh: Rustic Vintage, Islami Elegan, Watercolor)..."
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg text-xs focus:outline-none focus:border-[#8C6D46] focus:bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Tambah Kategori
                    </button>
                  </form>

                  {/* List Kategori Saat Ini */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-[#766E65] uppercase tracking-wider mb-2">
                      Daftar Kategori Aktif:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(data.categories || []).map((cat: string) => {
                        const themeCount = data.themes.filter((t: any) => (t.Category || "").toLowerCase() === cat.toLowerCase()).length;
                        return (
                          <div 
                            key={cat}
                            className="bg-[#FAF8F5] border border-[#E8E1D9] pl-3 pr-2 py-1.5 rounded-lg flex items-center gap-2 text-xs text-[#2D2723]"
                          >
                            <span className="font-medium">{cat}</span>
                            <span className="text-[10px] bg-[#8C6D46]/10 text-[#8C6D46] px-1.5 py-0.5 rounded font-bold">
                              {themeCount} tema
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                openDeleteConfirm("Hapus Kategori", `Apakah Anda yakin ingin menghapus kategori "${cat}"?`, () => {
                                  setData((prev: typeof INITIAL_DATA) => ({
                                    ...prev,
                                    categories: (prev.categories || []).filter((c: string) => c !== cat)
                                  }));
                                  triggerToast(`Kategori "${cat}" telah dihapus.`);
                                });
                              }}
                              className="text-gray-400 hover:text-red-500 p-0.5 rounded"
                              title={`Hapus kategori ${cat}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Katalog Tema */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Katalog Tema</h2>
                      <p className="text-xs text-[#766E65]">Tambah, edit, ganti foto sampul, dan atur link preview tema.</p>
                    </div>
                    <button
                      onClick={() => {
                        setThemeModal({
                          open: true,
                          isEdit: false,
                          data: {
                            ID: `THM-${Date.now().toString().slice(-4)}`,
                            Nama: '',
                            Gambar: themeRose,
                            Deskripsi: 'Desain undangan elegan dengan alunan musik dan animasi romantis.',
                            Harga: 99000,
                            PreviewURL: 'https://ngulemin.id/preview/demo',
                            Category: data.categories?.[0] || 'Floral & Romantic',
                            Status: 'Aktif'
                          }
                        });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Tambah Tema
                    </button>
                  </div>

                  {/* Tabel Katalog Tema */}
                  <div className="border border-[#E8E1D9] rounded-xl overflow-hidden bg-white shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[720px]">
                        <thead>
                          <tr className="bg-[#FAF8F5] border-b border-[#E8E1D9] text-[11px] font-bold text-[#766E65] uppercase tracking-wider">
                            <th className="py-3 px-4 w-24">Preview</th>
                            <th className="py-3 px-4">Nama & Deskripsi Tema</th>
                            <th className="py-3 px-4 w-40">Kategori</th>
                            <th className="py-3 px-4 w-32">Harga</th>
                            <th className="py-3 px-4 w-28 text-center">Status</th>
                            <th className="py-3 px-4 w-36 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E1D9] text-xs">
                          {data.themes.map((t: any) => (
                            <tr key={t.ID} className="hover:bg-[#FAF8F5]/60 transition-colors">
                              {/* Preview Gambar */}
                              <td className="py-3 px-4 align-middle">
                                <div className="relative group w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden border border-[#E8E1D9] bg-gray-100 shadow-2xs shrink-0">
                                  <img 
                                    src={t.Gambar} 
                                    alt={t.Nama} 
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                  />
                                  {t.PreviewURL && (
                                    <a
                                      href={t.PreviewURL}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                      title="Buka Preview Tema"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              </td>

                              {/* Nama & Deskripsi */}
                              <td className="py-3 px-4 align-middle">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-[#2D2723]">{t.Nama}</span>
                                    <span className="font-mono text-[10px] text-[#766E65] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E8E1D9]">
                                      {t.ID}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-[#766E65] line-clamp-2 max-w-sm">
                                    {t.Deskripsi}
                                  </div>
                                  {t.PreviewURL && (
                                    <a 
                                      href={t.PreviewURL} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] text-[#8C6D46] hover:underline"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span className="truncate max-w-[200px]">{t.PreviewURL}</span>
                                    </a>
                                  )}
                                </div>
                              </td>

                              {/* Kategori */}
                              <td className="py-3 px-4 align-middle">
                                <span className="inline-block bg-[#8C6D46]/10 text-[#8C6D46] font-semibold text-[11px] px-2.5 py-1 rounded-full border border-[#8C6D46]/20">
                                  {t.Category || "Umum"}
                                </span>
                              </td>

                              {/* Harga */}
                              <td className="py-3 px-4 align-middle">
                                <span className="font-mono font-bold text-xs text-[#8C6D46]">
                                  {formatRupiah(t.Harga)}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="py-3 px-4 align-middle text-center">
                                <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  t.Status === 'Aktif' 
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                                }`}>
                                  {t.Status || "Aktif"}
                                </span>
                              </td>

                              {/* Aksi */}
                              <td className="py-3 px-4 align-middle text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {t.PreviewURL && (
                                    <a
                                      href={t.PreviewURL}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1.5 text-xs text-gray-600 hover:text-[#8C6D46] hover:bg-[#FAF8F5] rounded-lg border border-[#E8E1D9] transition-colors"
                                      title="Preview Tema"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setThemeModal({
                                        open: true,
                                        isEdit: true,
                                        data: { ...t }
                                      });
                                    }}
                                    className="p-1.5 text-xs text-[#8C6D46] hover:bg-[#FAF8F5] rounded-lg border border-[#E8E1D9] transition-colors cursor-pointer"
                                    title="Edit Tema"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      openDeleteConfirm("Hapus Tema", `Hapus tema "${t.Nama}"?`, () => {
                                        deleteEntity(
                                          "deleteTheme",
                                          t.ID,
                                          () => {
                                            setData((prev: typeof INITIAL_DATA) => ({
                                              ...prev,
                                              themes: prev.themes.filter(
                                                (item: any) => item.ID !== t.ID
                                              )
                                            }));
                                          },
                                          "Tema berhasil dihapus dari Spreadsheet."
                                        );
                                    }}
                                    className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
                                    title="Hapus Tema"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {data.themes.length === 0 && (
                      <div className="py-12 text-center text-gray-400 text-xs">
                        Belum ada tema dalam katalog. Klik tombol "Tambah Tema" di atas untuk menambahkan tema baru.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PRICING CRUD */}
            {dashTab === 'pricing' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Paket Harga</h2>
                  <button
                    onClick={() => {
                      setPricingModal({
                        open: true,
                        isEdit: false,
                        data: {
                          ID: `PRC-${Date.now().toString().slice(-4)}`,
                          Nama: '',
                          Harga: 199000,
                          Deskripsi: 'Paket kustom dengan layanan eksklusif.',
                          FiturText: 'Aktif Selamanya\nFoto Galeri Tanpa Batas\nQR Code Check-in Tamu\nCustom Domain\nRevisi Desain Prioritas',
                          Label: 'Spesial',
                          Featured: false,
                          Status: 'Aktif'
                        }
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Tambah Paket
                  </button>
                </div>

                <div className="flex flex-wrap justify-center items-stretch gap-6">
                  {data.pricing.map((p: any) => {
                    const featList = Array.isArray(p.Fitur) ? p.Fitur : (p.Fitur || '').split('\n').filter((f: string) => f.trim() !== '');
                    return (
                      <div key={p.ID} className="w-full sm:w-[300px] flex-1 min-w-[260px] max-w-[340px] border border-[#E8E1D9] rounded-xl p-5 space-y-3 bg-[#FAF8F5]/30 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-[#2D2723]">{p.Nama}</span>
                            {p.Featured && <span className="text-[10px] bg-[#8C6D46] text-white px-2 py-0.5 rounded font-bold">Featured</span>}
                          </div>
                          <div className="text-2xl font-serif-luxury font-bold text-[#8C6D46] font-mono">
                            {formatRupiah(p.Harga)}
                          </div>
                          <p className="text-xs text-[#766E65]">{p.Deskripsi}</p>
                          <ul className="text-[11px] text-[#766E65] space-y-1 pt-2 border-t border-[#E8E1D9]/60">
                            {featList.slice(0, 4).map((f: string, i: number) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-[#8C6D46]" /> {f}
                              </li>
                            ))}
                            {featList.length > 4 && <li className="text-[10px] text-[#8C6D46]">+{featList.length - 4} fitur lainnya</li>}
                          </ul>
                        </div>
                        <div className="pt-3 border-t border-[#E8E1D9] flex justify-between items-center">
                          <button
                            onClick={() => {
                              setPricingModal({
                                open: true,
                                isEdit: true,
                                data: {
                                  ...p,
                                  FiturText: Array.isArray(p.Fitur) ? p.Fitur.join('\n') : (p.Fitur || '')
                                }
                              });
                            }}
                            className="text-xs text-[#8C6D46] font-semibold hover:underline flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" /> Edit Paket
                          </button>
                          <button
                            onClick={() => {
                              openDeleteConfirm("Hapus Paket", `Hapus paket "${p.Nama}"?`, () => {
                                deleteEntity(
                                  "deletePricing",
                                  p.ID,
                                  () => {
                                    setData((prev: typeof INITIAL_DATA) => ({
                                      ...prev,
                                      pricing: prev.pricing.filter(
                                        (item: any) => item.ID !== p.ID
                                      )
                                    }));
                                  },
                                  "Paket berhasil dihapus dari Spreadsheet."
                                );
                            }}
                            className="text-xs text-red-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FEATURES MANAGEMENT */}
            {dashTab === 'features' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Fitur Undangan</h2>
                  <button
                    onClick={() => {
                      setFeatureModal({
                        open: true,
                        isEdit: false,
                        data: {
                          id: `FEAT-${Date.now().toString().slice(-4)}`,
                          icon: 'Sparkles',
                          title: '',
                          desc: '',
                          status: 'Aktif'
                        }
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Tambah Fitur
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.features.map((f: any) => (
                    <div key={f.id} className="p-4 border border-[#E8E1D9] rounded-xl flex items-start justify-between gap-3 bg-[#FAF8F5]/30">
                      <div>
                        <div className="font-bold text-xs text-[#2D2723]">{f.title}</div>
                        <div className="text-[11px] text-[#766E65] mt-1">{f.desc}</div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setFeatureModal({
                              open: true,
                              isEdit: true,
                              data: { ...f }
                            });
                          }}
                          className="text-[#8C6D46] hover:text-[#735735] p-1"
                          title="Edit Fitur"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            openDeleteConfirm("Hapus Fitur", `Hapus fitur "${f.title}"?`, () => {
                              deleteEntity(
                                "deleteFeature",
                                f.id,
                                () => {
                                  setData((prev: typeof INITIAL_DATA) => ({
                                    ...prev,
                                    features: prev.features.filter(
                                      (item: any) => item.id !== f.id
                                    )
                                  }));
                                },
                                "Fitur berhasil dihapus dari Spreadsheet."
                              );
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Hapus Fitur"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS */}
            {dashTab === 'testimonials' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Testimoni</h2>
                  <button
                    onClick={() => {
                      setTestiModal({
                        open: true,
                        isEdit: false,
                        data: {
                          id: `TESTI-${Date.now().toString().slice(-4)}`,
                          name: '',
                          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                          testi: '',
                          rating: 5,
                          location: 'Jakarta',
                          status: 'Aktif'
                        }
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Tambah Testimoni
                  </button>
                </div>

                <div className="space-y-3">
                  {data.testimonials.map((t: any) => (
                    <div key={t.id} className="p-4 border border-[#E8E1D9] rounded-xl flex items-center justify-between gap-4 bg-[#FAF8F5]/30">
                      <div>
                        <div className="font-bold text-xs text-[#2D2723]">{t.name} ({t.location || 'Indonesia'}) — ⭐ {t.rating}/5</div>
                        <div className="text-xs text-[#766E65] italic mt-1">"{t.testi}"</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setTestiModal({
                              open: true,
                              isEdit: true,
                              data: { ...t }
                            });
                          }}
                          className="text-[#8C6D46] hover:text-[#735735] p-1"
                          title="Edit Testimoni"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            openDeleteConfirm("Hapus Testimoni", `Hapus ulasan dari "${t.name}"?`, () => {
                              deleteEntity(
                                "deleteTestimonial",
                                t.id,
                                () => {
                                  setData((prev: typeof INITIAL_DATA) => ({
                                    ...prev,
                                    testimonials:
                                      prev.testimonials.filter(
                                        (item: any) => item.id !== t.id
                                      )
                                  }));
                                },
                                "Testimoni berhasil dihapus dari Spreadsheet."
                              );
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Hapus Testimoni"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HOW TO ORDER */}
            {dashTab === 'howto' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#E8E1D9] pb-4">
                  <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Langkah Cara Pesan</h2>
                  <button
                    onClick={() => {void saveHowToOrder();}}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg shadow-sm"
                  >
                    Simpan Perubahan
                  </button>
                </div>
                <div className="space-y-4">
                  {data.howToOrder.map((step: any, idx: number) => (
                    <div key={idx} className="p-4 border border-[#E8E1D9] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#FAF8F5]/40">
                      <div className="w-10 h-10 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] font-bold text-base flex items-center justify-center shrink-0">
                        {step.num}
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-xs">
                        <div>
                          <label className="block font-semibold text-[#2D2723] mb-1">Judul Langkah</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const updated = [...data.howToOrder];
                              updated[idx] = { ...step, title: e.target.value };
                              setData({ ...data, howToOrder: updated });
                            }}
                            className="w-full p-2 bg-white border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#2D2723] mb-1">Deskripsi Langkah</label>
                          <input
                            type="text"
                            value={step.desc}
                            onChange={(e) => {
                              const updated = [...data.howToOrder];
                              updated[idx] = { ...step, desc: e.target.value };
                              setData({ ...data, howToOrder: updated });
                            }}
                            className="w-full p-2 bg-white border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {dashTab === 'faq' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kelola Tanya Jawab (FAQ)</h2>
                  <button
                    onClick={() => {
                      setFaqModal({
                        open: true,
                        isEdit: false,
                        data: {
                          id: `FAQ-${Date.now().toString().slice(-4)}`,
                          question: '',
                          answer: ''
                        }
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Tambah FAQ
                  </button>
                </div>

                <div className="space-y-3">
                  {data.faq.map((f: any) => (
                    <div key={f.id} className="p-4 border border-[#E8E1D9] rounded-xl flex items-start justify-between gap-4 bg-[#FAF8F5]/30">
                      <div>
                        <div className="font-bold text-xs text-[#2D2723]">{f.question}</div>
                        <div className="text-xs text-[#766E65] mt-1">{f.answer}</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setFaqModal({
                              open: true,
                              isEdit: true,
                              data: { ...f }
                            });
                          }}
                          className="text-[#8C6D46] hover:text-[#735735] p-1"
                          title="Edit FAQ"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            openDeleteConfirm("Hapus FAQ", `Hapus pertanyaan "${f.question}"?`, () => {
                              deleteEntity(
                                "deleteFAQ",
                                f.id,
                                () => {
                                  setData((prev: typeof INITIAL_DATA) => ({
                                    ...prev,
                                    faq: prev.faq.filter(
                                      (item: any) => item.id !== f.id
                                    )
                                  }));
                                },
                                "FAQ berhasil dihapus dari Spreadsheet."
                              );
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Hapus FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS & API */}
            {dashTab === 'settings' && (
              <div className="space-y-6">
                
                {/* 1. Keamanan & Akun Admin */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E1D9] pb-4">
                    <div>
                      <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723] flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#8C6D46]" /> Keamanan Akun Admin
                      </h2>
                      <p className="text-xs text-[#766E65] mt-1">
                        Atur username dan password untuk login ke Dashboard Admin CMS NGULEMIN.
                      </p>
                    </div>
                    <button
                      onClick={() => {void saveAdminUsername();}}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-lg shadow-sm"
                    >
                      Simpan Perubahan
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#2D2723] mb-1.5 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#8C6D46]" /> Username Admin
                      </label>
                      <input
                        type="text"
                        value={data.settings.adminUsername || "admin"}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, adminUsername: e.target.value } })}
                        placeholder="Contoh: admin atau nama_anda"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46] focus:bg-white"
                      />
                      <p className="text-[11px] text-[#766E65] mt-1">Username yang dipakai saat masuk di halaman login.</p>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#2D2723] mb-1.5 flex items-center gap-1.5">
                        <Key className="w-4 h-4 text-[#8C6D46]" /> Password Admin Baru
                      </label>
                      <div className="relative">
                        <input
                          type={showAdminPassword ? "text" : "password"}
                          value={data.settings.adminPassword || "admin123"}
                          onChange={(e) => setData({ ...data, settings: { ...data.settings, adminPassword: e.target.value } })}
                          placeholder="Password baru..."
                          className="w-full p-2.5 pr-10 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46] focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#766E65] hover:text-[#2D2723]"
                          title={showAdminPassword ? "Sembunyikan password" : "Lihat password"}
                        >
                          {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#766E65] mt-1">Pastikan password mudah Anda ingat atau simpan dengan aman.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Logo Website & Brand Identity */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-4">
                  <div className="border-b border-[#E8E1D9] pb-4">
                    <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723] flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#8C6D46]" /> Logo Website & Identitas Navbar
                    </h2>
                    <p className="text-xs text-[#766E65] mt-1">
                      Ubah logo NGULEMIN di navbar menggunakan link file gambar (.jpg, .png, .svg). Saat logo diklik, pengunjung akan diarahkan ke Home.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#2D2723] mb-1">
                        Link URL Logo Website (Format: JPG, PNG, atau SVG)
                      </label>
                      <input
                        type="url"
                        value={data.settings.logoUrl || ""}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, logoUrl: e.target.value } })}
                        placeholder="https://domain-anda.com/logo.png atau link asset..."
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46] focus:bg-white font-mono text-[11px]"
                      />
                      <p className="text-[11px] text-[#766E65] mt-1">
                        Jika dikosongkan, navbar akan menampilkan nama teks brand (<strong>{data.settings.siteName || "NGULEMIN"}</strong>).
                      </p>
                    </div>

                    {/* Live Preview Box */}
                    <div className="sm:col-span-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E1D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-xs text-[#2D2723] mb-1">Pratinjau Tampilan di Navbar:</div>
                        <div className="h-12 px-4 py-2 bg-white rounded-lg border border-[#E8E1D9] flex items-center gap-2">
                          {data.settings.logoUrl ? (
                            <img
                              src={data.settings.logoUrl}
                              alt="Logo Preview"
                              className="h-8 w-auto max-w-[160px] object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : null}
                          <span className="font-serif-luxury font-bold text-lg text-[#8C6D46]">
                            {data.settings.siteName || "NGULEMIN"}
                          </span>
                        </div>
                      </div>
                      {data.settings.logoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setData({ ...data, settings: { ...data.settings, logoUrl: "" } });
                            triggerToast("Logo direset ke nama teks standar.");
                          }}
                          className="px-3 py-1.5 text-xs text-red-600 border border-red-200 hover:bg-white rounded-lg transition-colors"
                        >
                          Hapus Logo (Gunakan Teks Saja)
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Nama Brand / Website</label>
                      <input
                        type="text"
                        value={data.settings.siteName}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, siteName: e.target.value } })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Tagline Website</label>
                      <input
                        type="text"
                        value={data.settings.tagline || ""}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, tagline: e.target.value } })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Pengaturan Kontak & Google Apps Script */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E8E1D9] pb-4">
                    <h2 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Kontak & Integrasi Backend</h2>
                    <button
                      onClick={() => {void saveSettings();}}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#8C6D46] rounded-lg"
                    >
                      Simpan Pengaturan
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold mb-1">URL Web App Google Apps Script (API_URL)</label>
                      <input
                        type="text"
                        value={data.settings.apiUrl || ""}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, apiUrl: e.target.value } })}
                        placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg font-mono text-[11px]"
                      />
                      <p className="text-[11px] text-[#766E65] mt-1">
                        Koneksikan backend Google Spreadsheet Anda dengan menempelkan URL Web App yang dideploy dari Apps Script.
                      </p>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Nomor WhatsApp Admin (tanpa +, contoh: 6281234567890)</label>
                      <input
                        type="text"
                        value={data.settings.whatsappAdmin}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, whatsappAdmin: e.target.value } })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Email Dukungan</label>
                      <input
                        type="email"
                        value={data.settings.emailAdmin}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, emailAdmin: e.target.value } })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Akun Instagram</label>
                      <input
                        type="text"
                        value={data.settings.instagramAdmin}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, instagramAdmin: e.target.value } })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-semibold mb-1">Deskripsi Footer</label>
                      <textarea
                        value={data.settings.footerDescription}
                        onChange={(e) => setData({ ...data, settings: { ...data.settings, footerDescription: e.target.value } })}
                        rows={2}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 4: PANDUAN LENGKAP CODE.GS & DEPLOYMENT NETLIFY / VERCEL
          ========================================================================= */}
      {currentView === 'guide' && (
        <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-8">
            
            <div className="border-b border-[#E8E1D9] pb-6">
              <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">DOKUMENTASI LENGKAP</span>
              <h1 className="text-3xl font-serif-luxury font-bold text-[#2D2723] mt-1">
                Panduan Pemasangan & Source Code
              </h1>
              <p className="text-xs sm:text-sm text-[#766E65] mt-2">
                Instruksi langkah demi langkah memasang Google Spreadsheet, deploy Code.gs ke Google Apps Script, dan menerbitkan frontend di Netlify atau Vercel.
              </p>
            </div>

            {/* Step 1 */}
            <div className="space-y-3 text-xs sm:text-sm text-[#2D2723]">
              <h2 className="text-base font-bold text-[#8C6D46] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8C6D46] text-white flex items-center justify-center text-xs">1</span>
                Menyiapkan Google Spreadsheet & Code.gs
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-[#766E65] leading-relaxed">
                <li>Buka <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-[#8C6D46] font-semibold underline">sheets.new</a> untuk membuat spreadsheet baru. Beri judul <strong>Database NGULEMIN</strong>.</li>
                <li>Di menu atas spreadsheet, klik <strong>Ekstensi &gt; Apps Script</strong>.</li>
                <li>Hapus kode bawaan <code>myFunction()</code>, lalu salin seluruh isi <strong>Code.gs</strong> melalui tombol di bawah.</li>
                <li>Simpan project (Ctrl+S atau klik ikon disket).</li>
                <li>Pada toolbar Apps Script, pilih fungsi <code>initDatabase</code> lalu klik <strong>Jalankan (Run)</strong>. Berikan izin akses akun Google jika diminta. Fungsi ini akan membuat otomatis seluruh sheet: <em>Settings, Home, Themes, Pricing, Features, Testimonials, HowToOrder, FAQ, Orders, Admin</em>.</li>
              </ol>

              {/* Code Box */}
              <div className="mt-4 p-4 bg-[#FAF8F5] border border-[#E8E1D9] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#2D2723]">Code.gs (Backend API)</span>
                  <button
                    onClick={() => {
                      fetch('/Code.gs')
                        .then(r => r.text())
                        .then(txt => {
                          navigator.clipboard.writeText(txt);
                          setCodeCopied(true);
                          triggerToast("Seluruh isi Code.gs disalin ke clipboard!");
                          setTimeout(() => setCodeCopied(false), 2000);
                        })
                        .catch(() => {
                          triggerToast("File Code.gs ada di root folder project Anda.");
                        });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#8C6D46] border border-[#8C6D46] rounded-md hover:bg-white transition-colors"
                  >
                    {codeCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{codeCopied ? "Berhasil Disalin" : "Salin File Code.gs"}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#766E65]">
                  File <code>/Code.gs</code> sudah tersedia secara lengkap di direktori root aplikasi ini dan siap disalin ke Google Apps Script Editor.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 text-xs sm:text-sm text-[#2D2723] pt-4 border-t border-[#E8E1D9]">
              <h2 className="text-base font-bold text-[#8C6D46] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8C6D46] text-white flex items-center justify-center text-xs">2</span>
                Deploy Google Apps Script sebagai Web App
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-[#766E65] leading-relaxed">
                <li>Di Apps Script, klik tombol biru <strong>Terapkan (Deploy) &gt; Penerapan Baru (New deployment)</strong>.</li>
                <li>Pilih jenis penerapan: <strong>Aplikasi web (Web app)</strong>.</li>
                <li>Isi deskripsi: <strong>API NGULEMIN Production</strong>.</li>
                <li>Pilih <em>Jalankan sebagai (Execute as)</em>: <strong>Saya (Email Anda)</strong>.</li>
                <li>Pilih <em>Siapa yang memiliki akses (Who has access)</em>: <strong>Siapa saja (Anyone)</strong>. <span className="text-red-600 font-semibold">(Wajib agar form pemesanan dan website dapat memanggil API tanpa login Google)</span>.</li>
                <li>Klik <strong>Terapkan</strong>, lalu salin URL Aplikasi Web yang berakhiran <code>/exec</code>.</li>
                <li>Tempelkan URL tersebut ke <code>config.js</code> atau di menu Dashboard &gt; Pengaturan Umum.</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 text-xs sm:text-sm text-[#2D2723] pt-4 border-t border-[#E8E1D9]">
              <h2 className="text-base font-bold text-[#8C6D46] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8C6D46] text-white flex items-center justify-center text-xs">3</span>
                Deploy Frontend ke Netlify atau Vercel
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D9] rounded-xl">
                  <h3 className="font-bold text-[#2D2723] mb-1">Opsi A: Netlify Drop (Paling Mudah)</h3>
                  <p className="text-xs text-[#766E65] leading-relaxed">
                    Folder <code>/public</code> atau build statis dapat langsung di-drag & drop ke <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-[#8C6D46] underline">app.netlify.com/drop</a>. Website Anda langsung online dengan HTTPS gratis!
                  </p>
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D9] rounded-xl">
                  <h3 className="font-bold text-[#2D2723] mb-1">Opsi B: Vercel</h3>
                  <p className="text-xs text-[#766E65] leading-relaxed">
                    Import repositori Git ke Vercel atau gunakan CLI dengan perintah <code>vercel deploy</code>. Vercel otomatis mendeteksi Vite atau HTML statis dan menyajikan di edge network global.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => setCurrentView('public')}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl"
              >
                &larr; Kembali ke Website Utama
              </button>
            </div>

          </div>
        </main>
      )}

      {/* =========================================================================
          FOOTER (Semantic Footer with Social Links & Branding)
          ========================================================================= */}
      {currentView === 'public' && (
        <footer className="bg-[#24201D] text-[#ECE7E1] pt-16 pb-8 border-t border-[#38332E]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
              
              <div className="md:col-span-5">
                <span className="text-2xl font-serif-luxury font-bold text-[#D4AF37] tracking-wider block mb-3">
                  {data.settings.siteName}
                </span>
                <p className="text-xs sm:text-sm text-[#A9A198] leading-relaxed max-w-sm mb-6">
                  {data.settings.footerDescription}
                </p>
                <div className="text-xs text-[#A9A198]">
                  Tagline: <span className="text-white italic">"{data.settings.tagline}"</span>
                </div>
              </div>

              <div className="md:col-span-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Navigasi Halaman</h4>
                <ul className="space-y-2 text-xs text-[#A9A198]">
                  <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
                  <li><a href="#tema" className="hover:text-[#D4AF37] transition-colors">Katalog Tema</a></li>
                  <li><a href="#harga" className="hover:text-[#D4AF37] transition-colors">Paket Harga</a></li>
                  <li><a href="#fitur" className="hover:text-[#D4AF37] transition-colors">Fitur Undangan</a></li>
                  <li><a href="#testimoni" className="hover:text-[#D4AF37] transition-colors">Testimoni Klien</a></li>
                  <li><a href="#cara-pesan" className="hover:text-[#D4AF37] transition-colors">Cara Pesan</a></li>
                  <li><a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
                </ul>
              </div>

              <div className="md:col-span-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Kontak & Pemesanan</h4>
                <ul className="space-y-2 text-xs text-[#A9A198]">
                  <li>
                    WhatsApp: <a href={`https://wa.me/${data.settings.whatsappAdmin.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#D4AF37]">+{data.settings.whatsappAdmin}</a>
                  </li>
                  <li>
                    Instagram: <a href={`https://instagram.com/${data.settings.instagramAdmin}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#D4AF37]">@{data.settings.instagramAdmin}</a>
                  </li>
                  <li>
                    Email: <a href={`mailto:${data.settings.emailAdmin}`} className="text-white hover:text-[#D4AF37]">{data.settings.emailAdmin}</a>
                  </li>
                  <li className="pt-3">
                    <button
                      onClick={() => {
                        if (adminToken) setCurrentView('dashboard');
                        else setCurrentView('login');
                      }}
                      className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      Login Admin CMS &rarr;
                    </button>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#766E65]">
              <p>{data.settings.copyrightText}</p>
              <p>Undangan Digital Elegan untuk Momen Istimewa.</p>
            </div>
          </div>
        </footer>
      )}

      {/* =========================================================================
          ORDER MODAL (Popup Form Pemesanan with WhatsApp Formatting)
          ========================================================================= */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#E8E1D9] shadow-2xl flex flex-col">
            
            <div className="p-5 sm:p-6 border-b border-[#E8E1D9] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-serif-luxury font-bold text-[#2D2723]">Formulir Pemesanan</h3>
                <p className="text-xs text-[#766E65]">Lengkapi data pernikahan Anda untuk pembuatan undangan digital.</p>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="p-1.5 text-[#766E65] hover:text-[#2D2723] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSubmittedSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif-luxury font-bold text-[#2D2723]">
                  Pesanan Berhasil Dicatat!
                </h4>
                <p className="text-xs sm:text-sm text-[#766E65] leading-relaxed">
                  Data Anda telah tersimpan. Silakan lanjutkan pesan otomatis ini ke WhatsApp Admin untuk memulai pengerjaan.
                </p>
                
                <div className="pt-2">
                  <a
                    href={lastGeneratedWaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md w-full"
                  >
                    <Send className="w-4 h-4" /> Buka WhatsApp Admin Sekarang
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setOrderModalOpen(false)}
                  className="text-xs text-[#766E65] hover:text-[#2D2723] underline block mx-auto pt-2"
                >
                  Tutup Jendela Ini
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Nama Pemesan *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.nama}
                      onChange={(e) => setOrderForm({ ...orderForm, nama: e.target.value })}
                      placeholder="Contoh: Dimas Aditya"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={orderForm.whatsapp}
                      onChange={(e) => setOrderForm({ ...orderForm, whatsapp: e.target.value })}
                      placeholder="081234567890"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Pilihan Tema *</label>
                    <select
                      value={orderForm.tema}
                      onChange={(e) => setOrderForm({ ...orderForm, tema: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    >
                      {data.themes.map((t: any) => (
                        <option key={t.ID} value={t.Nama}>
                          {t.Nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Paket yang Dipilih *</label>
                    <select
                      value={orderForm.paket}
                      onChange={(e) => setOrderForm({ ...orderForm, paket: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    >
                      {data.pricing.map((p: any) => (
                        <option key={p.ID} value={p.Nama}>
                          Paket {p.Nama} ({formatRupiah(p.Harga)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Mempelai Pria *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.mempelaiPria}
                      onChange={(e) => setOrderForm({ ...orderForm, mempelaiPria: e.target.value })}
                      placeholder="Nama Lengkap Pria"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Mempelai Wanita *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.mempelaiWanita}
                      onChange={(e) => setOrderForm({ ...orderForm, mempelaiWanita: e.target.value })}
                      placeholder="Nama Lengkap Wanita"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Tanggal Pernikahan *</label>
                    <input
                      type="date"
                      required
                      value={orderForm.tanggalNikah}
                      onChange={(e) => setOrderForm({ ...orderForm, tanggalNikah: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2723] mb-1">Lokasi Acara *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.lokasi}
                      onChange={(e) => setOrderForm({ ...orderForm, lokasi: e.target.value })}
                      placeholder="Kota / Nama Gedung"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-[#2D2723] mb-1">Catatan Tambahan (Opsional)</label>
                    <textarea
                      rows={2}
                      value={orderForm.catatan}
                      onChange={(e) => setOrderForm({ ...orderForm, catatan: e.target.value })}
                      placeholder="Permintaan lagu khusus, warna latar, atau detail rundown..."
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                    />
                  </div>

                </div>

                <div className="pt-4 border-t border-[#E8E1D9] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm"
                  >
                    Kirim Pesanan & Hubungkan WA
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
          CRUD MODALS (Theme, Pricing, Feature, Testi, FAQ, and Delete Confirmation)
          ========================================================================= */}

      {/* 1. MODAL THEME */}
      {themeModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#E8E1D9] shadow-2xl flex flex-col">
            <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-serif-luxury font-bold text-[#2D2723]">
                {themeModal.isEdit ? `Edit Tema: ${themeModal.data.Nama}` : "Tambah Tema Undangan Baru"}
              </h3>
              <button
                onClick={() => setThemeModal(prev => ({ ...prev, open: false }))}
                className="p-1 text-[#766E65] hover:text-[#2D2723]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const d = themeModal.data;
                if (!d.Nama.trim()) {
                  triggerToast("Nama tema tidak boleh kosong");
                  return;
                }
                if (themeModal.isEdit) {
  try {
    const apiUrl =
      (data.settings.apiUrl ||
        ((window as any).CONFIG?.API_URL as string) ||
        "").trim();

    if (!apiUrl) {
      throw new Error("URL Google Apps Script belum tersedia.");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
  action: "updateTheme",
  token: adminToken,
  data: d
})
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Gagal memperbarui tema.");
    }

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      themes: prev.themes.map((t: any) =>
        t.ID === d.ID ? d : t
      )
    }));

    triggerToast("Tema berhasil diperbarui di Spreadsheet!");
  } catch (error: any) {
    console.error("Update Theme Error:", error);
    triggerToast(error.message || "Gagal memperbarui tema.");
    return;
  }
} else {
  try {
    const apiUrl =
      (data.settings.apiUrl ||
        ((window as any).CONFIG?.API_URL as string) ||
        "").trim();

    if (!apiUrl) {
      throw new Error("URL Google Apps Script belum tersedia.");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
  action: "createTheme",
  token: adminToken,
  data: d
})
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Gagal menambahkan tema.");
    }

    setData((prev: typeof INITIAL_DATA) => ({
      ...prev,
      themes: [...prev.themes, d]
    }));

    triggerToast("Tema baru berhasil ditambahkan ke Spreadsheet!");
  } catch (error: any) {
    console.error("Create Theme Error:", error);
    triggerToast(error.message || "Gagal menambahkan tema.");
    return;
  }
}

setThemeModal(prev => ({ ...prev, open: false }));
              }}
              className="p-5 sm:p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">Nama Tema *</label>
                  <input
                    type="text"
                    required
                    value={themeModal.data.Nama}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, Nama: e.target.value } })}
                    placeholder="Contoh: Royal Velvet Gold"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">URL Gambar Sampul *</label>
                  <input
                    type="text"
                    required
                    value={themeModal.data.Gambar}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, Gambar: e.target.value } })}
                    placeholder="https://images.unsplash.com/... atau asset path"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2D2723] mb-1">Harga (Rp) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={themeModal.data.Harga}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, Harga: Number(e.target.value) } })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2D2723] mb-1">Status</label>
                  <select
                    value={themeModal.data.Status}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, Status: e.target.value } })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">Kategori Desain *</label>
                  <select
                    value={themeModal.data.Category}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, Category: e.target.value } })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  >
                    {(data.categories || []).map((cat: string) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {!data.categories?.includes(themeModal.data.Category) && themeModal.data.Category && (
                      <option value={themeModal.data.Category}>{themeModal.data.Category}</option>
                    )}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">Link Demo Preview</label>
                  <input
                    type="url"
                    value={themeModal.data.PreviewURL}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, PreviewURL: e.target.value } })}
                    placeholder="https://ngulemin.id/preview/demo"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                  <p className="text-[11px] text-[#766E65] mt-1">Saat calon pembeli klik 'Preview', halaman akan langsung berpindah ke link ini.</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    value={themeModal.data.Deskripsi}
                    onChange={(e) => setThemeModal({ ...themeModal, data: { ...themeModal.data, Deskripsi: e.target.value } })}
                    placeholder="Desain tema elegan dengan sentuhan ornamen floral emas..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setThemeModal(prev => ({ ...prev, open: false }))}
                  className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm"
                >
                  {themeModal.isEdit ? "Simpan Perubahan" : "Tambah Tema"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL PRICING */}
      {pricingModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#E8E1D9] shadow-2xl flex flex-col">
            <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-serif-luxury font-bold text-[#2D2723]">
                {pricingModal.isEdit ? `Edit Paket: ${pricingModal.data.Nama}` : "Tambah Paket Harga Baru"}
              </h3>
              <button
                onClick={() => setPricingModal(prev => ({ ...prev, open: false }))}
                className="p-1 text-[#766E65] hover:text-[#2D2723]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void savePricing();
                }}
              className="p-5 sm:p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#2D2723] mb-1">Nama Paket *</label>
                  <input
                    type="text"
                    required
                    value={pricingModal.data.Nama}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, Nama: e.target.value } })}
                    placeholder="Contoh: VIP EXCLUSIVE"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2D2723] mb-1">Harga (Rp) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={pricingModal.data.Harga}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, Harga: Number(e.target.value) } })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2D2723] mb-1">Label / Badge (Opsional)</label>
                  <input
                    type="text"
                    value={pricingModal.data.Label}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, Label: e.target.value } })}
                    placeholder="Contoh: Terpopuler, Eksklusif"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2D2723] mb-1">Status</label>
                  <select
                    value={pricingModal.data.Status}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, Status: e.target.value } })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured-pkg-chk"
                    checked={pricingModal.data.Featured}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, Featured: e.target.checked } })}
                    className="w-4 h-4 text-[#8C6D46] rounded focus:ring-0"
                  />
                  <label htmlFor="featured-pkg-chk" className="font-semibold text-[#2D2723] cursor-pointer">
                    Jadikan Paket Unggulan (Featured Highlight)
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={pricingModal.data.Deskripsi}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, Deskripsi: e.target.value } })}
                    placeholder="Pilihan paling tepat untuk resepsi pernikahan modern..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2D2723] mb-1">Daftar Fitur (Pisahkan setiap baris)</label>
                  <textarea
                    rows={4}
                    value={pricingModal.data.FiturText}
                    onChange={(e) => setPricingModal({ ...pricingModal, data: { ...pricingModal.data, FiturText: e.target.value } })}
                    placeholder="Aktif Selamanya&#10;RSVP & Buku Tamu&#10;Navigasi Google Maps&#10;Amplop Digital"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46] font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPricingModal(prev => ({ ...prev, open: false }))}
                  className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm"
                >
                  {pricingModal.isEdit ? "Simpan Perubahan" : "Tambah Paket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL FEATURE */}
      {featureModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-md border border-[#E8E1D9] shadow-2xl flex flex-col">
            <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between">
              <h3 className="text-lg font-serif-luxury font-bold text-[#2D2723]">
                {featureModal.isEdit ? "Edit Fitur Undangan" : "Tambah Fitur Baru"}
              </h3>
              <button
                onClick={() => setFeatureModal(prev => ({ ...prev, open: false }))}
                className="p-1 text-[#766E65] hover:text-[#2D2723]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void saveFeature();
              }}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Judul Fitur *</label>
                <input
                  type="text"
                  required
                  value={featureModal.data.title}
                  onChange={(e) => setFeatureModal({ ...featureModal, data: { ...featureModal.data, title: e.target.value } })}
                  placeholder="Contoh: QR Code Check-in"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Deskripsi Fitur *</label>
                <textarea
                  rows={2}
                  required
                  value={featureModal.data.desc}
                  onChange={(e) => setFeatureModal({ ...featureModal, data: { ...featureModal.data, desc: e.target.value } })}
                  placeholder="Kemudahan scan kehadiran tamu undangan secara cepat di lokasi acara."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E1D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFeatureModal(prev => ({ ...prev, open: false }))}
                  className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm"
                >
                  {featureModal.isEdit ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL TESTIMONI */}
      {testiModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-md border border-[#E8E1D9] shadow-2xl flex flex-col">
            <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between">
              <h3 className="text-lg font-serif-luxury font-bold text-[#2D2723]">
                {testiModal.isEdit ? "Edit Testimoni" : "Tambah Testimoni Baru"}
              </h3>
              <button
                onClick={() => setTestiModal(prev => ({ ...prev, open: false }))}
                className="p-1 text-[#766E65] hover:text-[#2D2723]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void saveTestimonial();
              }}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Nama Pasangan / Klien *</label>
                <input
                  type="text"
                  required
                  value={testiModal.data.name}
                  onChange={(e) => setTestiModal({ ...testiModal, data: { ...testiModal.data, name: e.target.value } })}
                  placeholder="Contoh: Dimas & Sarah"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Kota / Lokasi</label>
                <input
                  type="text"
                  value={testiModal.data.location}
                  onChange={(e) => setTestiModal({ ...testiModal, data: { ...testiModal.data, location: e.target.value } })}
                  placeholder="Contoh: Jakarta Selatan"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Isi Ulasan Testimoni *</label>
                <textarea
                  rows={3}
                  required
                  value={testiModal.data.testi}
                  onChange={(e) => setTestiModal({ ...testiModal, data: { ...testiModal.data, testi: e.target.value } })}
                  placeholder="Pelayanan sangat ramah, hasilnya rapi dan cepat selesai..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E1D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTestiModal(prev => ({ ...prev, open: false }))}
                  className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm"
                >
                  {testiModal.isEdit ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL FAQ */}
      {faqModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-md border border-[#E8E1D9] shadow-2xl flex flex-col">
            <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between">
              <h3 className="text-lg font-serif-luxury font-bold text-[#2D2723]">
                {faqModal.isEdit ? "Edit FAQ" : "Tambah FAQ Baru"}
              </h3>
              <button
                onClick={() => setFaqModal(prev => ({ ...prev, open: false }))}
                className="p-1 text-[#766E65] hover:text-[#2D2723]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
             onSubmit={(e) => {
                e.preventDefault();
                void saveFaq();
              }}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Pertanyaan *</label>
                <input
                  type="text"
                  required
                  value={faqModal.data.question}
                  onChange={(e) => setFaqModal({ ...faqModal, data: { ...faqModal.data, question: e.target.value } })}
                  placeholder="Contoh: Apakah bisa request musik sendiri?"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2723] mb-1">Jawaban *</label>
                <textarea
                  rows={3}
                  required
                  value={faqModal.data.answer}
                  onChange={(e) => setFaqModal({ ...faqModal, data: { ...faqModal.data, answer: e.target.value } })}
                  placeholder="Tentu saja! Anda dapat memilih lagu favorit atau menyertakan link audio pilihan..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D9] rounded-lg focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E1D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFaqModal(prev => ({ ...prev, open: false }))}
                  className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#8C6D46] hover:bg-[#735735] rounded-xl shadow-sm"
                >
                  {faqModal.isEdit ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL DELETE CONFIRMATION */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 border border-[#E8E1D9] shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#2D2723]">{deleteModal.title || "Konfirmasi Hapus"}</h4>
              <p className="text-xs text-[#766E65] mt-1.5 leading-relaxed">{deleteModal.message || "Apakah Anda yakin ingin menghapus data ini?"}</p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal(prev => ({ ...prev, open: false }))}
                className="px-4 py-2 text-xs font-semibold text-[#766E65] hover:text-[#2D2723] border border-[#E8E1D9] rounded-lg"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => deleteModal.onConfirm()}
                className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOAST NOTIFICATION COMPONENT
          ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#E8E1D9] border-l-4 border-l-[#8C6D46] px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-medium text-[#2D2723] animate-slideIn">
          <Check className="w-4 h-4 text-[#8C6D46]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
