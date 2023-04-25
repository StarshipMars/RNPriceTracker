import { Text } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput"
import {useExpensesContext} from '../store/expenses-context'

export const AllExpenses = ()=>{
  const {expenses} = useExpensesContext()
  
    return(
      <ExpensesOutput expenses={expenses} expensesPeriod={'Total'}/>
    )
}