import {FlatList , Text} from 'react-native'
import {ExpenseItem} from '../components/ExpenseItem'

const renderExpenseItem = ({item})=>{
    return <ExpenseItem {...item}/>
}

export const ExpensesList = ({expenses})=>{
    return(
        <FlatList 
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
        />
    )
}