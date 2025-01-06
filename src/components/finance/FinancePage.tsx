"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FinanceOverview from '@/components/finance/FinanceOverview';
import financeData from '@/lib/data/finance';
import ExpenseTable from '@/components/finance/ExpenseTable';
import ExpenseCharts from '@/components/finance/ExpenseCharts';
import ExpensePage from './ExpensesPage';
import IncomePage from './IncomePage';
import {tabs} from "@/lib/data/finance"
import { calculateRemainingBalance, calculatePercentageChange } from '@/lib/functions/finance';

const FinancePage = () => {

  const [accounts, setAccounts] = useState(financeData.accounts);
  const [expenses, setExpenses] = useState(financeData.expenses)
  const [income, setIncome] = useState(financeData.income)
  const [debts, setDebts] = useState(financeData.debts)

  const updatedAccounts = useMemo(() => {
    return accounts.map((account) => {
      const currentBalance = calculateRemainingBalance(accounts, expenses, income, account.id);
      

      return {
        ...account,
        amount: currentBalance,
        previousBalance: account.amount
      };
    });
  }, [accounts, expenses, income]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>
      <Tabs defaultValue={tabs[0].title.toLowerCase()} className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.title.toLowerCase()}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <FinanceOverview accounts={updatedAccounts} setAccounts={setAccounts} expenses={expenses} income={income} debts={debts}/>
        </TabsContent>

        {/* <TabsContent value="charts">
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Charts</h2>
            <p>Placeholder for charts and visualizations.</p>
          </div>
        </TabsContent> */}

        <TabsContent value="expenses">
          <ExpensePage accounts={updatedAccounts} expenses={expenses} setExpenses={setExpenses}/>
        </TabsContent>

        <TabsContent value="income">
          <IncomePage accounts={updatedAccounts} expenses={expenses} income={income} setIncome={setIncome}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancePage;
