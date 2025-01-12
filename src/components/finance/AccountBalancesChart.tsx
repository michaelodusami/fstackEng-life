'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RemainingBalance {
  id: string;
  title: string;
  amount: number;
}

interface Props {
  remainingBalances: RemainingBalance[];
}

const AccountBalancesChart: React.FC<Props> = ({ remainingBalances }) => {
  return (
    <div className="p-4 bg-card rounded-lg shadow">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={remainingBalances}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="amount" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountBalancesChart;
