

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the menu toggle button and the navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    // Add event listener to toggle the visibility of navigation links
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
  
    // Close modal when clicking outside of it
    window.onclick = function (event) {
        const profileModal = document.getElementById('profileModal');
        if (event.target == profileModal) {
            profileModal.style.display = 'none';
        }
    };
  });
  
  new Vue({
    el: '#app',
    data: {
        isMenuActive: false,
        isProfileModalActive: false,
        isLoggedIn: document.body.dataset.loggedIn === 'true'
    },
    methods: {
        toggleMenu() {
            this.isMenuActive = !this.isMenuActive;
        },
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            element.scrollIntoView({ behavior: 'smooth' });
        },
        loadMoreInfo(cardId) {
            // Change API endpoint to correct route
            fetch(`/index/card-info/${cardId}`)
                .then(response => response.json())
                .then(data => {
                    // Handle the data
                    alert(`Card info: ${JSON.stringify(data)}`);
                });
        },
        toggleProfileModal() {
            this.isProfileModalActive = !this.isProfileModalActive;
            const profileModal = document.getElementById('profileModal');
            profileModal.style.display = this.isProfileModalActive ? 'flex' : 'none';
        },
        logout() {
            // Perform logout logic, e.g., clear session or local storage
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.toggleProfileModal();
            window.location.href = '/'; // Redirect to homepage after logout
        }
    }
  });