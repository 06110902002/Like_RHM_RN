import React from 'react';
import {Button, View, Text, StyleSheet, Image, Platform} from 'react-native';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'; // Version can be specified in package.json

import BusinessData from './BusinessData'
import Mine from './Mine'


//创建页面导航器
const BottomTabNavigator = createBottomTabNavigator({

    //如果要设置每个页面的顶部标题栏，可使用下面这种创建方式，如果不需要的话，可以使用上面的创建方式
    MainScreen: createStackNavigator(
        // RouteConfigs
        {
            screen: BusinessData,
        },
        // StackNavigatorConfig
        {

            headerMode: 'screen',
            mode: Platform.OS === 'ios' ? 'modal' : 'card',
            navigationOptions: {
                title: '经营数据',
                tabBarIcon: ({focused, tintColor}) => {
                    return <Image
                        source={focused ? require('./img/icon_02.png') : require('./img/icon_01.png')}
                        style={styles.tabIconStyle}
                    />

                },
                tabBarOnPress: (event) => { // 使用tabBarOnPress点击事件
                    event.defaultHandler();//调用组建内默认的实现方法,这句一定要加上，不然页面不能切换回来
                    onTabbarClickListener(23);
                },

            },
        },
    ),

    MsgScreen: createStackNavigator(
        // RouteConfigs
        {
            screen: Mine,

        },
        // StackNavigatorConfig
        {
            headerMode: 'screen',
            mode: Platform.OS === 'ios' ? 'modal' : 'card',
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#6699ff',
                },
                title: '我的',
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'normal',
                },
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('./img/icon_02.png') : require('./img/icon_04.png')}
                        style={styles.tabIconStyle}
                    />

                ),
            },
        },
    ),


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


const AppContainer = createAppContainer(BottomTabNavigator);

export default class MainPage extends React.Component {
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