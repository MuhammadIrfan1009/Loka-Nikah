# 💍 LOKA NIKAH - Wedding Planner Modern

Website statis profesional untuk wedding planning service dengan sistem manajemen booking dan progress tracking yang komprehensif.

## 📋 Deskripsi Project

**LOKA NIKAH** adalah solusi digital modern untuk merencanakan pernikahan dengan mudah, transparan, dan elegan. Website ini menyediakan katalog vendor, sistem booking online, dan tracking progres persiapan pernikahan secara real-time.

### Core Features
- ✅ Sistem autentikasi (Register & Login)
- ✅ Katalog vendor lengkap dengan 6 layanan utama
- ✅ Sistem booking online terintegrasi
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
├── booking.html            (Form Pemesanan)
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
5. **Tracking** - Pantau progress persiapan

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: CSS Variables, CSS Grid, CSS Flexbox
- **Storage**: LocalStorage (Browser)
- **Fonts**: Google Fonts (Cormorant Garamond, Plus Jakarta Sans)
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
| `booking.html` | Form booking komprehensif (4 steps) |
| `tracking.html` | Timeline progress dengan progress bar |

### CSS

**`css/style.css`** - 900+ lines CSS yang mencakup:
- CSS Variables untuk color palette
- Global styles & resets
- Component styles (cards, buttons, forms, etc)
- Layout utilities (grid, flexbox)
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
  id: "user_TIMESTAMP_RANDOM",
  userId: "user_id",
  names: "Pengantin 1",
  partner: "Pengantin 2",
  date: "YYYY-MM-DD",
  location: "Lokasi",
  guests: 200,
  packages: ["catering", "makeup"],
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

### 3. Booking System
- Form booking 4-step
- Validasi input komprehensif
- Support multiple vendors
- Auto-fill dari user profile
- Notes untuk request khusus

### 4. Progress Tracking
- Timeline dengan 5 stages:
  1. Konfirmasi Booking
  2. Fitting & Konsultasi
  3. Vendor Deal
  4. Technical Meeting
  5. Hari Pernikahan
- Progress bar visual
- Status indicators (Selesai/Ongoing/Menunggu)
- Multiple booking support

### 5. Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Flexible grid layouts
- Touch-friendly buttons

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

### Ubah Content
- Edit text di masing-masing HTML file
- Logo & branding bisa diganti di header section
- Contact info di footer

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

## 📞 Support

### Contact Information
- **Phone**: (021) 1234-NIKAH
- **WhatsApp**: +62 812-XXXX-XXXX
- **Email**: hello@lokanikah.com
- **Instagram**: @lokanikah

### FAQ
Lihat halaman `paket.html` untuk FAQ section

## 📄 License

Project ini dibuat untuk keperluan demo & pembelajaran. Bebas untuk dimodifikasi dan digunakan.

## 🙏 Credits

- **Design System**: Earth-Modern Elegance aesthetic
- **Typography**: Google Fonts
- **Icons**: Emoji Unicode
- **Inspiration**: Modern wedding planning services

---

**LOKA NIKAH © 2026**  
*Merapikan mimpi, mewujudkan janji.*