/*
*********************************************************************************************
* File: career-highlights.js
* Author: Madhurima Rawat
* Date: July 15, 2024
* Description: JavaScript file for Madhurima Rawat's personal portfolio website, managing the
*              behavior of a color switcher dropdown for dynamically changing the website's primary color.
* Version: 1.0
* GitHub Repository: https://github.com/madhurimarawat/madhurima-portfolio
* Issues/Bugs: For any issues or bugs, please visit the GitHub repository issues section.
* Comments: This JS file defines scripts to manage the visibility and interaction of the color switcher
*           dropdown, enhancing user experience by allowing dynamic customization of the website's color scheme.
* Dependencies: None
*********************************************************************************************
*/

/**
 * Manages the behavior of a color switcher dropdown for dynamically changing the website's primary color.
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

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link');
    const totalLinks = links.length;
    const centerRotationDuration = 3000; // Duration for each link to stay in center
    const radius = 150; // Distance of icons from center
    const rotationSpeed = 0.5; // Speed of the rotation (in degrees per frame)
    const initialDisplayDuration = 1000; // Duration for initial central icon to be displayed (in milliseconds)
    const initialImageSrc = 'https://ouch-cdn2.icons8.com/7t1OP99ujxbijKLclt_j8lXv5sNR8Ob4utsa-QRFnf0/rs:fit:435:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTA0/L2RjMWUzN2RiLWM1/NzctNGY0Mi05ZWFj/LWVkMWRlYjJkMDAw/Yy5zdmc.png';
    const initialTitle = 'Central Title';
    const initialHref = '#';

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
            centralIcon.className = 'fas fa-star'; // Default central icon class
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

    // Start the rotation animation
    animateRotation();

    // Display the initial central icon for a set duration, then start the periodic rotation
    setTimeout(() => {
        rotateCenter(); // Rotate center once after the initial delay
        rotationInterval = setInterval(rotateCenter, centerRotationDuration); // Start the periodic rotation
    }, initialDisplayDuration);
});
