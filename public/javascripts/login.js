document.addEventListener('DOMContentLoaded', function() {
    const emailLoginButton = document.getElementById('email-btn');
    const emailLoginModal = document.getElementById('emailLoginModal');
    const closeModal = document.querySelector('.close');

    // Open the modal when the email login button is clicked
    emailLoginButton.addEventListener('click', function() {
        emailLoginModal.style.display = 'flex'; // Change to 'flex' to show and center the modal
    });

    // Close the modal when the close button (x) is clicked
    closeModal.addEventListener('click', function() {
        emailLoginModal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == emailLoginModal) {
            emailLoginModal.style.display = 'none';
        }
    };

    // Handle the form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = {
            username: username,
            password: password
        };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to login');
            }
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data)); // Store the username in localStorage
            emailLoginModal.style.display = 'none'; // Close the modal on successful login
            window.location.href = '/';
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show error message to the user, e.g., invalid credentials
        });
    });
});