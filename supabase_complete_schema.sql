-- ========================================================
-- MBPP SUPABASE COMPLETE DATABASE SCHEMA MIGRATION SCRIPT
-- ========================================================
-- Run this script in Supabase Dashboard -> SQL Editor -> New Query
-- Dashboard URL: https://supabase.com/dashboard/project/rogoaopcfbhjwubrtevl/sql/new

-- 1. TABEL 'modules' (Level 1: Kurikulum Utama)
CREATE TABLE IF NOT EXISTS public.modules (
    id SERIAL PRIMARY KEY,
    module_number VARCHAR(50) NOT NULL DEFAULT 'Modul 01',
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    desc_text TEXT,
    badge VARCHAR(100) DEFAULT 'Kurikulum Utama MBPP',
    badge_color VARCHAR(100) DEFAULT 'bg-[#7c4fd4] text-white',
    image_url TEXT DEFAULT '/images/module-01.png',
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS & Policies for 'modules'
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on modules" ON public.modules;
DROP POLICY IF EXISTS "Allow public write on modules" ON public.modules;
CREATE POLICY "Allow public read on modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Allow public write on modules" ON public.modules FOR ALL USING (true);


-- 2. TABEL 'pertemuan' (Level 2: Sesi Pertemuan Utama)
CREATE TABLE IF NOT EXISTS public.pertemuan (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES public.modules(id) ON DELETE CASCADE,
    pertemuan_number VARCHAR(50) NOT NULL DEFAULT 'Pertemuan 01',
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    desc_text TEXT,
    badge VARCHAR(100) DEFAULT 'Sesi Pertemuan',
    badge_color VARCHAR(100) DEFAULT 'bg-purple-100 text-purple-700 border border-purple-200',
    image_url TEXT DEFAULT '/images/module-01.png',
    duration VARCHAR(50) DEFAULT '130 Menit',
    sessions_count VARCHAR(50) DEFAULT '3 Sesi',
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS & Policies for 'pertemuan'
ALTER TABLE public.pertemuan ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on pertemuan" ON public.pertemuan;
DROP POLICY IF EXISTS "Allow public write on pertemuan" ON public.pertemuan;
CREATE POLICY "Allow public read on pertemuan" ON public.pertemuan FOR SELECT USING (true);
CREATE POLICY "Allow public write on pertemuan" ON public.pertemuan FOR ALL USING (true);


-- 3. TABEL 'interventions' (Level 3: Sesi Intervensi & Materi Interaktif)
CREATE TABLE IF NOT EXISTS public.interventions (
    id SERIAL PRIMARY KEY,
    pertemuan_id INTEGER REFERENCES public.pertemuan(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES public.modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    desc_text TEXT,
    has_text_instruction BOOLEAN DEFAULT TRUE,
    instruction_steps JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    image_title TEXT,
    content_order JSONB DEFAULT '["text", "image", "audio", "video", "breathing", "habit_tracker", "gratitude_journal", "smart_goal", "self_checkin"]'::jsonb,
    audio_url TEXT,
    audio_title VARCHAR(255),
    video_url TEXT,
    has_breathing_visualizer BOOLEAN DEFAULT FALSE,
    has_habit_tracker BOOLEAN DEFAULT FALSE,
    has_gratitude_journal BOOLEAN DEFAULT FALSE,
    has_smart_goal BOOLEAN DEFAULT FALSE,
    has_self_checkin BOOLEAN DEFAULT FALSE,
    reflection_title TEXT DEFAULT 'Refleksi Aktivitas 1',
    reflection_subtitle TEXT,
    reflection_questions JSONB DEFAULT '[]'::jsonb,
    has_slogan_banner BOOLEAN DEFAULT FALSE,
    has_participant_name BOOLEAN DEFAULT TRUE,
    slogan VARCHAR(255),
    character_strength VARCHAR(255),
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Auto Alter Columns if missing for existing DB instances
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_breathing_visualizer') THEN
        ALTER TABLE public.interventions ADD COLUMN has_breathing_visualizer BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_habit_tracker') THEN
        ALTER TABLE public.interventions ADD COLUMN has_habit_tracker BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_smart_goal') THEN
        ALTER TABLE public.interventions ADD COLUMN has_smart_goal BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_self_checkin') THEN
        ALTER TABLE public.interventions ADD COLUMN has_self_checkin BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'reflection_questions') THEN
        ALTER TABLE public.interventions ADD COLUMN reflection_questions JSONB DEFAULT '[]'::jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_text_instruction') THEN
        ALTER TABLE public.interventions ADD COLUMN has_text_instruction BOOLEAN DEFAULT TRUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'reflection_title') THEN
        ALTER TABLE public.interventions ADD COLUMN reflection_title TEXT DEFAULT 'Refleksi Aktivitas 1';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'reflection_subtitle') THEN
        ALTER TABLE public.interventions ADD COLUMN reflection_subtitle TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_slogan_banner') THEN
        ALTER TABLE public.interventions ADD COLUMN has_slogan_banner BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_participant_name') THEN
        ALTER TABLE public.interventions ADD COLUMN has_participant_name BOOLEAN DEFAULT TRUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'instruction_steps') THEN
        ALTER TABLE public.interventions ADD COLUMN instruction_steps JSONB DEFAULT '[]'::jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'image_url') THEN
        ALTER TABLE public.interventions ADD COLUMN image_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'image_title') THEN
        ALTER TABLE public.interventions ADD COLUMN image_title TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'content_order') THEN
        ALTER TABLE public.interventions ADD COLUMN content_order JSONB DEFAULT '["text", "image", "audio", "video", "breathing", "habit_tracker", "gratitude_journal", "smart_goal", "self_checkin"]'::jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'interventions' AND column_name = 'has_gratitude_journal') THEN
        ALTER TABLE public.interventions ADD COLUMN has_gratitude_journal BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on interventions" ON public.interventions;
