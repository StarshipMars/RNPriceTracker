import { useEffect , useState} from "react"
import { ExpensesOutput } from "../components/ExpensesOutput"
import {useExpensesContext} from '../store/expenses-context'
import {fetchExpenses} from '../services/http'
import {LoadingOverlay} from '../components/LoadingOverlay'
import { ErrorOverlay } from "../components/ErrorOverlay"

const getRecentDate = (date, days)=>{
   return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export const RecentExpenses = ()=>{
 const {expenses, setExpenses} = useExpensesContext()
 const [isFetching , setIsFetching] = useState(true)
 const [error , setError] = useState('')

 useEffect(()=>{
  const getExpenses = async ()=>{
    try{
      const result = await fetchExpenses()
      setExpenses(result)
    }catch(error){
      setError(error?.message ?? 'Could not fetch expenses!')
    }finally{
      setIsFetching(false)
    }
   
  }

  getExpenses()

 }, [])

 if(error && !isFetching){
   return <ErrorOverlay message={error} onConfirm={()=> setError('')}/>
 }

 if(isFetching){
    return <LoadingOverlay />
 }


 const recentExpenses = expenses.filter((expense) => {
   const today = new Date()
   const date7DaysAgo = getRecentDate(today, 7)

   return expense.date > date7DaysAgo
 })
    return(
      <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 days'/>
    )
}