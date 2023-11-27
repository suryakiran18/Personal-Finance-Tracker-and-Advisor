// Get references to the DOM elements
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addIncomeBtn = document.getElementById('add-Income-btn');
const incomeTableBody = document.getElementById('Income-table-body');
const totalAmount = document.getElementById('total-amount');

// Initialize an empty array to store income data
let incomeData = [];

// Function to add new income data to the array
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
}

// Function to update the income list table
function updateIncomeList() {
  incomeTableBody.innerHTML = ''; // Clear the table body

  let total = 0;
  incomeData.forEach((incomeItem) => {
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
      removeIncome(incomeItem);
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    incomeTableBody.appendChild(row);

    total += incomeItem.amount;
  });

  totalAmount.textContent = `Total Income: ${total}`;


}

// Function to remove an income item from the array and update the list
function removeIncome(incomeItem) {
  incomeData = incomeData.filter((item) => item !== incomeItem);
  updateIncomeList();
}

// Add event listener to the add income button
addIncomeBtn.addEventListener('click', addIncome);