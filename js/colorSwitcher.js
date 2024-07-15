/*
*********************************************************************************************
* File: colorSwitcher.js
* Author: Madhurima Rawat
* Date: July 15, 2024
* Description: JavaScript file for Madhurima Rawat's personal portfolio website, providing
*              functionality to dynamically change color schemes based on user-selected seasons.
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
