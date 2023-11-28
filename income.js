// Get references to the DOM elements
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addIncomeBtn = document.getElementById('add-Income-btn');
const incomeTableBody = document.getElementById('Income-table-body');
const totalAmount = document.getElementById('total-amount');

// Initialize an empty array to store income data
let incomeData = [];

// Function to add new income data to the array and update local storage
function addIncome() {
  const category = categorySelect.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  const incomeItem = {
    category,
    amount,
    date,
  };

  incomeData.push(incomeItem);
  updateIncomeList();
  saveDataToLocal();
}

// Function to update the income list table
function updateIncomeList() {
  incomeTableBody.innerHTML = ''; // Clear the table body

  let total = 0;
  incomeData.forEach((incomeItem, index) => {
    const row = document.createElement('tr');

    const categoryCell = document.createElement('td');
    categoryCell.textContent = incomeItem.category;
    row.appendChild(categoryCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = incomeItem.amount;
    row.appendChild(amountCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = incomeItem.date;
    row.appendChild(dateCell);

    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      removeIncome(index);
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    incomeTableBody.appendChild(row);

    total += incomeItem.amount;
  });

  totalAmount.textContent = `Total Income: ${total}`;
}

// Function to remove an income item from the array, update the list, and local storage
function removeIncome(index) {
  incomeData.splice(index, 1);
  updateIncomeList();
  saveDataToLocal();
}

// Function to save data to local storage
function saveDataToLocal() {
  localStorage.setItem('incomeData', JSON.stringify(incomeData));
}

// Function to load data from local storage
function loadDataFromLocal() {
  const savedData = localStorage.getItem('incomeData');
  incomeData = savedData ? JSON.parse(savedData) : [];
  updateIncomeList();
}

// Load existing data from local storage when the page loads
loadDataFromLocal();

// Add event listener to the add income button
addIncomeBtn.addEventListener('click', addIncome);
