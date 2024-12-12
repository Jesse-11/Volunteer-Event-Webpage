document.addEventListener('DOMContentLoaded', function() {
    // Get references to the menu toggle button and the navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add event listener to toggle the visibility of navigation links
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

});



// Admin dashboard
new Vue({
    el: '#app',
    data: {
        users: [],
        newUser: {
            username: '',
            email: '',
            password: '',
            is_admin: false
        },
        errorMessage: '' // For displaying errors in the UI
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                console.log('Fetching users...');
                const response = await axios.get('/api/users');
                console.log('Users fetched:', response.data);

                if (Array.isArray(response.data)) {
                    this.users = response.data;
                } else {
                    this.users = [response.data];
                }
                console.log('Users array:', this.users); // This should log an array
            } catch (error) {
                console.error('error fetching users', error);
                this.errorMessage = 'Error fetching users'; // Update UI with error message
            }
        },
        async addUser() {
            try {
                const response = await axios.post('/api/users', this.newUser);
                console.log('User added:', response.data);
                this.fetchUsers(); // Refresh list after adding user
                this.newUser = { username: '', email: '', password: '', is_admin: false }; // Clear the form
                this.errorMessage = ''; // Clear any previous errors
            } catch (error) {
                console.error('error adding user', error);
                this.errorMessage = 'Error adding user'; // Update UI with error message
            }
        },
        async updateUser(user) {
            try {
                const response = await axios.put(`/api/users/${user.user_id}`, {
                    username: user.username,
                    email: user.email,
                    is_admin: user.is_admin
                });
                console.log('User updated:', response.data);
                this.fetchUsers(); // Refresh list after update
                this.errorMessage = ''; // Clear any previous errors
            } catch (error) {
                console.error('error updating user', error);
                this.errorMessage = 'Error updating user'; // Update UI with error message
            }
        },
        async deleteUser(user) {
            try {
                const response = await axios.delete(`/api/users/${user.user_id}`);
                console.log('User deleted:', response.data);
                this.fetchUsers(); // Refresh list after deletion
                this.errorMessage = ''; // Clear any previous errors
            } catch (error) {
                console.error('error deleting user', error);
                this.errorMessage = 'Error deleting user'; // Update UI with error message
            }
        },
        toggleMenu() {
            console.log('Menu toggled');
            // Add your menu toggle logic here
        }
    }
});