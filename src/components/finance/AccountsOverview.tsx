import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateRemainingBalance, calculatePercentageChange, formatCurrency } from '@/lib/functions/finance';
import { cn } from '@/lib/utils';
import { Account, Expense, Income } from '@/lib/data/finance';

interface Props {
  accounts: Account[]
  expenses: Expense[],
  income: Income[]
}


const AccountsOverview: React.FC<Props> = ({ accounts, expenses, income }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map(({ id, title, amount, percentageChange }) => {
        console.log(`Amount for ${title} is ${amount}`)

        return (
          <Card key={id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div>
                <span className="text-muted-foreground text-sm">Previous Balance:</span>
                <span className="block font-semibold">{formatCurrency(amount)}</span>
              </div> */}
              <div>
                <span className="text-muted-foreground text-sm">Current Balance:</span>
                <span className="block font-semibold">{formatCurrency(amount)}</span>
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

export default AccountsOverview;
