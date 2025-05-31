/*********************************************************************************************
* File: index.js
* Author: Madhurima Rawat
* Date: May 31, 2025
* Description: JavaScript file for Madhurima Rawat's personal portfolio website, providing
*              functionality to dynamically change color schemes based on user-selected seasons.
*              Also handles the spacing when a section is clicked with respect to navigation bar.
* Version: 1.0
* GitHub Repository: https://github.com/madhurimarawat/Portfolio-Website
* Issues/Bugs: For any issues or bugs, please visit the GitHub repository issues section.
* Comments: This JS file defines functions to update the primary color variable of the root
*           element based on the provided season. It enhances user experience by allowing
*           dynamic customization of the color scheme.
* Dependencies: None
*********************************************************************************************/

/**
 * Change Primary Color Variable
 * 
 * This function updates the primary color variable of the root element (document.documentElement)
 * based on the provided color name.
 * 
 * @param {string} Color - The name of the color to set as the primary color.
 *                        Valid values are 'autumn', 'summer', 'rainy', 'winter', or default to '#6cb2eb'.
 */

// "Life is too short to be using just one color!"
// This function sets the primary color CSS variable based on the provided theme string
function changeColor(Color) {
  let colorValue;

  // Store the selected theme in localStorage with a specific key
  localStorage.setItem('madhurima-portfolio-website-theme', Color); // 📦 Save theme selection

  // Map the season to its corresponding color
  switch (Color) {
    case 'autumn':
      colorValue = 'coral'; // 🍁 Autumn: Coral
      break;
    case 'summer':
      colorValue = '#FFD700'; // 🌞 Summer: Gold
      break;
    case 'rainy':
      colorValue = '#00CED1'; // 🌧️ Rainy: Dark Turquoise
      break;
    case 'winter':
      colorValue = 'rgb(242, 82, 175)'; // ⛄ Winter: Deep Pink
      break;
    default:
      colorValue = '#6cb2eb'; // 🔷 Default: Sky Blue
  }

  // Apply the chosen color to the root CSS variable
  document.documentElement.style.setProperty('--primary-color', colorValue);
}

// Apply saved theme when the page loads
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('madhurima-portfolio-website-theme');
  if (savedTheme) {
    changeColor(savedTheme); // 🚀 Load and apply the stored theme
  }
});


/**
 * Toggles between dark and light mode.
 * Applies a dark CSS file dynamically and updates the icon/text/button color.
 * Saves the user's preference in localStorage.
 * Uses system's prefers-color-scheme as a fallback on first load.
 */
function toggleDarkMode() {
  const darkModeId = 'dark-mode-stylesheet'; // ID for the dark mode stylesheet

  // Identify both toggle elements: navbar link and main button toggle
  const navToggle = document.getElementById('dark-mode-toggle'); // Navbar toggle (link)
  const btnToggle = document.getElementById('dark-mode-button'); // Main button toggle

  // Detect if dark mode is already active by checking for the dark stylesheet
  const isDarkModeActive = document.getElementById(darkModeId);

  /**
   * Helper function to update any toggle element's icon, text, and button color.
   * @param {HTMLElement} element - Button or link element
   * @param {string} mode - "dark" or "light"
   */
  function updateUI(element, mode) {
    if (!element) return; // Check if the element exists

    const icon = element.querySelector('i'); // Select the icon inside the element
    const text = element; // For the button, the text is directly inside the button

    // Swap icon and label
    if (mode === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      text.innerHTML = '<i class="fas fa-sun"></i> Light Mode'; // Change text to "Light Mode" when dark mode is active
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      text.innerHTML = '<i class="fas fa-moon"></i> Dark Mode'; // Change text to "Dark Mode" when light mode is active
    }

    // Only style elements with the 'dark-toggle-btn' class
    if (element.classList.contains('dark-toggle-btn')) {
      if (mode === 'dark') {
        element.style.backgroundColor = '#FFA500'; // Dark mode button color
      } else {
        element.style.backgroundColor = '#5C5470'; // Light mode button color
      }
    }
  }

  if (!isDarkModeActive) {
    // Dark mode not active → enable it by injecting <link> for dark mode styles
    const darkModeLink = document.createElement('link');
    darkModeLink.rel = 'stylesheet';
    darkModeLink.href = 'css/index-dark.css'; // Path to your dark mode stylesheet
    darkModeLink.id = darkModeId;
    document.head.appendChild(darkModeLink); // Add the stylesheet to the head of the document

    // Update both toggle buttons for dark mode
    updateUI(navToggle, 'dark');
    updateUI(btnToggle, 'dark');

    // Save user preference in localStorage for persistence
    localStorage.setItem('madhurima-portfolio-website-colorMode', 'dark');
    console.log('Dark mode enabled');
  } else {
    // Dark mode is active → disable it by removing the dark stylesheet
    isDarkModeActive.remove();

    // Update both toggle buttons for light mode
    updateUI(navToggle, 'light');
    updateUI(btnToggle, 'light');

    // Save user preference in localStorage for persistence
    localStorage.setItem('madhurima-portfolio-website-colorMode', 'light');
    console.log('Dark mode disabled');
  }
}

/**
 * On page load, apply user’s preferred mode.
 * Priority: localStorage → prefers-color-scheme (system theme)
 */
function applyPreferredMode() {
  const savedMode = localStorage.getItem('madhurima-portfolio-website-colorMode'); // Get saved mode from localStorage

  // Check if a preference is saved in localStorage and apply it
  if (savedMode === 'dark') {
    toggleDarkMode(); // Apply dark mode if saved preference is dark
  } else if (!savedMode) {
    // No preference saved → check system theme using prefers-color-scheme
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      toggleDarkMode(); // Apply dark if system theme prefers dark mode
    }
  }
}

