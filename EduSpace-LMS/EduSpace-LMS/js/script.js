/* EduSpace LMS - semua logika JavaScript (tanpa backend, data di localStorage) */

/* ========== 1. KONFIGURASI & DATA DUMMY ========== */
const APP_NAME = 'EduSpace LMS';            // ganti nama LMS di sini
const DEMO = { email: 'student@eduspace.com', password: '123456' };
const USER = { name: 'Sandy Gio Alanza', nim: '00000000 (placeholder)', program: 'Sistem dan Teknologi Informasi',
  email: DEMO.email, class: '4B', semester: '4' };

// Tambah mata kuliah baru: salin satu baris di bawah dan ubah isinya
const COURSES = [
  { id: 'big-data', name: 'Big Data', lecturer: 'Dr. Ahmad Fauzi', materials: 12, assignments: 4, progress: 75, color: '#E0E7FF', icon: '📊', last: '2 jam lalu', desc: 'Mempelajari konsep, arsitektur, dan pengolahan data berskala besar.' },
  { id: 'web', name: 'Pemrograman Web', lecturer: 'Ir. Rina Kartika, M.Kom', materials: 10, assignments: 3, progress: 60, color: '#DCFCE7', icon: '🌐', last: 'Kemarin', desc: 'Membangun aplikasi web dengan HTML, CSS, dan JavaScript.' },
  { id: 'apsi', name: 'Analisis dan Perancangan Sistem Informasi', lecturer: 'Budi Santoso, M.T.', materials: 9, assignments: 2, progress: 100, color: '#FEF3C7', icon: '🗂️', last: '3 hari lalu', desc: 'Teknik analisis kebutuhan dan perancangan sistem informasi.' },
  { id: 'ai', name: 'Kecerdasan Buatan', lecturer: 'Dr. Maya Putri', materials: 11, assignments: 2, progress: 40, color: '#FCE7F3', icon: '🤖', last: '5 jam lalu', desc: 'Dasar AI, pencarian, machine learning, dan penerapannya.' },
  { id: 'db', name: 'Basis Data', lecturer: 'Hendra Wijaya, M.Kom', materials: 10, assignments: 3, progress: 100, color: '#CFFAFE', icon: '🗄️', last: '1 minggu lalu', desc: 'Perancangan basis data relasional, SQL, dan normalisasi.' },
  { id: 'uiux', name: 'UI/UX Design', lecturer: 'Dewi Lestari, S.Des', materials: 8, assignments: 2, progress: 25, color: '#EDE9FE', icon: '🎨', last: '2 hari lalu', desc: 'Prinsip desain antarmuka dan pengalaman pengguna.' },
];
const BIGDATA_TOPICS = ['Introduction to Big Data', 'Big Data Architecture', 'Data Processing', 'Data Analytics', 'Machine Learning'];
const TYPES = ['PDF', 'Video', 'Slide', 'PDF', 'Video'], ICONS = { PDF: '📄', Video: '🎬', Slide: '📑' };