DROP POLICY IF EXISTS "Allow public write on interventions" ON public.interventions;
CREATE POLICY "Allow public read on interventions" ON public.interventions FOR SELECT USING (true);
CREATE POLICY "Allow public write on interventions" ON public.interventions FOR ALL USING (true);


-- 4. TABEL 'journal_entries' (Jurnal Refleksi Peserta)
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id SERIAL PRIMARY KEY,
    participant_name VARCHAR(255) NOT NULL,
    intervention_title VARCHAR(255) NOT NULL,
    journal_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on journal_entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Allow public write on journal_entries" ON public.journal_entries;
CREATE POLICY "Allow public read on journal_entries" ON public.journal_entries FOR SELECT USING (true);
CREATE POLICY "Allow public write on journal_entries" ON public.journal_entries FOR ALL USING (true);


-- 5. TABEL 'articles' (Edukasi & Bacaan MBPP)
CREATE TABLE IF NOT EXISTS public.articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    desc_text TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Mindfulness',
    read_time VARCHAR(50) DEFAULT '5 Menit',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public write on articles" ON public.articles;
CREATE POLICY "Allow public read on articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Allow public write on articles" ON public.articles FOR ALL USING (true);


-- 6. TABEL 'research_papers' (Riset & Publikasi Ilmiah)
CREATE TABLE IF NOT EXISTS public.research_papers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authors VARCHAR(255) NOT NULL,
    journal VARCHAR(255),
    year VARCHAR(20),
    badge VARCHAR(100) DEFAULT 'Peer Reviewed',
    badge_color VARCHAR(100) DEFAULT 'bg-purple-100 text-purple-700 border border-purple-200',
    doi VARCHAR(100),
    download_url TEXT,
    desc_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on research_papers" ON public.research_papers;
DROP POLICY IF EXISTS "Allow public write on research_papers" ON public.research_papers;
CREATE POLICY "Allow public read on research_papers" ON public.research_papers FOR SELECT USING (true);
CREATE POLICY "Allow public write on research_papers" ON public.research_papers FOR ALL USING (true);


