/* ======================================================
   LOKA NIKAH — Main JS
   Tech-Forward · Minimalis Indonesia · Glamour
   ====================================================== */

// ==================== SMOOTH SCROLL ==================== //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== HAMBURGER MENU ==================== //

(function initHamburger() {
    const toggle = document.getElementById('navToggle');
    const nav    = document.querySelector('header nav');
    if (!toggle || !nav) return;

    function openMenu()  { nav.classList.add('open');    toggle.classList.add('open');    toggle.setAttribute('aria-expanded', 'true');  }
    function closeMenu() { nav.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    function isOpen()    { return nav.classList.contains('open'); }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu() : openMenu();
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (isOpen() && !nav.contains(e.target) && e.target !== toggle) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) closeMenu();
    });
})();

// ==================== ACTIVE NAV ==================== //

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNav);

// ==================== HEADER SCROLL BEHAVIOUR ==================== //
// Adds .scrolled class for glass shrink effect

(function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 40) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
})();

// ==================== SCROLL-TRIGGERED ANIMATIONS ==================== //
// Observes [data-animate] elements and stagger-indexes siblings

const observerOptions = {
    threshold: 0.10,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('slide-up');
            observer.unobserve(el);
        }
    });
}, observerOptions);

// Auto-stagger children of [data-stagger] containers
const staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
                child.style.animationDelay = `${i * 0.1}s`;
                child.classList.add('slide-up');
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    document.querySelectorAll('[data-stagger]').forEach(el => staggerObserver.observe(el));
});

// ==================== PAGE ENTRANCE TRANSITION ==================== //

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});

// ==================== VENDOR DATABASE ==================== //

