# EduSpace LMS

LMS berbasis web (HTML, CSS, JavaScript Vanilla) untuk tugas proyek Sistem dan Teknologi Informasi. Tanpa backend; data memakai mock data + localStorage.

## Struktur Folder
```
EduSpace-LMS/
├── index.html          Landing page
├── login.html          Halaman login
├── dashboard.html      Dashboard (statistik, course, tugas, jadwal, aktivitas)
├── courses.html        Daftar mata kuliah (search + filter)
├── course-detail.html  Detail course (Overview, Materials, Assignments, Announcements, Discussion)
├── assignments.html    Daftar tugas (filter All/Pending/Submitted/Graded)
├── schedule.html       Jadwal mingguan Senin–Jumat
├── profile.html        Profil mahasiswa + Edit Profile
├── css/style.css       Seluruh styling (variabel warna di bagian atas)
├── js/script.js        Seluruh logika + data dummy
└── images/logo.png
```

## Cara Menjalankan
1. Buka folder di VS Code.
2. Install ekstensi **Live Server**, klik kanan `index.html` → *Open with Live Server*. (Atau klik dua kali `index.html`.)

## Akun Login Demo
- Email: `student@eduspace.com`
- Password: `123456`

## Fungsi JavaScript (js/script.js)
1. Data dummy (course, tugas, jadwal, notifikasi) 2. Login/logout + proteksi halaman via localStorage 3. Show/hide password & validasi form 4. Search & filter course 5. Filter tugas, submit tugas (ubah status) 6. Notification dropdown 7. Sidebar mobile 8. Progress bar beranimasi 9. Navigasi detail course (`course-detail.html?id=...`) 10. Dark mode 11. Toast & modal 12. Edit profile.
Messages dan Settings masih menampilkan toast "segera hadir".

## Kustomisasi
- **Ganti nama LMS**: ubah `APP_NAME` di awal `js/script.js`, lalu ganti teks "EduSpace LMS" pada `<title>` tiap HTML.
- **Ganti warna**: ubah variabel `--primary`, `--secondary`, dll. di bagian atas `css/style.css`.
- **Tambah mata kuliah**: salin satu baris di array `COURSES` pada `js/script.js`, ubah `id`, `name`, `lecturer`, dan seterusnya. Opsional: tambah tugas di `ASSIGNMENTS` dan jadwal di `SCHEDULE`.

## Deployment ke Vercel
**Lewat GitHub:** push folder ke repo GitHub → buka vercel.com → *Add New Project* → import repo → Framework Preset: *Other* → *Deploy*.
**Lewat CLI:** `npm i -g vercel`, masuk ke folder proyek, jalankan `vercel`, lalu `vercel --prod`.
