'use client';

import React from 'react';
import { Account, Income } from '@/lib/data/finance';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatCurrency, getAccountNameById } from '@/lib/functions/finance';

interface Props {
  income: Income[]
  accounts: Account[]
}

const IncomeTable: React.FC<Props> = ({accounts, income}) => {

  return (
    <div className="p-6 bg-card rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Income Table</h2>
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
          {income.map((_) => (
            <TableRow key={_.id}>
              <TableCell>{_.id}</TableCell>
              <TableCell>{getAccountNameById(accounts, _.account_id)}</TableCell>
              <TableCell>{_.title}</TableCell>
              <TableCell>{_.category}</TableCell>
              <TableCell className="text-right">{formatCurrency(_.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomeTable;
