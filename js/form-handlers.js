/**
 * Form Handlers
 * Handles login, register, and other form submissions
 */

// ==================== LOGIN PAGE ====================
document.addEventListener('DOMContentLoaded', function() {
    // Create demo account on load if it doesn't exist
    const demoUser = lokaAuth.users.find(u => u.email === 'demo@lokanikah.com');
    if (!demoUser) {
        lokaAuth.register({
            name: 'Demo User',
            email: 'demo@lokanikah.com',
            phone: '08123456789',
            password: 'demo123456',
            confirm: 'demo123456'
        });
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

/**
 * Handle login form submission
 */
function handleLogin(e) {
    e.preventDefault();
    clearFormErrors('loginForm');

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showAlert('Email dan password harus diisi!', 'error');
        return;
    }

    const result = lokaAuth.login(email, password);

    if (result.success) {
        showAlert(result.message, 'success');
        // Store remember me preference
        if (document.getElementById('login-remember').checked) {
            localStorage.setItem('lokaRememberMe', 'true');
        }
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAlert(result.message, 'error');
    }
}

/**
 * Auto-fill demo credentials
 */
function fillDemoCredentials() {
    document.getElementById('login-email').value = 'demo@lokanikah.com';
    document.getElementById('login-password').value = 'demo123456';
    document.getElementById('login-email').focus();
}

// ==================== REGISTER PAGE ====================
/**
 * Handle register form submission
 */
function handleRegister(e) {
    e.preventDefault();
    clearFormErrors('registerForm');

    // Get form data
    const formData = {
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        phone: document.getElementById('reg-phone').value,
        password: document.getElementById('reg-password').value,
        confirm: document.getElementById('reg-confirm').value
    };

    // Validate email format
    if (!isValidEmail(formData.email)) {
        showFormError('reg-email', 'Format email tidak valid');
        return;
    }

    // Validate phone
    if (!isValidPhone(formData.phone)) {
        showFormError('reg-phone', 'Format nomor telepon tidak valid');
        return;
    }

    // Register user
    const result = lokaAuth.register(formData);

    if (result.success) {
        showAlert(result.message, 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    } else {
        showAlert(result.message, 'error');
    }
}
