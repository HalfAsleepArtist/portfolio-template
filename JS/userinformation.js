function addUserInformation() {
    // Determine the base path dynamically
    let basePath = '';
    if (window.location.pathname.includes('/Projects/')) {
        basePath = '../../Config/userinformation.txt';
    } else if (window.location.pathname.includes('/HTML/')) {
        basePath = '../Config/userinformation.txt';
    } else {
        basePath = 'Config/userinformation.txt'; // Default case if in root or unexpected location
    }

    fetch(basePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').map(line => line.trim());
            const [profilePicUrl, profileName, profileRole, location, ...socials] = lines;

            // Get the container where the user info should be added
            const container = document.querySelector('.top-container'); // Select the specific container

            // Create the user info panel
            const userInfoPanel = document.createElement("div");
            userInfoPanel.className = "user-info-panel";

            // Create and append the image
            const img = document.createElement("img");
            img.src = profilePicUrl; // Your Profile Pic URL from txt
            img.alt = "Profile Picture";
            img.className = "profile-pic";
            userInfoPanel.appendChild(img);

            // Create and append the user name
            const userName = document.createElement("h1");
            userName.className = "user-name";
            userName.textContent = profileName; // Your Profile Name from txt
            userInfoPanel.appendChild(userName);

            // Create and append the user role
            const userRole = document.createElement("h2");
            userRole.textContent = profileRole; // Your Current Title & Studio from txt
            userInfoPanel.appendChild(userRole);

            // Create and append the location
            const userLocationContainer = document.createElement("div");
            userLocationContainer.className = "user-location-container";

            const locationIcon = document.createElement("span");
            locationIcon.className = "material-symbols-outlined";
            locationIcon.textContent = "explore";
            userLocationContainer.appendChild(locationIcon);

            const userLocation = document.createElement("h2");
            userLocation.textContent = location; // Your Location from txt
            userLocationContainer.appendChild(userLocation);

            userInfoPanel.appendChild(userLocationContainer);

            // Create and append the social icons
            const socialIcons = document.createElement("div");
            socialIcons.className = "social-icons";
            userInfoPanel.appendChild(socialIcons);

            // Define the mapping of keywords to icon classes
            const socialIconMap = {
                'twitter': "fa-brands fa-x-twitter",
                'email': "fas fa-envelope",
                'facebook': "fa-brands fa-square-facebook",
                'discord': "fa-brands fa-discord",
                'instagram': "fa-brands fa-instagram",
                'youtube': "fa-brands fa-youtube",
                'linkedin': "fab fa-linkedin",
                'artstation': "fa-brands fa-artstation"
            };

            // Adding social links based on the detected type
            socials.forEach(social => {
                let iconClass;
                let url = social;

                // Detect the type of social link
                if (social.includes('twitter.com')) {
                    iconClass = socialIconMap['twitter'];
                } else if (social.includes('facebook.com')) {
                    iconClass = socialIconMap['facebook'];
                } else if (social.includes('discord.com')) {
                    iconClass = socialIconMap['discord'];
                } else if (social.includes('instagram.com')) {
                    iconClass = socialIconMap['instagram'];
                } else if (social.includes('youtube.com')) {
                    iconClass = socialIconMap['youtube'];
                } else if (social.includes('linkedin.com')) {
                    iconClass = socialIconMap['linkedin'];
                } else if (social.includes('artstation.com')) {
                    iconClass = socialIconMap['artstation'];
                } else if (social.includes('@')) {
                    iconClass = socialIconMap['email'];
                    url = `mailto:${social}`;
                }

                if (iconClass) {
                    const a = document.createElement("a");
                    a.href = url;
                    a.target = "_blank";
                    const icon = document.createElement("i");
                    icon.className = iconClass;
                    a.appendChild(icon);
                    socialIcons.appendChild(a);
                }
            });

            // Append the user info panel to the top-container element
            container.appendChild(userInfoPanel);
        })
        .catch(error => console.error('Error loading user information:', error));
}

// Call the function when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");
    addUserInformation();
});
