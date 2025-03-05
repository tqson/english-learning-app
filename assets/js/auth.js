document.addEventListener('DOMContentLoaded', function() {
    // Handle Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store current user
                localStorage.setItem('currentUser', JSON.stringify({
                    name: user.name,
                    email: user.email
                }));
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials!');
            }
        });
    }

    // Handle Signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Get existing users
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                alert('Email already registered!');
                return;
            }

            // Add new user
            users.push({
                name,
                email,
                password
            });

            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }
});