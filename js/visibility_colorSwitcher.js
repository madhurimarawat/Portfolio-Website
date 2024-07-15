/*
*********************************************************************************************
* File: visibility_colorSwitcher.js
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
