import financeData from "../data/finance";

const calculateNetWorth = (accounts: Array<{ title: string; amount: number }>, debts: Array<{ title: string; amount: number }>) => {
const totalAssets = accounts.reduce((sum, account) => sum + account.amount, 0)
const totalDebts = debts.reduce((sum, debt) => sum + debt.amount, 0)
return totalAssets - totalDebts
}

const calculateTotals = (accounts: Array<{ title: string; amount: number }>) => {
return accounts.reduce((sum, account) => sum + account.amount, 0)
}


const formatCurrency = (amount: number) => {
return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

const getAccountNameById = (accountId: string): string => {
    const account = financeData.accounts.find((acc) => acc.id === accountId);
    return account ? account.title : 'Unknown Account';
  };


const calculateRemainingBalance = (accountId: string): number => {
    const account = financeData.accounts.find((acc) => acc.id === accountId);
    const accountExpenses = financeData.expenses.filter((expense) => expense.account_id === accountId);
  
    if (!account) {
      return 0;
    }
  
    const totalExpenses = accountExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return account.startingAmount - totalExpenses;
  };
  
  

export {calculateNetWorth, calculateTotals, formatCurrency, getAccountNameById, calculateRemainingBalance}