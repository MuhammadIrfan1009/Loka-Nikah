/* ==================== LOKA NIKAH - AUTH.JS ==================== */
/* Logika login, registrasi, dan session management */

const STORAGE_KEYS = {
    currentUser: 'lokaCurrentUser',
    users: 'lokaUsers',
    bookings: 'lokaBookings'
};

const BOOKING_TIMELINES = ['confirmation', 'fitting', 'deal', 'technical', 'wedding'];
const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

class LokaAuth {
    constructor() {
        this.currentUser = this.load(STORAGE_KEYS.currentUser);
        this.users = this.load(STORAGE_KEYS.users, []);
        this.bookings = this.load(STORAGE_KEYS.bookings, []);
    }

    // Storage helper: Load dari localStorage
    load(key, fallback = null) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    }

    // Storage helper: Save ke localStorage
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Get user session (tanpa password)
    getUserSession(user) {
        const session = { ...user };
        delete session.password;
        return session;
    }

    // Registrasi user baru
    register(userData) {
        const { name, email, phone, password, confirm } = userData;

        if (!name || !email || !phone || !password || !confirm) {
            return { success: false, message: 'Semua field harus diisi!' };
        }

        if (password !== confirm) {
            return { success: false, message: 'Password dan konfirmasi password tidak cocok!' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password minimal 6 karakter!' };
        }

        if (this.users.some(u => u.email === email)) {
            return { success: false, message: 'Email sudah terdaftar! Silakan gunakan email lain atau login.' };
        }

        const newUser = {
            id: this.generateId(),
            name,
            email,
            phone,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            avatar: this.getAvatarColor(name)
        };

        this.users.push(newUser);
        this.save(STORAGE_KEYS.users, this.users);

        return {
            success: true,
            message: 'Pendaftaran berhasil! Silakan login dengan email Anda.',
            user: newUser
        };
    }

    // Login user
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Email dan password harus diisi!' };
        }

        const user = this.users.find(u => u.email === email);

        if (!user) {
            return { success: false, message: 'Email tidak terdaftar!' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Password salah!' };
        }

        const userSession = this.getUserSession(user);
        this.currentUser = userSession;
        this.save(STORAGE_KEYS.currentUser, userSession);

        return {
            success: true,
            message: 'Login berhasil! Selamat datang di Loka Nikah.',
            user: userSession
        };
    }

    // Logout
    logout() {
        localStorage.removeItem(STORAGE_KEYS.currentUser);
        this.currentUser = null;
        return { success: true, message: 'Logout berhasil!' };
    }

    // Cek apakah user sudah login
    isAuthenticated() {
        return !!this.currentUser;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update profile user
    updateProfile(userData) {
        if (!this.currentUser) {
            return { success: false, message: 'User tidak ditemukan!' };
        }

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'User tidak ditemukan di database!' };
        }

        const { name, phone } = userData;
        if (name) this.users[userIndex].name = name;
        if (phone) this.users[userIndex].phone = phone;

        this.save(STORAGE_KEYS.users, this.users);

        const updatedUser = this.getUserSession(this.users[userIndex]);
        this.currentUser = updatedUser;
        this.save(STORAGE_KEYS.currentUser, updatedUser);

        return {
            success: true,
            message: 'Profil berhasil diperbarui!',
            user: updatedUser
        };
    }

    // Hash password (simple untuk demo)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            hash = ((hash << 5) - hash) + password.charCodeAt(i);
            hash = hash & hash;
        }
        return 'hash_' + Math.abs(hash).toString(36);
    }

    // Generate ID unik
    generateId() {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Get avatar color dari nama user
    getAvatarColor(name) {
        const charCode = name.charCodeAt(0);
        return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
    }

    // Generate default timeline untuk booking
    createBookingTimeline(date) {
        return {
            confirmation: { status: 'completed', date: new Date().toISOString() },
            fitting: { status: 'completed', date: new Date(Date.now() + 7*24*60*60*1000).toISOString() },
            deal: { status: 'ongoing', date: new Date(Date.now() + 14*24*60*60*1000).toISOString() },
            technical: { status: 'pending', date: new Date(date).toISOString() },
            wedding: { status: 'pending', date }
        };
    }

    // ==================== BOOKING METHODS ====================

    // Tambah booking baru
    createBooking(bookingData) {
        if (!this.currentUser) {
            return { success: false, message: 'Anda harus login untuk melakukan booking!' };
        }

        const { names, partner, date, location, guests, packages, notes, venue, time, theme, budget } = bookingData;

        if (!names || !partner || !date || !location || !guests || !packages) {
            return { success: false, message: 'Semua field yang diperlukan harus diisi!' };
        }

        if (this.bookings.some(b => b.userId === this.currentUser.id && b.status !== 'cancelled')) {
            return { success: false, message: 'Anda sudah memiliki booking aktif. Batalkan booking sebelumnya atau hubungi customer service kami untuk edit.' };
        }

        const newBooking = {
            id: this.generateId(),
            userId: this.currentUser.id,
            names,
            partner,
            date,
            time: time || '',
            location,
            venue: venue || '',
            guests: parseInt(guests),
            packages: Array.isArray(packages) ? packages : [packages],
            theme: theme || '',
            budget: budget || '',
            notes: notes || '',
            status: 'confirmed',
            timeline: this.createBookingTimeline(date),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.bookings.push(newBooking);
        this.save(STORAGE_KEYS.bookings, this.bookings);

        return {
            success: true,
            message: 'Booking berhasil dibuat! Tim kami akan menghubungi Anda dalam 24 jam.',
            booking: newBooking
        };
    }

    // Get booking user saat ini
    getUserBookings() {
        return this.currentUser ? this.bookings.filter(b => b.userId === this.currentUser.id) : [];
    }

    // Get detail booking
    getBooking(bookingId) {
        return this.bookings.find(b => b.id === bookingId);
    }

    // Update status timeline booking
    updateBookingTimeline(bookingId, stage, status) {
        const booking = this.getBooking(bookingId);

        if (!booking) {
            return { success: false, message: 'Booking tidak ditemukan!' };
        }

        if (!booking.timeline[stage]) {
            return { success: false, message: 'Stage timeline tidak valid!' };
        }

        booking.timeline[stage].status = status;
        booking.updatedAt = new Date().toISOString();
        this.save(STORAGE_KEYS.bookings, this.bookings);

        return {
            success: true,
            message: 'Timeline berhasil diperbarui!',
            booking
        };
    }

    // Get booking summary
    getBookingSummary(bookingId) {
        const booking = this.getBooking(bookingId);
        if (!booking) return null;

        const completedCount = BOOKING_TIMELINES.filter(s => booking.timeline[s].status === 'completed').length;
        const progress = Math.round((completedCount / BOOKING_TIMELINES.length) * 100);

        return {
            ...booking,
            progress,
            isCompleted: booking.timeline.wedding.status === 'completed'
        };
    }
}

// ==================== NAVBAR & UI HELPERS ====================

// Get elemen navbar
function getNavbarElements() {
    return {
        userName: document.getElementById('userNameDisplay'),
        authLinks: document.getElementById('authLinks'),
        userMenu: document.getElementById('userMenu'),
        heroButton: document.getElementById('heroActionButton'),
        heroHint: document.getElementById('heroActionHint')
    };
}

// Update navbar UI berdasarkan auth status
function updateNavbarUser() {
    const el = getNavbarElements();
    const isAuthenticated = lokaAuth.isAuthenticated();
    const hasUsers = lokaAuth.users.length > 0;

    if (isAuthenticated) {
        const user = lokaAuth.getCurrentUser();
        if (el.userName) el.userName.textContent = `Halo, ${user.name.split(' ')[0]}!`;
        if (el.authLinks) el.authLinks.style.display = 'none';
        if (el.userMenu) el.userMenu.style.display = 'flex';
        if (el.heroButton) {
            el.heroButton.textContent = 'Mulai Booking Sekarang';
            el.heroButton.href = 'booking.html';
        }
        if (el.heroHint) el.heroHint.style.display = 'none';
    } else {
        if (el.userName) el.userName.textContent = '';
        if (el.authLinks) el.authLinks.style.display = 'flex';
        if (el.userMenu) el.userMenu.style.display = 'none';
        if (el.heroButton) {
            el.heroButton.textContent = hasUsers ? 'Masuk Sekarang' : 'Daftar Gratis Sekarang';
            el.heroButton.href = hasUsers ? 'login.html' : 'register.html';
        }
        if (el.heroHint) {
            el.heroHint.style.display = hasUsers ? 'block' : 'none';
            if (hasUsers) {
                el.heroHint.innerHTML = 'Belum punya akun? <a href="register.html" style="color: inherit; text-decoration: underline;">Daftar Gratis</a>';
            }
        }
    }
}

// Redirect ke login jika belum authenticated
function requireAuth() {
    if (!lokaAuth.isAuthenticated()) {
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize
const lokaAuth = new LokaAuth();
document.addEventListener('DOMContentLoaded', updateNavbarUser);