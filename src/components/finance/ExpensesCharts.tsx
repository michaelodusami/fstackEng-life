'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Account, Expense } from '@/lib/data/finance';
import { getAccountNameById } from '@/lib/functions/finance';

const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#F44336', '#9C27B0', '#00BCD4'];

interface Props {
  accounts: Account[]
  expenses: Expense[],
}

const ExpenseCharts: React.FC<Props> = ({accounts, expenses}) => {


  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Aggregate expenses by account
  const accountExpenses = accounts.map((account) => {
    const totalExpense = expenses
      .filter((expense) => expense.account_id === account.id)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { name: account.title, totalExpense };
  });

  // Aggregate expenses by category
  const categoryExpenses = expenses.reduce((acc, expense) => {
    const category = acc.find((item) => item.name === expense.category);
    if (category) {
      category.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  // Prepare data for expense trends over time
  const expenseTrends = expenses.reduce((acc, expense) => {
    const date = expense.date;
    const existingDate = acc.find((item) => item.date === date);

    if (existingDate) {
      existingDate.total += expense.amount;
    } else {
      acc.push({ date, total: expense.amount });
    }

    return acc;
  }, [] as Array<{ date: string; total: number }>);

  // Get expenses for the selected date
  const getExpensesByDate = (date: string) => {
    return expenses
      .filter((expense) => expense.date === date)
      .map((expense) => ({
        ...expense,
        accountName: getAccountNameById(accounts, expense.account_id),
      }));
  };

  const handleDataPointClick = (data: { date: string; total: number }) => {
    setSelectedDate(data.date);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Total Expenses per Account */}
      <div className="p-4 bg-card rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Total Expenses per Account</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={accountExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="totalExpense" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="p-4 bg-card rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryExpenses} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {categoryExpenses.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Trends */}
      <div className="p-4 bg-card rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Expense Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={expenseTrends}
            onClick={(event) => {
              if (event && event.activeLabel) {
                const clickedDate = event.activeLabel;
                const dataPoint = expenseTrends.find((item) => item.date === clickedDate);
                if (dataPoint) {
                  handleDataPointClick(dataPoint);
                }
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dialog for Expense Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>
              {selectedDate
                ? `Expenses for ${new Date(selectedDate).toLocaleDateString()}`
                : 'No date selected.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {selectedDate &&
              getExpensesByDate(selectedDate).map((expense) => (
                <div key={expense.id} className="flex justify-between">
                  <div>
                    <span>{expense.title} ({expense.category})</span>
                    <div className="text-sm text-muted-foreground">
                      Account: {expense.accountName}
                    </div>
                  </div>
                  <span>${expense.amount.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseCharts;
