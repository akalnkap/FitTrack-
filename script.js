// Dark/Light Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Apply saved theme on page load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  htmlElement.classList.add('dark');
  darkModeToggle.textContent = 'Toggle Light Mode';
} else {
  htmlElement.classList.remove('dark');
  darkModeToggle.textContent = 'Toggle Dark Mode';
}

darkModeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  if (htmlElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
    darkModeToggle.textContent = 'Toggle Light Mode';
  } else {
    localStorage.theme = 'light';
    darkModeToggle.textContent = 'Toggle Dark Mode';
  }
});

// Metric/Imperial Unit Toggle Functionality
const metricRadio = document.getElementById('metric');
const imperialRadio = document.getElementById('imperial');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
// const heightLabel = document.querySelector('label[for="height"]'); // Not strictly needed for placeholder changes
// const weightLabel = document.querySelector('label[for="weight"]'); // Not strictly needed for placeholder changes

function updatePlaceholders() {
  if (metricRadio.checked) {
    heightInput.placeholder = 'cm';
    weightInput.placeholder = 'kg';
  } else {
    heightInput.placeholder = 'inches';
    weightInput.placeholder = 'lbs';
  }
}

// Set initial placeholders
updatePlaceholders();

metricRadio.addEventListener('change', updatePlaceholders);
imperialRadio.addEventListener('change', updatePlaceholders);

// BMI Calculation (to be implemented in the next step)
const bmiForm = document.getElementById('bmiForm');
const bmiValueSpan = document.getElementById('bmiValue');
const bmiCategorySpan = document.getElementById('bmiCategory');

bmiForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Calculation logic will be added here
    console.log('BMI calculation triggered');
});
