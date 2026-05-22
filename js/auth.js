/* ==================== LOKA NIKAH - AUTH.JS ==================== */
/* Logika login, registrasi, dan session management */

class LokaAuth {
    constructor() {
        this.currentUser = this.loadUser();
        this.users = this.loadUsers();
        this.bookings = this.loadBookings();
    }

    // Load user yang sedang login dari localStorage
    loadUser() {
        const user = localStorage.getItem('lokaCurrentUser');
        return user ? JSON.parse(user) : null;
    }

    // Simpan user ke localStorage
    saveUser(user) {
        localStorage.setItem('lokaCurrentUser', JSON.stringify(user));
        this.currentUser = user;
    }

    // Load semua users dari localStorage
    loadUsers() {
        const users = localStorage.getItem('lokaUsers');
        return users ? JSON.parse(users) : [];
    }

    // Simpan semua users ke localStorage
    saveUsers() {
        localStorage.setItem('lokaUsers', JSON.stringify(this.users));
    }

    // Load semua bookings dari localStorage
    loadBookings() {
        const bookings = localStorage.getItem('lokaBookings');
        return bookings ? JSON.parse(bookings) : [];
    }

    // Simpan semua bookings ke localStorage
    saveBookings() {
        localStorage.setItem('lokaBookings', JSON.stringify(this.bookings));
    }

    // Registrasi user baru
    register(userData) {
        const { name, email, phone, password, confirm } = userData;

        // Validasi
        if (!name || !email || !phone || !password || !confirm) {
            return {
                success: false,
                message: 'Semua field harus diisi!'
            };
        }

        if (password !== confirm) {
            return {
                success: false,
                message: 'Password dan konfirmasi password tidak cocok!'
            };
        }

        if (password.length < 6) {
            return {
                success: false,
                message: 'Password minimal 6 karakter!'
            };
        }

        // Cek email sudah terdaftar
        if (this.users.some(u => u.email === email)) {
            return {
                success: false,
                message: 'Email sudah terdaftar! Silakan gunakan email lain atau login.'
            };
        }

        // Buat user baru
        const newUser = {
            id: this.generateId(),
            name: name,
            email: email,
            phone: phone,
            password: this.hashPassword(password), // Simple hash
            createdAt: new Date().toISOString(),
            avatar: this.getAvatarColor(name)
        };

        this.users.push(newUser);
        this.saveUsers();

        return {
            success: true,
            message: 'Pendaftaran berhasil! Silakan login dengan email Anda.',
            user: newUser
        };
    }

    // Login user
    login(email, password) {
        if (!email || !password) {
            return {
                success: false,
                message: 'Email dan password harus diisi!'
            };
        }

        const user = this.users.find(u => u.email === email);

        if (!user) {
            return {
                success: false,
                message: 'Email tidak terdaftar!'
            };
        }

        if (user.password !== this.hashPassword(password)) {
            return {
                success: false,
                message: 'Password salah!'
            };
        }

        // Jangan simpan password di currentUser
        const userSession = { ...user };
        delete userSession.password;

        this.saveUser(userSession);

        return {
            success: true,
            message: 'Login berhasil! Selamat datang di Loka Nikah.',
            user: userSession
        };
    }

    // Logout
    logout() {
        localStorage.removeItem('lokaCurrentUser');
        this.currentUser = null;
        return {
            success: true,
            message: 'Logout berhasil!'
        };
    }

    // Cek apakah user sudah login
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update profile user
    updateProfile(userData) {
        if (!this.currentUser) {
            return {
                success: false,
                message: 'User tidak ditemukan!'
            };
        }

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return {
                success: false,
                message: 'User tidak ditemukan di database!'
            };
        }

        const { name, phone } = userData;

        if (name) this.users[userIndex].name = name;
        if (phone) this.users[userIndex].phone = phone;

        this.saveUsers();

        // Update current user session
        const updatedUser = { ...this.users[userIndex] };
        delete updatedUser.password;
        this.saveUser(updatedUser);

