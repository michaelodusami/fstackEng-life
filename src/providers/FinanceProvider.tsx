"use client"
import financeData, { Account, Debt, Expense, Income } from "@/lib/data/finance";
import { calculatePercentageChange } from "@/lib/functions/finance";
import { createContext, ReactNode, useState } from "react";

interface FinanceContextType {
    accounts: Account[];
    setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
    income: Income[];
    setIncome: React.Dispatch<React.SetStateAction<Income[]>>;
    debts: Debt[];
    setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
    addAccount: (newAccount: Account) => void;
    updateAccount: (updatedAccount: Account) => void;
    addExpense: (newExpense: Expense) => void;
    addIncome: (newIncome: Income) => void;
    addDebt: (newDebt: Debt) => void;
    deposit: (income: Income) => void;
    withdraw: (expense: Expense) => void;
}

  

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

interface FinanceProviderProps {
    children: ReactNode;
}

const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>(financeData.accounts);
    const [expenses, setExpenses] = useState<Expense[]>(financeData.expenses);
    const [income, setIncome] = useState<Income[]>(financeData.income);
    const [debts, setDebts] = useState<Debt[]>(financeData.debts);

    const addAccount = (newAccount: Account) => {
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    };

    const updateAccount = (updatedAccount: Account) => {
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
                account.id === updatedAccount.id ? updatedAccount : account
            )
        );
    };

    const addExpense = (newExpense: Expense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const addIncome = (newIncome: Income) => {
        setIncome((prevIncome) => [...prevIncome, newIncome]);
    };

    const addDebt = (newDebt: Debt) => {
        setDebts((prevDebts) => [...prevDebts, newDebt]);
    };

    const deposit = (income: Income) => {
        addIncome(income)
        const accountId = income.account_id;
        setAccounts((prevAccounts) => 
            prevAccounts.map((account) => {
                if (account.id === accountId) {
                    const original = account.amount;
                    const balance = account.amount + income.amount;
                    return { ...account, amount: balance, percentageChange: calculatePercentageChange(original, balance) };
                }
                return account;
            })
        );
    }

    const withdraw = (expense: Expense) => {
        addExpense(expense);
        const accountId = expense.account_id;
        setAccounts((prevAccounts) => 
            prevAccounts.map((account) => {
                if (account.id === accountId) {
                    const original = account.amount;
                    const balance = account.amount - expense.amount;
                    return { ...account, amount: balance, percentageChange: calculatePercentageChange(original, balance) };
                }
                return account;
            })
        );
    }

    const contextValue: FinanceContextType = {
        accounts,
        setAccounts,
        addAccount,
        updateAccount,
        expenses,
        setExpenses,
        addExpense,
        income,
        setIncome,
        addIncome,
        debts,
        setDebts,
        addDebt,
        deposit,
        withdraw,
    };

    return (
        <FinanceContext.Provider value={contextValue}>
            {children}
        </FinanceContext.Provider>
    );
};

export { FinanceContext, FinanceProvider };
