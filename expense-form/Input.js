import {View , Text, TextInput, StyleSheet} from 'react-native';
import {GlobalStyles} from '../constants/styles';


export const Input = ({label , style, isError, config})=>{

    let inputStyles = [styles.input]

    if(config && config.multiline){
        inputStyles = [...inputStyles , styles.inputMultiline]
    }

    return (
        <View style={[styles.inputContainer , style]}>
            <Text style={[styles.label, isError && styles.invalidLabel]}>{label}</Text>
            <TextInput style={[inputStyles , isError && styles.invalidInput]} {...config} />
            {isError && <Text style={styles.errorMessage}>Entered data is incorrect</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
     marginHorizontal: 4,
     marginVertical: 16
    },
    label:{
     fontSize: 12,
     color:GlobalStyles.colors.primary100,
     marginBottom: 4
    },
    input:{
      backgroundColor:GlobalStyles.colors.primary100,
      color:GlobalStyles.colors.primary700,
      padding:6,
      borderRadius: 6,
      fontSize: 18
    },
    inputMultiline:{
      minHeight: 100,
      textAlignVertical: 'top'
    },
    errorMessage:{
        color: 'red'
    },
    invalidLabel:{
      color: GlobalStyles.colors.error500
    },
    invalidInput:{
      backgroundColor:GlobalStyles.colors.error50
    }
})