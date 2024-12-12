const { getUserInfo } = require("../../controllers/userController");

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');

    saveButton.addEventListener('click', async function() {

        const userId = await getUserInfo();

        // Get the new values from the input fields
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        // Basic validation
        if (!email || !username) {
            alert('Please fill in all fields');
            return;
        }

        // Create the payload
        const updateData = {
            email: email,
            username: username
        };

        try {
            const response = await fetch(`/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                const errorResponse = await response.json();
                alert(`Error: ${errorResponse.message || 'Profile update failed'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating profile');
        }
    });


});