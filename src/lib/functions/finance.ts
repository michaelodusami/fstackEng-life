import { Account, Expense, Income } from "../data/finance";


export const getAccountNameById = (accounts: Account[], accountId: string): string => {
    const account = accounts.find((acc) => acc.id === accountId);
    return account ? account.title : 'Unknown Account';
  };



  /**
   * Formats a number as currency.
   */
  export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  
  /**
   * Calculates the remaining balance for a given account.
   */
  export const calculateRemainingBalance = (accounts: Account[], expenses: Expense[], income: Income[], accountId: string): number => {
    const account = accounts.find((acc) => acc.id === accountId);
    if (!account) return 0;
  
    const totalIncome = income
      .filter((income) => income.account_id === accountId)
      .reduce((sum, income) => sum + income.amount, 0);
  
    const totalExpenses = expenses
      .filter((expense) => expense.account_id === accountId)
      .reduce((sum, expense) => sum + expense.amount, 0);

  
    return account.amount + totalIncome - totalExpenses;
  };
  
  
  /**
   * Calculates the total amount for a list of items.
   */
  export const calculateTotals = (items: Array<{ amount: number }>): number => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };
  
  /**
   * Calculates the net worth.
   */
  export const calculateNetWorth = (accounts: Array<{ amount: number }>, debts: Array<{ amount: number }>): number => {
    const totalAssets = calculateTotals(accounts);
    const totalDebts = calculateTotals(debts);
    return totalAssets - totalDebts;
  };

  export const calculatePercentageChange = (
    previousBalance: number,
    currentBalance: number
  ): number => {
    const change = ((currentBalance - previousBalance) / previousBalance) * 100;
    if (change === Infinity) return 0;
    return change
  };
  
