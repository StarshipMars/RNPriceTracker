import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import { RecentExpenses } from './screens/RecentExpenses';
import { ManageExpense } from './screens/ManageExpense';
import { AllExpenses } from './screens/AllExpenses';

import  {GlobalStyles}  from './constants/styles';
import { ManageButton } from './header-components/ManageButton';

import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const ExpensesOverview = ()=>{
  return <BottomTabs.Navigator  
          screenOptions={({navigation}) => ({
            headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
            headerTitleAlign:'center',
            headerTintColor:'white',
            tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
            tabBarActiveTintColor:GlobalStyles.colors.accent500,
            headerRight:({tintColor})=>{
              return <ManageButton 
                       icon='add' 
                       size={24} 
                       color={tintColor} 
                       onPress={()=>{
                        navigation.navigate('Manage Expense')
                       }}
                      />
            }
          })}>
           <BottomTabs.Screen 
             name="Recent Expenses" 
             component={RecentExpenses}
             options={{
               tabBarLabel:'Recent',
               tabBarIcon:({color , size}) => <Ionicons name="hourglass" size={size} color={color}/>
             }}
            />
           <BottomTabs.Screen 
             name="All Expenses" 
             component={AllExpenses}
             options={{
              tabBarIcon:({color , size}) => <Ionicons name='calendar' size={size} color={color}/>
             }}
            />
        </BottomTabs.Navigator>
  
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
          screenOptions={{
            headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor:'white'
          }}
          >
            <Stack.Screen 
              name="Expenses Overview" 
              component={ExpensesOverview}
              options={{headerShown:false}}
            />
            <Stack.Screen 
              name="Manage Expense" 
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

