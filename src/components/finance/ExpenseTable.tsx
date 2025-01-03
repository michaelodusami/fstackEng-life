'use client';

import React from 'react';
import financeData from '@/lib/data/finance';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatCurrency, getAccountNameById } from '@/lib/functions/finance';

const ExpenseTable: React.FC = () => {
  const { expenses } = financeData;

  return (
    <div className="p-6 bg-card rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Expense Table</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.id}</TableCell>
              <TableCell>{getAccountNameById(expense.account_id)}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
