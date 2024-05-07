import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { getDateMinusDays } from '../util/date';
import { ExpensesContext } from '../store/ExpenseContext';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesctx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesctx.setExpenses(expenses);
      }
      catch (err) {
        setError('Could not get expenses');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, [])

  if (error) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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