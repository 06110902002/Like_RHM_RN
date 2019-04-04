import React from 'react';
import {Button, View, Text,Dimensions,
    StyleSheet,Alert,ScrollView,Image,
    TouchableOpacity

} from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

let image1 = require('../../images/guidImage0.png');
let image2 = require('../../images/guidImage1.png');
let image3 = require('../../images/guidImage2.png');

export default class Welcome extends React.Component {

    static navigationOptions = (props) =>{
        return {
            // title: '本页面演示StackNavigator',
            // headerTitleStyle:styles.headerTitleStyle,
            header:null,    //隐藏顶部导航栏
        };
    };


    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                pagingEnabled={true}
                //onTouchMove={(e) =>this.onTouchMove(e)}
                onScroll={this.onScroll}
                horizontal={true}>
                <Image source={image1} style={styles.backgroundImage} />
                <Image source={image2} style={styles.backgroundImage} />

                <TouchableOpacity onPress={() => this.directLoginPage()} style = {{flex:1}}>
                    <Image source={image3} style={styles.backgroundImage} />
                </TouchableOpacity>



            </ScrollView>
        );
    }

    directLoginPage(){
        this.props.navigation.navigate('Login');
    };

    onTouchMove(e){

        // 1.求出水平方向的偏移量
       // var offsetX = e.nativeEvent.contentOffset.x;
        // 2.求出当前的页数         floor函数 取整
        //var currentPage = Math.floor(offsetX / width);

        //console.log('59--------onTouchMove:'+e.nativeEvent.contentOffset.x);
    };

    onScroll = (e) => {
        // 1.求出水平方向的偏移量
        var offsetX = e.nativeEvent.contentOffset.x;
        // 2.求出当前的页数         floor函数 取整
        //var currentPage = Math.floor(offsetX / width);

        console.log('51--------onScroll:'+offsetX);
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        width: screenWidth * 3,
        height: screenHeight,
    },

    backgroundImage: {
        width: screenWidth,
        height: screenHeight - 20,
    },
});