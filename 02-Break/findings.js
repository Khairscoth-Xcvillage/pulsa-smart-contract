const temuan = [

  // =========================
  // LEVEL 0 — BUG FATAL
  // =========================

  {
    id: 1,
    judul: "Event Salah Saat Pause Sistem",
    tingkatKeparahan: "KRITIS",
    kategori: "Bug",
    deskripsi: "Fungsi pauseSystem justru mengeluarkan event Unpaused saat sistem dihentikan.",
    dampak: "Sistem monitoring, backend, dan auditor membaca status sistem secara salah.",
    contohKode: "emit Unpaused();",
    rekomendasi: "Ganti event menjadi emit Paused() saat sistem dipause."
  },

  {
    id: 2,
    judul: "Tidak Ada Fungsi Unpause Sistem",
    tingkatKeparahan: "KRITIS",
    kategori: "Desain",
    deskripsi: "Kontrak hanya memiliki fungsi pause tanpa fungsi untuk mengaktifkan kembali sistem.",
    dampak: "Sekali sistem dipause, kontrak mati permanen (denial of service total).",
    contohKode: "function pauseSystem() external onlyAdmin",
    rekomendasi: "Tambahkan fungsi unpauseSystem() dengan kontrol admin."
  },

  {
    id: 3,
    judul: "Event Paused Tidak Pernah Digunakan",
    tingkatKeparahan: "SEDANG",
    kategori: "Code Smell",
    deskripsi: "Event Paused dideklarasikan tetapi tidak pernah dipanggil.",
    dampak: "Log aktivitas sistem tidak konsisten dan sulit diaudit.",
    contohKode: "event Paused();",
    rekomendasi: "Emit event Paused() di dalam fungsi pauseSystem()."
  },

  // =========================
  // LEVEL 1 — ABUSE & POWER ADMIN
  // =========================

  {
    id: 4,
    judul: "Admin Dapat Menambah Pulsa Tanpa Batas",
    tingkatKeparahan: "TINGGI",
    kategori: "Sentralisasi",
    deskripsi: "Admin dapat menambahkan pulsa ke user tanpa batasan supply.",
    dampak: "Pulsa dapat dicetak tanpa kontrol dan kehilangan nilai.",
    contohKode: "pulsaBalance[user] += amount;",
    rekomendasi: "Tambahkan totalSupply dan batas maksimum pulsa."
  },

  {
    id: 5,
    judul: "Admin Dapat Memotong Pulsa User Secara Sepihak",
    tingkatKeparahan: "TINGGI",
    kategori: "Kepercayaan",
    deskripsi: "Admin dapat mengurangi pulsa user tanpa persetujuan user.",
    dampak: "Pulsa bukan benar-benar milik user.",
    contohKode: "deductPulsa(address user, uint256 amount)",
    rekomendasi: "Gunakan mekanisme approval atau bukti billing."
  },

  {
    id: 6,
    judul: "Tidak Ada Mekanisme Sengketa untuk User",
    tingkatKeparahan: "SEDANG",
    kategori: "Governance",
    deskripsi: "User tidak memiliki cara untuk menolak atau memverifikasi pemotongan pulsa.",
    dampak: "Potensi penyalahgunaan internal tanpa akuntabilitas.",
    contohKode: "Tidak ada fungsi dispute",
    rekomendasi: "Tambahkan mekanisme verifikasi atau delay pemotongan."
  },

  {
    id: 7,
    judul: "Admin Bisa Memanipulasi Aktivitas Log",
    tingkatKeparahan: "SEDANG",
    kategori: "Audit",
    deskripsi: "Admin dapat topUp dan deduct pulsa berulang hanya untuk menghasilkan event.",
    dampak: "Log aktivitas dapat dipalsukan tanpa aktivitas nyata.",
    contohKode: "emit TopUp(...), emit PulsaUsed(...)",
    rekomendasi: "Tambahkan metadata konteks penggunaan pulsa."
  },

  {
    id: 8,
    judul: "Admin Bisa Mengganti Admin ke Address Tidak Valid",
    tingkatKeparahan: "TINGGI",
    kategori: "Keamanan",
    deskripsi: "Admin dapat diganti ke address yang salah atau tidak terkontrol.",
    dampak: "Sistem bisa diambil alih atau terkunci permanen.",
    contohKode: "changeAdmin(address newAdmin)",
    rekomendasi: "Gunakan multi-sig atau time-lock untuk pergantian admin."
  },

  {
    id: 9,
    judul: "Tidak Ada Mekanisme Recovery Admin",
    tingkatKeparahan: "TINGGI",
    kategori: "Operasional",
    deskripsi: "Jika private key admin hilang, sistem tidak dapat dipulihkan.",
    dampak: "Kontrak terkunci selamanya.",
    contohKode: "admin = msg.sender;",
    rekomendasi: "Tambahkan recovery admin atau multi-admin."
  },

  // =========================
  // LEVEL 2 — LOGIKA BISNIS
  // =========================

  {
    id: 10,
    judul: "Pulsa Tidak Memiliki Sumber Nilai",
    tingkatKeparahan: "TINGGI",
    kategori: "Ekonomi",
    deskripsi: "Pulsa tidak didukung oleh ETH, token, atau pembayaran nyata.",
    dampak: "Pulsa hanyalah angka tanpa nilai ekonomi.",
    contohKode: "topUp(address user, uint256 amount)",
    rekomendasi: "Hubungkan topUp dengan pembayaran atau token."
  },

  {
    id: 11,
    judul: "Tidak Ada Total Pulsa Beredar",
    tingkatKeparahan: "SEDANG",
    kategori: "Akuntansi",
    deskripsi: "Sistem tidak mencatat total pulsa yang beredar.",
    dampak: "Sulit melakukan audit makro sistem.",
    contohKode: "Tidak ada totalSupply",
    rekomendasi: "Tambahkan variabel totalPulsa."
  },

  {
    id: 12,
    judul: "Pemakaian Pulsa Tidak Terkait Layanan Nyata",
    tingkatKeparahan: "SEDANG",
    kategori: "Bisnis",
    deskripsi: "useMyPulsa tidak terhubung ke produk atau layanan tertentu.",
    dampak: "Pulsa bisa dipakai tanpa efek nyata.",
    contohKode: "useMyPulsa(uint256 amount)",
    rekomendasi: "Tambahkan parameter konteks layanan."
  },

  {
    id: 13,
    judul: "Event PulsaUsed Tidak Membedakan Sumber",
    tingkatKeparahan: "SEDANG",
    kategori: "Audit",
    deskripsi: "Event PulsaUsed digunakan untuk user dan admin billing.",
    dampak: "Sulit membedakan pemakaian user dan pemotongan admin.",
    contohKode: "emit PulsaUsed(user, amount)",
    rekomendasi: "Pisahkan event user dan admin."
  },

  {
    id: 14,
    judul: "Pulsa Tidak Bisa Dipindahkan Antar User",
    tingkatKeparahan: "RENDAH",
    kategori: "Fleksibilitas",
    deskripsi: "User tidak bisa mentransfer pulsa ke user lain.",
    dampak: "Pulsa bukan aset fleksibel.",
    contohKode: "Tidak ada fungsi transfer",
    rekomendasi: "Tambahkan fungsi transferPulsa."
  },

  {
    id: 15,
    judul: "Pulsa Tidak Bisa Disetujui (Approve)",
    tingkatKeparahan: "RENDAH",
    kategori: "Desain",
    deskripsi: "Tidak ada mekanisme approve seperti ERC20.",
    dampak: "Integrasi pihak ketiga sulit dilakukan.",
    contohKode: "Tidak ada approve",
    rekomendasi: "Tambahkan sistem allowance jika diperlukan."
  },

  // =========================
  // LEVEL 3 — DESAIN KEAMANAN
  // =========================

  {
    id: 16,
    judul: "Pause Sistem Bersifat One-Way",
    tingkatKeparahan: "TINGGI",
    kategori: "Keamanan",
    deskripsi: "Pause sistem menghentikan semua aktivitas tanpa jalan kembali.",
    dampak: "Kesalahan admin berdampak fatal.",
    contohKode: "paused = true;",
    rekomendasi: "Tambahkan unpause dan safeguard."
  },

  {
    id: 17,
    judul: "Pause Tidak Memblokir Pergantian Admin",
    tingkatKeparahan: "SEDANG",
    kategori: "Logika",
    deskripsi: "Saat sistem pause, admin masih bisa diganti.",
    dampak: "Perubahan sensitif saat kondisi darurat.",
    contohKode: "changeAdmin() tanpa whenNotPaused",
    rekomendasi: "Blokir perubahan admin saat pause."
  },

  {
    id: 18,
    judul: "Tidak Ada Rate Limit Operasi Admin",
    tingkatKeparahan: "SEDANG",
    kategori: "Abuse",
    deskripsi: "Admin dapat melakukan operasi masif dalam waktu singkat.",
    dampak: "Potensi spam event dan overload off-chain.",
    contohKode: "topUp berulang",
    rekomendasi: "Tambahkan rate limit atau batch control."
  },

  {
    id: 19,
    judul: "Tidak Ada Validasi User pada deductPulsa",
    tingkatKeparahan: "SEDANG",
    kategori: "Validasi",
    deskripsi: "Admin bisa memotong pulsa address apa pun.",
    dampak: "Risiko kesalahan target user.",
    contohKode: "deductPulsa(address user)",
    rekomendasi: "Tambahkan whitelist atau validasi tambahan."
  },

  {
    id: 20,
    judul: "Mapping Private Tidak Memberi Privasi Nyata",
    tingkatKeparahan: "RENDAH",
    kategori: "Privasi",
    deskripsi: "pulsaBalance bersifat private tetapi dapat dibaca lewat fungsi publik.",
    dampak: "False sense of privacy.",
    contohKode: "mapping(address => uint256) private pulsaBalance",
    rekomendasi: "Batasi akses baca jika diperlukan."
  },

  // =========================
  // LEVEL 4 — OPERASIONAL & UX
  // =========================

  {
    id: 21,
    judul: "Tidak Ada Event Saat Deploy Sistem Aktif",
    tingkatKeparahan: "RENDAH",
    kategori: "UX",
    deskripsi: "Tidak ada event yang menandakan sistem aktif saat deploy.",
    dampak: "Backend tidak tahu status awal sistem.",
    contohKode: "constructor() { admin = msg.sender; }",
    rekomendasi: "Emit event SystemInitialized."
  },

  {
    id: 22,
    judul: "Tidak Ada Versi Kontrak",
    tingkatKeparahan: "RENDAH",
    kategori: "Maintenance",
    deskripsi: "Kontrak tidak memiliki informasi versi.",
    dampak: "Sulit maintenance dan upgrade.",
    contohKode: "Tidak ada version",
    rekomendasi: "Tambahkan constant version."
  },

  {
    id: 23,
    judul: "Tidak Ada Mekanisme Migrasi Data",
    tingkatKeparahan: "SEDANG",
    kategori: "Upgrade",
    deskripsi: "Tidak ada cara migrasi saldo jika kontrak diganti.",
    dampak: "Saldo user terkunci.",
    contohKode: "Tidak ada migrate",
    rekomendasi: "Tambahkan fitur snapshot atau migrasi."
  },

  {
    id: 24,
    judul: "User Tidak Bisa Melihat Riwayat Pemakaian Pulsa",
    tingkatKeparahan: "RENDAH",
    kategori: "UX",
    deskripsi: "Kontrak hanya menyimpan saldo, bukan riwayat.",
    dampak: "User tidak bisa audit penggunaan sendiri.",
    contohKode: "Tidak ada history",
    rekomendasi: "Tambahkan log terstruktur atau mapping riwayat."
  },

  // =========================
  // LEVEL 5 — FILOSOFIS / WEB3
  // =========================

  {
    id: 25,
    judul: "Pulsa Bukan Aset Milik User",
    tingkatKeparahan: "TINGGI",
    kategori: "Prinsip Web3",
    deskripsi: "Admin memiliki kontrol penuh atas pulsa user.",
    dampak: "Bertentangan dengan prinsip self-custody.",
    contohKode: "deductPulsa oleh admin",
    rekomendasi: "Batasi kekuasaan admin atau gunakan DAO."
  },

  {
    id: 26,
    judul: "Kontrak Bertindak Seperti Database Terpusat",
    tingkatKeparahan: "SEDANG",
    kategori: "Arsitektur",
    deskripsi: "Blockchain tidak menambah trust karena semua dikontrol admin.",
    dampak: "Nilai tambah blockchain hilang.",
    contohKode: "onlyAdmin di hampir semua fungsi penting",
    rekomendasi: "Kurangi sentralisasi logika."
  },

  {
    id: 27,
    judul: "Tidak Ada Crypto-Economic Security",
    tingkatKeparahan: "SEDANG",
    kategori: "Ekonomi",
    deskripsi: "Tidak ada stake, cost, atau punishment dalam sistem.",
    dampak: "Keamanan hanya berbasis kepercayaan.",
    contohKode: "Tidak ada msg.value atau stake",
    rekomendasi: "Tambahkan mekanisme ekonomi."
  },

  {
    id: 28,
    judul: "Blockchain Tidak Memberi Manfaat Nyata",
    tingkatKeparahan: "RENDAH",
    kategori: "Evaluasi",
    deskripsi: "Seluruh sistem bisa dijalankan tanpa blockchain.",
    dampak: "Overengineering tanpa manfaat.",
    contohKode: "Semua logika terpusat",
    rekomendasi: "Evaluasi ulang kebutuhan blockchain."
  }

];
