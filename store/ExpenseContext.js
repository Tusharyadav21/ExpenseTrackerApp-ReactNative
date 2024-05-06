import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of Shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'Others',
        amount: 19.99,
        date: new Date('2022-01-22')
    },
    {
        id: 'e3',
        description: 'Mobile',
        amount: 29.99,
        date: new Date('2024-05-07')
    },
    {
        id: 'e4',
        description: 'Macbook',
        amount: 99.99,
        date: new Date('2024-05-06')
    },
    {
        id: 'e5',
        description: 'Banana',
        amount: 1.05,
        date: new Date('2024-04-30')
    },
    {
        id: 'e6',
        description: 'New',
        amount: 29.67,
        date: new Date('2024-04-29')
    },
    {
        id: 'e7',
        description: 'Random',
        amount: 9.39,
        date: new Date('2024-04-28')
    },
    {
        id: 'e8',
        description: 'Test',
        amount: 69.99,
        date: new Date('2024-04-27')
    },
    {
        id: 'e9',
        description: 'Testing 123',
        amount: 89.99,
        date: new Date('2023-02-11')
    },
    {
        id: 'e10',
        description: 'Hello World..!!',
        amount: 100.9,
        date: new Date('2023-02-11')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id : id }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updateItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updateItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData })
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;