-- 7. TABEL 'downloads' (Unduhan Panduan PDF / Manual)
CREATE TABLE IF NOT EXISTS public.downloads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'PDF Document',
    size VARCHAR(50) DEFAULT '2.4 MB',
    desc_text TEXT,
    download_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on downloads" ON public.downloads;
DROP POLICY IF EXISTS "Allow public write on downloads" ON public.downloads;
CREATE POLICY "Allow public read on downloads" ON public.downloads FOR SELECT USING (true);
CREATE POLICY "Allow public write on downloads" ON public.downloads FOR ALL USING (true);


-- 8. TABEL 'bibliographies' (Daftar Pustaka & Sitasi APA 7th Format)
CREATE TABLE IF NOT EXISTS public.bibliographies (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    authors TEXT NOT NULL,
    year VARCHAR(20) NOT NULL,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    doi TEXT,
    tag VARCHAR(255) DEFAULT 'Sitasi MBPP',
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.bibliographies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on bibliographies" ON public.bibliographies;
DROP POLICY IF EXISTS "Allow public write on bibliographies" ON public.bibliographies;
CREATE POLICY "Allow public read on bibliographies" ON public.bibliographies FOR SELECT USING (true);
CREATE POLICY "Allow public write on bibliographies" ON public.bibliographies FOR ALL USING (true);



-- ========================================================
-- SEED INITIAL DATA (Dua Sesi & Kurikulum MBPP)
-- ========================================================

-- 1. SEED MODULES
INSERT INTO public.modules (id, module_number, title, subtitle, desc_text, badge, badge_color, image_url, order_index)
VALUES 
(
    1, 
    'Modul 01', 
    'Modul MBPP: Mindful Building of Personal Perseverance', 
    'Intervensi Psikoedukasi Berbasis Kesadaran Penuh & Penguatan Karakter', 
    'Modul utama yang dirancang khusus untuk membantu mahasiswa menghadapi distres emosional dan mencegah ketergantungan berlebih (attachment) pada AI seperti ChatGPT/Claude sebagai sarana tempat curhat.', 
    'Kurikulum Utama MBPP', 
    'bg-[#7c4fd4] text-white', 
    '/images/module-01.png', 
    1
)
ON CONFLICT (id) DO UPDATE SET 
    module_number = EXCLUDED.module_number,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    desc_text = EXCLUDED.desc_text,
    badge = EXCLUDED.badge,
    badge_color = EXCLUDED.badge_color,
    image_url = EXCLUDED.image_url,
    order_index = EXCLUDED.order_index;

SELECT setval('modules_id_seq', (SELECT MAX(id) FROM public.modules));


-- 2. SEED PERTEMUAN (4 Aktivitas Sesi Utama)
INSERT INTO public.pertemuan (id, module_id, pertemuan_number, title, subtitle, desc_text, badge, badge_color, image_url, duration, sessions_count, order_index)
VALUES
(
    1,
    1,
    'Aktivitas 1',
    'Menyapa Diri dan Menyadari Saat Ini',
    'Mindfulness Napas & Tubuh • Character Strength: Ketekunan',
    'Pada sesi ini, kamu akan belajar menyapa dirimu sendiri dengan penuh kesadaran. Melalui latihan pernapasan, body scan, dan penentuan tujuan metode SMART, kamu akan merasakan kehadiran tubuhmu di saat ini.',
    'Aktivitas 1: Napas & Ketekunan',
    'bg-purple-100 text-purple-700 border border-purple-200',
    '/images/module-01.png',
    'Latihan Mandiri',
    '3 Sub-Sesi',
    1
),
(
    2,
    1,
    'Aktivitas 2',
    'Hadir Sepenuhnya, Berpikir Sebelum Bertindak',
    'Automatic Pilot, Mindful Eating & Listening • Character Strength: Kehati-hatian',
    'Pada sesi ini, kamu akan belajar mengenali perilaku otomatis (automatic pilot) curhat ke AI dan melatih diri untuk hadir sepenuhnya dalam setiap tindakan melalui latihan makan dan mendengar penuh kesadaran.',
    'Aktivitas 2: Automatic Pilot & Kehati-hatian',
    'bg-purple-100 text-purple-700 border border-purple-200',
    '/images/module-01.png',
    'Latihan Mandiri',
    '4 Sub-Sesi',
    2
),
(
    3,
    1,
    'Aktivitas 3',
    'Berbelas Kasih dan Bersyukur pada Diri Sendiri',
    'Self-Compassion, Loving-Kindness Meditation • Jurnal Syukur Harian',
    'Pada bagian ini kamu akan belajar tentang welas asih dan rasa syukur. Kamu akan melakukan latihan welas asih (5 sosok berurutan) dan mengisi Jurnal Syukur Harian selama 31 hari.',
    'Aktivitas 3: Welas Asih & Kebersyukuran',
    'bg-emerald-100 text-emerald-800 border border-emerald-200',
    '/images/module-01.png',
    '31 Hari Refleksi',
    '2 Sub-Sesi',
    3
),
(
    4,
    1,
    'Aktivitas 4',
    'Refleksi dan Keberlanjutan',
    'Merangkum Perjalanan, Self Check-In & Rencana Keberlanjutan SMART',
    'Pada sesi terakhir ini, kamu akan merangkum seluruh perjalanan mindfulness-mu, melakukan refleksi mendalam "Yang tersisa dariku...", Cek Diri Mandiri (Self Check-In), dan menyusun rencana keberlanjutan.',
    'Aktivitas 4: Refleksi & Keberlanjutan',
    'bg-sky-100 text-sky-800 border border-sky-200',
    '/images/module-01.png',
    'Evaluasi Akhir',
    '3 Sub-Sesi',
    4
)
ON CONFLICT (id) DO UPDATE SET 
    module_id = EXCLUDED.module_id,
    pertemuan_number = EXCLUDED.pertemuan_number,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    desc_text = EXCLUDED.desc_text,
    badge = EXCLUDED.badge,
    badge_color = EXCLUDED.badge_color,
    image_url = EXCLUDED.image_url,
    duration = EXCLUDED.duration,
    sessions_count = EXCLUDED.sessions_count,
    order_index = EXCLUDED.order_index;

SELECT setval('pertemuan_id_seq', (SELECT MAX(id) FROM public.pertemuan));


-- 3. SEED SUB-SESI LATIHAN MANDIRI (interventions)
INSERT INTO public.interventions (
    id, 
    pertemuan_id, 
    module_id, 
    title, 
    subtitle, 
    desc_text, 
    audio_url, 
    audio_title, 
    video_url, 
    has_breathing_visualizer, 
    has_habit_tracker, 
    has_gratitude_journal,
    has_smart_goal,
    has_self_checkin,
    slogan, 
    character_strength, 
    order_index
)
VALUES
-- --- AKTIVITAS 1 ---
(
    1, 
    1, 
    1, 
    'Sub-Sesi 1.1 — Latihan Kesadaran Napas dan Tubuh', 
    'Pemanasan Detak Jantung, Pernapasan Sadar (5-7 Menit) & Body Scan (10 Menit)', 
    'Cari tempat duduk yang nyaman dan tenang. Lakukan latihan pemanasan detak jantung, pejamkan mata, dan rasakan aliran napas serta sensasi fisik dari ubun-ubun kepala hingga ujung kaki tanpa menghakimi.', 
    'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 
    'Audio VO Sound — Panduan Kesadaran Napas & Body Scan Meditation', 
    NULL, 
    TRUE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    NULL, 
    NULL, 
    1
),
(
    2, 
    1, 
    1, 
    'Sub-Sesi 1.2 — Kekuatan Karakter: Ketekunan', 
    'Slogan Karakter: "TETAP SEMANGAT!"', 
    'Ketekunan adalah kekuatan untuk terus melangkah meski menghadapi rintangan. Ceritakan satu pengalaman di mana kamu bertahan menghadapi kesulitan dan tidak menyerah.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    'TETAP SEMANGAT!', 
    'Ketekunan (Perseverance)', 
    2
),
(
    3, 
    1, 
    1, 
    'Sub-Sesi 1.3 — Menentukan Tujuan SMART & Kalender Langkah Kecil', 
    'Tujuan Latihan Mindfulness Berbasis SMART (Specific, Measurable, Achievable, Relevant, Time-Bound)', 
    'Tentukan satu tujuan spesifik dan terukur untuk latihan harianmu, serta tandai kalender setiap hari saat kamu berhasil melakukan latihan.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    TRUE,
    FALSE,
    TRUE,
    FALSE, 
    'Satu Langkah, Tetap Melangkah', 
    'Ketekunan (Perseverance)', 
    3
),

-- --- AKTIVITAS 2 ---
(
    4, 
    2, 
    1, 
    'Sub-Sesi 2.1 — Mengenali Automatic Pilot (Pilot Otomatis)', 
    'Memahami Refleks Membuka Aplikasi AI / Gawai Saat Tertekan', 
    'Automatic pilot adalah kondisi bertindak tanpa benar-benar sadar. Mengenali dorongan refleks curhat ke AI membantu kita memberi jeda kesadaran sebelum bereaksi.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    NULL, 
    NULL, 
    1
),
(
    5, 
    2, 
    1, 
    'Sub-Sesi 2.2 — Latihan Makan dengan Penuh Kesadaran (Mindful Eating)', 
    'Instruksi Kesadaran Indrawi Kismis/Kurma (Bentuk, Aroma, Tekstur & Rasa)', 
    'Ambil satu kismis/kurma, amati tekstur dan aromanya, letakkan di lidah tanpa mengunyah, lalu kunyah dan telan perlahan dengan perhatian penuh.', 
    'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 
    'Audio VO Sound — Panduan Mindful Eating (Kesadaran Indrawi)', 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    NULL, 
    NULL, 
    2
),
(
    6, 
    2, 
    1, 
    'Sub-Sesi 2.3 — Latihan Mendengar dengan Penuh Kesadaran (Mindful Listening)', 
    'Mendengarkan Sepenuhnya Tanpa Menyela', 
    'Dengarkan lawan bicara atau audio panduan secara utuh. Berikan perhatian penuh pada kata-kata dan bahasa tubuh tanpa langsung memberi penilaian atau nasihat.', 
    'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 
    'Audio VO Sound — Panduan Mendengar Penuh Kesadaran', 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    NULL, 
    NULL, 
    3
),
(
    7, 
    2, 
    1, 
    'Sub-Sesi 2.4 — Kekuatan Karakter: Kehati-hatian', 
    'Slogan Karakter: "Berhenti, Pikirkan, Bertindak!"', 
    'Kehati-hatian adalah kemampuan untuk berhenti sejenak dan berpikir sebelum bertindak atau berbicara. Jadikan satu tarikan napas sebagai jeda kecil sebelum membuka AI.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    TRUE,
    FALSE,
    FALSE,
    FALSE, 
    'Berhenti, Pikirkan, Bertindak!', 
    'Kehati-hatian (Prudence)', 
    4
),

-- --- AKTIVITAS 3 ---
(
    8, 
    3, 
    1, 
    'Sub-Sesi 3.1 — Mengenal Compassion & Latihan Welas Asih (Lima Sosok)', 
    'Meditasi Welas Asih 5 Sosok Berurutan (Mencintaimu, Diri Sendiri, Dicintai, Netral, Konflik)', 
    'Duduk nyaman dan kirimkan doa serta energi welas asih kepada 5 sosok secara berurutan. Lepaskan mereka dengan harapan baik sebelum beralih ke sosok berikutnya.', 
    'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 
    'Audio VO Sound — Meditasi Welas Asih (Loving-Kindness Meditation)', 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    NULL, 
    'Self-Compassion', 
    1
),
(
    9, 
    3, 
    1, 
    'Sub-Sesi 3.2 — Mengenal Gratitude & Jurnal Syukur Harian (31 Hari)', 
    'Refleksi Kebersyukuran Harian (Hal Baik, Alasan, Makna & Komitmen Tindakan)', 
    'Rasa syukur membantu mengapresiasi hal-hal baik yang kita miliki. Isi jurnal syukur harian selama 31 hari untuk membangun ketahanan emosional yang berkelanjutan.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    FALSE,
    TRUE,
    FALSE,
    FALSE, 
    'Bersyukur Atas Setiap Langkah Kecil', 
    'Rasa Syukur (Gratitude)', 
    2
),

-- --- AKTIVITAS 4 ---
(
    10, 
    4, 
    1, 
    'Sub-Sesi 4.1 — Merangkum Perjalanan & Refleksi Tertulis', 
    'Refleksi Akhir: "Yang tersisa dariku dari perjalanan latihan ini adalah..."', 
    'Rangkum perjalanan dari Aktivitas 1 hingga 3. Tuliskan refleksi mendalam mengenai perubahan cara pandang dan keterampilan kesadaran yang kamu peroleh.', 
    'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 
    'Audio VO Sound — Panduan Refleksi Penutup Perjalanan MBPP', 
    NULL, 
    TRUE, 
    FALSE,
    FALSE,
    FALSE,
    FALSE, 
    NULL, 
    NULL, 
    1
),
(
    11, 
    4, 
    1, 
    'Sub-Sesi 4.2 — Cek Diri Mandiri (Self Check-In)', 
    'Evaluasi 8 Pernyataan Kesadaran Diri (Skala 1 - 5)', 
    'Berikan penilaian jujur dari skala 1 (Sangat Tidak Setuju) hingga 5 (Sangat Setuju) untuk mengukur tingkat kesadaran penuh, welas asih, dan ketenanganmu.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    FALSE,
    TRUE, 
    NULL, 
    'Self Check-In', 
    2
),
(
    12, 
    4, 
    1, 
    'Sub-Sesi 4.3 — Rencana Keberlanjutan SMART & Komitmen Mandiri', 
    'Langkah Mandiri Sebelum Curhat ke AI', 
    'Susun rencana keberlanjutan jangka panjang menggunakan metode SMART. Tuliskan komitmen langkah kecil yang bisa kamu lakukan sendiri saat menghadapi distres emosional.', 
    NULL, 
    NULL, 
    NULL, 
    FALSE, 
    FALSE,
    FALSE,
    TRUE,
    FALSE, 
    'Teruslah Hadir Untuk Dirimu Sendiri', 
    'Keberlanjutan (Sustainability)', 
    3
)
ON CONFLICT (id) DO UPDATE SET 
    pertemuan_id = EXCLUDED.pertemuan_id,
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    desc_text = EXCLUDED.desc_text,
    audio_url = EXCLUDED.audio_url,
    audio_title = EXCLUDED.audio_title,
    video_url = EXCLUDED.video_url,
    has_breathing_visualizer = EXCLUDED.has_breathing_visualizer,
    has_habit_tracker = EXCLUDED.has_habit_tracker,
    has_gratitude_journal = EXCLUDED.has_gratitude_journal,
    has_smart_goal = EXCLUDED.has_smart_goal,
    has_self_checkin = EXCLUDED.has_self_checkin,
    slogan = EXCLUDED.slogan,
    character_strength = EXCLUDED.character_strength,
    order_index = EXCLUDED.order_index;

SELECT setval('interventions_id_seq', (SELECT MAX(id) FROM public.interventions));


-- 4. SEED ARTICLES
INSERT INTO public.articles (id, title, desc_text, category, read_time)
VALUES
(
    1,
    'Ketergantungan Curhat pada AI: Mengapa Gen Z Rentan & Bagaimana MBPP Membantu',
    'Menelaah fenomena keterikatan emosional dan pencarian validasi emosional instan dari chatbot AI serta peran kesadaran penuh (mindfulness).',
    'Artikel Edukasi',
    '7 Menit'
),
(
    2,
    'Mindfulness & Karakter Kehati-hatian: ''Berhenti, Pikirkan, Bertindak!''',
    'Melatih jeda sadar dan kekuatan karakter prudence sebelum mengambil keputusan beraksi atau mencurahkan isi hati ke AI.',
    'Mindfulness',
    '6 Menit'
),
(
    3,
    'Daya Tahan Emosional Internal: Self-Compassion dan Gratitude di Era Digital',
    'Membangun empati pada diri sendiri dan kebiasaan bersyukur harian sebagai alternatif regulasi emosi yang adaptif.',
    'Psikoedukasi',
    '8 Menit'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    desc_text = EXCLUDED.desc_text,
    category = EXCLUDED.category,
    read_time = EXCLUDED.read_time;

SELECT setval('articles_id_seq', (SELECT MAX(id) FROM public.articles));


-- 5. SEED BIBLIOGRAPHIES
INSERT INTO public.bibliographies (id, category, authors, year, title, source, doi, tag, order_index)
VALUES
(1, 'Mindfulness & Intervensi Psikoedukasi', 'Güldal, S., & Satan, A.', '2022', 'The effect of a mindfulness-based psychoeducation program on emotional regulation and psychological well-being among young adults.', 'Journal of Rational-Emotive & Cognitive-Behavior Therapy, 40(3), 512–531.', 'https://doi.org/10.1007/s10942-021-00424-w', 'Adaptasi Utama Intervensi MBPP', 1),
(2, 'Mindfulness & Intervensi Psikoedukasi', 'Kabat-Zinn, J.', '1994', 'Wherever you go, there you are: Mindfulness meditation in everyday life.', 'Hyperion, New York.', NULL, 'Prinsip Kesadaran Penuh (Mindfulness)', 2),
(3, 'Mindfulness & Intervensi Psikoedukasi', 'Goldberg, S. B., Tucker, R. P., Greene, P. A., Davidson, R. J., Wampold, B. E., Kearney, D. J., & Simpson, T. L.', '2018', 'Mindfulness-based interventions for psychiatric disorders: A systematic review and meta-analysis.', 'Clinical Psychology Review, 59, 52–60.', 'https://doi.org/10.1016/j.cpr.2017.10.011', 'Meta-Analisis Efektivitas MBI', 3),
(4, 'Ketergantungan AI & Cyberpsychology (AI Intimacy)', 'Pentina, N., Tarafdar, M., Pantoja, F., & Koh, C. E.', '2023', 'Exploring the psychological mechanisms of AI intimacy: Chatbot attachment and parasocial interactions among Gen Z.', 'Computers in Human Behavior, 148, 107873.', 'https://doi.org/10.1016/j.chb.2023.107873', 'Mekanisme Psikologis AI Intimacy', 4),
(5, 'Ketergantungan AI & Cyberpsychology (AI Intimacy)', 'Turkle, S.', '2015', 'Reclaiming conversation: The power of talk in a digital age.', 'Penguin Press, New York.', NULL, 'Teori Keterasingan Relasional Digital', 5),
(6, 'Ketergantungan AI & Cyberpsychology (AI Intimacy)', 'Skjuve, M., Følstad, A., Fostervold, K. I., & Brandtzaeg, P. B.', '2021', 'My chatbot friend: A longitudinal study of user-chatbot relationships.', 'International Journal of Human-Computer Studies, 149, 102601.', 'https://doi.org/10.1016/j.ijhcs.2021.102601', 'Studi Longitudinal Hubungan Chatbot', 6),
(7, 'Big Five Personality & Character Strengths', 'Goldberg, L. R.', '1992', 'The development of markers for the Big-Five factor structure.', 'Psychological Assessment, 4(1), 26–42.', 'https://doi.org/10.1037/1040-3590.4.1.26', 'Dasar Instrumen IPIP-BFM-50', 7),
(8, 'Big Five Personality & Character Strengths', 'Peterson, C., & Seligman, M. E. P.', '2004', 'Character strengths and virtues: A handbook and classification.', 'Oxford University Press & American Psychological Association.', NULL, 'Klasifikasi Strengths (VIA)', 8),
(9, 'Metodologi Eksperimen & Treatment Fidelity', 'Bellg, A. J., Borrelli, B., Resnick, B., Hecht, J., Minicucci, D. S., Ory, M., & Treatment Fidelity Workgroup.', '2004', 'Enhancing treatment fidelity in health behavior change studies: Best practices and recommendations.', 'Health Psychology, 23(5), 443–451.', 'https://doi.org/10.1037/0278-6133.23.5.443', 'Lembar Observasi Fidelitas', 9)
ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category,
    authors = EXCLUDED.authors,
    year = EXCLUDED.year,
    title = EXCLUDED.title,
    source = EXCLUDED.source,
    doi = EXCLUDED.doi,
    tag = EXCLUDED.tag,
    order_index = EXCLUDED.order_index;

SELECT setval('bibliographies_id_seq', (SELECT MAX(id) FROM public.bibliographies));


-- 6. SEED RESEARCH PAPERS
INSERT INTO public.research_papers (id, title, authors, journal, year, badge, badge_color, doi, download_url, desc_text)
VALUES
(
    1,
    'Efektivitas Intervensi Psikoedukasi MBPP dalam Menurunkan Ketergantungan Curhat Chatbot AI pada Mahasiswa Generasi Z',
    'Tim Peneliti MBPP 2026',
    'Jurnal Psikologi Intervensi & Cyberpsychology Indonesia',
    '2026',
    'Publikasi RCT 2026',
    'bg-purple-100 text-purple-700 border border-purple-200',
    'https://doi.org/10.1016/mbpp.2026.0101',
    '/downloads/Modul_MBPP.pdf',
    'Naskah riset eksperimen Randomized Controlled Trial (RCT) menguji tingkat penurunan skor CAIDS-20 setelah pemberian intervensi MBPP selama 4 minggu.'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    authors = EXCLUDED.authors,
    journal = EXCLUDED.journal,
    year = EXCLUDED.year,
    badge = EXCLUDED.badge,
    badge_color = EXCLUDED.badge_color,
    doi = EXCLUDED.doi,
    download_url = EXCLUDED.download_url,
    desc_text = EXCLUDED.desc_text;

SELECT setval('research_papers_id_seq', (SELECT MAX(id) FROM public.research_papers));


-- 7. SEED DOWNLOADS
INSERT INTO public.downloads (id, title, type, size, download_url, desc_text)
VALUES
(1, 'Modul Eksperimen MBPP Revisi 2026.pdf', 'Modul Intervensi Utama', '4.2 MB', '/downloads/Modul_MBPP.pdf', 'Panduan lengkap modul intervensi MBPP.'),
(2, 'Kalender Latihan Harian & Jurnal Syukur.pdf', 'Panduan Latihan Mandiri', '1.8 MB', '/downloads/MBPP_Jurnal_Syukur.pdf', 'Lembar jurnal syukur 31 hari.'),
(3, 'Lembar Observasi Fidelitas & Manipulation Check.pdf', 'Instrumen Observer', '1.1 MB', '/downloads/Fidelitas_MBPP.pdf', 'Format observasi fidelitas perlakuan.'),
(4, 'Instrumen Pengukuran CAIDS-20 & IPIP-BFM-50.pdf', 'Skala Asesmen Psikologi', '2.4 MB', '/downloads/Instrumen_CAIDS20_IPIP50.pdf', 'Kuesioner asesmen skala psikologi.')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    type = EXCLUDED.type,
    size = EXCLUDED.size,
    download_url = EXCLUDED.download_url,
    desc_text = EXCLUDED.desc_text;

SELECT setval('downloads_id_seq', (SELECT MAX(id) FROM public.downloads));

