/*
*********************************************************************************************
* File: index.js
* Author: Madhurima Rawat
* Date: July 15, 2024
* Description: JavaScript file for Madhurima Rawat's personal portfolio website, providing
*              functionality to dynamically change color schemes based on user-selected seasons.
*              Also handles the spacing when a section is clicked with respect to navigation bar.
* Version: 1.0
* GitHub Repository: https://github.com/madhurimarawat/madhurima-portfolio
* Issues/Bugs: For any issues or bugs, please visit the GitHub repository issues section.
* Comments: This JS file defines functions to update the primary color variable of the root
*           element based on the provided season. It enhances user experience by allowing
*           dynamic customization of the color scheme.
* Dependencies: None
*********************************************************************************************

*/
/**
 * Updates the primary color variable of the root element based on the provided color name.
 */

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
// This function takes the color from the index page and then returns the variable value according to that
function changeColor(Color) {
  let color;

  // Determine the color based on the provided Color parameter
  switch (Color) {
    case 'autumn':
      color = 'coral'; // Autumn: Coral
      break;
    case 'summer':
      color = '#FFD700'; // Summer: Gold
      break;
    case 'rainy':
      color = '#00CED1'; // Rainy: Dark Turquoise
      break;
    case 'winter':
      color = 'rgb(242, 82, 175)';  // Winter: Deep Pink
      break;
    default:
      color = '#6cb2eb'; // Default color (sky blue)
  }

  // Set the '--primary-color' CSS variable of the root element to the determined color
  document.documentElement.style.setProperty('--primary-color', color);
}

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
  // Center align contentRow element using Flexbox
  var contentRow = document.getElementById("contentRow_1");
  if (contentRow) {
    contentRow.classList.add("d-flex", "justify-content-center");
  }
});

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


