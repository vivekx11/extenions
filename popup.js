// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const calcCards = document.querySelectorAll('.calc-card');
    const modal = document.getElementById('calculator-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const historyBtn = document.getElementById('history-btn');
    const historyModal = document.getElementById('history-modal');
    const historyBody = document.getElementById('history-body');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Initialize history
    let calculationHistory = JSON.parse(localStorage.getItem('financeCalculatorHistory') || '[]');

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Calculator card clicks
    calcCards.forEach(card => {
        card.addEventListener('click', () => {
            const calcType = card.dataset.calc;
            openCalculator(calcType);
        });
    });

    // History button click
    historyBtn.addEventListener('click', () => {
        showHistory();
    });

    // Clear history button click
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all calculation history?')) {
            calculationHistory = [];
            localStorage.setItem('financeCalculatorHistory', JSON.stringify(calculationHistory));
            showHistory();
        }
    });

    // Close modal events
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) closeModal();
    });

    function openCalculator(type) {
        const calculators = {
            'budget-planner': {
                title: 'Budget Planner',
                content: getBudgetPlannerHTML()
            },
            'savings-goal': {
                title: 'Savings Goal Calculator',
                content: getSavingsGoalHTML()
            },
            'gst': {
                title: 'GST Calculator',
                content: getGSTCalculatorHTML()
            },
            'income-tax': {
                title: 'Income Tax Calculator',
                content: getIncomeTaxHTML()
            },
            'ppf': {
                title: 'PPF Calculator',
                content: getPPFCalculatorHTML()
            },
            'fd': {
                title: 'FD Calculator',
                content: getFDCalculatorHTML()
            },
            'sip': {
                title: 'SIP Calculator',
                content: getSIPCalculatorHTML()
            },
            'lumpsum': {
                title: 'Lumpsum Calculator',
                content: getLumpsumHTML()
            },
            'compound': {
                title: 'Compound Interest Calculator',
                content: getCompoundInterestHTML()
            },
            'cagr': {
                title: 'CAGR Calculator',
                content: getCAGRCalculatorHTML()
            },
            'retirement': {
                title: 'Retirement Planner',
                content: getRetirementPlannerHTML()
            },
            'emi': {
                title: 'EMI Calculator',
                content: getEMICalculatorHTML()
            },
            'loan-comparison': {
                title: 'Loan Comparison',
                content: getLoanComparisonHTML()
            }
        };

        const calculator = calculators[type];
        if (calculator) {
            modalTitle.textContent = calculator.title;
            modalBody.innerHTML = calculator.content;
            modal.style.display = 'block';
            historyModal.style.display = 'none';
            
            // Initialize calculator-specific functionality
            initializeCalculator(type);
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        historyModal.style.display = 'none';
    }

    function showHistory() {
        modal.style.display = 'none';
        historyModal.style.display = 'block';
        
        if (calculationHistory.length === 0) {
            historyBody.innerHTML = `
                <div class="empty-history">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
                    </svg>
                    <p>No calculations yet</p>
                    <small>Your calculation history will appear here</small>
                </div>
            `;
        } else {
            const historyHTML = calculationHistory.map(item => `
                <div class="history-item">
                    <div class="history-header">
                        <div class="history-title">${item.title}</div>
                        <div class="history-date">${item.date}</div>
                    </div>
                    <div class="history-result">${item.result}</div>
                    <div class="history-details">${item.details}</div>
                </div>
            `).join('');
            historyBody.innerHTML = historyHTML;
        }
    }

    function saveToHistory(title, result, details) {
        const historyItem = {
            title,
            result,
            details,
            date: new Date().toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            timestamp: Date.now()
        };
        
        calculationHistory.unshift(historyItem);
        
        // Keep only last 50 calculations
        if (calculationHistory.length > 50) {
            calculationHistory = calculationHistory.slice(0, 50);
        }
        
        localStorage.setItem('financeCalculatorHistory', JSON.stringify(calculationHistory));
    }

    function initializeCalculator(type) {
        const calculateBtn = modalBody.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                calculateResult(type);
            });
        }
    }

    function calculateResult(type) {
        switch(type) {
            case 'budget-planner':
                calculateBudget();
                break;
            case 'savings-goal':
                calculateSavingsGoal();
                break;
            case 'gst':
                calculateGST();
                break;
            case 'income-tax':
                calculateIncomeTax();
                break;
            case 'ppf':
                calculatePPF();
                break;
            case 'fd':
                calculateFD();
                break;
            case 'sip':
                calculateSIP();
                break;
            case 'lumpsum':
                calculateLumpsum();
                break;
            case 'compound':
                calculateCompoundInterest();
                break;
            case 'cagr':
                calculateCAGR();
                break;
            case 'retirement':
                calculateRetirement();
                break;
            case 'emi':
                calculateEMI();
                break;
            case 'loan-comparison':
                calculateLoanComparison();
                break;
        }
    }

    // Utility functions
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    function formatNumber(num) {
        return new Intl.NumberFormat('en-IN').format(num);
    }

    // Calculator HTML generators
    function getBudgetPlannerHTML() {
        return `
            <div class="form-group">
                <label>Monthly Income (₹)</label>
                <input type="number" id="monthly-income" placeholder="50000">
            </div>
            <div class="form-group">
                <label>Housing (₹)</label>
                <input type="number" id="housing" placeholder="15000">
            </div>
            <div class="form-group">
                <label>Food & Groceries (₹)</label>
                <input type="number" id="food" placeholder="8000">
            </div>
            <div class="form-group">
                <label>Transportation (₹)</label>
                <input type="number" id="transportation" placeholder="5000">
            </div>
            <div class="form-group">
                <label>Utilities (₹)</label>
                <input type="number" id="utilities" placeholder="3000">
            </div>
            <div class="form-group">
                <label>Entertainment (₹)</label>
                <input type="number" id="entertainment" placeholder="4000">
            </div>
            <div class="form-group">
                <label>Other Expenses (₹)</label>
                <input type="number" id="other-expenses" placeholder="5000">
            </div>
            <button class="btn calculate-btn">Calculate Budget</button>
            <div id="budget-result"></div>
        `;
    }

    function getSavingsGoalHTML() {
        return `
            <div class="form-group">
                <label>Target Amount (₹)</label>
                <input type="number" id="target-amount" placeholder="500000">
            </div>
            <div class="form-group">
                <label>Current Savings (₹)</label>
                <input type="number" id="current-savings" placeholder="50000">
            </div>
            <div class="form-group">
                <label>Monthly Savings (₹)</label>
                <input type="number" id="monthly-savings" placeholder="10000">
            </div>
            <div class="form-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="annual-return" placeholder="8" step="0.1">
            </div>
            <button class="btn calculate-btn">Calculate Timeline</button>
            <div id="savings-result"></div>
        `;
    }

    function getGSTCalculatorHTML() {
        return `
            <div class="form-group">
                <label>Amount (₹)</label>
                <input type="number" id="gst-amount" placeholder="10000">
            </div>
            <div class="form-group">
                <label>GST Rate (%)</label>
                <select id="gst-rate">
                    <option value="0">0% - Essential items</option>
                    <option value="5">5% - Basic necessities</option>
                    <option value="12">12% - Standard rate</option>
                    <option value="18" selected>18% - Most goods</option>
                    <option value="28">28% - Luxury items</option>
                </select>
            </div>
            <div class="form-group">
                <label>Calculation Type</label>
                <select id="gst-type">
                    <option value="exclusive">Add GST (Exclusive)</option>
                    <option value="inclusive">Remove GST (Inclusive)</option>
                </select>
            </div>
            <button class="btn calculate-btn">Calculate GST</button>
            <div id="gst-result"></div>
        `;
    }

    function getIncomeTaxHTML() {
        return `
            <div class="form-group">
                <label>Annual Income (₹)</label>
                <input type="number" id="annual-income" placeholder="800000">
            </div>
            <div class="form-group">
                <label>Tax Regime</label>
                <select id="tax-regime">
                    <option value="old">Old Regime</option>
                    <option value="new" selected>New Regime</option>
                </select>
            </div>
            <div class="form-group">
                <label>Age Group</label>
                <select id="age-group">
                    <option value="below60" selected>Below 60 years</option>
                    <option value="60to80">60-80 years</option>
                    <option value="above80">Above 80 years</option>
                </select>
            </div>
            <button class="btn calculate-btn">Calculate Tax</button>
            <div id="tax-result"></div>
        `;
    }

    function getPPFCalculatorHTML() {
        return `
            <div class="form-group">
                <label>Annual Investment (₹)</label>
                <input type="number" id="ppf-investment" placeholder="150000" max="150000">
                <small>Maximum ₹1,50,000 per year</small>
            </div>
            <div class="form-group">
                <label>Investment Period (Years)</label>
                <input type="number" id="ppf-years" placeholder="15" min="15">
                <small>Minimum 15 years</small>
            </div>
            <div class="form-group">
                <label>Current PPF Rate (%)</label>
                <input type="number" id="ppf-rate" placeholder="7.1" step="0.1">
            </div>
            <button class="btn calculate-btn">Calculate PPF</button>
            <div id="ppf-result"></div>
        `;
    }

    function getFDCalculatorHTML() {
        return `
            <div class="form-group">
                <label>Principal Amount (₹)</label>
                <input type="number" id="fd-principal" placeholder="100000">
            </div>
            <div class="form-group">
                <label>Interest Rate (% per annum)</label>
                <input type="number" id="fd-rate" placeholder="6.5" step="0.1">
            </div>
            <div class="form-group">
                <label>Tenure</label>
                <input type="number" id="fd-tenure" placeholder="12">
            </div>
            <div class="form-group">
                <label>Tenure Type</label>
                <select id="fd-tenure-type">
                    <option value="months" selected>Months</option>
                    <option value="years">Years</option>
                </select>
            </div>
            <div class="form-group">
                <label>Compounding Frequency</label>
                <select id="fd-compounding">
                    <option value="quarterly" selected>Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                </select>
            </div>
            <button class="btn calculate-btn">Calculate FD</button>
            <div id="fd-result"></div>
        `;
    }

    function getSIPCalculatorHTML() {
        return `
            <div class="form-group">
                <label>Monthly Investment (₹)</label>
                <input type="number" id="sip-amount" placeholder="5000">
            </div>
            <div class="form-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="sip-return" placeholder="12" step="0.1">
            </div>
            <div class="form-group">
                <label>Investment Period (Years)</label>
                <input type="number" id="sip-years" placeholder="10">
            </div>
            <button class="btn calculate-btn">Calculate SIP</button>
            <div id="sip-result"></div>
        `;
    }

    function getLumpsumHTML() {
        return `
            <div class="form-group">
                <label>Investment Amount (₹)</label>
                <input type="number" id="lumpsum-amount" placeholder="100000">
            </div>
            <div class="form-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="lumpsum-return" placeholder="12" step="0.1">
            </div>
            <div class="form-group">
                <label>Investment Period (Years)</label>
                <input type="number" id="lumpsum-years" placeholder="10">
            </div>
            <button class="btn calculate-btn">Calculate Returns</button>
            <div id="lumpsum-result"></div>
        `;
    }

    function getCompoundInterestHTML() {
        return `
            <div class="form-group">
                <label>Principal Amount (₹)</label>
                <input type="number" id="ci-principal" placeholder="10000">
            </div>
            <div class="form-group">
                <label>Annual Interest Rate (%)</label>
                <input type="number" id="ci-rate" placeholder="8" step="0.1">
            </div>
            <div class="form-group">
                <label>Time Period (Years)</label>
                <input type="number" id="ci-time" placeholder="5">
            </div>
            <div class="form-group">
                <label>Compounding Frequency</label>
                <select id="ci-frequency">
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4" selected>Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="365">Daily</option>
                </select>
            </div>
            <button class="btn calculate-btn">Calculate Interest</button>
            <div id="ci-result"></div>
        `;
    }

    function getCAGRCalculatorHTML() {
        return `
            <div class="form-group">
                <label>Initial Investment (₹)</label>
                <input type="number" id="cagr-initial" placeholder="10000">
            </div>
            <div class="form-group">
                <label>Final Value (₹)</label>
                <input type="number" id="cagr-final" placeholder="25000">
            </div>
            <div class="form-group">
                <label>Investment Period (Years)</label>
                <input type="number" id="cagr-years" placeholder="5" step="0.1">
            </div>
            <button class="btn calculate-btn">Calculate CAGR</button>
            <div id="cagr-result"></div>
        `;
    }

    function getRetirementPlannerHTML() {
        return `
            <div class="form-group">
                <label>Current Age</label>
                <input type="number" id="current-age" placeholder="30">
            </div>
            <div class="form-group">
                <label>Retirement Age</label>
                <input type="number" id="retirement-age" placeholder="60">
            </div>
            <div class="form-group">
                <label>Current Monthly Expenses (₹)</label>
                <input type="number" id="current-expenses" placeholder="50000">
            </div>
            <div class="form-group">
                <label>Expected Inflation Rate (%)</label>
                <input type="number" id="inflation-rate" placeholder="6" step="0.1">
            </div>
            <div class="form-group">
                <label>Expected Return on Investment (%)</label>
                <input type="number" id="investment-return" placeholder="10" step="0.1">
            </div>
            <div class="form-group">
                <label>Life Expectancy</label>
                <input type="number" id="life-expectancy" placeholder="80">
            </div>
            <button class="btn calculate-btn">Plan Retirement</button>
            <div id="retirement-result"></div>
        `;
    }

    function getEMICalculatorHTML() {
        return `
            <div class="form-group">
                <label>Loan Amount (₹)</label>
                <input type="number" id="loan-amount" placeholder="2500000">
            </div>
            <div class="form-group">
                <label>Interest Rate (% per annum)</label>
                <input type="number" id="interest-rate" placeholder="8.5" step="0.1">
            </div>
            <div class="form-group">
                <label>Loan Tenure (Years)</label>
                <input type="number" id="loan-tenure" placeholder="20">
            </div>
            <button class="btn calculate-btn">Calculate EMI</button>
            <div id="emi-result"></div>
        `;
    }

    function getLoanComparisonHTML() {
        return `
            <h3>Loan Option 1</h3>
            <div class="form-group">
                <label>Loan Amount (₹)</label>
                <input type="number" id="loan1-amount" placeholder="2500000">
            </div>
            <div class="form-group">
                <label>Interest Rate (%)</label>
                <input type="number" id="loan1-rate" placeholder="8.5" step="0.1">
            </div>
            <div class="form-group">
                <label>Tenure (Years)</label>
                <input type="number" id="loan1-tenure" placeholder="20">
            </div>
            
            <h3 style="margin-top: 20px;">Loan Option 2</h3>
            <div class="form-group">
                <label>Loan Amount (₹)</label>
                <input type="number" id="loan2-amount" placeholder="2500000">
            </div>
            <div class="form-group">
                <label>Interest Rate (%)</label>
                <input type="number" id="loan2-rate" placeholder="9.0" step="0.1">
            </div>
            <div class="form-group">
                <label>Tenure (Years)</label>
                <input type="number" id="loan2-tenure" placeholder="15">
            </div>
            
            <button class="btn calculate-btn">Compare Loans</button>
            <div id="loan-comparison-result"></div>
        `;
    }
    // Calculator functions
    function calculateBudget() {
        const income = parseFloat(document.getElementById('monthly-income').value) || 0;
        const housing = parseFloat(document.getElementById('housing').value) || 0;
        const food = parseFloat(document.getElementById('food').value) || 0;
        const transportation = parseFloat(document.getElementById('transportation').value) || 0;
        const utilities = parseFloat(document.getElementById('utilities').value) || 0;
        const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
        const other = parseFloat(document.getElementById('other-expenses').value) || 0;

        const totalExpenses = housing + food + transportation + utilities + entertainment + other;
        const surplus = income - totalExpenses;
        const savingsRate = income > 0 ? (surplus / income) * 100 : 0;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(surplus)}</div>
                    <div class="label">${surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Income</span>
                    <span class="result-value">${formatCurrency(income)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Expenses</span>
                    <span class="result-value">${formatCurrency(totalExpenses)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Savings Rate</span>
                    <span class="result-value">${savingsRate.toFixed(1)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Housing (${((housing/income)*100).toFixed(1)}%)</span>
                    <span class="result-value">${formatCurrency(housing)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Food (${((food/income)*100).toFixed(1)}%)</span>
                    <span class="result-value">${formatCurrency(food)}</span>
                </div>
            </div>
        `;
        document.getElementById('budget-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Budget Planner',
            `${surplus >= 0 ? 'Surplus' : 'Deficit'}: ${formatCurrency(Math.abs(surplus))}`,
            `Income: ${formatCurrency(income)} | Expenses: ${formatCurrency(totalExpenses)} | Savings Rate: ${savingsRate.toFixed(1)}%`
        );
    }

    function calculateSavingsGoal() {
        const target = parseFloat(document.getElementById('target-amount').value) || 0;
        const current = parseFloat(document.getElementById('current-savings').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const annualReturn = parseFloat(document.getElementById('annual-return').value) || 0;

        const monthlyReturn = annualReturn / 100 / 12;
        const remaining = target - current;

        let months = 0;
        if (monthlyReturn > 0) {
            months = Math.log(1 + (remaining * monthlyReturn) / monthly) / Math.log(1 + monthlyReturn);
        } else {
            months = remaining / monthly;
        }

        const years = Math.floor(months / 12);
        const remainingMonths = Math.ceil(months % 12);

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${years}y ${remainingMonths}m</div>
                    <div class="label">Time to reach goal</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Target Amount</span>
                    <span class="result-value">${formatCurrency(target)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Current Savings</span>
                    <span class="result-value">${formatCurrency(current)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Monthly Investment</span>
                    <span class="result-value">${formatCurrency(monthly)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Investment</span>
                    <span class="result-value">${formatCurrency(current + (monthly * months))}</span>
                </div>
            </div>
        `;
        document.getElementById('savings-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Savings Goal',
            `Time needed: ${years}y ${remainingMonths}m`,
            `Target: ${formatCurrency(target)} | Monthly: ${formatCurrency(monthly)} | Current: ${formatCurrency(current)}`
        );
    }

    function calculateGST() {
        const amount = parseFloat(document.getElementById('gst-amount').value) || 0;
        const rate = parseFloat(document.getElementById('gst-rate').value) || 0;
        const type = document.getElementById('gst-type').value;

        let baseAmount, gstAmount, totalAmount;

        if (type === 'exclusive') {
            baseAmount = amount;
            gstAmount = (amount * rate) / 100;
            totalAmount = amount + gstAmount;
        } else {
            totalAmount = amount;
            baseAmount = amount / (1 + rate / 100);
            gstAmount = amount - baseAmount;
        }

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(gstAmount)}</div>
                    <div class="label">GST Amount (${rate}%)</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Base Amount</span>
                    <span class="result-value">${formatCurrency(baseAmount)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">GST Amount</span>
                    <span class="result-value">${formatCurrency(gstAmount)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Amount</span>
                    <span class="result-value">${formatCurrency(totalAmount)}</span>
                </div>
            </div>
        `;
        document.getElementById('gst-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'GST Calculator',
            `GST: ${formatCurrency(gstAmount)} (${rate}%)`,
            `Base: ${formatCurrency(baseAmount)} | Total: ${formatCurrency(totalAmount)} | Type: ${type}`
        );
    }

    function calculateIncomeTax() {
        const income = parseFloat(document.getElementById('annual-income').value) || 0;
        const regime = document.getElementById('tax-regime').value;
        const ageGroup = document.getElementById('age-group').value;

        let tax = 0;
        let exemption = 250000; // Default for below 60

        if (ageGroup === '60to80') exemption = 300000;
        if (ageGroup === 'above80') exemption = 500000;

        if (regime === 'new') {
            // New tax regime (2023-24)
            if (income > 300000) tax += (Math.min(income, 600000) - 300000) * 0.05;
            if (income > 600000) tax += (Math.min(income, 900000) - 600000) * 0.10;
            if (income > 900000) tax += (Math.min(income, 1200000) - 900000) * 0.15;
            if (income > 1200000) tax += (Math.min(income, 1500000) - 1200000) * 0.20;
            if (income > 1500000) tax += (income - 1500000) * 0.30;
        } else {
            // Old tax regime
            const taxableIncome = Math.max(0, income - exemption);
            if (taxableIncome > 0) tax += Math.min(taxableIncome, 250000) * 0.05;
            if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 500000) * 0.20;
            if (taxableIncome > 750000) tax += (taxableIncome - 750000) * 0.30;
        }

        // Add cess
        const cess = tax * 0.04;
        const totalTax = tax + cess;
        const netIncome = income - totalTax;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(totalTax)}</div>
                    <div class="label">Total Tax Liability</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Gross Income</span>
                    <span class="result-value">${formatCurrency(income)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Income Tax</span>
                    <span class="result-value">${formatCurrency(tax)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Health & Education Cess</span>
                    <span class="result-value">${formatCurrency(cess)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Net Income</span>
                    <span class="result-value">${formatCurrency(netIncome)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Effective Tax Rate</span>
                    <span class="result-value">${((totalTax/income)*100).toFixed(2)}%</span>
                </div>
            </div>
        `;
        document.getElementById('tax-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Income Tax Calculator',
            `Tax: ${formatCurrency(totalTax)}`,
            `Income: ${formatCurrency(income)} | Regime: ${regime} | Rate: ${((totalTax/income)*100).toFixed(2)}%`
        );
    }

    function calculatePPF() {
        const annual = parseFloat(document.getElementById('ppf-investment').value) || 0;
        const years = parseFloat(document.getElementById('ppf-years').value) || 15;
        const rate = parseFloat(document.getElementById('ppf-rate').value) || 7.1;

        // PPF calculation (compound interest)
        const maturityAmount = annual * (((Math.pow(1 + rate/100, years) - 1) / (rate/100)));
        const totalInvestment = annual * years;
        const totalInterest = maturityAmount - totalInvestment;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(maturityAmount)}</div>
                    <div class="label">Maturity Amount</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Investment</span>
                    <span class="result-value">${formatCurrency(totalInvestment)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Interest</span>
                    <span class="result-value">${formatCurrency(totalInterest)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Investment Period</span>
                    <span class="result-value">${years} years</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Interest Rate</span>
                    <span class="result-value">${rate}% p.a.</span>
                </div>
            </div>
        `;
        document.getElementById('ppf-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'PPF Calculator',
            `Maturity: ${formatCurrency(maturityAmount)}`,
            `Annual Investment: ${formatCurrency(annual)} | Period: ${years} years | Interest: ${formatCurrency(totalInterest)}`
        );
    }

    function calculateFD() {
        const principal = parseFloat(document.getElementById('fd-principal').value) || 0;
        const rate = parseFloat(document.getElementById('fd-rate').value) || 0;
        const tenure = parseFloat(document.getElementById('fd-tenure').value) || 0;
        const tenureType = document.getElementById('fd-tenure-type').value;
        const compounding = document.getElementById('fd-compounding').value;

        let years = tenureType === 'years' ? tenure : tenure / 12;
        let compoundingFreq = compounding === 'monthly' ? 12 : compounding === 'quarterly' ? 4 : 1;

        const maturityAmount = principal * Math.pow(1 + (rate/100)/compoundingFreq, compoundingFreq * years);
        const interest = maturityAmount - principal;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(maturityAmount)}</div>
                    <div class="label">Maturity Amount</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Principal Amount</span>
                    <span class="result-value">${formatCurrency(principal)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Interest Earned</span>
                    <span class="result-value">${formatCurrency(interest)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Tenure</span>
                    <span class="result-value">${tenure} ${tenureType}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Interest Rate</span>
                    <span class="result-value">${rate}% p.a.</span>
                </div>
            </div>
        `;
        document.getElementById('fd-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'FD Calculator',
            `Maturity: ${formatCurrency(maturityAmount)}`,
            `Principal: ${formatCurrency(principal)} | Rate: ${rate}% | Tenure: ${tenure} ${tenureType}`
        );
    }

    function calculateSIP() {
        const monthly = parseFloat(document.getElementById('sip-amount').value) || 0;
        const annualReturn = parseFloat(document.getElementById('sip-return').value) || 0;
        const years = parseFloat(document.getElementById('sip-years').value) || 0;

        const monthlyReturn = annualReturn / 100 / 12;
        const months = years * 12;
        
        const maturityAmount = monthly * (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn));
        const totalInvestment = monthly * months;
        const totalReturns = maturityAmount - totalInvestment;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(maturityAmount)}</div>
                    <div class="label">Maturity Amount</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Investment</span>
                    <span class="result-value">${formatCurrency(totalInvestment)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Returns</span>
                    <span class="result-value">${formatCurrency(totalReturns)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Monthly Investment</span>
                    <span class="result-value">${formatCurrency(monthly)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Investment Period</span>
                    <span class="result-value">${years} years</span>
                </div>
            </div>
        `;
        document.getElementById('sip-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'SIP Calculator',
            `Maturity: ${formatCurrency(maturityAmount)}`,
            `Monthly SIP: ${formatCurrency(monthly)} | Period: ${years} years | Returns: ${formatCurrency(totalReturns)}`
        );
    }

    function calculateLumpsum() {
        const amount = parseFloat(document.getElementById('lumpsum-amount').value) || 0;
        const annualReturn = parseFloat(document.getElementById('lumpsum-return').value) || 0;
        const years = parseFloat(document.getElementById('lumpsum-years').value) || 0;

        const maturityAmount = amount * Math.pow(1 + annualReturn/100, years);
        const totalReturns = maturityAmount - amount;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(maturityAmount)}</div>
                    <div class="label">Maturity Amount</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Investment Amount</span>
                    <span class="result-value">${formatCurrency(amount)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Returns</span>
                    <span class="result-value">${formatCurrency(totalReturns)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Return Multiple</span>
                    <span class="result-value">${(maturityAmount/amount).toFixed(2)}x</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Investment Period</span>
                    <span class="result-value">${years} years</span>
                </div>
            </div>
        `;
        document.getElementById('lumpsum-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Lumpsum Calculator',
            `Maturity: ${formatCurrency(maturityAmount)}`,
            `Investment: ${formatCurrency(amount)} | Period: ${years} years | Returns: ${formatCurrency(totalReturns)}`
        );
    }

    function calculateCompoundInterest() {
        const principal = parseFloat(document.getElementById('ci-principal').value) || 0;
        const rate = parseFloat(document.getElementById('ci-rate').value) || 0;
        const time = parseFloat(document.getElementById('ci-time').value) || 0;
        const frequency = parseFloat(document.getElementById('ci-frequency').value) || 1;

        const amount = principal * Math.pow(1 + (rate/100)/frequency, frequency * time);
        const interest = amount - principal;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(amount)}</div>
                    <div class="label">Final Amount</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Principal</span>
                    <span class="result-value">${formatCurrency(principal)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Compound Interest</span>
                    <span class="result-value">${formatCurrency(interest)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Interest Rate</span>
                    <span class="result-value">${rate}% p.a.</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Time Period</span>
                    <span class="result-value">${time} years</span>
                </div>
            </div>
        `;
        document.getElementById('ci-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Compound Interest',
            `Final Amount: ${formatCurrency(amount)}`,
            `Principal: ${formatCurrency(principal)} | Rate: ${rate}% | Time: ${time} years`
        );
    }

    function calculateCAGR() {
        const initial = parseFloat(document.getElementById('cagr-initial').value) || 0;
        const final = parseFloat(document.getElementById('cagr-final').value) || 0;
        const years = parseFloat(document.getElementById('cagr-years').value) || 0;

        const cagr = (Math.pow(final/initial, 1/years) - 1) * 100;
        const totalReturn = ((final - initial) / initial) * 100;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${cagr.toFixed(2)}%</div>
                    <div class="label">CAGR (Annual Growth Rate)</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Initial Investment</span>
                    <span class="result-value">${formatCurrency(initial)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Final Value</span>
                    <span class="result-value">${formatCurrency(final)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Return</span>
                    <span class="result-value">${totalReturn.toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Investment Period</span>
                    <span class="result-value">${years} years</span>
                </div>
            </div>
        `;
        document.getElementById('cagr-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'CAGR Calculator',
            `CAGR: ${cagr.toFixed(2)}%`,
            `Initial: ${formatCurrency(initial)} | Final: ${formatCurrency(final)} | Period: ${years} years`
        );
    }

    function calculateRetirement() {
        const currentAge = parseFloat(document.getElementById('current-age').value) || 0;
        const retirementAge = parseFloat(document.getElementById('retirement-age').value) || 0;
        const currentExpenses = parseFloat(document.getElementById('current-expenses').value) || 0;
        const inflationRate = parseFloat(document.getElementById('inflation-rate').value) || 0;
        const investmentReturn = parseFloat(document.getElementById('investment-return').value) || 0;
        const lifeExpectancy = parseFloat(document.getElementById('life-expectancy').value) || 0;

        const yearsToRetirement = retirementAge - currentAge;
        const yearsInRetirement = lifeExpectancy - retirementAge;
        
        // Future monthly expenses at retirement
        const futureExpenses = currentExpenses * Math.pow(1 + inflationRate/100, yearsToRetirement);
        
        // Total corpus needed at retirement
        const monthlyReturnRate = investmentReturn / 100 / 12;
        const monthsInRetirement = yearsInRetirement * 12;
        const corpusNeeded = futureExpenses * ((1 - Math.pow(1 + monthlyReturnRate, -monthsInRetirement)) / monthlyReturnRate);
        
        // Monthly SIP required
        const monthlyInvestmentReturn = investmentReturn / 100 / 12;
        const monthsToRetirement = yearsToRetirement * 12;
        const monthlySIP = corpusNeeded / (((Math.pow(1 + monthlyInvestmentReturn, monthsToRetirement) - 1) / monthlyInvestmentReturn) * (1 + monthlyInvestmentReturn));

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(corpusNeeded)}</div>
                    <div class="label">Retirement Corpus Needed</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Monthly SIP Required</span>
                    <span class="result-value">${formatCurrency(monthlySIP)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Years to Retirement</span>
                    <span class="result-value">${yearsToRetirement} years</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Future Monthly Expenses</span>
                    <span class="result-value">${formatCurrency(futureExpenses)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Investment Needed</span>
                    <span class="result-value">${formatCurrency(monthlySIP * monthsToRetirement)}</span>
                </div>
            </div>
        `;
        document.getElementById('retirement-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Retirement Planner',
            `Corpus Needed: ${formatCurrency(corpusNeeded)}`,
            `Monthly SIP: ${formatCurrency(monthlySIP)} | Years to retirement: ${yearsToRetirement}`
        );
    }

    function calculateEMI() {
        const principal = parseFloat(document.getElementById('loan-amount').value) || 0;
        const annualRate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const years = parseFloat(document.getElementById('loan-tenure').value) || 0;

        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">${formatCurrency(emi)}</div>
                    <div class="label">Monthly EMI</div>
                </div>
                <div class="result-item">
                    <span class="result-label">Loan Amount</span>
                    <span class="result-value">${formatCurrency(principal)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Interest</span>
                    <span class="result-value">${formatCurrency(totalInterest)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Amount</span>
                    <span class="result-value">${formatCurrency(totalAmount)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Loan Tenure</span>
                    <span class="result-value">${years} years (${months} months)</span>
                </div>
            </div>
        `;
        document.getElementById('emi-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'EMI Calculator',
            `Monthly EMI: ${formatCurrency(emi)}`,
            `Loan: ${formatCurrency(principal)} | Rate: ${annualRate}% | Tenure: ${years} years | Interest: ${formatCurrency(totalInterest)}`
        );
    }

    function calculateLoanComparison() {
        // Loan 1
        const principal1 = parseFloat(document.getElementById('loan1-amount').value) || 0;
        const rate1 = parseFloat(document.getElementById('loan1-rate').value) || 0;
        const years1 = parseFloat(document.getElementById('loan1-tenure').value) || 0;
        
        const monthlyRate1 = rate1 / 100 / 12;
        const months1 = years1 * 12;
        const emi1 = principal1 * monthlyRate1 * Math.pow(1 + monthlyRate1, months1) / (Math.pow(1 + monthlyRate1, months1) - 1);
        const totalAmount1 = emi1 * months1;
        const totalInterest1 = totalAmount1 - principal1;

        // Loan 2
        const principal2 = parseFloat(document.getElementById('loan2-amount').value) || 0;
        const rate2 = parseFloat(document.getElementById('loan2-rate').value) || 0;
        const years2 = parseFloat(document.getElementById('loan2-tenure').value) || 0;
        
        const monthlyRate2 = rate2 / 100 / 12;
        const months2 = years2 * 12;
        const emi2 = principal2 * monthlyRate2 * Math.pow(1 + monthlyRate2, months2) / (Math.pow(1 + monthlyRate2, months2) - 1);
        const totalAmount2 = emi2 * months2;
        const totalInterest2 = totalAmount2 - principal2;

        const betterOption = totalAmount1 < totalAmount2 ? 1 : 2;
        const savings = Math.abs(totalAmount1 - totalAmount2);

        const resultHTML = `
            <div class="result-card">
                <div class="highlight">
                    <div class="amount">Option ${betterOption} is Better</div>
                    <div class="label">Saves ${formatCurrency(savings)}</div>
                </div>
                <h4>Loan Option 1</h4>
                <div class="result-item">
                    <span class="result-label">Monthly EMI</span>
                    <span class="result-value">${formatCurrency(emi1)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Interest</span>
                    <span class="result-value">${formatCurrency(totalInterest1)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Amount</span>
                    <span class="result-value">${formatCurrency(totalAmount1)}</span>
                </div>
                
                <h4 style="margin-top: 15px;">Loan Option 2</h4>
                <div class="result-item">
                    <span class="result-label">Monthly EMI</span>
                    <span class="result-value">${formatCurrency(emi2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Interest</span>
                    <span class="result-value">${formatCurrency(totalInterest2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Amount</span>
                    <span class="result-value">${formatCurrency(totalAmount2)}</span>
                </div>
            </div>
        `;
        document.getElementById('loan-comparison-result').innerHTML = resultHTML;

        // Save to history
        saveToHistory(
            'Loan Comparison',
            `Option ${betterOption} is better`,
            `Savings: ${formatCurrency(savings)} | EMI1: ${formatCurrency(emi1)} | EMI2: ${formatCurrency(emi2)}`
        );
    }

    // Expose functions to global scope
    window.formatCurrency = formatCurrency;
    window.formatNumber = formatNumber;
});