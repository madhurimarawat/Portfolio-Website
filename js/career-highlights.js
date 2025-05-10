/*
*********************************************************************************************
* File: career-highlights.js
* Author: Madhurima Rawat
* Date: May 10, 2025
* Description: JavaScript file for Madhurima Rawat's personal portfolio website, managing the
*              behavior of a color switcher dropdown for dynamically changing the website's primary color,
*              and animating social links wheel with dynamic updates to central icon and title.
* Version: 1.1
* GitHub Repository: https://github.com/madhurimarawat/Portfolio-Website
* Issues/Bugs: For any issues or bugs, please visit the GitHub repository issues section.
* Comments: This JS file defines scripts to manage the visibility and interaction of the color switcher
*           dropdown, and a social links wheel, enhancing user experience by allowing dynamic customization
*           of the website's color scheme and interactive display of social links.
* Dependencies: None
*********************************************************************************************
*/

/**
 * Manages the behavior of a color switcher dropdown for dynamically changing the website's primary color,
 * and animates the social links wheel with dynamic updates to the central icon and title.
 */

/**
 * Color Switcher Dropdown Interaction
 * 
 * This script manages the behavior of a color switcher dropdown:
 * - Shows the dropdown menu on hover over the toggle button.
 * - Hides the dropdown menu when the mouse leaves the dropdown area.
 * - Hides the dropdown menu when clicking outside the dropdown.
 * - Changes the root element's primary color variable based on user selection.
 * - Automatically hides the dropdown after a delay once a color is selected.
 */

/**
 * Social Links Wheel Animation
 * 
 * This script manages the behavior of a social links wheel:
 * - Dynamically updates the position and rotation of social links around a central icon.
 * - Rotates the wheel and updates the central icon and title based on the current link.
 * - Adjusts radius based on screen size for responsiveness.
 * - Starts animation only after user scrolls to the section using Intersection Observer.
 */

// Function to handle interactions with the color switcher dropdown
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle'); // Dropdown toggle button
    const colorDropdown = document.getElementById('colorDropdown'); // Dropdown menu itself

    // Show dropdown menu on hover
    dropdownToggle.addEventListener('mouseenter', function () {
        colorDropdown.style.display = 'block'; // Display dropdown on hover
    });

    // Hide dropdown menu when mouse leaves the dropdown
    colorDropdown.addEventListener('mouseleave', function () {
        colorDropdown.style.display = 'none'; // Hide dropdown on mouse leave
    });

    // Hide dropdown menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !colorDropdown.contains(event.target)) {
            colorDropdown.style.display = 'none'; // Hide dropdown if click is outside
        }
    });

    // Add event listeners to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedColor = this.getAttribute('onclick').split("'")[1]; // Get selected color from dropdown item
            changeColor(selectedColor); // Call function to change color based on selection

            // Hide dropdown menu after selection with delay
            setTimeout(function () {
                colorDropdown.style.display = 'none';
            }, 300); // Delay in milliseconds (e.g., 300ms = 0.3 second)
        });
    });
});

// Function to change the root element's primary color variable
function changeColor(color) {
    let root = document.documentElement; // Access the root element of the document (e.g., <html>)

    // Change primary color variable based on selected color
    switch (color) {
        case 'autumn':
            root.style.setProperty('--primary-color', 'coral'); // Autumn: Coral
            break;
        case 'summer':
            root.style.setProperty('--primary-color', '#FFD700'); // Summer: Gold
            break;
        case 'rainy':
            root.style.setProperty('--primary-color', '#00CED1'); // Rainy: Dark Turquoise
            break;
        case 'winter':
            root.style.setProperty('--primary-color', 'rgb(242, 82, 175)'); // Winter: Deep Pink
            break;
        default:
            root.style.setProperty('--primary-color', '#6cb2eb'); // Default: Sky Blue
    }
}

/**
 * Toggles Dark Mode with support for icon/text update and user preference saving.
 */
function toggleDarkMode() {
    const darkModeId = 'dark-mode-stylesheet';
    const highlightsDarkModeId = 'highlights-dark-stylesheet';

    const toggleLink = document.getElementById('dark-mode-toggle');
    const icon = toggleLink.querySelector('i');
    const text = toggleLink.querySelector('.mode-text');

    const isDarkMode = !document.getElementById(darkModeId);

    if (isDarkMode) {
        // Enable dark mode
        const darkStyle = document.createElement('link');
        darkStyle.rel = 'stylesheet';
        darkStyle.href = 'css/index-dark.css';
        darkStyle.id = darkModeId;
        document.head.appendChild(darkStyle);

        const highlightsStyle = document.createElement('link');
        highlightsStyle.rel = 'stylesheet';
        highlightsStyle.href = 'css/career-highlights-dark.css';
        highlightsStyle.id = highlightsDarkModeId;
        document.head.appendChild(highlightsStyle);

        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        if (text) text.textContent = ' Light Mode';

        localStorage.setItem('colorMode', 'dark');
    } else {
        // Disable dark mode
        document.getElementById(darkModeId)?.remove();
        document.getElementById(highlightsDarkModeId)?.remove();

        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        if (text) text.textContent = ' Dark Mode';

        localStorage.setItem('colorMode', 'light');
    }
}