const vendorDatabase = {
    catering: {
        id: 'catering',
        title: 'Catering Eksklusif',
        category: 'Layanan Kuliner',
        price: 'Mulai dari Rp 250.000/pax',
        emoji: '🍽️',
        description: 'Layanan catering premium dengan menu berkualitas tinggi yang dapat disesuaikan dengan preferensi dan budget Anda. Semua disajikan dengan presentasi yang elegan.',
        fullDescription: 'Catering eksklusif Loka Nikah menghadirkan pengalaman kuliner yang tak terlupakan untuk hari istimewa Anda. Tim chef berpengalaman kami siap menyiapkan menu yang disesuaikan dengan tema dan jumlah tamu. Dari menu tradisional hingga fusion modern, semua dirancang untuk memberikan kepuasan maksimal.',
        specs: {
            'Jenis Menu': 'Nasi, Continental, atau Fusion Asia',
            'Durasi Layanan': '4–6 jam',
            'Jumlah Staff': '1 staff per 30 tamu',
            'Kelengkapan': 'Peralatan makan, minuman, dan dessert'
        },
        features: [
            'Menu dapat disesuaikan sepenuhnya',
            'Chef profesional dan berpengalaman',
            'Packaging ramah lingkungan',
            'Presentasi yang elegan dan menarik'
        ]
    },
    makeup: {
        id: 'makeup',
        title: 'MUA by Loka Team — Soft Glam',
        category: 'Makeup & Styling',
        price: 'Mulai dari Rp 500.000/orang',
        emoji: '✨',
        description: 'Makeup artist profesional dengan pengalaman bertahun-tahun. Spesialisasi pada soft glam look yang timeless, elegan, dan tahan lama untuk menghadapi cuaca tropis.',
        fullDescription: 'Tim makeup artist Loka Nikah berdedikasi untuk membuat Anda tampil percaya diri dan memukau di hari istimewa. Dengan teknik dan produk berkualitas internasional, kami menciptakan look yang tahan lama dan sesuai dengan karakter Anda.',
        specs: {
            'Durasi Makeup': '1–1.5 jam per orang',
            'Jenis Makeup': 'Soft Glam Premium',
            'Trial': 'Included 1x sebelum hari H',
            'Durability': 'Tahan hingga 12 jam'
        },
        features: [
            'Makeup trial gratis sebelum hari H',
            'Produk berkualitas internasional',
            'Tahan cuaca tropis',
            'Makeup artist profesional dan berpengalaman'
        ]
    },
    fotografi: {
        id: 'fotografi',
        title: 'Fotografer Premium',
        category: 'Dokumentasi & Fotografi',
        price: 'Mulai dari Rp 8.000.000',
        emoji: '📸',
        description: 'Dokumentasi profesional dengan peralatan kamera terkini. Hasil editing berkualitas tinggi dengan aesthetic konsisten sesuai tema pernikahan Anda.',
        fullDescription: 'Fotografer Loka Nikah menggunakan peralatan profesional terkini untuk mengabadikan setiap momen berharga pernikahan Anda. Setiap foto diedit dengan cermat untuk menciptakan album yang indah dan bercerita.',
        specs: {
            'Jumlah Fotografer': '2–3 orang',
            'Durasi Shooting': '8–10 jam',
            'Jumlah Foto': '500–700 foto edited',
            'Album': 'Hardcover photo book included'
        },
        features: [
            'Peralatan kamera profesional terkini',
            'Editing berkualitas tinggi',
            'Album hardcover gratis',
            'Galeri online untuk berbagi dengan tamu'
        ]
    },
    dekorasi: {
        id: 'dekorasi',
        title: 'Dekorasi Minimalis',
        category: 'Dekorasi & Styling',
        price: 'Mulai dari Rp 3.000.000',
        emoji: '🎀',
        description: 'Desain dekorasi modern dengan konsep minimalis yang elegan. Menggunakan material berkualitas dengan warna-warna netral yang timeless dan sophisticated.',
        fullDescription: 'Dekorasi Loka Nikah menampilkan konsep minimalis modern yang elegan dan sophisticated. Setiap elemen dirancang dengan cermat untuk menciptakan suasana yang nyaman dan mengesankan bagi Anda dan tamu-tamu.',
        specs: {
            'Konsep Desain': 'Minimalis Modern',
            'Setup & Breakdown': 'Included',
            'Durasi Setup': '2–3 jam sebelum acara',
            'Material': 'Natural & Sustainable'
        },
        features: [
            'Desain custom sesuai tema Anda',
            'Material ramah lingkungan',
            'Setup dan breakdown termasuk',
            'Konsultasi design gratis'
        ]
    },
    entertainment: {
        id: 'entertainment',
        title: 'Entertainment & MC Profesional',
        category: 'Entertainment & Hiburan',
        price: 'Mulai dari Rp 2.000.000',
        emoji: '🎵',
        description: 'MC profesional yang berpengalaman dengan kemampuan menghibur dan memandu acara dengan mulus. Paket entertainment dapat disesuaikan dengan preferensi musik dan hiburan.',
        fullDescription: 'MC dan entertainment team Loka Nikah siap membuat acara Anda menjadi meriah dan berkesan. Dengan pengalaman bertahun-tahun, kami memahami dinamika acara dan dapat menyesuaikan dengan keinginan Anda.',
        specs: {
            'Durasi Layanan': '4–6 jam',
            'MC Profesional': '1–2 orang',
            'Sound System': 'Included',
            'Entertainment Options': 'DJ, Live Band, atau Playlist'
        },
        features: [
            'MC profesional dan berpengalaman',
            'Sound system berkualitas',
            'Hiburan yang dapat disesuaikan',
            'Memandu acara dengan lancar dan professional'
        ]
    },
    undangan: {
        id: 'undangan',
        title: 'Undangan Desain Custom',
        category: 'Undangan & Stationery',
        price: 'Mulai dari Rp 1.500.000',
        emoji: '💌',
        description: 'Desain undangan custom dengan konsep modern dan elegan. Setiap undangan dibuat dengan detail yang sempurna untuk mencerminkan kepribadian dan gaya Anda.',
        fullDescription: 'Undangan Loka Nikah dirancang khusus untuk Anda dengan mempertimbangkan tema, warna, dan gaya pernikahan Anda. Setiap detail dipikirkan dengan matang untuk menciptakan kesan pertama yang sempurna.',
        specs: {
            'Jenis Undangan': 'Digital & Cetak',
            'Jumlah Design': 'Unlimited revisi',
            'Material': 'Premium paper',
            'Waktu Produksi': '2–3 minggu'
        },
        features: [
            'Desain custom unlimited revisi',
            'Cetak pada kertas premium',
            'Versi digital juga disediakan',
            'Konsultasi desain gratis'
        ]
    }
};

// ==================== FORM UTILITIES ==================== //

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^(\+62|0)[0-9]{9,11}$/.test(phone.replace(/\s+/g, ''));
}

function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('is-invalid');

    let errorEl = field.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('form-error')) {
        errorEl = document.createElement('div');
        errorEl.classList.add('form-error');
        field.parentNode.insertBefore(errorEl, field.nextSibling);
    }
    errorEl.textContent = message;
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

// ==================== ALERT SYSTEM ==================== //
// Refined alert with icon + smooth dismiss

const ALERT_ICONS = {
    success: '✓',
    error:   '✕',
    warning: '⚠',
    info:    'ℹ'
};

function showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, 'fade-in');
    alertDiv.innerHTML = `<span style="font-weight:700;font-size:0.9rem;flex-shrink:0">${ALERT_ICONS[type] || 'ℹ'}</span><span>${message}</span>`;

    const container = document.querySelector('main') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    if (duration > 0) {
        setTimeout(() => {
            alertDiv.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            alertDiv.style.opacity = '0';
            alertDiv.style.transform = 'translateY(-8px)';
            setTimeout(() => alertDiv.remove(), 360);
        }, duration);
    }

    return alertDiv;
}

// ==================== CURRENCY & DATE FORMATTING ==================== //

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}

