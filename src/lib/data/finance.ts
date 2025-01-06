export interface Tab {
    id: string;
    title: string;
  }

  
  export const tabs: Tab[] = [
    { id: "1", title: "Overview" },
    { id: "2", title: "Expenses" },
    { id: "3", title: "Income" },
  ]
  
  export interface Account {
    id: string;
    title: string;
    amount: number; // Current balance of the account
    percentageChange: number
  }
  
  export interface Debt {
    id: string;
    title: string;
    amount: number;
  }
  
  export interface Expense {
    id: string;
    account_id: string;
    title: string;
    category: string;
    amount: number;
    date: string; // New: ISO format date string
  }
  
  export interface Income {
    id: string;
    account_id: string;
    title: string;
    category: string;
    amount: number;
    date: string; // New: ISO format date string
  }
  
  export interface RemainingBalance {
    id: string;
    title: string;
    remainingBalance: number;
    percentageChange: number;
  }
  
  export interface FinanceData {
    accounts: Account[];
    debts: Debt[];
    expenses: Expense[];
    income: Income[]; // New: Income records
  }

  export const predefinedCategories = ['Groceries', 'Utilities', 'Food & Drink', 'Transport', 'Entertainment', 'Healthcare', 'Work', 'Side Hustle', 'Investments', 'Other'];

  
  const financeData: FinanceData = {
    accounts: [
      { id: "a1", title: "Schwab", amount: 100, percentageChange: 0 },
      { id: "a2", title: "Ally Checking", amount: 100, percentageChange: 0 },
      { id: "a3", title: "Ally Savings", amount: 100, percentageChange: 0 },
      { id: "a4", title: "Fidelity", amount: 100, percentageChange: 0 },
      { id: "a5", title: "Coinbase", amount: 100, percentageChange: 0 },
      { id: "a6", title: "Roth", amount: 100, percentageChange: 0 },
    ],
    debts: [
      // { id: "d1", title: "Credit Card", amount: 50 },
      // { id: "d2", title: "Loan", amount: 200 },
    ],
    expenses: [
      // { id: "e1", account_id: "a1", title: "Grocery Shopping", category: "Groceries", amount: 50, date: "2025-01-01" },
      // { id: "e2", account_id: "a2", title: "Electric Bill", category: "Utilities", amount: 30, date: "2025-01-02" },
      // { id: "e3", account_id: "a3", title: "Dining Out", category: "Food & Drink", amount: 20, date: "2025-01-03" },
    ],
    income: [
      // { id: "i1", account_id: "a1", title: "Salary", category: "Work", amount: 5000, date: "2025-01-01" },
      // { id: "i2", account_id: "a2", title: "Freelance Project", category: "Side Hustle", amount: 200, date: "2025-01-02" },
      // { id: "i3", account_id: "a3", title: "Dividends", category: "Investments", amount: 50, date: "2025-01-03" },
    ],
  };
  
  
  export default financeData;
  