const ASSIGNMENTS = [
  { id: 1, title: 'Implementasi Data Mining', course: 'big-data', due: 'Tomorrow, 23:59', status: 'pending' },
  { id: 2, title: 'Analisis Dataset', course: 'big-data', due: '10 October 2026', status: 'pending' },
  { id: 3, title: 'Landing Page Responsif', course: 'web', due: '12 October 2026', status: 'submitted' },
  { id: 4, title: 'Quiz HTML & CSS', course: 'web', due: '28 September 2026', status: 'graded', score: 90 },
  { id: 5, title: 'Use Case Diagram', course: 'apsi', due: '20 September 2026', status: 'graded', score: 85 },
  { id: 6, title: 'Algoritma A*', course: 'ai', due: '15 October 2026', status: 'pending' },
  { id: 7, title: 'ERD Sistem Perpustakaan', course: 'db', due: '18 September 2026', status: 'graded', score: 88 },
  { id: 8, title: 'Wireframe Aplikasi', course: 'uiux', due: '14 October 2026', status: 'submitted' },
];
const SCHEDULE = [
  { day: 'Senin', time: '08:00 – 10:00', course: 'Big Data', lecturer: 'Dr. Ahmad Fauzi', room: 'Lab 3.1' },
  { day: 'Senin', time: '10:30 – 12:00', course: 'Pemrograman Web', lecturer: 'Ir. Rina Kartika', room: 'Lab 2.4' },
  { day: 'Selasa', time: '13:00 – 15:00', course: 'Kecerdasan Buatan', lecturer: 'Dr. Maya Putri', room: 'Online' },
  { day: 'Rabu', time: '09:00 – 11:00', course: 'Basis Data', lecturer: 'Hendra Wijaya', room: 'R. 4.02' },
  { day: 'Kamis', time: '10:00 – 12:00', course: 'UI/UX Design', lecturer: 'Dewi Lestari', room: 'Online' },
  { day: 'Jumat', time: '08:00 – 10:00', course: 'Analisis dan Perancangan SI', lecturer: 'Budi Santoso', room: 'R. 3.05' },
];
const NOTIFS = [
  { t: 'Tugas baru ditambahkan', d: 'Big Data - Analisis Dataset' },
  { t: 'Nilai tersedia', d: 'Pemrograman Web - 90' },
  { t: 'Materi baru', d: 'Kecerdasan Buatan - Pertemuan 5' },
];
const ACTIVITY = ['Anda menyelesaikan Materi 3 Big Data', 'Dosen memberikan tugas baru', 'Nilai tugas Pemrograman Web telah tersedia', 'Materi baru ditambahkan'];
const NAV = [['dashboard', 'Dashboard', '🏠', 'dashboard.html'], ['courses', 'My Courses', '📚', 'courses.html'], ['assignments', 'Assignments', '📝', 'assignments.html'],
  ['schedule', 'Schedule', '📅', 'schedule.html'], ['messages', 'Messages', '💬'], ['notifications', 'Notifications', '🔔'], ['profile', 'Profile', '👤', 'profile.html'], ['settings', 'Settings', '⚙️']];

/* ========== 2. HELPER ========== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
const page = document.body.dataset.page;
const courseOf = id => COURSES.find(c => c.id === id);
const profile = () => ({ ...USER, ...store.get('profile', {}) });
const progressOf = c => store.get('progress', {})[c.id] ?? c.progress;
const statusOf = a => store.get('asg', {})[a.id] ?? a.status;
const bar = p => `<div class="pr"><div class="progress"><span data-w="${p}"></span></div><small>${p}%</small></div>`;
const animateBars = () => requestAnimationFrame(() => setTimeout(() => $$('[data-w]').forEach(b => b.style.width = b.dataset.w + '%'), 50));
const TAG = { pending: ['warn', 'Pending'], submitted: ['ok', 'Submitted'], graded: ['ok', 'Graded'] };
const tag = s => `<span class="tag ${TAG[s][0]}">${TAG[s][1]}</span>`;

function toast(msg, type = 'success') {
  const el = Object.assign(document.createElement('div'), { className: 'toast ' + type, textContent: msg });
  $('#toasts').append(el); setTimeout(() => el.remove(), 3000);
}
function modal(html) {
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal" role="dialog">${html}</div>`;
  bg.addEventListener('click', e => { if (e.target === bg || e.target.dataset.action === 'close') bg.remove(); });
  document.body.append(bg); return bg;
}

/* ========== 3. TEMA (DARK MODE) ========== */
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  $$('[data-action=theme]').forEach(b => b.textContent = t === 'dark' ? '☀️' : '🌙');
}
const toggleTheme = () => { const t = store.get('theme', 'light') === 'dark' ? 'light' : 'dark'; store.set('theme', t); applyTheme(t); toast(t === 'dark' ? '🌙 Dark Mode aktif' : '☀ Light Mode aktif', 'info'); };

/* ========== 4. AUTENTIKASI ========== */
const isLoggedIn = () => store.get('auth', false);
const logout = () => { localStorage.removeItem('auth'); location.href = 'login.html'; };
if (!['index', 'login'].includes(page) && !isLoggedIn()) location.replace('login.html');

