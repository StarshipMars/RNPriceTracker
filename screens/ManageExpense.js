import { useLayoutEffect , useState} from "react"
import { View , StyleSheet, ActivityIndicator } from "react-native"
import  {ManageButton} from '../header-components/ManageButton'
import { GlobalStyles } from "../constants/styles"
import {useExpensesContext} from '../store/expenses-context'
import {ValidateForm} from '../expense-form/ValidateForm'
import { storeExpense, fetchUpdateExpense, fetchDeleteExpense } from "../services/http"
import { ErrorOverlay } from "../components/ErrorOverlay"


export const ManageExpense = ({route , navigation})=>{
   const {deleteExpense , updateExpense, addExpense, expenses} = useExpensesContext()
   const [loading , setLoading] = useState({
    delete:false,
    confirm:false
   })
   const [error , setError] = useState('')
   const editedExpenceId = route.params?.expenseId
   const isEditing = !!editedExpenceId

   const selectedExpense = expenses.find(expense => expense.id === editedExpenceId)

   useLayoutEffect(()=>{
    navigation.setOptions({
        title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
   }, [isEditing, navigation])

   const goBack = ()=>{
    navigation.goBack()
   }

   const deleteExpenseHandler = async ()=>{
     setLoading(state => ({...state , delete:true}))
     try{
      await fetchDeleteExpense(editedExpenceId)
      deleteExpense(editedExpenceId)
      setLoading(state => ({...state , delete:false}))
      goBack()
     }catch(error){
      setError(error?.message ?? 'Could not delete expense')
      setLoading(state => ({...state , delete:false}))
     }
   }

   const cancelHandler = ()=>{
    goBack()
   }

   const confirmHandler = async(values)=>{
      setLoading(state => ({...state , confirm:true}))
      try{
        if(isEditing){
          await fetchUpdateExpense(editedExpenceId,  {...values})
          updateExpense(
           editedExpenceId, 
           {...values}
          )
          
        } else{
          const id = await storeExpense(values)
          addExpense({
            ...values,
            id
          })
        }
        setLoading(state => ({...state , confirm:false}))
        goBack()
      }catch(error){
        setError(error?.message ?? `Could not ${isEditing ? 'update' : 'add'} expense!`)
        setLoading(state => ({...state , confirm:false}))
      }
      
   }

   if(error && !loading.confirm && !loading.delete){
     return <ErrorOverlay message={error} onConfirm={()=> setError('')}/>
   }


    return(
      <View style={styles.container}>
        <ValidateForm 
          isEditing={isEditing} 
          onCancel={cancelHandler} 
          onSubmit={confirmHandler}
          defaultValue={selectedExpense}
          isLoading={loading}
        />
        {
            isEditing && (
            <View style={styles.deleteContainer}>
              {
                loading.delete ? 
                (
                  <ActivityIndicator color='white' size='large' />
                ) :
                (
                <ManageButton
                  icon='trash'
                  color={GlobalStyles.colors.error500}
                  size={36}
                  onPress={deleteExpenseHandler}
                />
                )
              }
              
            </View>
            )
        }
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:24,
      backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer:{
      marginTop: 16,
      paddingTop:8,
      borderTopWidth: 2,
      borderTopColor:GlobalStyles.colors.primary200,
      alignItems:'center'
    }
})