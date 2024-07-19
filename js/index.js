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
  // Select all dropdown items within the "Profile" section
  $("#navbarDropdownProfile + .dropdown-menu a.dropdown-item").on('click', function (event) {
    // Check if the clicked item has the class 'dev'
    if ($(this).hasClass('dev')) {
      // Allow the default action (opening in a new tab)
      return true;
    } else {
      // Prevent the default action (not open in a new tab)
      event.preventDefault();

      var target = $(this).attr("href");
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
  });
});

