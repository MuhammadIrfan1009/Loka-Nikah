# 💍 LOKA NIKAH - Wedding Planner Modern

Website statis profesional untuk wedding planning service dengan sistem manajemen booking dan progress tracking yang komprehensif.

## 📋 Deskripsi Project

**LOKA NIKAH** adalah solusi digital modern untuk merencanakan pernikahan dengan mudah, transparan, dan elegan. Website ini menyediakan katalog vendor, sistem booking online dengan date & time picker interaktif, dan tracking progres persiapan pernikahan secara real-time.

### Core Features
- ✅ Sistem autentikasi (Register & Login)
- ✅ Katalog vendor lengkap dengan 6 layanan utama
- ✅ Sistem booking online dengan modal date/time picker
- ✅ Interactive calendar dengan status tanggal (tersedia/dibooking/dipilih)
- ✅ Time picker dengan scroll interface (format 24 jam)
- ✅ Timeline progress tracking
- ✅ Local storage untuk data persistence
- ✅ Responsive design (mobile-friendly)
- ✅ UI/UX modern dengan Earth-Tone color palette

## 🎨 Brand Identity

### Visual Identity
- **Color Palette**: Terrakota (#8C5E58), Sand Beige (#D9CAB3), Charcoal (#2D2926), White (#FFFFFF)
- **Typography**: 
  - Headings: Cormorant Garamond (Serif - Wedding Elegance)
  - Body: Plus Jakarta Sans (Sans-serif - Modern Indonesia)
- **Aesthetic**: Earth-Modern Elegance dengan minimalis approach

### Tagline
*"Solusi Modern untuk Hari Sakral Anda"* - Merapikan mimpi, mewujudkan janji.

## 📁 Struktur Folder

```
loka-nikah-project/
│
├── index.html              (Beranda - Landing page)
├── register.html           (Halaman Registrasi)
├── login.html              (Halaman Login)
├── paket.html              (Katalog Layanan)
├── detail-paket.html       (Detail Vendor)
├── booking.html            (Form Pemesanan dengan Modal Pickers)
├── tracking.html           (Timeline Progres)
│
├── css/
│   └── style.css           (Stylesheet lengkap dengan CSS variables)
│
├── js/
│   ├── auth.js             (Logika autentikasi & booking management)
│   └── main.js             (Utilities & helper functions)
│
├── assets/
│   ├── img/                (Folder untuk images)
│   └── icons/              (Folder untuk icons)
│
└── README.md               (Dokumentasi ini)
```

## 🚀 Cara Menggunakan

### 1. Setup Awal
- Tidak perlu instalasi atau build process
- Buka file `index.html` di browser modern (Chrome, Firefox, Safari, Edge)
- Website akan langsung berjalan

### 2. Login Demo
Untuk testing, gunakan akun demo:
- **Email**: `demo@lokanikah.com`
- **Password**: `demo123456`

### 3. Flow Pengguna
1. **Registrasi** - User membuat akun baru
2. **Login** - User masuk ke akun mereka
3. **Browse Layanan** - Lihat katalog vendor
4. **Booking** - Lakukan pemesanan vendor
   - Pilih tanggal menggunakan calendar modal
   - Pilih jam menggunakan time picker dengan scroll
5. **Tracking** - Pantau progress persiapan

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: CSS Variables, CSS Grid, CSS Flexbox
- **Storage**: LocalStorage (Browser)
- **Fonts**: Google Fonts (Cormorant Garamond, Plus Jakarta Sans)
- **Icons**: Font Awesome, Bootstrap Icons, Emoji Unicode
- **No Dependencies**: Pure vanilla JavaScript, tidak ada library eksternal

## 📄 File Descriptions

### HTML Files

| File | Deskripsi |
|------|-----------|
| `index.html` | Landing page dengan hero section, features, dan testimoni |
| `register.html` | Form registrasi dengan validasi input |
| `login.html` | Form login dengan demo account |
| `paket.html` | Grid katalog 6 vendor layanan |
| `detail-paket.html` | Halaman detail vendor dengan specs & features |
| `booking.html` | Form booking dengan modal date/time picker |
| `tracking.html` | Timeline progress dengan progress bar |

### CSS

**`css/style.css`** - 900+ lines CSS yang mencakup:
- CSS Variables untuk color palette
- Global styles & resets
- Component styles (cards, buttons, forms, etc)
- Layout utilities (grid, flexbox)
- Modal & overlay styles
- Date picker & time picker styles
- Animations & transitions
- Responsive design
- Print styles

### JavaScript

**`js/auth.js`** - Logika autentikasi:
```javascript
- LokaAuth class (authentication & booking)
- User registration & login
- Booking creation & management
- LocalStorage integration
- Password hashing (simple)
```

**`js/main.js`** - Utilities & helpers:
```javascript
- Vendor database
- Form validation & utilities
- DOM manipulation helpers
- Storage helpers
- Animation triggers
- Helper functions untuk formatting dates & currency
```

## 🎯 Fitur Utama

### 1. Autentikasi
- Registrasi dengan validasi email & phone
- Login dengan session management
- Password hashing (simple untuk demo)
- Logout functionality

### 2. Vendor Management
- 6 kategori vendor layanan
- Setiap vendor memiliki:
  - Deskripsi lengkap
  - Spesifikasi detail
  - List fitur unggulan
  - Price range

### 3. Booking System dengan Modal Pickers

#### Date Picker Modal
Fitur date picker yang elegant dan intuitif:
- **Modal Interface**: Muncul dari bawah dengan smooth animation
- **Interactive Calendar**: 
  - Navigasi bulan dengan tombol prev/next
  - Tampilan lengkap 7 hari (Min-Sab)
  - Status tanggal dengan visual indicators:
    - 🟤 **Coklat**: Tanggal dipilih
    - 🔴 **Merah**: Sudah dibooking orang lain
    - ⚪ **Abu-abu muda**: Tersedia untuk booking
    - ⚫ **Abu-abu gelap**: Tanggal yang sudah lewat (disabled)
- **Sync dengan Hidden Input**: Pilihan tersimpan ke form
- **Display Format**: Short format (e.g., "Rab, 15 Jan 2025")

#### Time Picker Modal
Time picker dengan scroll interface modern:
- **Display Besar**: Clock display 2.2rem untuk visibility
- **Period Indicator**: Otomatis menampilkan "Pagi", "Siang", "Sore", atau "Malam"
- **Scroll Picker**:
  - Jam: 0-23 (format 24 jam, bukan AM/PM)
  - Menit: 0, 15, 30, 45 (increment 15 menit)
- **Visual Feedback**:
  - Active item berwarna primary dengan font lebih besar
  - Center line untuk menunjukkan item terpilih
  - Gradient overlay untuk effect blur
- **Smooth Scroll**: Scroll behavior yang responsive
- **Confirm Button**: Tombol untuk apply pilihan

#### Unified Modal Design
- Header dengan title dan close button
- Smooth slide-up animation
- Dark overlay dengan fade effect
- Click outside untuk close
- Consistent styling dengan color palette

### 4. Form Booking
Form booking komprehensif dengan 5 step:
1. **Informasi Pengantin** (nama, pasangan, email, phone)
2. **Rincian Acara** (tanggal, jam, lokasi, tamu, venue)
3. **Paket Layanan** (6 pilihan vendor)
4. **Informasi Tambahan** (tema, budget, catatan khusus)
5. **Harga & Pembayaran** (estimasi harga, timeline pembayaran)

**Smart Features**:
- Auto-fill user data dari profile
- Real-time price calculation
- Budget validation
- Package bundling dengan diskon 10%
- Multi-select vendor support

### 5. Progress Tracking
- Timeline dengan 5 stages:
  1. Konfirmasi Booking
  2. Fitting & Konsultasi
  3. Vendor Deal
  4. Technical Meeting
  5. Hari Pernikahan
- Progress bar visual
- Status indicators (Selesai/Ongoing/Menunggu)
- Multiple booking support

### 6. Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Flexible grid layouts
- Touch-friendly buttons
- Modal optimization untuk mobile

## 💾 Data Structure

### User Object
```javascript
{
  id: "user_TIMESTAMP_RANDOM",
  name: "Nama User",
  email: "user@example.com",
  phone: "08123456789",
  password: "hash_XXX",
  createdAt: "ISO_DATE",
  avatar: "#COLOR"
}
```

### Booking Object
```javascript
{
  id: "booking_TIMESTAMP_RANDOM",
  userId: "user_id",
  names: "Pengantin 1",
  partner: "Pengantin 2",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  location: "Lokasi",
  venue: "Nama Venue",
  guests: 200,
  packages: ["catering", "makeup"],
  theme: "Minimalis Modern",
  budget: "500000000",
  notes: "Catatan khusus",
  status: "confirmed",
  timeline: {
    confirmation: { status: "completed", date: "ISO_DATE" },
    fitting: { status: "completed", date: "ISO_DATE" },
    deal: { status: "ongoing", date: "ISO_DATE" },
    technical: { status: "pending", date: "ISO_DATE" },
    wedding: { status: "pending", date: "YYYY-MM-DD" }
  },
  createdAt: "ISO_DATE",
  updatedAt: "ISO_DATE"
}
```

## 🎨 Customization

### Ubah Color Palette
Edit `:root` di `css/style.css`:
```css
:root {
    --primary: #8C5E58;      /* Ubah warna primary */
    --secondary: #D9CAB3;    /* Ubah warna secondary */
    --dark: #2D2926;         /* Ubah warna text */
    --light: #FFFFFF;        /* Ubah warna background */
}
```

### Kustomisasi Date Picker
Di `booking.html`, edit `initDatePicker()`:
```javascript
// Ubah format display
const formatted = dateObj.toLocaleDateString('id-ID', {
    weekday: 'short',  // ubah 'short' jadi 'long' untuk format panjang
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});
```

### Kustomisasi Time Picker
Di `booking.html`, edit `initTimePicker()`:
```javascript
// Ubah increment menit
for (let m = 0; m < 60; m += 15) {  // ubah 15 ke nilai lain
    // ...
}
```

### Tambah Vendor Baru
Edit `vendorDatabase` di `js/main.js`:
```javascript
const vendorDatabase = {
    vendor_baru: {
        id: 'vendor_baru',
        title: 'Nama Vendor',
        // ... properties lainnya
    }
};
```

## 🔒 Data Privacy

### LocalStorage Usage
Data disimpan di browser user:
- `lokaCurrentUser` - Session user saat ini
- `lokaUsers` - Daftar semua users
- `lokaBookings` - Daftar semua bookings

**Note**: Ini adalah demo. Untuk production:
- Gunakan backend server
- Implementasikan proper authentication (JWT, OAuth)
- Enkripsi data yang sensitive
- Gunakan database profesional (MongoDB, PostgreSQL)

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (tidak recommended)

## ⚡ Performance Tips

1. **Lazy Loading**: Images bisa di-lazy load untuk performa lebih baik
2. **Caching**: Browser caching untuk CSS/JS static files
3. **CDN**: Gunakan CDN untuk Google Fonts (sudah included)
4. **Minification**: Minify CSS/JS untuk production

## 🚀 Deployment

### Static Hosting
Website ini bisa di-deploy ke:
- Netlify (free)
- Vercel (free)
- GitHub Pages (free)
- Any static web hosting

### Cara Deploy ke Netlify
1. Push folder ke GitHub
2. Connect GitHub ke Netlify
3. Set build command: (tidak perlu, static files)
4. Deploy!

### Cara Deploy Manual
1. Upload semua files ke server web
2. Pastikan index.html accessible di root
3. Selesai!

## 🐛 Known Limitations

1. Data hanya tersimpan di LocalStorage (browser)
2. Tidak bisa akses data antar device/browser
3. Password hashing sangat simple (untuk demo saja)
4. Tidak ada email verification
5. Tidak ada payment integration
6. Calendar hanya support 1 tahun ke depan (customizable)

## 📝 Saran Improvement

Untuk production deployment:
1. [ ] Implementasi backend API
2. [ ] Proper authentication (JWT/OAuth2)
3. [ ] Database (MongoDB/PostgreSQL)
4. [ ] Email notifications
5. [ ] Payment gateway integration
6. [ ] Admin dashboard
7. [ ] Analytics tracking
8. [ ] Image optimization & CDN
9. [ ] Security audit
10. [ ] Performance optimization
11. [ ] SMS notifications via WhatsApp API
12. [ ] Calendar integration (Google Calendar, iCal)
13. [ ] PDF invoice generation
14. [ ] Automated reminders

## 📞 Support

### Contact Information
- **Phone**: (021) 1234-NIKAH
- **WhatsApp**: +62 812-XXXX-XXXX
- **Email**: hello@lokanikah.com
- **Instagram**: @lokanikah

### FAQ
- Q: Apakah data aman di simpan?
  A: Data disimpan di browser Anda. Untuk keamanan maksimal, gunakan HTTPS dan jangan share browser.

- Q: Bisa booking untuk berapa orang?
  A: Bisa unlimited, minimal 50 tamu per acara.

- Q: Apakah bisa change jadwal setelah booking?
  A: Bisa, dengan menghubungi customer service kami.

## 📄 License

Project ini dibuat untuk keperluan demo & pembelajaran. Bebas untuk dimodifikasi dan digunakan.

## 🙏 Credits

- **Design System**: Earth-Modern Elegance aesthetic
- **Typography**: Google Fonts (Cormorant Garamond, Plus Jakarta Sans)
- **Icons**: Font Awesome, Bootstrap Icons, Emoji Unicode
- **Interaction**: Modal design inspiration dari modern mobile apps
- **Date/Time Picker**: Custom implementation dengan vanilla JavaScript

## 🆕 Changelog

### v1.1.0 (Latest)
- ✨ **NEW**: Modal date picker dengan interactive calendar
- ✨ **NEW**: Modal time picker dengan scroll interface (24-jam format)
- 🎨 **IMPROVED**: UI/UX booking form lebih minimalis
- 🐛 **FIXED**: Sync antara calendar dan form date input
- 📱 **IMPROVED**: Mobile responsiveness untuk modal pickers

### v1.0.0
- Initial release dengan core features

---

**LOKA NIKAH © 2026**  
*Merapikan mimpi, mewujudkan janji.*
