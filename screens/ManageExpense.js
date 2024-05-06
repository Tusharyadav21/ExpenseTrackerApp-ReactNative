import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/ExpenseContext';
import ManageExpenseForm from '../components/ManageExpenseForm';

const ManageExpense = ({ route, navigation }) => {
  const expensectx = useContext(ExpensesContext);


  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId

  const selectedExpense = expensectx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    expensectx.deleteExpense(editedExpenseId);
    navigation.goBack()
  }
  function cancelHandler() {
    navigation.goBack()
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      expensectx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensectx.addExpense(expenseData);
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ManageExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})