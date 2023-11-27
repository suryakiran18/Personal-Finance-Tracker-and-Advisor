const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addExpenseBtn = document.getElementById('add-Expense-btn');
const expenseTableBody = document.getElementById('Expense-table-body');
const totalAmountElement = document.getElementById('total-amount');

let expenses = [];

addExpenseBtn.addEventListener('click', () => {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (category && amount && date) {
        const expense = {
            category,
            amount,
            date,
        };
        // ... (your existing code)

function updateTotalAmount() {
    let totalAmount = 0;
    for (const expense of expenses) {
        totalAmount += expense.amount;
    }

    totalAmountElement.textContent = totalAmount;

    // Update savings totals after updating expenses
    updateSavingsTotals();
}

// ... (your existing code)


        expenses.push(expense);

        renderExpenseList();
        updateTotalAmount();

        clearInputs();
    }
});

function renderExpenseList() {
    expenseTableBody.innerHTML = '';

    for (const expense of expenses) {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.textContent = expense.category;
        row.appendChild(categoryCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = expense.amount;
        row.appendChild(amountCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = expense.date;
        row.appendChild(dateCell);

        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            const index = expenses.indexOf(expense);
            expenses.splice(index, 1);
            renderExpenseList();
            updateTotalAmount();
        });
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        expenseTableBody.appendChild(row);
    }
}

function updateTotalAmount() {
    let totalAmount = 0;
    for (const expense of expenses) {
        totalAmount += expense.amount;
    }

    totalAmountElement.textContent = totalAmount;
}

function clearInputs() {
    categorySelect.selectedIndex = 0;
    amountInput.value = '';
    dateInput.value = '';
}

// Add this to your existing script.js or create a new script file

document.addEventListener('DOMContentLoaded', function () {
    // Your existing JavaScript code goes here

    // Function to update the pie chart
    function updatePieChart(expenseData) {
        var ctx = document.getElementById('expenseChart').getContext('2d');
        var expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: expenseData.categories,
                datasets: [{
                    data: expenseData.amounts,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9933'
                        // Add more colors if you have more categories
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Example data (replace this with your actual data)
    var exampleExpenseData = {
        categories: ['Food&Beverages', 'Transportation', 'Entertainment', 'Rent', 'Utilities', 'Others'],
        amounts: [100, 50, 30, 120, 80, 40] // These amounts should be dynamically fetched from your expenses
    };

    // Call the function with your data to update the pie chart
    updatePieChart(exampleExpenseData);
})