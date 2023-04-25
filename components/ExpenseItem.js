import { useState } from "react"
import { Pressable, View, Text, StyleSheet} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { GlobalStyles } from "../constants/styles"

export const ExpenseItem = ({id , description , amount , date})=>{
    const [scale, setScale] = useState(1)
    const navigation = useNavigation()

    const formatted = (date)=>{
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    const pressInHandler = ()=>{
        setScale(1.05)
    }

    const pressOutHandler = ()=>{
        setScale(1)
    }

    const pressHandler = ()=>{
        navigation.navigate('Manage Expense',{
          expenseId:id
        })
    }

    return (
      <Pressable 
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        onPress={pressHandler}
      >
         <View style={[styles.expenseItem, {transform:[{scale}]}]}>
            <View>
              <Text style={[styles.textBase, styles.description]}>{description}</Text>
              <Text style={styles.textBase}>{formatted(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
         </View>
      </Pressable>
    )
}

const styles = StyleSheet.create({
   expenseItem:{
      padding:12,
      marginVertical: 8,
      backgroundColor: GlobalStyles.colors.primary500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius:6,
      elevation:3,
      shadowColor:GlobalStyles.colors.gray500,
      shadowRadius: 4,
      shadowOffset:{width: 1, height: 1},
      shadowOpacity:0.4
   },
   textBase:{
     color: GlobalStyles.colors.primary50
   },
   description:{
     fontSize: 16,
     marginBottom: 4,
     fontWeight: 'bold'
   },
   amountContainer:{
    paddingHorizontal:12,
    paddingVertical:4,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
    minWidth: 80
   },
   amount:{
    color:GlobalStyles.colors.primary500,
    fontWeight: 'bold'
   },
   pressed:{
     transform: [
        {
          scale:1.2
        }
     ]
   }
})