        return {
            success: true,
            message: 'Profil berhasil diperbarui!',
            user: updatedUser
        };
    }

    // Simple password hash (untuk demo)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'hash_' + Math.abs(hash).toString(36);
    }

    // Generate ID unik
    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get random avatar color based on name
    getAvatarColor(name) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
        const charCode = name.charCodeAt(0);
        return colors[charCode % colors.length];
    }

    // ==================== BOOKING METHODS ====================

    // Tambah booking baru
    createBooking(bookingData) {
        if (!this.currentUser) {
            return {
                success: false,
                message: 'Anda harus login untuk melakukan booking!'
            };
        }

        const { names, partner, date, location, guests, packages, notes, venue, time, theme, budget } = bookingData;

        if (!names || !partner || !date || !location || !guests || !packages) {
            return {
                success: false,
                message: 'Semua field yang diperlukan harus diisi!'
            };
        }

        // Cek apakah user sudah punya booking aktif
        const activeBooking = this.bookings.find(
            b => b.userId === this.currentUser.id && b.status !== 'cancelled'
        );

        if (activeBooking) {
            return {
                success: false,
                message: 'Anda sudah memiliki booking aktif. Batalkan booking sebelumnya atau hubungi customer service kami untuk edit.'
            };
        }

        const newBooking = {
            id: this.generateId(),
            userId: this.currentUser.id,
            names: names,
            partner: partner,
            date: date,
            time: time || '',
            location: location,
            venue: venue || '',
            guests: parseInt(guests),
            packages: Array.isArray(packages) ? packages : [packages],
            theme: theme || '',
            budget: budget || '',
            notes: notes || '',
            status: 'confirmed',
            timeline: {
                confirmation: { status: 'completed', date: new Date().toISOString() },
                fitting: { status: 'completed', date: new Date(Date.now() + 7*24*60*60*1000).toISOString() },
                deal: { status: 'ongoing', date: new Date(Date.now() + 14*24*60*60*1000).toISOString() },
                technical: { status: 'pending', date: new Date(date).toISOString() },
                wedding: { status: 'pending', date: date }
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.bookings.push(newBooking);
        this.saveBookings();

        return {
            success: true,
            message: 'Booking berhasil dibuat! Tim kami akan menghubungi Anda dalam 24 jam.',
            booking: newBooking
        };
    }

    // Get booking user saat ini
    getUserBookings() {
        if (!this.currentUser) {
            return [];
        }

        return this.bookings.filter(b => b.userId === this.currentUser.id);
    }

    // Get detail booking
    getBooking(bookingId) {
        return this.bookings.find(b => b.id === bookingId);
    }

    // Update status timeline booking
    updateBookingTimeline(bookingId, stage, status) {
        const booking = this.getBooking(bookingId);

        if (!booking) {
            return {
                success: false,
                message: 'Booking tidak ditemukan!'
            };
        }

        if (booking.timeline[stage]) {
            booking.timeline[stage].status = status;
            booking.updatedAt = new Date().toISOString();
            this.saveBookings();

            return {
                success: true,
                message: 'Timeline berhasil diperbarui!',
                booking: booking
            };
        }

        return {
            success: false,
            message: 'Stage timeline tidak valid!'
        };
    }

    // Get booking summary
    getBookingSummary(bookingId) {
        const booking = this.getBooking(bookingId);

        if (!booking) {
            return null;
        }

        const stages = ['confirmation', 'fitting', 'deal', 'technical', 'wedding'];
        const completedCount = stages.filter(s => booking.timeline[s].status === 'completed').length;
        const progress = Math.round((completedCount / stages.length) * 100);

        return {
            ...booking,
            progress: progress,
            isCompleted: booking.timeline.wedding.status === 'completed'
        };
    }
}

// Initialize auth globally
const lokaAuth = new LokaAuth();

// Helper function untuk display user info di navbar
function updateNavbarUser() {
    const userNameEl = document.getElementById('userNameDisplay');
    const authLinksEl = document.getElementById('authLinks');
    const userMenuEl = document.getElementById('userMenu');

    const heroActionButton = document.getElementById('heroActionButton');
    const heroActionHint = document.getElementById('heroActionHint');
    const hasRegisteredUsers = lokaAuth.users.length > 0;

    if (lokaAuth.isAuthenticated()) {
        const user = lokaAuth.getCurrentUser();

        if (userNameEl) {
            userNameEl.textContent = `Halo, ${user.name.split(' ')[0]}!`;
        }

        if (authLinksEl) {
            authLinksEl.style.display = 'none';
        }

        if (userMenuEl) {
            userMenuEl.style.display = 'flex';
        }

        if (heroActionButton) {
            heroActionButton.textContent = 'Mulai Booking Sekarang';
            heroActionButton.href = 'booking.html';
        }

        if (heroActionHint) {
            heroActionHint.style.display = 'none';
            heroActionHint.innerHTML = '';
        }
    } else {
        if (userNameEl) {
            userNameEl.textContent = '';
        }

        if (authLinksEl) {
            authLinksEl.style.display = 'flex';
        }

        if (userMenuEl) {
            userMenuEl.style.display = 'none';
        }

        if (heroActionButton) {
            if (hasRegisteredUsers) {
                heroActionButton.textContent = 'Masuk Sekarang';
                heroActionButton.href = 'login.html';
            } else {
                heroActionButton.textContent = 'Daftar Gratis Sekarang';
                heroActionButton.href = 'register.html';
            }
        }

        if (heroActionHint) {
            if (hasRegisteredUsers) {
                heroActionHint.style.display = 'block';
                heroActionHint.innerHTML = 'Belum punya akun? <a href="register.html" style="color: inherit; text-decoration: underline;">Daftar Gratis</a>';
            } else {
                heroActionHint.style.display = 'none';
                heroActionHint.innerHTML = '';
            }
        }
    }
}

// Helper function untuk redirect jika belum login
function requireAuth() {
    if (!lokaAuth.isAuthenticated()) {
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update navbar saat halaman load
document.addEventListener('DOMContentLoaded', updateNavbarUser);