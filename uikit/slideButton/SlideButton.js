
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
            indexViewMarginLeft:new Animated.Value(0),
            activityTxtColor:'#4394F1',
            inactiveTxtColor:'gray',
            selecIndex:1,

        };
        this.textList = [];
        this.txtRefList = [];

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
        // this.state.indexViewMarginLeft.addListener(({value})=> {
        //     if(value === screenWidth / this.txtRefList.length){
        //         this.props.onButtonClick && this.props.onButtonClick(value);
        //     }
        // });
    }

    componentWillUnMount() {
        this.state.indexViewMarginLeft.removeAllListeners();
    }

    render(){
        let{txtArray} = this.props;
        // txtArray.map(function(value,key){
        //     console.log('84--------:'+key+" value:"+value);
        // });
        // console.log('83----------:'+txtArray.length);
        // let testView = this.buileTxt(txtArray);
        // console.log('88----------'+testView);
        return(
            <View style = {{flex:1}}>

                <View style = {{width:'100%',height:60,flexDirection:'row'}}>
                    {/*<Text style = {[styles.slideButtonStyle,*/}
                        {/*{color:this.state.activityTxtColor,backgroundColor:'#F345F5',}]}*/}
                          {/*ref = "index1"*/}
                          {/*onPress = {() =>this.moveLeftAnim()}>*/}
                        {/*我的分润模板*/}
                    {/*</Text>*/}

                    {/*<Text style = {[styles.slideButtonStyle,{*/}
                        {/*color:this.state.inactiveTxtColor,backgroundColor:'#1235F5',}]}*/}
                          {/*ref = "index2"*/}
                          {/*onPress = {() =>this.moveRightAnim()}>*/}
                        {/*下级代理分润模板*/}
                    {/*</Text>*/}

                    {this.buileTxt(txtArray)}


                </View>

                {/*滚动视图*/}
                <Animated.View pointerEvents={'none'} style = {{height:50,width:screenWidth / txtArray.length,
                    borderWidth:2,borderColor:'#4394F1',
                    borderRadius:22.5,marginTop:-55,marginLeft:this.state.indexViewMarginLeft}}>

                </Animated.View>

            </View>
        )

    }

    buileTxt(array){

        for(let i = 0; i < array.length; i ++){
            let view = <Text style = {[styles.slideButtonStyle,{
                color:i === 0? this.state.activityTxtColor:this.state.inactiveTxtColor,}]}
                             ref={ (refName) => {
                                 this.txtRefList[i] = refName
                             }}
                             key={i+"2019"}
                             onPress = {() =>this.startAnim(i)}>
                {array[i]}
            </Text>
            this.textList.push(view);
        }

        return this.textList;
    };

    startAnim(i){

       for(let k = 0 ; k < this.txtRefList.length; k ++){
            if(k === i){
                this.txtRefList[i].setNativeProps({
                    style: {
                        color: this.state.activityTxtColor
                    }
                });
            }else{
                this.txtRefList[k].setNativeProps({
                    style: {
                        color: this.state.inactiveTxtColor,
                    }
                });
            }
        }

        Animated.timing(this.state.indexViewMarginLeft, {
            toValue: i * screenWidth / this.txtRefList.length,
            duration: 500,
            easing: Easing.linear
        }).start(()=>{
            this.props.onButtonClick && this.props.onButtonClick(i);
        });



    };
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