# Dokumentasi & Ringkasan Website MBPP (Mindfulness-Based Psychoeducation Programme)

## 📌 Deskripsi Umum
Website ini adalah platform edukasi berbasis penelitian ilmiah yang dirancang khusus untuk membantu **Generasi Z membangun hubungan yang lebih sehat dan berkesadaran dengan teknologi Kecerdasan Buatan (AI)**. 

Program ini mengintegrasikan pendekatan **Mindfulness** (kesadaran diri) dengan kerangka psikologis **Big Five Personality** untuk melatih kedaulatan kognitif (*cognitive agency*) dan memitigasi ketergantungan emosional yang berlebihan terhadap AI (*AI intimacy*).

---

## 🎯 Tantangan vs Solusi Digital

Berikut adalah tantangan yang dihadapi Generasi Z beserta solusi yang ditawarkan oleh program MBPP:

| ⚠️ Tantangan Digital Saat Ini | ✨ Solusi Melalui MBPP |
| :--- | :--- |
| **Ketergantungan Kognitif**:<br>Kecenderungan menyerahkan seluruh keputusan dan proses berpikir kreatif kepada AI, menurunkan ketajaman logika kritis. | **Kedaulatan Berpikir (Cognitive Agency)**:<br>Mengembalikan kendali penuh kepada pengguna. AI digunakan sebagai asisten kolaboratif, sementara kreativitas dan keputusan tetap di tangan manusia. |
| **Ilusi Hubungan Emosional (AI Intimacy)**:<br>Terjebak dalam kedekatan semu (parasocial) dengan chatbot AI, yang berisiko mengurangi kualitas interaksi sosial di dunia nyata. | **Regulasi Emosi & Interaksi Sadar**:<br>Melatih jeda sadar (*mindful pause*) untuk mengamati reaksi emosional saat menggunakan teknologi dan menjaga batasan sehat. |
| **Kecemasan & Kelelahan Informasi**:<br>Banjir output AI instan memicu kebiasaan serba cepat, menurunkan rentang perhatian (*attention span*), dan memicu *burnout*. | **Efikasi Diri yang Disesuaikan**:<br>Menggunakan kerangka *Big Five Personality* untuk memahami kekuatan dan kelemahan psikologis unik masing-masing individu dalam merespons AI. |

---

## 📂 Struktur Halaman & File Codebase

Website ini dikembangkan menggunakan **Next.js** dan **Tailwind CSS**. Berikut adalah struktur modul halaman dan file komponen terkait:

### 1. Halaman Utama / Beranda (`/`)
*   **File Entry**: [page.tsx](file:///home/alpha/Documents/PKM/app/page.tsx)
*   **Komponen Utama**:
    *   [hero-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/hero-section.tsx): Menampilkan visual interaktif serta mengenalkan pilar utama (*AI Awareness*, *Big Five*, *Self Reflection*, *Journaling*).
    *   [home-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/home-section.tsx): Menjabarkan pilar dasar MBPP (*Mindfulness*, *Big Five*, *Responsible AI Literacy*).
    *   [own-data-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/own-data-section.tsx): Membandingkan tantangan digital dan solusi MBPP.
    *   [captain-section.tsx](file:///home/alpha/Documents/PKM/components/sections/home/captain-section.tsx): Menggambarkan mekanisme program intervensi berbasis eksperimen dari *Pre-test* hingga *Post-test*.

### 2. Kurikulum Modul (`/modules`)
*   **File Entry**: [modules/page.tsx](file:///home/alpha/Documents/PKM/app/modules/page.tsx)
*   **Isi Konten**: Katalog 5 modul interaktif untuk peserta:
    1.  **Modul 1: Mengenal Diri di Era AI** (*AI Awareness & Self-Discovery* - 90 Menit / 1 Sesi)
    2.  **Modul 2: Kesadaran Penuh dalam Interaksi Digital** (*Mindful Digital Interaction* - 90 Menit / 1 Sesi)
    3.  **Modul 3: Membangun Batasan Emosional Sehat** (*Mitigating AI Intimacy & Attachment* - 90 Menit / 1 Sesi)
    4.  **Modul 4: Kedaulatan Kognitif & Berpikir Kritis** (*Reclaiming Cognitive Agency* - 90 Menit / 1 Sesi)
    5.  **Modul 5: Implementasi Harian & Efikasi Diri** (*Digital Self-Efficacy & Habit Integration* - 120 Menit / 2 Sesi)

### 3. Tentang Proyek (`/about`)
*   **File Entry**: [about/page.tsx](file:///home/alpha/Documents/PKM/app/about/page.tsx)
*   **Isi Konten**:
    *   Menjelaskan latar belakang riset akademis, standar etika perlindungan data partisipan, dan kolaborasi lintas disiplin ilmu.
    *   [developer-section.tsx](file:///home/alpha/Documents/PKM/components/sections/about/developer-section.tsx): Profil tim peneliti dan developer.
    *   Formulir kontak bagi institusi pendidikan atau peneliti lain yang tertarik berkolaborasi.

### 4. Sumber Daya & Publikasi (`/resources`)
*   **File Entry**: [resources/page.tsx](file:///home/alpha/Documents/PKM/app/resources/page.tsx)
*   **Isi Konten**:
    *   **Artikel Edukasi**: Artikel mengenai mindfulness, kedaulatan kognitif, dan keterikatan emosional semu remaja dengan AI (*AI Intimacy*).
    *   **Publikasi Riset**: Jurnal ilmiah yang dipublikasikan di *Journal of Cyberpsychology & Digital Wellness* dan *Frontiers in Psychology*.
    *   **Bahan Unduhan (PDF)**: Dokumen penunjang seperti *MBPP Daily Reflection Workbook.pdf*, *Big Five Personality Digital Assessment Sheet.pdf*, dan *Mindful AI Checklist & Guidelines.pdf*.

---

## 🔬 Desain Penelitian & Metodologi
Program intervensi MBPP diuji menggunakan desain **Randomized Controlled Trial (RCT)** dengan kelompok eksperimen dan kelompok kontrol. Hal ini bertujuan untuk memastikan keefektifan program secara empiris sebelum diimplementasikan secara luas kepada peserta/institusi pendidikan.