// Run when DOM is ready, to apply the preferred mode
document.addEventListener('DOMContentLoaded', applyPreferredMode);


/* This function handles dropdown scrollings */
$(document).ready(function () {
  // Function to handle smooth scrolling for both dropdown and direct navigation items
  function smoothScroll(event, target) {
    var offset;

    // Check if it's a mobile device
    if ($(window).width() < 992) {
      offset = $(target).offset().top - 75; // Manually adjust for mobile, excluding navbar height
    } else {
      offset = $(target).offset().top - $(".navbar").outerHeight() - (-10); // Default offset for larger screens
    }

    // Smooth scroll to the target section
    $('html, body').animate({
      scrollTop: offset
    }, 800);

    // Collapse the navbar menu after clicking a dropdown item
    $(".navbar-collapse").collapse('hide');
  }

  // Handle click event for dropdown items within the "Profile" section
  $("#navbarDropdownProfile + .dropdown-menu a.dropdown-item").on('click', function (event) {
    // Check if the clicked item has the class 'dev'
    if ($(this).hasClass('dev')) {
      // Allow the default action (opening in a new tab)
      return true;
    } else {
      // Prevent the default action (not open in a new tab)
      event.preventDefault();

      var target = $(this).attr("href");
      smoothScroll(event, target);
    }
  });

  // Handle click event for direct navigation items
  $(".nav-item a.nav-link").on('click', function (event) {
    var target = $(this).attr("href");
    smoothScroll(event, target);
  });
});

// Run when DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Function to center align elements using Flexbox
  function centerAlignContentRow(id) {
    var contentRow = document.getElementById(id);
    if (contentRow) {
      contentRow.classList.add("d-flex", "justify-content-center");
    }
  }

  // Apply to both contentRow_1 and contentRow_2
  centerAlignContentRow("contentRow_1");
  centerAlignContentRow("contentRow_2");
  centerAlignContentRow("contentRow_3");
});

/* This handles the social links wheel section */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.link');
  const totalLinks = links.length;
  const centerRotationDuration = 3000; // Duration for each link to stay in center
  const radius = 150; // Distance of icons from center
  const rotationSpeed = 0.5; // Speed of the rotation (in degrees per frame)
  const initialDisplayDuration = 1000; // Duration for initial central icon to be displayed (in milliseconds)
  const extendedDisplayDuration = 5000; // Duration for extended visibility of icons in the center (in milliseconds)
  const initialImageSrc = 'https://ouch-cdn2.icons8.com/7t1OP99ujxbijKLclt_j8lXv5sNR8Ob4utsa-QRFnf0/rs:fit:435:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTA0/L2RjMWUzN2RiLWM1/NzctNGY0Mi05ZWFj/LWVkMWRlYjJkMDAw/Yy5zdmc.png';
  const initialTitle = 'Central Title';
  const initialHref = '#';
  const sectionId = 'social-links'; // ID of the section to animate

  let currentIndex = 0;
  let angle = 0; // Initial rotation angle
  let rotationInterval;
  let isAnimating = false; // Track if the animation has started
  let animationTimeout; // Track the timeout for extending icon visibility

  function updateLinksPosition() {
    const angleStep = 360 / totalLinks;

    links.forEach((link, index) => {
      const rotation = angleStep * index + angle;
      link.style.transform = `rotate(${rotation}deg) translateX(${radius}px) rotate(-${rotation}deg)`;
    });
  }

  function rotateCenter() {
    const centralImage = document.querySelector('.center img');
    const centralLink = document.querySelector('.center a');

    if (currentIndex === 0) {
      // Reset to initial image after all links have been shown
      centralImage.src = initialImageSrc;
      centralImage.title = initialTitle;
      centralLink.href = initialHref;
      centralLink.title = initialTitle;
      centralLink.setAttribute('title', initialTitle); // Ensure title attribute is updated
    } else {
      const currentLink = links[currentIndex - 1];
      const newImageSrc = currentLink.querySelector('img').src;
      const newHref = currentLink.href;
      const newTitle = currentLink.title;

      // Update the central image src and link attributes
      centralImage.src = newImageSrc;
      centralImage.title = newTitle;
      centralLink.href = newHref;
      centralLink.title = newTitle;
      centralLink.setAttribute('title', newTitle); // Ensure title attribute is updated

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

  function startAnimation() {
    if (!isAnimating) {
      // Start the rotation animation
      animateRotation();

      // Display the initial central icon for a set duration, then start the periodic rotation
      setTimeout(() => {
        rotateCenter(); // Rotate center once after the initial delay
        rotationInterval = setInterval(rotateCenter, centerRotationDuration); // Start the periodic rotation
      }, initialDisplayDuration);

      isAnimating = true; // Set the flag to true indicating that animation has started

      // Extend visibility of central icon
      if (animationTimeout) clearTimeout(animationTimeout);
      animationTimeout = setTimeout(() => {
        rotateCenter(); // Extend visibility by rotating center once more
      }, extendedDisplayDuration);
    }
  }

  // Listen for click events on navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      if (e.target.getAttribute('href').substring(1) === sectionId) {
        document.getElementById(sectionId).classList.add('active');
        startAnimation();
      }
    });
  });

  // Listen for scroll events to trigger the animation when section is in view
  window.addEventListener('scroll', () => {
    const section = document.getElementById(sectionId);
    const sectionPosition = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (sectionPosition.top <= viewportHeight && sectionPosition.bottom >= 0) {
      document.getElementById(sectionId).classList.add('active');
      startAnimation();
    }
  });
});