function initLogin() {
  if (isLoggedIn()) return location.replace('dashboard.html');
  if (new URLSearchParams(location.search).has('register')) toast('Registrasi belum tersedia. Gunakan akun demo.', 'info');
  const f = $('#loginForm'), email = $('#email'), pw = $('#password');
  email.value = store.get('remember', '');
  f.addEventListener('submit', e => {
    e.preventDefault();
    $('#formError').hidden = true;
    $('#emailErr').textContent = email.value.trim() ? '' : 'Email / username wajib diisi';
    $('#pwErr').textContent = pw.value ? (pw.value.length < 6 ? 'Password minimal 6 karakter' : '') : 'Password wajib diisi';
    if ($('#emailErr').textContent || $('#pwErr').textContent) return;
    const btn = $('#loginBtn'); btn.disabled = true; btn.textContent = 'Memproses...';
    setTimeout(() => {   // simulasi loading
      if (email.value.trim() === DEMO.email && pw.value === DEMO.password) {
        store.set('auth', true);
        $('#remember').checked ? store.set('remember', email.value) : localStorage.removeItem('remember');
        toast('Login berhasil!'); setTimeout(() => location.href = 'dashboard.html', 600);
      } else {
        const err = $('#formError'); err.textContent = 'Email atau password salah.'; err.hidden = false;
        btn.disabled = false; btn.textContent = 'Login';
      }
    }, 900);
  });
}

/* ========== 5. LAYOUT (SIDEBAR + TOPBAR) ========== */
function renderShell() {
  const active = page === 'course-detail' ? 'courses' : page, p = profile();
  $('#sidebar').innerHTML = `<a class="brand" href="dashboard.html"><img src="images/logo.png" alt="" width="32" height="32">${APP_NAME}</a>` +
    NAV.map(([k, label, ico, href]) => `<a class="nav-item ${k === active ? 'active' : ''}" href="${href || '#'}" ${href ? '' : `data-action="${k}"`}><span>${ico}</span>${label}</a>`).join('') +
    `<a class="nav-item logout" href="#" data-action="logout"><span>🚪</span>Logout</a>`;
  const unread = store.get('unread', NOTIFS.length);
  $('#topbar').innerHTML = `<button class="icon-btn menu-btn" data-action="sidebar" aria-label="Menu">☰</button>
    <input class="search" id="gsearch" type="search" placeholder="Search courses..." aria-label="Search">
    <button class="icon-btn" data-action="theme" aria-label="Ganti tema">🌙</button>
    <button class="icon-btn bell" data-action="notifications" aria-label="Notifikasi">🔔${unread ? `<span class="dot">${unread}</span>` : ''}</button>
    <a href="profile.html" class="avatar" title="${p.name}">${p.name[0]}</a>`;
  $('#gsearch').addEventListener('keydown', e => { if (e.key === 'Enter') location.href = 'courses.html?q=' + encodeURIComponent(e.target.value); });
}
function toggleNotif() {
  const old = $('.dropdown'); if (old) return old.remove();
  const dd = document.createElement('div'); dd.className = 'dropdown';
  const unread = store.get('unread', NOTIFS.length);
  dd.innerHTML = NOTIFS.map((n, i) => `<div class="it ${i < unread ? 'unread' : ''}">🔔 ${n.t}<br><small class="muted">${n.d}</small></div>`).join('') +
    `<button class="btn btn-ghost" style="width:100%" data-action="readall">Tandai semua dibaca</button>`;
  $('#topbar').append(dd);
}

/* ========== 6. RENDER HALAMAN ========== */
const courseCard = (c, btn = 'Open Course') => `<article class="card course"><div class="thumb" style="background:${c.color}">${c.icon}</div><div class="body">
  <h3>${c.name}</h3><p class="muted">Dosen: ${c.lecturer}</p><small class="muted">${c.materials} Materials · ${c.assignments} Assignments</small>
  ${bar(progressOf(c))}<small class="muted">Last activity: ${c.last}</small>
  <a class="btn btn-primary" href="course-detail.html?id=${c.id}">${btn}</a></div></article>`;
const asgCard = a => { const s = statusOf(a), c = courseOf(a.course);
  return `<article class="card"><div class="item" style="border:0;padding:0"><div class="grow"><h3>${a.title}</h3><p class="muted">${c.name}</p>
  <small class="muted">Due: ${a.due}</small></div>${tag(s)}</div>${s === 'graded' ? `<p><b>Score: ${a.score}</b></p>` : ''}
  <button class="btn btn-ghost" data-asg="${a.id}" style="margin-top:12px">${s === 'pending' ? 'View Assignment' : 'Detail'}</button></article>`; };
const hour = new Date().getHours(), greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

