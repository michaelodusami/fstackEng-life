'use client';

import React, { useState, useEffect } from 'react';
import financeData, { RemainingBalance } from '@/lib/data/finance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateRemainingBalance, calculateNetWorth, calculateTotals, formatCurrency } from '@/lib/functions/finance';
import AccountBalancesChart from '@/components/finance/AccountBalancesChart';
import { cn } from '@/lib/utils';


const AccountsOverview: React.FC<{ remainingBalances: Array<{ id: string; title: string; remainingBalance: number; percentageChange: number }> }> = ({ remainingBalances }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {remainingBalances.map(({ id, title, remainingBalance, percentageChange }) => {
        const startingAmount = formatCurrency(financeData.accounts.find((acc) => acc.id === id)?.startingAmount || 0);
        return (
          <Card key={id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-muted-foreground text-sm">Starting Amount:</span>
                <span className="block font-semibold">{startingAmount}</span>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Remaining Balance:</span>
                <span className="block font-semibold">{formatCurrency(remainingBalance)}</span>
              </div>
              <div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    percentageChange > 0 ? 'text-green-600' : percentageChange < 0 ? 'text-red-600' : 'text-gray-500'
                  )}
                >
                  {percentageChange.toFixed(2)}% {percentageChange > 0 ? 'Gain' : 'Loss'}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};



const FinanceOverview: React.FC = () => {
  const [accounts, setAccounts] = useState(financeData.accounts);
  const [remainingBalances, setRemainingBalances] = useState<RemainingBalance[]>([]);

  const { debts } = financeData;

  const netWorth = calculateNetWorth(accounts, debts);
  const totalAssets = calculateTotals(accounts);
  const totalDebts = calculateTotals(debts);

  useEffect(() => {
    const updatedRemainingBalances = accounts.map((account) => {
      const remainingBalance = calculateRemainingBalance(account.id);
      const percentageChange = ((remainingBalance - account.startingAmount) / account.startingAmount) * 100;
      return { id: account.id, title: account.title, remainingBalance, percentageChange };
    });
    setRemainingBalances(updatedRemainingBalances);
  }, [accounts]);

  return (
    <div className="p-6 space-y-6 bg-background">
      <h2 className="text-3xl font-bold text-primary">Finance Overview</h2>

      {/* Accounts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountsOverview remainingBalances={remainingBalances}/>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balances Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountBalancesChart remainingBalances={remainingBalances} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceOverview;
