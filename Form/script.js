// Mapping of category-related formulas for carbon footprint calculation
const carbonData = {
    transport: {
      title: "Nəqliyyat",
      form: `
        <label for="car-km">Avtomobil: Kilometr (km):</label>
        <input type="number" id="car-km" name="car-km" placeholder="Məsələn: 50" required>
        <label for="bus-km">İctimai Nəqliyyat: Kilometr (km):</label>
        <input type="number" id="bus-km" name="bus-km" placeholder="Məsələn: 50" required>
      `,
      calculate: (data) => {
        const carKm = parseFloat(data['car-km'] || 0);
        const busKm = parseFloat(data['bus-km'] || 0);
        return (carKm * 0.25) + (busKm * 0.05);
      }
    },
    shopping: {
      title: "Alış-Veriş",
      form: `
        <label for="items">Məhsul Sayı:</label>
        <input type="number" id="items" name="items" placeholder="Məsələn: 3" required>
      `,
      calculate: (data) => {
        const items = parseInt(data['items'] || 0);
        return items * 1;
      }
    },
    food: {
      title: "Qida",
      form: `
        <label for="diet">Pəhriz növü:</label>
        <select id="diet" name="diet">
          <option value="general">Hərtərəfli</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      `,
      calculate: (data) => {
        const diet = data['diet'];
        switch(diet) {
          case 'vegetarian': return 1.5;
          case 'vegan': return 1;
          default: return 2;
        }
      }
    }
    // Add more categories if needed
  };
  
  // Category click handler
  const categories = document.querySelectorAll('.category');
  const formTitle = document.getElementById('form-title');
  const formContent = document.getElementById('form-content');
  const resultText = document.getElementById('result');
  const carbonFootprintSpan = document.getElementById('carbon-footprint');
  const calculateButton = document.getElementById('calculate-button');
  
  categories.forEach(category => {
    category.addEventListener('click', () => {
      const categoryKey = category.dataset.category;
      if (carbonData[categoryKey]) {
        // Show category-specific form
        formTitle.textContent = carbonData[categoryKey].title;
        formContent.innerHTML = carbonData[categoryKey].form;
        resultText.style.display = 'none'; // Hide previous result
      }
    });
  });
  
  // Calculate carbon footprint when button is clicked
  calculateButton.addEventListener('click', () => {
    const category = Object.keys(carbonData).find(cat => document.getElementById('form-title').textContent === carbonData[cat].title);
    if (category) {
      const formData = new FormData(document.getElementById('form-content'));
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      // Perform calculation
      const carbonValue = carbonData[category].calculate(data);
      carbonFootprintSpan.textContent = carbonValue.toFixed(2);
      resultText.style.display = 'block';
    }
  });
  