const PAGES = {
  dashboard() {
    const pend = ASSIGNMENTS.filter(a => statusOf(a) === 'pending').slice(0, 2);
    return `<h1 style="font-size:1.8rem">${greet}, ${profile().name.split(' ')[0]} 👋</h1><p class="muted">Let's continue your learning journey.</p>
    <div class="stats">${[['Enrolled Courses', 6], ['Assignments', 12], ['Completed', 8], ['Learning Progress', '72%']].map(([l, v]) => `<div class="card stat"><small class="muted">${l}</small><b>${v}</b></div>`).join('')}</div>
    <div class="two"><div><h2>Continue Learning</h2><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">${COURSES.slice(0, 2).map(c => courseCard(c, 'Continue Learning')).join('')}</div>
      <h2 class="section-title">Upcoming Assignments</h2><div class="card">${pend.map(a => `<div class="item"><span class="ico">📝</span><div class="grow"><b>${a.title}</b><br><small class="muted">${courseOf(a.course).name} · Due: ${a.due}</small></div>${tag('pending')}<button class="btn btn-ghost" data-asg="${a.id}">View Assignment</button></div>`).join('') || '<p class="muted">Tidak ada tugas pending 🎉</p>'}</div></div>
    <div class="stack"><div class="card"><h3>Schedule</h3>${SCHEDULE.slice(0, 3).map(s => `<div class="item"><span class="time">${s.time}</span><span>${s.course}</span></div>`).join('')}</div>
      <div class="card"><h3>Recent Activity</h3>${ACTIVITY.map(a => `<div class="item"><span>🔹</span><span>${a}</span></div>`).join('')}</div></div></div>`;
  },
  courses() {
    return `<div class="page-head"><h1 style="font-size:1.8rem">My Courses</h1><input id="csearch" type="search" placeholder="Search course..." style="max-width:280px"></div>
    <div class="chips" id="cfilter">${['All', 'In Progress', 'Completed'].map((f, i) => `<button class="chip ${i ? '' : 'active'}" data-f="${f}">${f}</button>`).join('')}</div><div class="grid" id="clist"></div>`;
  },
  'course-detail'() {
    const c = courseOf(new URLSearchParams(location.search).get('id')) || COURSES[0];
    return `<div class="hero-course" style="background:linear-gradient(135deg,#4F46E5,#6366F1)"><small>${c.icon} COURSE</small><h1 style="font-size:1.9rem">${c.name.toUpperCase()}</h1><p>${c.lecturer}</p>
      <div class="pr"><div class="progress"><span data-w="${progressOf(c)}"></span></div><small>Progress ${progressOf(c)}%</small></div></div>
    <div class="tabs" id="tabs">${['Overview', 'Materials', 'Assignments', 'Announcements', 'Discussion'].map((t, i) => `<button class="tab ${i ? '' : 'active'}" data-tab="${t}">${t}</button>`).join('')}</div><div id="tabbody"></div>`;
  },
  assignments() {
    return `<div class="page-head"><h1 style="font-size:1.8rem">Assignments</h1></div><div class="chips" id="afilter">${['All', 'Pending', 'Submitted', 'Graded'].map((f, i) => `<button class="chip ${i ? '' : 'active'}" data-f="${f.toLowerCase()}">${f}</button>`).join('')}</div><div class="grid" id="alist"></div>`;
  },
  schedule() {
    return `<h1 style="font-size:1.8rem">Schedule</h1><p class="muted">Jadwal kuliah mingguan</p><div class="week" style="margin-top:20px">${['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(d => `<section class="day"><h3>${d}</h3>
      ${SCHEDULE.filter(s => s.day === d).map(s => `<div class="event"><b>${s.course}</b>🕒 ${s.time}<br>👨‍🏫 ${s.lecturer}<br>📍 ${s.room}</div>`).join('') || '<small class="muted">Tidak ada jadwal</small>'}</section>`).join('')}</div>`;
  },
  profile() {
    const p = profile();
    return `<div class="card"><div class="profile"><div class="avatar lg">${p.name[0]}</div><div><h1 style="font-size:1.6rem">${p.name}</h1><p class="muted">${p.program}</p>
      <button class="btn btn-primary" data-action="editprofile" style="margin-top:10px">Edit Profile</button></div></div>
      <div class="info">${[['NIM', p.nim], ['Program Studi', p.program], ['Email', p.email], ['Class', p.class], ['Semester', p.semester]].map(([l, v]) => `<div><small>${l}</small><b>${v}</b></div>`).join('')}</div></div>`;
  },
};

