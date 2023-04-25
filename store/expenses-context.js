import { createContext , useContext, useReducer, useMemo} from "react";


const ExpensesContext = createContext({
    expenses:[],
    addExpense:({description, amount, date})=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id, {description, amount, date})=>{},
    setExpenses:(expenses)=>{}
})

const expensesReducer = (state, action)=>{
   switch(action.type){
     case 'ADD':{
       const id = new Date().toString() + Math.random().toString()
       return [{...action.payload}, ...state]
     }
     case 'SET':{
      const inverted = action.payload.reverse()
      return [...inverted]
     }
     case 'UPDATE':{
        const updateableIndex = state.findIndex( expense => expense.id === action.payload.id)
        const updatableExpense = state[updateableIndex]
        const updatedItem = {...updatableExpense , ...action.payload.data}
        const updatedExpenses = [...state]
        updatedExpenses[updateableIndex] = updatedItem
        return updatedExpenses
     }
     case 'DELETE':{
        return [ ...state.filter(expense => expense.id !== action.payload) ]
     }
     default: {
        return state
     }
   }
}

const ExpensesContextProvider = ({children})=>{
  const [state , dispatch] = useReducer(expensesReducer, [])

  const addExpense = (expenseData)=>{
    dispatch({type:'ADD' , payload:expenseData})
  } 

  const deleteExpense = (id)=>{
    dispatch({type:'DELETE' , payload:id})
  }

  const updateExpense = (id , expenseData)=>{
    dispatch({type:'UPDATE' , payload:{id , data:expenseData}})
  }

  const setExpenses = (expenses)=>{
    dispatch({type:'SET' , payload:expenses})
  }

  const value = useMemo(()=>{
     return{
         expenses:state,
         addExpense,
         deleteExpense,
         updateExpense,
         setExpenses
     }
  }, [state])

   return (
     <ExpensesContext.Provider value={value}>
        {children}
     </ExpensesContext.Provider>
   )
}

export const useExpensesContext = () => useContext(ExpensesContext)

export default ExpensesContextProvider