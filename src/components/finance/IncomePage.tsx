'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import financeData, { Account, Expense, Income, predefinedCategories } from '@/lib/data/finance';
import { formatCurrency } from '@/lib/functions/finance';
import IncomeCharts from './IncomeCharts';
import IncomeTable from './IncomeTable';

interface Props {
  accounts: Account[]
  expenses: Expense[],
  income: Income[],
  setIncome: any
}


const IncomePage: React.FC<Props> = ({accounts, expenses, income, setIncome}) => {
  const [formIncome, setNewIncome] = useState({
    title: '',
    category: predefinedCategories[0],
    amount: 0,
    account_id: accounts[0]?.id || '',
  });

  

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new income with a unique ID
    const newId = `i${income.length + 1}`;
    const newIncome: Income = {
      id: newId,
      title: formIncome.title,
      category: formIncome.category,
      amount: formIncome.amount,
      account_id: formIncome.account_id,
      date: new Date().toISOString().split('T')[0], // Add current date
    };

    // Add the income to the financeData
    setIncome([...income, newIncome])

    // Reset form
    setNewIncome({
      title: '',
      category: predefinedCategories[0],
      amount: 0,
      account_id: accounts[0]?.id || '',
    });

    console.log('Income Added:', newIncome);
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
          <IncomeCharts accounts={accounts} income={income}/>
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables">
          <IncomeTable income={income} accounts={accounts}/>
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
                  value={formIncome.title}
                  onChange={(e) => setNewIncome({ ...formIncome, title: e.target.value })}
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
                  value={formIncome.category}
                  onChange={(e) => setNewIncome({ ...formIncome, category: e.target.value })}
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
                  value={formIncome.amount}
                  onChange={(e) => setNewIncome({ ...formIncome, amount: +e.target.value })}
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
                  value={formIncome.account_id}
                  onChange={(e) => setNewIncome({ ...formIncome, account_id: e.target.value })}
                  className="p-2 border rounded"
                  required
                >
                  {accounts.map((account) => (
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
