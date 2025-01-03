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
import financeData from '@/lib/data/finance';

const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#F44336', '#9C27B0', '#00BCD4'];

const IncomeCharts: React.FC = () => {
  const { accounts, income } = financeData;

  // Total income per account
  const accountIncome = accounts.map((account) => {
    const totalIncome = income
      .filter((record) => record.account_id === account.id)
      .reduce((sum, record) => sum + record.amount, 0);

    return { name: account.title, totalIncome };
  });

  // Income by category
  const categoryIncome = income.reduce((acc, record) => {
    const category = acc.find((item) => item.name === record.category);
    if (category) {
      category.value += record.amount;
    } else {
      acc.push({ name: record.category, value: record.amount });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  // Income trends over time
  const incomeTrends = income.reduce((acc, record) => {
    const date = record.date;
    const existingDate = acc.find((item) => item.date === date);

    if (existingDate) {
      existingDate.total += record.amount;
    } else {
      acc.push({ date, total: record.amount });
    }

    return acc;
  }, [] as Array<{ date: string; total: number }>);

  return (
    <div className="space-y-6">
      {/* Total Income per Account */}
      <div className="p-4 bg-card rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Total Income per Account</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={accountIncome}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="totalIncome" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="p-4 bg-card rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryIncome} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {categoryIncome.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Income Trends Over Time */}
      <div className="p-4 bg-card rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Income Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomeTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeCharts;