/**
 * Apply saved theme preference or system default on page load.
 */
function applyPreferredMode() {
    const savedMode = localStorage.getItem('colorMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        toggleDarkMode();
    }
}

document.addEventListener('DOMContentLoaded', applyPreferredMode);


// For social links wheel
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link');
    const totalLinks = links.length;
    const centerRotationDuration = 3000; // Duration for each link to stay in center
    const rotationSpeed = 0.5; // Speed of the rotation (in degrees per frame)
    const initialDisplayDuration = 1000; // Duration for initial central icon to be displayed (in milliseconds)
    const initialTitle = 'Central Title';
    const initialHref = '#';

    let radius = 150; // Default radius for larger screens

    // Adjust radius based on screen width
    if (window.innerWidth > 412 && window.innerWidth <= 480) {
        // Screen width between 413px and 480px
        radius = 123;
    } else if (window.innerWidth < 412 && window.innerWidth > 344) {
        // Screen width between 345px and 411px
        radius = 108;
    } else if (window.innerWidth <= 344) {
        // Screen width 344px or smaller
        radius = 106;
    } else if (window.innerWidth == 412) {
        // Exact screen width of 412px
        radius = 135;
    }

    let currentIndex = 0;
    let angle = 0; // Initial rotation angle
    let rotationInterval;

    function updateLinksPosition() {
        const angleStep = 360 / totalLinks;

        links.forEach((link, index) => {
            const rotation = angleStep * index + angle;
            link.style.transform = `rotate(${rotation}deg) translateX(${radius}px) rotate(-${rotation}deg)`;
        });
    }

    function rotateCenter() {
        const centralIcon = document.querySelector('.center i');
        const centralLink = document.querySelector('.center a');

        // Remove the 'active' class from the previous central icon
        document.querySelectorAll('.links i').forEach(icon => {
            icon.classList.remove('active');
        });

        // Get the primary color from the CSS variables
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

        if (currentIndex === 0) {
            // Reset to initial icon after all links have been shown
            centralIcon.className = 'fas fa-user-friends'; // Default central icon class
            centralIcon.style.color = primaryColor; // Use the primary color for the central icon
            centralLink.href = initialHref;
            centralLink.title = initialTitle;
            centralIcon.title = initialTitle; // Set the title for the central icon
            centralIcon.classList.remove('active'); // Ensure 'active' class is removed
        } else {
            const currentLink = links[currentIndex - 1];
            const newIconClass = currentLink.querySelector('i').className;
            const newHref = currentLink.href;
            const newTitle = currentLink.title;

            // Update the central icon class and link attributes
            centralIcon.className = newIconClass;
            centralIcon.style.color = primaryColor; // Use the primary color for the central icon
            centralLink.href = newHref;
            centralLink.title = newTitle;
            centralIcon.title = newTitle; // Set the title for the central icon

            // Add the 'active' class to the central icon
            centralIcon.classList.add('active');

            links.forEach((link, index) => {
                link.classList.remove('scale'); // Remove scaling from all links
                if (index === currentIndex - 1) {
                    link.classList.add('scale'); // Add scaling to the current link
                }
            });
        }

        currentIndex = (currentIndex + 1) % (totalLinks + 1);
    }

    function animateRotation() {
        angle = (angle + rotationSpeed) % 360; // Update rotation angle
        updateLinksPosition(); // Update positions of the links
        requestAnimationFrame(animateRotation); // Request the next frame
    }

    // Intersection Observer to start animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the rotation animation
                animateRotation();

                // Display the initial central icon for a set duration, then start the periodic rotation
                setTimeout(() => {
                    rotateCenter(); // Rotate center once after the initial delay
                    rotationInterval = setInterval(rotateCenter, centerRotationDuration); // Start the periodic rotation
                }, initialDisplayDuration);

                // Stop observing after the animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Adjust the threshold as needed
    });

    // Start observing the social links section
    const socialLinksSection = document.getElementById('social-links-section');
    observer.observe(socialLinksSection);
});
