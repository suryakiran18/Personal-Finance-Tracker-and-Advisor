// Get references to the DOM elements
const categorySelect = document.getElementById('category-select');
const savingsAmountInput = document.getElementById('savings-amount');
const savingsGoalInput = document.getElementById('savings-goal');
const savingsDateInput = document.getElementById('savings-date');
const calculateSavingsBtn = document.getElementById('calculate-savings-btn');
const currentSavingsElement = document.getElementById('current-savings');
const savingsGoalDisplayElement = document.getElementById('savings-goal-display');
const targetSavingsDateElement = document.getElementById('target-savings-date');
const savingDifferenceElement = document.getElementById('saving-difference');
const balanceAchievementElement = document.getElementById('balance-achievment');
const savingsTableBody = document.getElementById('Savings-table-body');
const totalCurrentSavingsElement = document.getElementById('total-Current-Savings');
const totalTargetSavingsDateElement = document.getElementById('total-Target-Savings-Date');
const totalSavingDifferenceElement = document.getElementById('total-saving-difference');
const totalBalanceAchievementElement = document.getElementById('total-balance-achievment');

let totalSavings = 0;
let savingsData = [];

calculateSavingsBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  const savingsAmount = parseFloat(savingsAmountInput.value);
  const savingsGoal = parseFloat(savingsGoalInput.value);
  const savingsDate = new Date(savingsDateInput.value);

  if (savingsAmount && savingsGoal && savingsDate) {
    const today = new Date();
    const monthsUntilTargetDate = (savingsDate.getFullYear() - today.getFullYear()) * 12 + (savingsDate.getMonth() - today.getMonth());

    const monthlySavingsNeeded = ((savingsGoal - savingsAmount) / monthsUntilTargetDate).toFixed(2);
    const percentageAchieved = ((savingsAmount / savingsGoal) * 100).toFixed(2);
    const savingDifference = savingsGoal - savingsAmount;

    // Update savings results
    currentSavingsElement.textContent = savingsAmount;
    savingsGoalDisplayElement.textContent = savingsGoal;
    targetSavingsDateElement.textContent = savingsDate.toLocaleDateString();
    savingDifferenceElement.textContent = savingDifference.toFixed(2);
    balanceAchievementElement.textContent = `${percentageAchieved}%`;

    // Save the new savings entry to the data array
    const savingsEntry = {
      category,
      savingsAmount,
      savingsGoal,
      savingsDate: savingsDate.toLocaleDateString(),
      percentageAchieved: `${percentageAchieved}%`,
    };

    savingsData.push(savingsEntry);
    saveSavingsDataToLocal();

    // Update savings table
    const newTableRow = document.createElement('tr');
    newTableRow.innerHTML = `
      <td>${category}</td>
      <td>${savingsAmount}</td>
      <td>${savingsDate.toLocaleDateString()}</td>
      <td>${savingDifference.toFixed(2)}</td>
      <td>${percentageAchieved}%</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    const deleteBtn = newTableRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      savingsTableBody.removeChild(newTableRow);
      updateSavingsTotals();
      removeSavingsEntry(savingsEntry);
    });

    savingsTableBody.appendChild(newTableRow);
    updateSavingsTotals();
  }
});

function updateSavingsTotals() {
  let totalCurrentSavings = 0;
  let totalTargetSavingsDate = '';
  let totalSavingDifference = 0;
  let totalBalanceAchievement = 0;

  const savingsRows = savingsTableBody.querySelectorAll('tr');

  for (const row of savingsRows) {
    const currentSavings = parseFloat(row.querySelector('td:nth-child(2)').textContent);
    const savingsGoal = parseFloat(row.querySelector('td:nth-child(3)').textContent);
    const percentageAchieved = parseFloat(row.querySelector('td:nth-child(5)').textContent);

    totalCurrentSavings += currentSavings;
    totalSavingDifference += savingsGoal - currentSavings;
    totalBalanceAchievement += percentageAchieved;
  }

  totalTargetSavingsDate = savingsRows.length ? savingsRows[0].querySelector('td:nth-child(3)').textContent : '';
  totalBalanceAchievement = totalBalanceAchievement / savingsRows.length;

  totalCurrentSavingsElement.textContent = totalCurrentSavings.toFixed(2);
  totalTargetSavingsDateElement.textContent = totalTargetSavingsDate;
  totalSavingDifferenceElement.textContent = totalSavingDifference.toFixed(2);
  totalBalanceAchievementElement.textContent = `${totalBalanceAchievement.toFixed(2)}%`;
}

function removeSavingsEntry(entry) {
  savingsData = savingsData.filter((item) => item !== entry);
  saveSavingsDataToLocal();
}

function saveSavingsDataToLocal() {
  localStorage.setItem('savingsData', JSON.stringify(savingsData));
}

function loadSavingsDataFromLocal() {
  const savedData = localStorage.getItem('savingsData');
  savingsData = savedData ? JSON.parse(savedData) : [];
  updateSavingsList();
}

function updateSavingsList() {
  savingsTableBody.innerHTML = '';

  for (const entry of savingsData) {
    const newTableRow = document.createElement('tr');
    newTableRow.innerHTML = `
      <td>${entry.category}</td>
      <td>${entry.savingsAmount}</td>
      <td>${entry.savingsDate}</td>
      <td>${entry.savingsGoal - entry.savingsAmount}</td>
      <td>${entry.percentageAchieved}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    const deleteBtn = newTableRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      savingsTableBody.removeChild(newTableRow);
      updateSavingsTotals();
      removeSavingsEntry(entry);
    });

    savingsTableBody.appendChild(newTableRow);
  }

  updateSavingsTotals();
}

// Load existing savings data from local storage when the page loads
loadSavingsDataFromLocal();
