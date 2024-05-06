import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { ExpensesContext } from '../store/ExpenseContext'

const AllExpenses = () => {
    const expensesctx = useContext(ExpensesContext);
    return (
        <ExpensesOutput expenses={expensesctx.expenses} expensePeriod='Total' fallbackText="No registered expenses found" />
    )
}

export default AllExpenses