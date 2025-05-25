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

const healthTips = {
    "Underweight": [
        "Consider consulting a doctor or a dietitian for advice on healthy weight gain.",
        "Focus on nutrient-rich foods, including proteins, healthy fats, and complex carbohydrates.",
        "Incorporate strength training exercises to build muscle mass."
    ],
    "Normal weight": [
        "Maintain a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains.",
        "Engage in regular physical activity, aiming for at least 150 minutes of moderate-intensity exercise per week.",
        "Continue monitoring your lifestyle to stay in a healthy range."
    ],
    "Overweight": [
        "Focus on portion control and reducing intake of processed foods, sugary drinks, and unhealthy fats.",
        "Increase physical activity; aim for more than 150 minutes of moderate-intensity exercise per week.",
        "Consider consulting a healthcare provider for personalized advice."
    ],
    "Obese": [
        "It's highly recommended to consult a healthcare provider or a registered dietitian for a personalized weight management plan.",
        "Focus on significant lifestyle changes including diet modification and increased physical activity.",
        "Look for support systems or programs that can help with your weight loss journey."
    ],
    "Error": ["Please enter valid height and weight to get health tips."]
};

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

// BMI Calculation
const bmiForm = document.getElementById('bmiForm');
const bmiValueSpan = document.getElementById('bmiValue');
const bmiCategorySpan = document.getElementById('bmiCategory');
const healthTipsSection = document.getElementById('healthTipsSection'); // Added for health tips
// const ageInput = document.getElementById('age'); // Age is not used in BMI calculation
// const genderInputs = document.querySelectorAll('input[name="gender"]'); // Gender is not used in BMI calculation

function calculateAndDisplayBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const isMetric = metricRadio.checked;

    // Input Validation
    // Clear previous category classes and tips
    bmiCategorySpan.className = 'font-bold'; // Reset to base class, font-bold is from index.html
    bmiValueSpan.textContent = '--';
    healthTipsSection.innerHTML = ''; // Clear previous health tips


    if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
        bmiCategorySpan.textContent = 'Please enter valid positive numbers for height and weight.';
        bmiCategorySpan.classList.add('text-red-500');
        const errorTips = healthTips["Error"];
        const ul = document.createElement('ul');
        ul.className = 'list-disc list-inside text-left';
        errorTips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            ul.appendChild(li);
        });
        healthTipsSection.appendChild(ul);
        return;
    }

    let bmi;

    // BMI Calculation
    if (isMetric) {
        // Height in cm, Weight in kg
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
    } else {
        // Height in inches, Weight in lbs
        // BMI = 703 * weight (lbs) / (height (inches))^2
        bmi = 703 * weight / (height * height);
    }

    // Determine BMI Category and Styles
    let categoryKey; // Key for healthTips object
    let categoryDisplay; // Text for display, possibly with emoji
    let categoryClass = '';

    if (bmi < 18.5) {
        categoryKey = 'Underweight';
        categoryDisplay = '📉 Underweight';
        categoryClass = 'text-blue-500';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        categoryKey = 'Normal weight';
        categoryDisplay = '✅ Normal weight';
        categoryClass = 'text-green-500';
    } else if (bmi >= 25 && bmi <= 29.9) {
        categoryKey = 'Overweight';
        categoryDisplay = '⚠️ Overweight';
        categoryClass = 'text-yellow-500';
    } else { // BMI >= 30
        categoryKey = 'Obese';
        categoryDisplay = '❗ Obese';
        categoryClass = 'text-red-500';
    }

    // Apply styling and display results
    bmiValueSpan.textContent = bmi.toFixed(1); // Rounded to one decimal place
    bmiCategorySpan.textContent = categoryDisplay; // Set text content with emoji
    if (categoryClass) {
        bmiCategorySpan.classList.add(categoryClass);
    }

    // Display Health Tips
    const tips = healthTips[categoryKey];
    if (tips) {
        const ul = document.createElement('ul');
        ul.className = 'list-disc list-inside text-left mt-4'; // Added margin-top for spacing
        tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            ul.appendChild(li);
        });
        healthTipsSection.appendChild(ul);
    }
}

bmiForm.addEventListener('submit', function(event) {
    event.preventDefault();
    calculateAndDisplayBMI();
});
