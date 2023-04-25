import axios from 'axios'

const url = 'https://react-native-request-setup-default-rtdb.firebaseio.com'

export const storeExpense = async (expensesData)=>{
  const response = await axios.post(
    `${url}/expenses.json`,
    expensesData
   )
   return response.data.name
}

export const fetchExpenses = async ()=>{
    const response = await axios.get(
        `${url}/expenses.json`
       )

    let expenses = []

    for(let key in response.data){
       const expense = {
         id:key,
         amount:response.data[key].amount,
         date:new Date(response.data[key].date),
         description:response.data[key].description
       }
       expenses.push(expense)
    }

    return expenses
}

export const fetchUpdateExpense = async (id, expenseData)=>{
   return await  axios.put(url + `/expenses/${id}.json`, expenseData)
}

export const fetchDeleteExpense = async(id)=>{
    return await axios.delete(url + `/expenses/${id}.json`)
}

