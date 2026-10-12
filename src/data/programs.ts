export type ProgramId = 'iapa' | 'father' | 'fitrah' | 'ushuluna' | 'hbl' | 'hta' | 'pkgq' | 'iaiee' | 'deenup';
type Question = { question: string; answer: string };
type Program = {
  id: ProgramId;
  name: string;
  href: string;
  group: 'keluarga' | 'anak' | 'dewasa' | 'pendidik';
  audience: string;
  format: string;
  focus: string;
  summary: string;
  image: string;
  sections: [string, string][];
  preparation: string[];
  questions: Question[];
  related: ProgramId[];
};

export const programs: Program[] = [
  {
    id: 'iapa', name: 'Ihsanul Adab Parenting Academy', href: '/iapa/', group: 'keluarga',
    audience: 'Ayah, ibu, dan pendamping anak', format: 'Webinar, kelas bertahap, dan tematik',
    focus: 'Pengasuhan, komunikasi, dan adab rumah',
    summary: 'Pahami kebutuhan anak, kelola respons orang tua, dan bangun rutinitas keluarga yang dapat dijalankan.',
    image: '/images/iapa-family-garden-hero.png',
    sections: [['Pilihan kelas', '#program-iapa'], ['Pendekatan', '#pendekatan']],
    preparation: ['Catat usia anak dan satu situasi pengasuhan yang ingin diperbaiki.', 'Kenali rutinitas keluarga dan waktu belajar yang tersedia.', 'Pilih satu kebiasaan kecil yang ingin dilatih bersama pasangan atau pendamping anak.'],
    questions: [
      { question: 'Apakah hanya ibu yang dapat mengikuti IAPA?', answer: 'IAPA ditujukan untuk ayah dan ibu. Pendamping anak di rumah juga dapat menanyakan kelas yang sesuai dengan perannya kepada admin.' },
      { question: 'Bagaimana memilih webinar atau kelas bertahap?', answer: 'Webinar dan kelas tematik membantu membahas kebutuhan tertentu. Kelas bertahap sesuai untuk orang tua yang ingin menata pengasuhan secara lebih menyeluruh. Ceritakan usia anak dan tantangan keluarga agar admin dapat membantu memilih.' },
      { question: 'Apakah perlu membawa anak saat belajar?', answer: 'Fokus IAPA adalah pembelajaran orang tua. Persyaratan kehadiran dan aktivitas bersama anak mengikuti kelas yang dipilih; konfirmasikan kepada admin sebelum mendaftar.' },
    ], related: ['father', 'fitrah', 'hbl'],
  },
  {
    id: 'father', name: 'The Father Project', href: '/program/the-father-project/', group: 'keluarga',
    audience: 'Ayah, suami, dan calon ayah', format: 'Pembelajaran, refleksi, dan komunitas',
    focus: 'Kehadiran dan kepemimpinan keluarga',
    summary: 'Menata amanah sebagai hamba, suami, ayah, dan pemimpin melalui ilmu serta latihan dalam keseharian.',
    image: '/images/father-project-sukawana-hero.png',
    sections: [['Peran ayah', '#peran'], ['Perjalanan', '#perjalanan']],
    preparation: ['Tentukan peran yang paling membutuhkan perhatian saat ini.', 'Catat satu tantangan komunikasi atau kehadiran di rumah tanpa membuka aib keluarga.', 'Siapkan waktu untuk belajar dan mencoba langkah perbaikan dalam rutinitas keluarga.'],
    questions: [
      { question: 'Bolehkah mengikuti program jika belum memiliki anak?', answer: 'Boleh. Program juga ditujukan untuk suami dan calon ayah yang ingin menyiapkan diri menjalankan amanah keluarga.' },
      { question: 'Apakah harus menceritakan masalah pribadi di forum?', answer: 'Tidak perlu membuka aib atau rincian pribadi yang tidak dibutuhkan. Sampaikan pertanyaan secara proporsional dan ikuti adab serta batasan forum yang dijelaskan pengajar.' },
      { question: 'Apakah kegiatan selalu dilakukan di luar ruangan?', answer: 'Pembinaan berfokus pada ilmu, refleksi, penerapan, dan komunitas. Kegiatan luar ruangan mengikuti penyelenggaraan yang tersedia. Tanyakan format, lokasi, dan jadwal kegiatan kepada admin.' },
    ], related: ['iapa', 'ushuluna'],
  },
  {
    id: 'fitrah', name: 'The Fitrah Journey', href: '/program/the-fitrah-journey/', group: 'dewasa',
    audience: 'Akhwat dan muslimah dewasa', format: 'Kelas tematik, dua semester, dan mentoring',
    focus: 'Iman, diri, peran, dan amal muslimah',
    summary: 'Menjernihkan arah belajar, memahami diri, dan menata peran muslimah dengan adab serta langkah yang realistis.',
    image: '/images/fitrah-journey-muslimah-hero.png',
    sections: [['Materi', '#materi'], ['Format belajar', '#format']],
    preparation: ['Kenali fase kehidupan dan kebutuhan belajar yang paling dekat.', 'Siapkan waktu belajar yang selaras dengan tanggung jawab harian.', 'Tulis pertanyaan secara umum dengan tetap menjaga privasi diri dan keluarga.'],
    questions: [
      { question: 'Apakah program ini hanya untuk muslimah yang sudah menikah?', answer: 'Tidak. Program ditujukan untuk muslimah dewasa, termasuk akhwat yang menyiapkan diri sebelum pernikahan, istri, dan ibu. Pemilihan tema dapat disesuaikan dengan fase kehidupan.' },
      { question: 'Apa perbedaan kelas tematik dan program utama?', answer: 'Webinar atau kelas tematik berfokus pada satu kebutuhan. Fitrah Class Program menyusun pembelajaran dalam dua semester. Detail materi, ritme tugas, dan pendampingan perlu dikonfirmasi untuk kelas yang tersedia.' },
      { question: 'Bagaimana privasi peserta dijaga dalam diskusi?', answer: 'Peserta diarahkan bertanya secara santun dan tidak membuka aib yang tidak perlu. Tanyakan aturan forum serta mekanisme mentoring kepada admin sebelum mengikuti kelas.' },
    ], related: ['ushuluna', 'iapa'],
  },
  {
    id: 'ushuluna', name: 'Ushuluna', href: '/program/ushuluna/', group: 'dewasa',
    audience: 'Muslim dewasa, pemula, dan mualaf', format: 'Audio, PDF, catatan, dan penerapan',
    focus: 'Tauhid, adab, dan ibadah dasar',
    summary: 'Mempelajari fondasi Islam dengan urutan yang terarah dan materi yang dapat disimak kembali di sela rutinitas.',
    image: '/images/ushuluna-kai-forward-seat-hero.png',
    sections: [['Materi dasar', '#materi'], ['Cara belajar', '#metode']],
    preparation: ['Sediakan perangkat untuk menyimak audio dan membaca PDF.', 'Tentukan waktu belajar yang tenang dan dapat diulang secara konsisten.', 'Siapkan catatan untuk pertanyaan, istilah baru, dan langkah penerapan.'],
    questions: [
      { question: 'Apakah harus sudah memahami istilah Arab?', answer: 'Ushuluna ditujukan pula untuk pemula. Mulailah dari materi dasar dan catat istilah yang belum dipahami untuk ditanyakan melalui mekanisme pembelajaran yang tersedia.' },
      { question: 'Bagaimana belajar jika waktu saya terbatas?', answer: 'Gunakan audio untuk menyimak materi, lalu baca PDF pendamping saat dapat lebih fokus. Sisihkan waktu mencatat dan mengulang agar pembelajaran tidak hanya berlalu sebagai informasi.' },
      { question: 'Apakah Ushuluna sama dengan kelas tahsin?', answer: 'Fokus Ushuluna adalah fondasi keislaman, seperti tauhid, adab, dan ibadah. Jika kebutuhan utama Anda adalah memperbaiki bacaan Al-Qur\'an, tanyakan jalur tahsin yang tersedia kepada admin.' },
    ], related: ['father', 'fitrah'],
  },
  {
    id: 'hbl', name: 'IAIS Home-Based Learning', href: '/program/homebased-learning/', group: 'anak',
    audience: 'Anak usia 3-12 tahun dan orang tua', format: 'Belajar dari rumah bersama pendamping',
    focus: 'Ilmu Islam, akademik inti, dan kecakapan hidup',
    summary: 'Bangun ritme belajar anak dari rumah melalui panduan yang terarah dan keterlibatan aktif orang tua.',
    image: '/images/homebased-learning-play-hero.png',
    sections: [['Jenjang', '#program-aktif'], ['Kurikulum', '#struktur']],
    preparation: ['Catat usia, pengalaman belajar, dan kebutuhan pendampingan anak.', 'Tentukan siapa yang mendampingi serta waktu yang tersedia di rumah.', 'Siapkan tempat belajar sederhana dan diskusikan ritme layar, bermain, gerak, serta istirahat.'],
    questions: [
      { question: 'Apakah anak cukup mengikuti kelas daring sendiri?', answer: 'Tidak. Orang tua atau pendamping memegang peran utama, terutama pada usia dini. Belajar dari rumah mencakup aktivitas langsung, pembiasaan adab, eksplorasi, dan latihan kemandirian.' },
      { question: 'Bagaimana menentukan jenjang yang sesuai?', answer: 'Jenjang yang dijelaskan meliputi usia dini 3-6 tahun dan sekolah dasar 6-12 tahun. Sampaikan usia, pengalaman belajar, serta kesiapan anak agar admin dapat menjelaskan pilihan yang relevan.' },
      { question: 'Apa yang perlu ditanyakan tentang administrasi pendidikan?', answer: 'Sebelum mendaftar, mintalah penjelasan tertulis tentang status layanan, dokumen hasil belajar, ketentuan administrasi, dan jalur pendidikan lanjutan sesuai kebutuhan keluarga.' },
    ], related: ['iapa', 'pkgq'],
  },
  {
    id: 'hta', name: 'Headmaster & Teacher Academy', href: '/program/headmaster-teacher-academy/', group: 'pendidik',
    audience: 'Guru, kepala sekolah, dan calon pendidik', format: 'Webinar, workshop, dan pembinaan profesi',
    focus: 'Pengajaran, kepemimpinan, dan budaya sekolah',
    summary: 'Menguatkan pendidik dan pimpinan melalui pembahasan kasus sekolah serta alat kerja yang dapat diterapkan.',
    image: '/images/hta-faceless-teacher-classroom-hero.png',
    sections: [['Pilihan program', '#program-hta'], ['Alur belajar', '#alur-belajar']],
    preparation: ['Pilih satu kasus kelas atau persoalan kepemimpinan yang ingin dibenahi.', 'Siapkan contoh perangkat ajar atau alur kerja tanpa data pribadi murid.', 'Tentukan langkah kecil yang dapat dicoba dan dievaluasi bersama tim.'],
    questions: [
      { question: 'Apakah calon guru dapat mengikuti HTA?', answer: 'Bisa. HTA juga ditujukan untuk calon pendidik. Admin dapat membantu memilih webinar atau program pengembangan guru yang sesuai dengan pengalaman Anda.' },
      { question: 'Bagaimana memilih program guru atau kepala sekolah?', answer: 'Teacher Growth Program berfokus pada kompetensi mengajar dan kelas. School Leadership Circle membahas kepemimpinan serta pengelolaan tim. Workshop dapat dipilih untuk kebutuhan alat kerja tertentu.' },
      { question: 'Apa perbedaan HTA dengan IAIEE?', answer: 'HTA berfokus pada pengembangan guru dan pimpinan. IAIEE mendampingi sistem mutu lembaga, termasuk kurikulum, supervisi, tata kelola, dan dokumen. Keduanya dapat menjadi jalur yang saling melengkapi.' },
    ], related: ['iaiee', 'pkgq'],
  },
  {
    id: 'pkgq', name: 'PKGQ PAUD & SD', href: '/program/kaderisasi-guru-quran-paud-sd/', group: 'pendidik',
    audience: 'Calon guru Al-Qur\'an PAUD dan SD', format: 'Pembinaan daring bertahap, dua tahun',
    focus: 'Bacaan, adab, pedagogi, dan praktik',
    summary: 'Menyiapkan amanah mengajar Al-Qur\'an anak melalui penguatan bacaan serta metode yang sesuai usia.',
    image: '/images/pkgq-online-talaqqi-faceless-hero.png',
    sections: [['Pilar belajar', '#kurikulum'], ['Alur kaderisasi', '#alur']],
    preparation: ['Catat pengalaman belajar Al-Qur\'an dan pengalaman mengajar, jika ada.', 'Siapkan perangkat, mikrofon, koneksi, dan tempat yang tenang untuk talaqqi daring.', 'Pertimbangkan kesiapan murajaah, tugas praktik, dan pembinaan jangka panjang.'],
    questions: [
      { question: 'Apakah harus sudah memiliki hafalan tertentu?', answer: 'Halaman ini belum menetapkan batas hafalan atau persyaratan bacaan. Sampaikan kondisi Anda kepada admin untuk mendapatkan informasi persyaratan dan pemetaan awal yang berlaku.' },
      { question: 'Mengapa pembinaan berlangsung dua tahun?', answer: 'Program dirancang bertahap untuk menguatkan bacaan, ilmu diniyah, adab, pedagogi anak, praktik, serta supervisi. Jadwal per tahap dan beban belajar dijelaskan oleh admin untuk angkatan yang tersedia.' },
      { question: 'Apakah selesai program berarti langsung memperoleh pekerjaan?', answer: 'Program berfokus pada pembinaan kesiapan mengajar. Informasi tentang evaluasi, kelulusan, dokumen hasil belajar, atau peluang pengabdian perlu dikonfirmasi secara terpisah; kelulusan tidak berarti penempatan kerja otomatis.' },
    ], related: ['hta', 'hbl'],
  },
  {
    id: 'iaiee', name: 'IAIEE', href: '/program/iaiee/', group: 'pendidik',
    audience: 'Yayasan dan lembaga pendidikan Islam', format: 'Daring, kunjungan, atau kombinasi',
    focus: 'Diagnosis, prioritas, dan pendampingan mutu',
    summary: 'Memetakan kondisi lembaga dan mendampingi perbaikan kurikulum, supervisi, tata kelola, serta sistem mutu.',
    image: '/images/iaiee-quality-assurance-hero.png',
    sections: [['Layanan', '#layanan'], ['Alur kerja', '#alur']],
    preparation: ['Ringkas profil lembaga, jenjang, jumlah tim, dan tantangan utama.', 'Tentukan penanggung jawab serta prioritas yang ingin dibahas saat penjajakan.', 'Siapkan daftar dokumen yang tersedia; sepakati akses dan kerahasiaan sebelum membagikan data.'],
    questions: [
      { question: 'Dokumen apa yang perlu disiapkan untuk penjajakan?', answer: 'Mulailah dari profil lembaga dan ringkasan masalah. Daftar dokumen untuk diagnosis ditentukan bersama sesuai lingkup layanan. Hindari mengirim data pribadi murid atau staf sebelum mekanisme akses disepakati.' },
      { question: 'Apakah pendampingan menjamin hasil akreditasi tertentu?', answer: 'Pendampingan membantu menata sistem, proses, dan bukti mutu. Hasil penilaian tetap mengikuti proses serta keputusan pihak yang berwenang dan tidak dijanjikan sebagai hasil otomatis.' },
      { question: 'Siapa yang perlu terlibat dari pihak lembaga?', answer: 'Siapkan penanggung jawab yang memahami kebutuhan lembaga serta dapat berkoordinasi dengan pimpinan dan tim. Keterlibatan guru atau staf menyesuaikan lingkup pendampingan yang disepakati.' },
    ], related: ['hta', 'pkgq'],
  },
  {
    id: 'deenup', name: 'DeenUp', href: '/program/deenup/', group: 'anak',
    audience: 'Remaja usia 13-18 tahun', format: 'Materi ringkas dan komunitas terbimbing',
    focus: 'Iman, adab, pergaulan, dan kebiasaan digital',
    summary: 'Belajar menghadapi sekolah, keluarga, pertemanan, dan dunia digital dengan pegangan iman serta adab.',
    image: '/images/deenup-teen-study-hero.png',
    sections: [['Materi', '#materi'], ['Tahap belajar', '#level']],
    preparation: ['Diskusikan minat mengikuti program bersama orang tua atau wali.', 'Pilih satu tantangan belajar, pertemanan, atau kebiasaan digital yang ingin diperbaiki.', 'Siapkan perangkat belajar dan waktu yang tidak mengganggu kewajiban sekolah serta ibadah.'],
    questions: [
      { question: 'Apakah orang tua perlu terlibat?', answer: 'Calon peserta usia 13-18 tahun sebaiknya membicarakan keikutsertaan dengan orang tua atau wali. Konfirmasikan persetujuan, aturan forum, dan pendampingan yang berlaku kepada admin.' },
      { question: 'Apakah harus mulai dari level pertama?', answer: 'Tahap belajar bergerak dari fondasi diri, tantangan keseharian, hingga arah masa depan. Admin membantu menjelaskan titik masuk berdasarkan kebutuhan dan kesiapan peserta.' },
      { question: 'Apakah semua kegiatan dilakukan secara tatap muka?', answer: 'Materi dapat dipelajari melalui LMS dan kegiatan komunitas yang tersedia. Pertemuan langsung mengikuti penyelenggaraan yang diumumkan; pastikan lokasi, jadwal, biaya, serta ketentuan pendampingan kepada admin.' },
    ], related: ['ushuluna', 'iapa'],
  },
];

export const getProgram = (id: ProgramId): Program => {
  const program = programs.find((item) => item.id === id);
  if (!program) throw new Error(`Unknown program: ${id}`);
  return program;
};

export const programContactUrl = (id: ProgramId) => {
  const program = getProgram(id);
  return `https://wa.me/6285179676003?text=${encodeURIComponent(`Assalamu'alaikum, saya ingin mengetahui informasi ${program.name}. Mohon penjelasan tentang pilihan kelas/layanan, persyaratan, jadwal, dan biaya yang tersedia.`)}`;
};
