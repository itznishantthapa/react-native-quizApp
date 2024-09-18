import { StyleSheet} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Profile from '../TabScreen/Profile';
import Chart from '../TabScreen/Chart';
import Dashboard from '../TabScreen/Dashboard';






const Tab = createBottomTabNavigator();


export default function Tabbar({ gameInfo, setgameInfo, fetchQuestion,setQuestionAmount  }) {

    return (

        <Tab.Navigator
            initialRouteName='Dashboard'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name == 'Dashboard') {
                        iconName = 'heart';
                    }
                    else if (route.name === 'Profile') {
                        iconName = 'user';
                    } else if (route.name === 'Chart') {
                        iconName = 'bar-chart';
                    } 
                    return <FaIcon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopColor: 'black',
                    // marginBottom:5,
                    height: 60

                }
            })}
        >
            <Tab.Screen name='Dashboard'>
                {props=> <Dashboard {...props} fetchQuestion={fetchQuestion} setQuestionAmount={setQuestionAmount} />}
            </Tab.Screen>
            <Tab.Screen name='Chart'  >
                {props => <Chart {...props}  />}
            </Tab.Screen>
            <Tab.Screen name='Profile'>
            {props => <Profile {...props}  gameInfo={gameInfo} setgameInfo={setgameInfo}  />}
            </Tab.Screen>
        </Tab.Navigator>



    )
}

const styles = StyleSheet.create({})