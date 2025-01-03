'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import financeData, { Income } from '@/lib/data/finance';
import { formatCurrency } from '@/lib/functions/finance';
import IncomeCharts from './IncomeCharts';

const predefinedCategories = ['Work', 'Side Hustle', 'Investments', 'Other'];

const IncomePage: React.FC = () => {
  const [newIncome, setNewIncome] = useState({
    title: '',
    category: predefinedCategories[0],
    amount: 0,
    account_id: financeData.accounts[0]?.id || '',
  });

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new income with a unique ID
    const newId = `i${financeData.income.length + 1}`;
    const income: Income = {
      id: newId,
      title: newIncome.title,
      category: newIncome.category,
      amount: newIncome.amount,
      account_id: newIncome.account_id,
      date: new Date().toISOString().split('T')[0], // Add current date
    };

    // Add the income to the financeData
    financeData.income.push(income);

    // Reset form
    setNewIncome({
      title: '',
      category: predefinedCategories[0],
      amount: 0,
      account_id: financeData.accounts[0]?.id || '',
    });

    console.log('Income Added:', income);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Income</h1>
      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="add-income">Add Income</TabsTrigger>
        </TabsList>

        {/* Charts Tab */}
        <TabsContent value="charts">
          <IncomeCharts/>
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables">
          <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Income Table</h2>
            <table className="w-full border-collapse border border-border rounded-md">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th className="border border-border p-2 text-left">Title</th>
                  <th className="border border-border p-2 text-left">Category</th>
                  <th className="border border-border p-2 text-left">Account</th>
                  <th className="border border-border p-2 text-right">Amount</th>
                  <th className="border border-border p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {financeData.income.map((income) => (
                  <tr key={income.id} className="hover:bg-accent">
                    <td className="border border-border p-2">{income.title}</td>
                    <td className="border border-border p-2">{income.category}</td>
                    <td className="border border-border p-2">
                      {financeData.accounts.find((acc) => acc.id === income.account_id)?.title || 'Unknown'}
                    </td>
                    <td className="border border-border p-2 text-right">{formatCurrency(income.amount)}</td>
                    <td className="border border-border p-2">{income.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Add Income Tab */}
        <TabsContent value="add-income">
          <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Income</h2>
            <form onSubmit={handleAddIncome} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newIncome.title}
                  onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
                  className="p-2 border rounded"
                  placeholder="Income Title"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={newIncome.category}
                  onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
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
                  value={newIncome.amount}
                  onChange={(e) => setNewIncome({ ...newIncome, amount: +e.target.value })}
                  className="p-2 border rounded"
                  placeholder="Income Amount"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="account" className="text-sm font-medium">
                  Account
                </label>
                <select
                  id="account"
                  value={newIncome.account_id}
                  onChange={(e) => setNewIncome({ ...newIncome, account_id: e.target.value })}
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
                Add Income
              </button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncomePage;
