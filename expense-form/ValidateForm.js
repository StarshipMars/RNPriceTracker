import {useState} from 'react'
import { View , Text , StyleSheet , ActivityIndicator} from "react-native"
import { Input } from "./Input"
import {CustomButton} from '../buttons/CustomButton'

const deriveState = (defaultData)=>{
 let initialState = {
    amount: {
      value: '',
      isValid:!!defaultData
    },
    date: {
      value: '',
      isValid:!!defaultData
    },
    description: {
      value: '',
      isValid:!!defaultData
    }
 } 
  if(defaultData){
    initialState.amount.value = defaultData.amount.toString()
    initialState.date.value = defaultData.date.toISOString().slice(0, 10)
    initialState.description.value = defaultData.description

    return initialState
  }
  return initialState
}

export const ValidateForm = ({isEditing, onCancel , onSubmit, defaultValue, isLoading})=>{
    const [inputValues , setInputValues] = useState(deriveState(defaultValue))

    const inputChangedHandler = (identifier , enteredValue)=>{
        setInputValues((prevValue) => {
            return {
                 ...prevValue,
                 [identifier]: {
                   value: enteredValue,
                   isValid:true
                 }
            }
        })
    }

    const submitHandler = ()=>{
      const expenseData = {
        amount: +inputValues.amount.value,
        date: new Date(inputValues.date.value),
        description:inputValues.description.value
      }
      
      const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
      const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
      const descriptionIsValid = expenseData.description.trim().length > 0

      if(!amountIsValid || !dateIsValid || !descriptionIsValid){
        return setInputValues( prevValue => ({
           ...prevValue,
           amount: {
            value: prevValue.amount.value,
            isValid:amountIsValid
          },
          date: {
            value: prevValue.date.value,
            isValid:dateIsValid
          },
          description: {
            value: prevValue.description.value,
            isValid:descriptionIsValid
          }
        }));
      }

      onSubmit(expenseData)
    }

    const {amount , date , description} = inputValues

    return (
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount" style={styles.row_input} isError={!amount.isValid} config={{
              keyboardType:'decimal-pad',
              onChangeText:(enteredText) => inputChangedHandler('amount' , enteredText),
              value:inputValues.amount.value
            }}/>
            
            <Input label="Date" style={styles.row_input} isError={!date.isValid} config={{
              placeholder:'YYYY-MM-DD',
              maxLength: 10,
              onChangeText:(enteredText) => inputChangedHandler('date' , enteredText),
              value:inputValues.date.value
            }}/>
        </View>
          <Input label="Description" isError={!description.isValid} config={{
            multiline:true,
            onChangeText:(enteredText) => inputChangedHandler('description' , enteredText),
            value:inputValues.description.value
          }}/>
          {!description.isValid && <Text>Check entered data</Text>}
        <View style={styles.btnsContainer}>
          <CustomButton style={styles.button} mode="flat" onPress={onCancel}>Cancel</CustomButton>
          {isLoading.confirm ? <ActivityIndicator color='white' size='large' /> : <CustomButton style={styles.button} onPress={submitHandler}>{isEditing ? 'Update' : 'Add'}</CustomButton>}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    form:{
      marginTop: 40
    },
    title:{
       fontSize: 24,
       fontWeight: 'bold',
       color:'white',
       marginVertical: 24,
       textAlign: 'center'
    },
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row_input:{
        flex:1
    },
    btnsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    }
})