
new Vue ({
    el: '#app',
    data: {
        mission: "We fight to protect and preserve marine life. Every helping hand contributes to the safety and well-being of sea animals in and around Australia.",
        teamCTA: "Meet some of the team",
        team: [
            {
                id: 1,
                name: "Jesse Hoppo",
                bio: "Jesse has over 20 years of experience in marine biology and education. He is the founder and has a passion for teaching others.",
                role: "CEO",
                photo: "https://via.placeholder.com/100"

            },
            {
                id: 2,
                name: "Arthur Perets",
                bio: "Arthur has a high level of experince in many relevant fields including marine biology, buisness and events. The face of [company name]",
                role: "CTO",
                photo: "https://via.placeholder.com/100"
            },
            {
                id: 3,
                name: "Loay Abdel.",
                bio: "Loay is a past vet with decades of experince and has changed his focus to marine life. He focuses on supportining the animals we save.",
                role: "COO",
                photo: "https://via.placeholder.com/100"
            }
        ]
    },
    methods: {
        created() {

            //change api endpoint to correct route
            fetch('api/team')
                .then(response => response.json())
                .then(data => {
                    this.team = data;
                });

                //change api endpoint to correcr route
            fetch('api/mission')
                .then(response => response.json())
                .then(data => {
                    this.mission = data;
                });
        }
    }
});










document.addEventListener('DOMContentLoaded', function() {
    // Get references to the menu toggle button and the navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add event listener to toggle the visibility of navigation links
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

});



