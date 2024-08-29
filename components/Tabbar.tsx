import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
// import { NavigationContainer } from '@react-navigation/native';

import Profile from '../TabScreen/Profile.tsx';
import Rapid from '../TabScreen/Rapid.tsx';
import Search from '../TabScreen/Search.tsx';
import Dashboard from '../TabScreen/Dashboard.tsx';






const Tab = createBottomTabNavigator();


export default function Tabbar({ question, options, handleOptionClick }) {

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
                    } else if (route.name === 'Rapid') {
                        iconName = 'bolt';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
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
            <Tab.Screen name='Dashboard' component={Dashboard} />

            <Tab.Screen name='Search' component={Search}>
            </Tab.Screen>
            <Tab.Screen name='Rapid'  >
                {props => <Rapid {...props} question={question} options={options} handleOptionClick={handleOptionClick} />}
            </Tab.Screen>
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>



    )
}

const styles = StyleSheet.create({})