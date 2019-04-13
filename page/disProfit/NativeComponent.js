import React from "react";
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,
    TouchableOpacity,requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';

var ImageButton = requireNativeComponent('ImageButton',NativeComponent);

export default class NativeComponent extends React.Component{

    static propTypes = {
        onSingleTap: PropTypes.func,
        imgUrl:PropTypes.string,
    };

    componentWillMount(){
        let{imgUrl} = this.props;

    };

    render(){
        return <ImageButton{...this.props}/>
    }

}