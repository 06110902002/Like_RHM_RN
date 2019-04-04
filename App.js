//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, AsyncStorage} from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import LoginPage from './page/login/Login'
import WelcomePage from  './page/welcome/Welcome'
import MainPage from './page/main/MainPage'

var isFirst;

AsyncStorage.getItem('isFrist', (error, result) => {
    if (result == null || result === '') {
        console.log('43----------');
        isFirst = false;
        AsyncStorage.setItem('isFrist','true', (error) => {
            console.log('23----------:',error);
        });
    } else {
        isFirst = true;
    }
});


//创建页面导航器
const RootStack = createStackNavigator(
    {
        Welcome: {
            screen: WelcomePage,
        },
        Login: {
            screen: LoginPage,
            navigationOptions:{
                header:null,
            }
        },
        Main:{
            screen:MainPage,
            navigationOptions:{
                header:null,
            },
        },

    },
    {
        initialRouteName: isFirst? 'Welcome' : 'Login',
    }
);


const AppContainer = createAppContainer(RootStack);


export default class App extends React.Component<Props> {

    render() {
        return <AppContainer/>;
    }
}

