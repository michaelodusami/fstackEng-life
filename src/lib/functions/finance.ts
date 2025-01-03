import financeData from "../data/finance";


export const getAccountNameById = (accountId: string): string => {
    const account = financeData.accounts.find((acc) => acc.id === accountId);
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
  export const calculateRemainingBalance = (accountId: string): number => {
    const account = financeData.accounts.find((acc) => acc.id === accountId);
    const accountExpenses = financeData.expenses.filter((expense) => expense.account_id === accountId);
  
    if (!account) {
      return 0;
    }
  
    const totalExpenses = accountExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return account.startingAmount - totalExpenses;
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

  
