import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../components/UI/IconButton';
import ManageExpenseForm from '../components/ManageExpenseForm';
import { ExpensesContext } from '../store/ExpenseContext';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

import { GlobalStyles } from '../constants/styles';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { AuthContext } from '../store/AuthContext';

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensectx = useContext(ExpensesContext);
  const authctx = useContext(AuthContext);
  const token  = authctx.token;

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

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId, token);
      expensectx.deleteExpense(editedExpenseId);
      navigation.goBack()
    }
    catch (err) {
      setError('Could not delete Expense');
      setIsSubmitting(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensectx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData, token);
      } else {
        const id = await storeExpense(expenseData, token);
        expensectx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack()
    }
    catch (err) {
      setError('Could not Add/Update Expense')
      setIsSubmitting(false)
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
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