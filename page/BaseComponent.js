import React from 'react';
import {
    Button, View, Text, StyleSheet,
    Image, TextInput, ListView, ScrollView, Dimensions, StatusBar,
    TouchableOpacity
} from 'react-native';
import {Alert} from 'react-native'

/**
 * Created by 刘胡来
 * DateUtils on 2019.04.05
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 页面组件基类
 */
export default class BaseComponent extends React.Component {


    render() {
        return this.initView();
    };


    /**
     * 子类需要重载本函数
     * @returns {null}
     */
    initView() {
        return null;
    };

    /**
     * 修改状态栏属性
     * @returns {*}
     */
    setStatusBar() {
        return (
            <StatusBar
                animated={true}
                hidden={false}
                //backgroundColor={this.state.MainColor} //状态栏的背景色
                translucent={true}
                barStyle='light-content'
            />);
    };

}