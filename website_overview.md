# Dokumentasi & Ringkasan Website MBPP (Mindfulness-Based Psychoeducation Programme)

## 📌 Deskripsi Umum
Website ini adalah platform edukasi berbasis penelitian ilmiah yang dirancang khusus untuk membantu **Generasi Z menurunkan tingkat ketergantungan curhat (bercerita) pada Artificial Intelligence (AI)** dan mengembalikan kedaulatan kognitif (*cognitive agency*).

Program intervensi ini memadukan pendekatan **Mindfulness** (kesadaran penuh) dengan kerangka psikologis **Big Five Personality** serta penguatan kekuatan karakter (*character strengths*: Ketekunan, Kehati-hatian, Welas Asih, Rasa Syukur, Keterbukaan Pembelajaran) yang divalidasi menggunakan instrumen **CAIDS-20** dan **IPIP-BFM-50**.

---

## 🎯 Tantangan vs Solusi Digital

Berikut adalah tantangan yang dihadapi Generasi Z beserta solusi yang ditawarkan oleh program MBPP:

| ⚠️ Tantangan Digital Saat Ini | ✨ Solusi Melalui MBPP |
| :--- | :--- |
| **Ketergantungan Curhat pada AI (AI Intimacy)**:<br>Kecenderungan spontan menjadikan chatbot AI sebagai sarana utama pelarian emosional saat tertekan tanpa jeda sadar. | **Regulasi Emosi & Jeda Sadar**:<br>Melatih latihan pernapasan penuh kesadaran (*mindful breathing*) dan jeda *"Berhenti, Pikirkan, Bertindak"* sebelum berinteraksi dengan AI. |
| **Automatic Pilot (Pilot Otomatis)**:<br>Tindakan impulsif membuka gawai/aplikasi AI secara repetitif tanpa menyadari motif dan kondisi emosional diri. | **Kesadaran Indrawi & Hadir Sepenuhnya**:<br>Melatih kepekaan indrawi melalui *Mindful Eating* dan *Mindful Listening* sebagai laboratorium mini keluar dari pilot otomatis. |
| **Keterasingan Emosional Internal**:<br>Mencari kenyamanan emosional instan dari sumber eksternal (AI) alih-alih mengolah kekuatan emosi diri. | **Penguatan Sumber Daya Internal**:<br>Mengembangkan *Self-Compassion* (welas asih) dan *Gratitude* (rasa syukur) sebagai daya tahan emosional internal yang sehat. |
| **Kerentanan Berdasarkan Tipe Kepribadian**:<br>Setiap individu merespons tekanan emosional dan interaksi AI secara berbeda berdasarkan profil psikologisnya. | **Intervensi Berbasis Big Five Personality**:<br>Pengukuran awal *IPIP-BFM-50* untuk memetakan kepribadian (OCEAN) dan menyesuaikan strategi penguatan karakter yang tepat. |

---

## 📂 Struktur Halaman & File Codebase

Website ini dikembangkan menggunakan **Next.js** dan **Tailwind CSS**. Berikut adalah struktur modul halaman dan file komponen terkait:

