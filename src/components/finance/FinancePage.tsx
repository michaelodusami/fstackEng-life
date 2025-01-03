import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FinanceOverview from '@/components/finance/FinanceOverview';
import financeData from '@/lib/data/finance';
import ExpenseTable from '@/components/finance/ExpenseTable';
import ExpenseCharts from '@/components/finance/ExpenseCharts';

const FinancePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>
      <Tabs defaultValue={financeData.tabs[0].title.toLowerCase()} className="w-full">
        <TabsList>
          {financeData.tabs.map((tab) => (
            <TabsTrigger key={tab.title} value={tab.title.toLowerCase()}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <FinanceOverview />
        </TabsContent>

        <TabsContent value="charts">
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Charts</h2>
            <p>Placeholder for charts and visualizations.</p>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="flex justify-center mb-4">
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
              </TabsList>

              <TabsContent value="charts">
                <ExpenseCharts />
              </TabsContent>
              <TabsContent value="tables">
                <ExpenseTable />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="income">
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Income</h2>
            <p>Placeholder for income details.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancePage;
