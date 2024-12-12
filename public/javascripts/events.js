document.addEventListener('DOMContentLoaded', function() {
    // Get references to the menu toggle button and the navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add event listener to toggle the visibility of navigation links
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });




    // Ajax event calls
    const eventForm = document.querySelector('.event-form');

});

var buttons = document.querySelectorAll('.card-section-events button');

// Add event listener to each button
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Redirect to eventpage.html
        window.location.href = '/eventpage.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.event-creation-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            event_date: document.getElementById('event_date').value,
            org_id: document.getElementById('org_id').value,
        };

        try {
            const response = await fetch('/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                alert('Error creating event');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating event');
        }
    });
});