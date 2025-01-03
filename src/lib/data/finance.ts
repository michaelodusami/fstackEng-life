export interface Tab {
    id: string;
    title: string;
  }
  
  export interface Account {
    id: string;
    title: string;
    startingAmount: number; // The initial balance of the account
    amount: number; // The current balance of the account
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
  }
  
  export interface FinanceData {
    tabs: Tab[];
    accounts: Account[];
    debts: Debt[];
    expenses: Expense[];
  }
  
  const financeData: FinanceData = {
    tabs: [
      { id: "1", title: "Overview" },
      { id: "2", title: "Charts" },
      { id: "3", title: "Expenses" },
      { id: "4", title: "Income" },
    ],
    accounts: [
      { id: "a1", title: "Schwab", startingAmount: 100, amount: 100 },
      { id: "a2", title: "Ally Checking", startingAmount: 100, amount: 100 },
      { id: "a3", title: "Ally Savings", startingAmount: 100, amount: 100 },
      { id: "a4", title: "Fidelity", startingAmount: 100, amount: 100 },
      { id: "a5", title: "Coinbase", startingAmount: 100, amount: 100 },
      { id: "a6", title: "Roth", startingAmount: 100, amount: 100 },
    ],
    debts: [
      { id: "d1", title: "Credit Card", amount: 50 },
      { id: "d2", title: "Loan", amount: 200 },
    ],
    expenses: [
      { id: "e1", account_id: "a1", title: "Grocery Shopping", category: "Groceries", amount: 50 },
      { id: "e2", account_id: "a2", title: "Electric Bill", category: "Utilities", amount: 30 },
      { id: "e3", account_id: "a3", title: "Dining Out", category: "Food & Drink", amount: 20 },
    ],
  };
  
  export default financeData;
  