/* ----- Interaksi per halaman ----- */
function initCourses() {
  let f = 'All', q = new URLSearchParams(location.search).get('q') || '';
  const input = $('#csearch'); input.value = q;
  const draw = () => {
    const list = COURSES.filter(c => c.name.toLowerCase().includes(input.value.toLowerCase()) &&
      (f === 'All' || (f === 'Completed' ? progressOf(c) === 100 : progressOf(c) < 100)));
    $('#clist').innerHTML = list.map(c => courseCard(c)).join('') || '<div class="empty">📭<br>Course tidak ditemukan</div>'; animateBars();
  };
  input.addEventListener('input', draw);
  $('#cfilter').addEventListener('click', e => { if (!e.target.dataset.f) return; f = e.target.dataset.f; $$('#cfilter .chip').forEach(c => c.classList.toggle('active', c === e.target)); draw(); });
  draw();
}
function initAssignments() {
  let f = 'all';
  const draw = () => { const l = ASSIGNMENTS.filter(a => f === 'all' || statusOf(a) === f);
    $('#alist').innerHTML = l.map(asgCard).join('') || '<div class="empty">📭<br>Belum ada tugas</div>'; };
  $('#afilter').addEventListener('click', e => { if (!e.target.dataset.f) return; f = e.target.dataset.f; $$('#afilter .chip').forEach(c => c.classList.toggle('active', c === e.target)); draw(); });
  window.redrawAssignments = draw; draw();
}
function initCourseDetail() {
  const c = courseOf(new URLSearchParams(location.search).get('id')) || COURSES[0];
  const done = () => store.get('done', {});
  const isDone = n => done()[`${c.id}-${n}`] ?? (n <= Math.round(progressOf(c) / 20));
  const tabs = {
    Overview: () => `<div class="card"><h3>Course Description</h3><p class="muted">${c.desc}</p><h3 style="margin-top:16px">Learning Objectives</h3>
      <ul class="muted" style="padding-left:20px"><li>Memahami konsep dasar ${c.name}</li><li>Menerapkan teori dalam studi kasus</li><li>Mengerjakan proyek akhir mata kuliah</li></ul></div>`,
    Materials: () => `<div class="card">${[1, 2, 3, 4, 5].map(n => { const type = TYPES[n - 1], title = c.id === 'big-data' ? BIGDATA_TOPICS[n - 1] : `Topik ${n} ${c.name}`;
      return `<div class="item"><span class="ico">${ICONS[type]}</span><div class="grow"><small class="muted">Pertemuan ${n}</small><br><b>${title}</b><br><small class="muted">${type} · ${20 + n * 5} menit</small></div>
      <span class="tag ${isDone(n) ? 'ok' : 'warn'}">${isDone(n) ? 'Completed' : 'Uncompleted'}</span><button class="btn btn-ghost" data-mat="${n}">Open</button></div>`; }).join('')}</div>`,
    Assignments: () => `<div class="grid">${ASSIGNMENTS.filter(a => a.course === c.id).map(asgCard).join('') || '<div class="empty">📭<br>Belum ada tugas</div>'}</div>`,
    Announcements: () => `<div class="card"><div class="item"><span class="ico">📢</span><div><b>Pengumuman Kuliah</b><p class="muted">Kuis dilaksanakan minggu depan. Harap pelajari materi pertemuan 1–4.</p></div></div></div>`,
    Discussion: () => `<div class="card"><div class="item"><div class="avatar">A</div><div><b>Andi</b><p class="muted">Apakah tugas dikumpulkan dalam format PDF?</p></div></div><div class="item"><div class="avatar">D</div><div><b>${c.lecturer}</b><p class="muted">Ya, format PDF melalui LMS ini.</p></div></div></div>`,
  };
  const show = t => { $('#tabbody').innerHTML = tabs[t](); $$('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === t)); };
  $('#tabs').addEventListener('click', e => e.target.dataset.tab && show(e.target.dataset.tab));
  window.redrawTab = () => show($('.tab.active').dataset.tab);
  window.openMaterial = n => { // buka materi = tandai selesai & update progress
    const d = done(); d[`${c.id}-${n}`] = true; store.set('done', d);
    const pr = store.get('progress', {}); pr[c.id] = Math.max(progressOf(c), n * 20); store.set('progress', pr);
    toast(`Materi pertemuan ${n} ditandai selesai`); location.reload();
  };
  show('Overview');
}
function openAssignment(id) {
  const a = ASSIGNMENTS.find(x => x.id === +id), s = statusOf(a);
  const m = modal(`<h2>${a.title}</h2><p class="muted">${courseOf(a.course).name} · Due: ${a.due}</p><p style="margin:12px 0">Status: ${tag(s)} ${s === 'graded' ? `<b> Score: ${a.score}</b>` : ''}</p>
    ${s === 'pending' ? '<label for="file">Upload file tugas</label><input id="file" type="file"><small class="err" id="fileErr"></small>' : ''}
    ${s === 'pending' ? '<button class="btn btn-primary" data-action="submit">Submit Assignment</button>' : ''}<button class="btn btn-ghost" data-action="close">Tutup</button>`);
  const sub = $('[data-action=submit]', m);
  if (sub) sub.onclick = () => {
    if (!$('#file', m).files.length) return $('#fileErr', m).textContent = 'Pilih file terlebih dahulu';
    const st = store.get('asg', {}); st[a.id] = 'submitted'; store.set('asg', st);
    m.remove(); toast('Tugas berhasil dikumpulkan!'); window.redrawAssignments?.(); window.redrawTab?.();
  };
}
function editProfile() {
  const p = profile();
  const m = modal(`<h2>Edit Profile</h2><label for="pn">Nama</label><input id="pn" value="${p.name}"><small class="err" id="pnE"></small>
    <label for="pe">Email</label><input id="pe" value="${p.email}"><small class="err" id="peE"></small>
    <button class="btn btn-primary" id="save">Simpan</button><button class="btn btn-ghost" data-action="close">Batal</button>`);
  $('#save', m).onclick = () => {
    const n = $('#pn', m).value.trim(), e = $('#pe', m).value.trim();
    $('#pnE', m).textContent = n ? '' : 'Nama wajib diisi'; $('#peE', m).textContent = /^\S+@\S+\.\S+$/.test(e) ? '' : 'Format email tidak valid';
    if (!n || !/^\S+@\S+\.\S+$/.test(e)) return;
    store.set('profile', { name: n, email: e }); toast('Profil diperbarui'); setTimeout(() => location.reload(), 500);
  };
}

/* ========== 7. EVENT GLOBAL ========== */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-action],[data-asg],[data-mat]'); if (!t) { $('.dropdown')?.remove(); return; }
  if (t.dataset.asg) return openAssignment(t.dataset.asg);
  if (t.dataset.mat) return window.openMaterial(+t.dataset.mat);
  const a = t.dataset.action;
  if (a === 'notifications') { e.stopPropagation(); toggleNotif(); }
  else if (a === 'readall') { store.set('unread', 0); toast('Semua notifikasi dibaca', 'info'); $('.dropdown').remove(); $('.bell .dot')?.remove(); }
  else if (a === 'theme') toggleTheme();
  else if (a === 'logout') logout();
  else if (a === 'sidebar') { $('#sidebar').classList.toggle('open'); $('#overlay').classList.toggle('show'); }
  else if (a === 'navtoggle') $('#navlinks').classList.toggle('open');
  else if (a === 'showpw') { const i = $('#password'); i.type = i.type === 'password' ? 'text' : 'password'; }
  else if (a === 'editprofile') editProfile();
  else if (a === 'messages' || a === 'settings') { e.preventDefault(); toast(`Fitur ${a} akan segera hadir`, 'info'); }
  else if (a === 'forgot' || a === 'register') { e.preventDefault(); toast('Fitur ini belum tersedia pada versi demo', 'info'); }
});
$('#overlay')?.addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#overlay').classList.remove('show'); });

/* ========== 8. INISIALISASI ========== */
applyTheme(store.get('theme', 'light'));
$$('[data-app-name]').forEach(el => el.textContent = APP_NAME);
if (page === 'index') {
  $('#preview').innerHTML = COURSES.filter(c => ['big-data', 'web', 'apsi', 'ai', 'db'].includes(c.id)).map(c => courseCard(c, 'Lihat Course').replace(/course-detail\.html\?id=[^"]+/, 'login.html')).join(''); animateBars();
} else if (page === 'login') initLogin();
else if (PAGES[page]) {
  renderShell(); $('#view').innerHTML = PAGES[page]();
  ({ courses: initCourses, assignments: initAssignments, 'course-detail': initCourseDetail })[page]?.();
  animateBars();
}