### 1. Halaman Utama / Beranda (`/`)
*   **File Entry**: [page.tsx](file:///home/alpha/Documents/PKM/app/page.tsx)
*   **Komponen Utama**:
    *   [hero-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/hero-section.tsx): Menampilkan visual hero interaktif.
    *   [what-is-mbpp-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/what-is-mbpp-section.tsx): Menjabarkan gambaran umum MBPP dan penanganan ketergantungan curhat AI pada Gen Z.
    *   [why-mbpp-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/why-mbpp-section.tsx): Membandingkan tantangan *automatic pilot* curhat AI dan solusi kekuatan karakter MBPP.
    *   [how-it-works-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/how-it-works-section.tsx): Menggambarkan alur 4 langkah intervensi dari Pre-test (CAIDS-20 & IPIP-BFM-50) hingga Post-test & Fidelitas.
    *   [featured-module-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/featured-module-section.tsx): Menampilkan 4 Pertemuan Utama kurikulum MBPP.

### 2. Kurikulum Modul Intervensi (`/modules`)
*   **File Entry**: [modules/page.tsx](file:///home/alpha/Documents/PKM/app/modules/page.tsx)
*   **Isi Konten**: Katalog 4 Pertemuan Utama Intervensi Tatap Muka:
    1.  **Pertemuan 1: Menyapa Diri dan Menyadari Saat Ini** (130 Menit / 3 Sub-sesi)
        *   Rapport & Aturan Kelompok, Pretest, Gambar Simbol Diri.
        *   Latihan Kesadaran Napas & Tubuh (Pemanasan Detak Jantung, Pernapasan Sadar, Body Scan).
        *   Kekuatan Karakter: Ketekunan (*"Satu Langkah, Tetap Melangkah"*). Kalender Latihan Harian.
    2.  **Pertemuan 2: Hadir Sepenuhnya, Berpikir Sebelum Bertindak** (130 Menit / 3 Sub-sesi)
        *   Psikoedukasi Automatic Pilot & Kebiasaan Curhat ke AI.
        *   Makan & Mendengar dengan Penuh Kesadaran (*Mindful Eating*, Silent Gazing, Mindful Listening).
        *   Kekuatan Karakter: Kehati-hatian (*"Berhenti, Pikirkan, Bertindak"*).
    3.  **Pertemuan 3: Welas Asih dan Kebersyukuran** (130 Menit / 3 Sub-sesi)
        *   Psikoedukasi Self-Compassion & Gratitude sebagai Alternatif Internal Dukungan AI.
        *   Latihan Welas Asih (*Loving-Kindness Meditation* 5 Sosok) & *Daftar Syukur dari Namaku*.
        *   Kekuatan Karakter: Keterbukaan Pembelajaran (*Love of Learning*). Jurnal Syukur Harian.
    4.  **Pertemuan 4: Evaluasi dan Penutupan** (60 Menit / 1 Sub-sesi)
        *   Presentasi Latihan Mandiri / Riset Topik Baru.
        *   Rangkuman Intervensi, Refleksi Akhir *"Yang tersisa dariku..."*.
        *   Posttest (Skala Mindfulness, CAIDS-20), Form Evaluasi, Manipulation Check & Fidelitas Intervensi.

### 3. Tentang Proyek (`/about`)
*   **File Entry**: [about/page.tsx](file:///home/alpha/Documents/PKM/app/about/page.tsx)
*   **Isi Konten**:
    *   Menjelaskan latar belakang riset akademis, standar etika perlindungan data partisipan, dan metodologi RCT.
    *   [developer-section.tsx](file:///home/alpha/Documents/PKM/components/sections/about/developer-section.tsx): Profil Tim Peneliti Fakultas Psikologi & TIK Universitas Negeri Makassar.
    *   Formulir kontak bagi institusi pendidikan atau peneliti lain.

### 4. Sumber Daya & Publikasi (`/resources`)
*   **File Entry**: [resources/page.tsx](file:///home/alpha/Documents/PKM/app/resources/page.tsx)
*   **Isi Konten**:
    *   **Artikel Edukasi**: Fenomena ketergantungan curhat AI, mindfulness, dan kekuatan karakter.
    *   **Publikasi Riset**: Publikasi jurnal cyberpsychology dan psikologi klinis.
    *   **Bahan Unduhan (PDF)**: Dokumen penunjang resmi: *Modul Eksperimen MBPP Revisi 2026.pdf*, *Kalender Latihan Harian & Jurnal Syukur.pdf*, *Lembar Observasi Fidelitas & Manipulation Check.pdf*, dan *Instrumen Pengukuran CAIDS-20 & IPIP-BFM-50.pdf*.

---

## 🔬 Desain Penelitian & Metodologi
Program intervensi MBPP diuji menggunakan desain **Randomized Controlled Trial (RCT)** dengan kelompok eksperimen dan kelompok kontrol pada partisipan Generasi Z (usia 18–28 tahun). Penilaian tingkat ketergantungan curhat pada AI diukur dengan instrumen **CAIDS-20**, kepribadian dipetakan dengan **IPIP-BFM-50**, serta kepatuhan pelaksanaan intervensi dipantau via **Lembar Observasi Fidelitas (Treatment Fidelity Checklist)**.
