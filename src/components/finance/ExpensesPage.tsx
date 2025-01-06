'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ExpenseCharts from '@/components/finance/ExpensesCharts';
import ExpenseTable from '@/components/finance/ExpensesTable';
import financeData, { Account, Expense, predefinedCategories } from '@/lib/data/finance';
import useFinance from '@/hooks/useFinance';


function ExpensePage() {
  const {accounts, withdraw, expenses} = useFinance()

  const [newExpense, setNewExpense] = useState({
    title: '',
    category: predefinedCategories[0],
    amount: 0,
    account_id: accounts[0]?.id || '',
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new expense with a unique ID
    const newId = `e${expenses.length + 1}`;
    const expense: Expense = {
      id: newId,
      title: newExpense.title,
      category: newExpense.category,
      amount: newExpense.amount,
      account_id: newExpense.account_id,
      date: new Date().toISOString().split('T')[0], // Add current date
    };

    // Reset form
    setNewExpense({
      title: '',
      category: predefinedCategories[0],
      amount: 0,
      account_id: financeData.accounts[0]?.id || '',
    });

    console.log('Expense Added:', expense);

    // Add the expense to the financeData
    withdraw(expense)
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="add-expense">Add Expense</TabsTrigger>
        </TabsList>

        {/* Charts Tab */}
        <TabsContent value="charts">
          <ExpenseCharts accounts={accounts} expenses={expenses} />
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables">
          <ExpenseTable accounts={accounts} expenses={expenses} />
        </TabsContent>

        {/* Add Expense Tab */}
        <TabsContent value="add-expense">
          <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  className="p-2 border rounded"
                  placeholder="Expense Title"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="p-2 border rounded"
                  required
                >
                  {predefinedCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: +e.target.value })}
                  className="p-2 border rounded"
                  placeholder="Expense Amount"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="account" className="text-sm font-medium">
                  Account
                </label>
                <select
                  id="account"
                  value={newExpense.account_id}
                  onChange={(e) => setNewExpense({ ...newExpense, account_id: e.target.value })}
                  className="p-2 border rounded"
                  required
                >
                  {financeData.accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary  rounded hover:bg-primary-dark"
              >
                Add Expense
              </button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensePage;
