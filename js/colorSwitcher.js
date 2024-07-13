// "Life is too short to be using just one color!"
// This function takes the color from the index page and then returns the variable value according to that
function changeColor(Color) {
  let color;
  switch (Color) {
    case 'autumn':
      color = 'coral'; // Autumn color (orange-red)
      break;
    case 'summer':
      color = '#FFD700'; // Summer color (gold)
      break;
    case 'rainy':
      color = '#00CED1'; // Rainy color (steel blue)
      break;
    case 'winter':
      color = 'rgb(242, 82, 175)'; // Winter color (dark turquoise)
      break;
    default:
      color = '#6cb2eb'; // Default color
  }
  document.documentElement.style.setProperty('--primary-color', color);
}