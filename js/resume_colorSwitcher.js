document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const colorDropdown = document.getElementById('colorDropdown');

  dropdownToggle.addEventListener('click', function () {
    // Toggle visibility of dropdown menu
    if (colorDropdown.style.display === 'none' || colorDropdown.style.display === '') {
      colorDropdown.style.display = 'block'; // Show the dropdown if hidden
    } else {
      colorDropdown.style.display = 'none'; // Hide the dropdown if visible
    }
  });

  // Add event listeners to dropdown items
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
      const selectedColor = this.getAttribute('data-color');
      changeColor(selectedColor); // Call the function to change color

      // Hide dropdown menu after selection
      colorDropdown.style.display = 'none';
    });
  });
});

// Function to change the root element's primary color variable
function changeColor(color) {
  let root = document.documentElement;
  switch (color) {
    case 'autumn':
      root.style.setProperty('--primary-color', 'coral');
      break;
    case 'summer':
      root.style.setProperty('--primary-color', '#FFD700');
      break;
    case 'rainy':
      root.style.setProperty('--primary-color', '#00CED1');
      break;
    case 'winter':
      root.style.setProperty('--primary-color', 'rgb(242, 82, 175)');
      break;
    default:
      root.style.setProperty('--primary-color', '#6cb2eb');
  }
}
