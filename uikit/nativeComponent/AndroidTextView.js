import React from "react";
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,
    TouchableOpacity,requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';

var TextView = requireNativeComponent('TextView',AndroidTextView);

/**
 * Created by 刘胡来
 * Date on 2019.04.30
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:来自android的原生组件
 */
export default class AndroidTextView extends React.Component{

    static propTypes = {
        text: PropTypes.string,
        textSize: PropTypes.number,
        textColor: PropTypes.number,
    };

    componentWillMount(){
        let{text,textSize,textColor} = this.props;

    };

    render(){
        return <TextView{...this.props}/>
    }

}