
import React from "react";
import {Button, View, Text, StyleSheet,Dimensions,
    Image,TextInput,ListView,Alert,Animated,Easing,
    TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class SlideButton extends React.Component{

    static propTypes = {
        onButtonClick: PropTypes.func,
        txtArray:PropTypes.array,
    };

    constructor(){
        super();
        this.state = {
            indexViewMarginLeft:new Animated.Value(20),
            activityTxtColor:'#4394F1',
            inactiveTxtColor:'gray',
            selecIndex:1,
        };

    };

    moveLeftAnim(){
        Animated.timing(this.state.indexViewMarginLeft, {
            toValue: 20,
            duration: 800,
            easing: Easing.linear
        }).start();
    };

    moveRightAnim(){
        Animated.timing(this.state.indexViewMarginLeft, {
            toValue: screenWidth / 2 + 10,
            duration: 800,
            easing: Easing.linear
        }).start();
    };

    componentDidMount() {
        this.state.indexViewMarginLeft.addListener(({value})=> {
            if(value === 20){

                this.refs.index1.setNativeProps({
                    style: {
                        color: this.state.activityTxtColor,
                    }
                });
                this.refs.index2.setNativeProps({
                    style: {
                        color: this.state.inactiveTxtColor,
                    }
                });
                this.props.onButtonClick && this.props.onButtonClick(1);

            }else if(value === (screenWidth / 2 + 10)){
                this.refs.index2.setNativeProps({
                    style: {
                        color: this.state.activityTxtColor,
                    }
                });
                this.refs.index1.setNativeProps({
                    style: {
                        color: this.state.inactiveTxtColor,
                    }
                });
                this.props.onButtonClick && this.props.onButtonClick(2);
            }
        });
    }

    componentWillUnMount() {
        this.state.indexViewMarginLeft.removeAllListeners();
    }

    render(){
        return(
            <View style = {{flex:1}}>

                <View style = {{width:'100%',height:60,flexDirection:'row'}}>
                    <Text style = {[styles.slideButtonStyle,{marginLeft:20,marginRight:10,color:this.state.activityTxtColor,}]}
                          ref = "index1"
                          onPress = {() =>this.moveLeftAnim()}>
                        我的分润模板
                    </Text>

                    <Text style = {[styles.slideButtonStyle,{marginLeft:10,marginRight:20,color:this.state.inactiveTxtColor}]}
                          ref = "index2"
                          onPress = {() =>this.moveRightAnim()}>
                        下级代理分润模板
                    </Text>

                </View>

                {/*滚动视图*/}
                <Animated.View style = {{height:50,width:screenWidth / 2 - 30,
                    borderWidth:2,borderColor:'#4394F1',
                    borderRadius:22.5,marginTop:-55,marginLeft:this.state.indexViewMarginLeft}}>

                </Animated.View>



            </View>
        )

    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#F5F5F5',
        flexDirection:'column',
    },

    slideButtonStyle:{
        flex:1,
        height:60,
        textAlignVertical:'center',
        lineHeight:60,
        textAlign:'center',
        alignItems:'center',
    },


});