function formatDateOnly(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// ==================== DOM UTILITIES ==================== //

function getEl(id) { return document.getElementById(id); }

function createElement(tag, classes = [], content = '') {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...(Array.isArray(classes) ? classes : [classes]));
    if (content) el.innerHTML = content;
    return el;
}

// ==================== LOCAL STORAGE HELPERS ==================== //

function saveToStorage(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.warn('Storage unavailable', e); }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
}

function removeFromStorage(key) {
    try { localStorage.removeItem(key); } catch (e) {}
}

// ==================== VENDOR CARD RENDERING ==================== //

function loadVendorDetail(vendorId) {
    const vendor = vendorDatabase[vendorId];
    if (!vendor) return;

    const container = document.getElementById('detail-content');
    if (!container) return;

    const featuresHTML = vendor.features
        .map((f, i) => `
            <li style="
                display:flex; align-items:flex-start; gap:0.75rem;
                padding:0.65rem 0;
                border-bottom: 1px solid rgba(217,202,179,0.25);
                animation: slideUp 0.5s ${i * 0.08}s cubic-bezier(0.23,1,0.32,1) both;
            ">
                <span style="
                    color:var(--primary); font-weight:700; flex-shrink:0;
                    width:18px; height:18px; border:1.5px solid var(--primary);
                    border-radius:50%; display:flex; align-items:center;
                    justify-content:center; font-size:0.6rem; margin-top:2px;
                ">✓</span>
                <span style="color:var(--dark); font-size:0.95rem;">${f}</span>
            </li>
        `).join('');

    const specsHTML = Object.entries(vendor.specs)
        .map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');

    container.innerHTML = `
        <a href="paket.html" class="btn btn-secondary btn-small" style="margin-bottom:2rem;">← Kembali ke Layanan</a>

        <div class="detail-hero slide-up">
            <div class="detail-content">
                <div class="detail-info">
                    <span class="text-label" style="color:var(--text-muted); display:block; margin-bottom:0.4rem;">${vendor.category}</span>
                    <h2>${vendor.title}</h2>
                    <p style="font-family:'Cormorant Garamond',serif; font-size:1.6rem; color:var(--primary); font-weight:600; margin-top:0.5rem;">${vendor.price}</p>
                    <p style="margin-top:1.25rem; color:var(--dark); line-height:1.75;">${vendor.fullDescription}</p>
                </div>
                <div class="detail-specs">
                    <h3 style="color:var(--primary); margin-bottom:1.25rem; font-family:'Cormorant Garamond',serif; font-size:1.4rem;">Spesifikasi Layanan</h3>
                    ${specsHTML}
                </div>
            </div>
        </div>

        <div style="margin-top:2rem;">
            <h3 style="color:var(--dark); margin-bottom:0.25rem; font-size:1.4rem;">Fitur Unggulan</h3>
            <p style="color:var(--text-muted); font-size:var(--fs-sm); margin-bottom:1.25rem; letter-spacing:0.02em;">Yang membuat layanan ini berbeda</p>
            <ul style="list-style:none;">
                ${featuresHTML}
            </ul>
        </div>

        <div style="text-align:center; margin-top:2.5rem; padding-top:2rem; border-top:1px solid rgba(217,202,179,0.3);">
            <a href="booking.html?paket=${vendorId}" class="btn btn-primary">Pesan Layanan Ini</a>
        </div>
    `;
}

function getVendor(vendorId)  { return vendorDatabase[vendorId] || null; }
function getAllVendors()       { return Object.values(vendorDatabase); }

// ==================== BOOKING HELPERS ==================== //

function getBookingPackageFromURL() {
    return new URLSearchParams(window.location.search).get('paket') || null;
}

function setBookingPackage(paketId) {
    const select = document.getElementById('booking-package');
    if (select) select.value = paketId;
}

// ==================== CARD TILT EFFECT ==================== //
// Subtle 3D tilt on vendor/feature cards — glamour micro-interaction

function initCardTilt() {
    document.querySelectorAll('.vendor-card, .feature-card, .card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);
            card.style.transform = `translateY(-7px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==================== INITIALIZATION ==================== //

document.addEventListener('DOMContentLoaded', () => {
    // Navbar state
    if (typeof updateNavbarUser === 'function') updateNavbarUser();

    // Vendor detail page
    const detailContent = document.getElementById('detail-content');
    if (detailContent) {
        const vendorId = getEl('vendorId')?.value;
        if (vendorId) loadVendorDetail(vendorId);
    }

    // Pre-select booking package from URL
    const paket = getBookingPackageFromURL();
    if (paket) setBookingPackage(paket);

    // Card tilt (RAF for layout stability)
    requestAnimationFrame(initCardTilt);
});

// Prevent accidental form resubmission
document.addEventListener('submit', (_e) => {
    // Handled by individual form controllers
});

console.log('%c✦ Loka Nikah %c— Loaded', 
    'font-family:serif; font-size:14px; color:#8C5E58; font-weight:bold;',
    'font-family:serif; font-size:12px; color:#7A7A7A;'
);