//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Image,
    Dimensions, AsyncStorage, Platform} from 'react-native';

import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'; // Version can be specified in package.json

import LoginPage from './page/login/Login'
import WelcomePage from  './page/welcome/Welcome'
import MainPage from './page/main/MainPage'
import Mine from "./page/main/Mine";
import BusinessData from "./page/main/BusinessData";
import DisProfits from './page/disProfit/DisProfits';
import DisProfitTempletMgr from './page/profitTmpMgr/DisProfitTempletMgr'


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
const BottomTabNavigator = createBottomTabNavigator({

    BusinessData:{
        screen: BusinessData,
        headerMode: 'screen',
        mode: Platform.OS === 'ios' ? 'modal' : 'card',
        navigationOptions: {
            tabBarLabel: '经营数据',
            tabBarIcon: ({focused, tintColor}) => {
                return <Image
                    source={focused ? require('./page/main/img/icon_02.png') : require('./page/main//img/icon_01.png')}
                    style={styles.tabIconStyle}
                />

            },
            tabBarOnPress: (event) => { // 使用tabBarOnPress点击事件
                event.defaultHandler();//调用组建内默认的实现方法,这句一定要加上，不然页面不能切换回来
                onTabbarClickListener(23);
            },

        }
    },

    Mine:{
        screen: Mine,
        headerMode: 'screen',
        mode: Platform.OS === 'ios' ? 'modal' : 'card',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#6699ff',
            },
            tabBarLabel: '我的',
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? require('./page/main/img/icon_02.png') : require('./page/main/img/icon_04.png')}
                    style={styles.tabIconStyle}
                />

            ),
        }
    },

}, {
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
    animationEnabled: true,
    swipeEnabled: false,

});

function onTabbarClickListener(parmas) {
    console.log('70--------:' + parmas);
}

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
            screen: BottomTabNavigator,
            navigationOptions: {
                header: null,
            }
        },

        DisProfits:{
            screen:DisProfits,
            navigationOptions:{
                title:'利润分配',
            },
        },
        DisProfitTempletMgr:{
            screen:DisProfitTempletMgr,
            navigationOptions:{
                //title:'分润模板管理',
                header: null,
            },
        }

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

const styles = StyleSheet.create({
    tabIconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

