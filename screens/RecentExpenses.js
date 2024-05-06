import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { getDateMinusDays } from '../util/date';
import { ExpensesContext } from '../store/ExpenseContext';

const RecentExpenses = () => {
  const expensesctx = useContext(ExpensesContext);

  const recentExpenses = expensesctx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;

  })

  return (
    <ExpensesOutput expenses={recentExpenses} expensePeriod='Last 7 Days' fallbackText="No Expenses Registered for the last 7 days" />
  )
}

export default RecentExpenses