'use client';

import React, { useState, useEffect } from 'react';
import financeData, { Account, Debt, Expense, Income } from '@/lib/data/finance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  calculateRemainingBalance,
  calculateNetWorth,
  calculateTotals,
  formatCurrency,
  calculatePercentageChange,
} from '@/lib/functions/finance';
import AccountBalancesChart from '@/components/finance/AccountBalancesChart';
import AccountsOverview from './AccountsOverview';

const FinanceOverview: React.FC<{accounts: Account[], setAccounts: any, expenses: Expense[], income: Income[], debts: Debt[]}> = ({accounts, setAccounts, expenses, income, debts}) => {



  const netWorth = calculateNetWorth(accounts, debts);
  const totalAssets = calculateTotals(accounts);
  const totalDebts = calculateTotals(debts);

  return (
    <div className="p-6 space-y-6 bg-background">
      <h2 className="text-3xl font-bold text-primary">Finance Overview</h2>

      {/* Accounts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountsOverview accounts={accounts} expenses={expenses} income={income} />
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balances Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountBalancesChart
            remainingBalances={accounts.map((account) => ({
              id: account.id,
              title: account.title,
              amount: account.amount,
            }))}
          />
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Net Worth:</span>
              <span className="font-semibold">{formatCurrency(netWorth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Assets:</span>
              <span className="font-semibold">{formatCurrency(totalAssets)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Debts:</span>
              <span className="font-semibold text-destructive">{formatCurrency(totalDebts)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceOverview;
