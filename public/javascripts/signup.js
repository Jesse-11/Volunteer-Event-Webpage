document.querySelector('.sign-up-form').addEventListener('submit', function(event) {
    if(!validateSignupForm()) {
        event.preventDefault();
        alert('Please fill in all fields correctly');
    }
});

function validateSignupForm() {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    const errors = [];

    //usrname validation
    if (!username || username.trim.length < 3) {
        alert('Username must be at least 3 characters long');
        return false;
    }

    //email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        alert('Invalid email address');
        return false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!password || !passwordPattern.test(password)) {
        alert('Password must contain at least one number and one special character.');
        return false;
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
        alert('Password and password confirmation do not match.');
        return false;
    }

    return true;

}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.sign-up-form');
    form.addEventListener('submit', async (event) => { // Make this function async
        event.preventDefault();

        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Use formData object
            });

            if (response.ok) {
                alert('User registered successfully');
                // redirect to login page
                window.location.href = '/login';
            } else {
                alert('Error registering user');
            }
        } catch (error) {
            alert('Error registering user');
        }
    });
});