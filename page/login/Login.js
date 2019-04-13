import React from 'react';
import {
    Button, View, Text, StyleSheet,
    Image, TextInput, ListView,
    TouchableOpacity, NativeModules
} from 'react-native';
import {Alert} from 'react-native'

import {FlatList} from 'react-native';
import MicroHttp from '../../utils/MicroHttp';
import DateUtils from "../../utils/DateUtils";


const cellPhoneInputId = 23;
const passwdInputId = 24;
var isShowAccountHistory = false;
var mobileList = [];
var RNCallNative = NativeModules.RNCallNative;

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        /**
         * 通过状态去传递属性
         *
         * */
        this.state = {
            clearCellphoneStatus: false,
            cellPhoneText: '',   //需要将控件对象绑定过来
            passwardText: '',    //密码文本的值

            isShowPwd: true,
            dataArray: this.initData(),
        }
    }

    initData() {
        for (let i = 0; i < 5; i++) {

            mobileList.push({key: i + "", title: '1855033318' + i});
        }
        return mobileList;
    };

    _renderItem = (data) => {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.onClickListener(data)}>
                <Text style={styles.item}>{data.item.title}</Text>
            </TouchableOpacity>
        );

    };

    onClickListener(itemData) {
        this.setState({
            cellPhoneText: itemData.item.title
        }, () => {
            this.showAccountHistory();
        });
    };


    render() {
        return (
            <View style={styles.main}>

                <TouchableOpacity onPress={this.closeExit()}>
                    <Image style={styles.cancelImgStyle}
                           source={require('../../images/blue_close.png')}/>
                </TouchableOpacity>

                <Image style={styles.loginIcon}
                       source={require('../../images/top_login.png')}/>

                {/*账号文本*/}
                <View style={styles.inputTextStyle}>

                    <Text style={styles.accountPwdTextStyle}>账号</Text>
                    <TextInput autoFocus={true} clearButtonMode={'never'} ref='txtCellPhone'
                               placeholder="请输入手机号码" maxLength={11}
                               style={{marginLeft: 10}}
                               underlineColorAndroid={'transparent'}//去掉下划线
                               value={this.state.cellPhoneText}
                               onChangeText={(text) => this.onTextWatch(text, cellPhoneInputId)}/>

                    <View style={{flex: 1}}/>

                    {/*清除图标*/}
                    <TouchableOpacity onPress={() => this.clearTextInput()} style={
                        this.state.clearCellphoneStatus ? styles.clearTextinputStyle : styles.clearTextinputHiddlenStyle}>

                        <Image style={this.state.clearCellphoneStatus ? {width: 40, height: 40} : {width: 0}}
                               source={require('../../images/clear_passworld.png')}/>

                    </TouchableOpacity>

                    {/*向下*/}
                    <TouchableOpacity onPress={() => this.showAccountHistory()} style={{
                        width: 50, height: 50,
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>

                        <Image style={{width: 40, height: 40}}
                               source={require('../../images/account_pulldown.png')}/>

                    </TouchableOpacity>

                </View>

                <View style={{marginLeft: 15, marginRight: 15, height: 0.25, backgroundColor: 'black'}}/>

                {/*账号输入历史文本框*/}
                <View style={{marginLeft: 15, marginRight: 15, top: 0.5, height: 0, maxHeight: 150}}
                      ref='accountHistoryListView'>
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={this._renderItem.bind(this)}
                    />
                </View>


                {/*密码文本*/}
                <View style={styles.inputTextStyle}>

                    <Text style={styles.accountPwdTextStyle}>密码</Text>
                    <TextInput placeholder="请输入登录密码" maxLength={20}
                               secureTextEntry={this.state.isShowPwd}
                               value={this.state.passwardText}
                               onChangeText={(text) => this.onTextWatch(text, passwdInputId)}
                               style={{marginLeft: 10}}/>

                    <View style={{flex: 1}}/>


                    {/*眼睛*/}
                    <TouchableOpacity style={{
                        width: 50, height: 50,
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }} onPress={() => this.switchPwdInputStaue()}>

                        <Image style={{width: 40, height: 40}}
                               source={require('../../images/see_un.png')}/>

                    </TouchableOpacity>

                </View>

                <View style={{marginLeft: 15, marginRight: 15, height: 0.5, backgroundColor: 'black'}}/>

                {/*忘记密码*/}
                <TouchableOpacity onPress={this.unforgotPwd()}>
                    <Text style={{marginTop: 10, color: 'blue', marginLeft: 15}}>忘记密码?</Text>
                </TouchableOpacity>

                <View style={styles.clickButtonStyle}>
                    <Button title={"登录"} color={'white'} onPress={() => this.login()}/>
                </View>

                <Button title={"手机号快速注册"} color={'blue'} onPress={() => this.login()}/>


                {/*填充视图*/}
                <View style={{flex: 1,}}/>

                {/*底部视图*/}
                <View style={styles.bottomStyle}>

                    <TouchableOpacity style={{flex: 1,}}>
                        <Text style={{
                            fontSize: 12,
                            color: 'blue',
                            textAlign: 'center',
                            alignSelf: 'flex-end'
                        }}>客服热线</Text>
                    </TouchableOpacity>

                    <View style={{width: 20}}/>

                    <TouchableOpacity style={{flex: 1, backgroudColor: '#267111'}}>
                        <Text style={{fontSize: 12, color: 'blue',}}>在线客服</Text>
                    </TouchableOpacity>

                </View>


            </View>
        );
    }

    componentDidMount() {
        console.log('136--------  :' + this.state.clearCellphoneStatus);
    };

    /**
     * 文本监听事件
     * @param text
     * @param id :组件id
     */
    onTextWatch(text, id) {

        if (id === cellPhoneInputId) {
            this.setState({
                cellPhoneText: text,
                clearCellphoneStatus: text.length > 0,
            }, () => {
                console.log('151--------' + text.length + " id：" + id + "  : " + this.state.clearCellphoneStatus);
            });

        }
        if (id === passwdInputId) {
            this.setState({passwardText: text});
        }

        console.log('159--------' + text.length + " id：" + id + "  : " + this.state.clearCellphoneStatus);
    };

    /**
     * 切换清除按钮的状态
     */
    switchPwdInputStaue() {
        this.setState({
            isShowPwd: !this.state.isShowPwd,
        });
    };


    closeExit() {
        //console.log('44---------close to exit');
    };

    clearTextInput() {
        this.setState({
            cellPhoneText: '',
            clearCellphoneStatus: false
        });
    };

    showAccountHistory() {
        console.log('171-----------showAccountHistory:');
        isShowAccountHistory = !isShowAccountHistory;
        this.refs.accountHistoryListView.setNativeProps({
            style: {
                height: isShowAccountHistory ? this.state.dataArray.length * 50 : 0,
            }
        });
    };

    unforgotPwd() {
        //console.log('104-----------clearText');
    };

    login() {
        //Alert.alert(this.state.cellPhoneText +":"+this.state.passwardText);
        //this.props.navigation.navigate('Main');
        let url = 'https://rhbapp.ruiyinxin.com:7024/unifiedAction.json';
        // let param = {
        //     transDate: '20190413',
        //     application: 'GetAgencyId.Req',
        //     loginAppUserType: 'ruihuami_ruihuabao',
        //     clientType: '04',
        //     transTime: "150512",
        //     dataRequestType: "JSON",
        //     mobileSerialNum: "EECC4087BF3820F33B394D7AD652138B00000000",
        //     userIP: "192.168.3.65",
        //     appVersion: "V3",
        //     customerId: "0000",
        //     latitude: "31.215770",
        //     version: "1.2.0",
        //     sign: MicroHttp.kIMPSignKey,
        //     mobileNo: "18751586817",
        //     token: "0000",
        //     longitude: "121.530926",
        //     phone: "0000",
        //     transLogNo: "000003",
        //     appUser: "ruihuami",
        //     osType: "iOS12.1.4"
        // };
        let microHttp = new MicroHttp();
        var param = microHttp.buildPublicRequestBody();
        param.application = 'GetAgencyId.Req';
        param.customerId = "0000";
        param.mobileNo = '18751586817';
        param.phone = "0000";
        console.log('288----------;'+param.toString());

        let dateAndTime = DateUtils.getDateAndTimes();
        console.log('285---------date:'+dateAndTime[0]);

        RNCallNative.getMd5FromNative(JSON.stringify(param),(newSign) => {
            param.sign = newSign;

            let parmatTmp = 'requestXml=' + JSON.stringify(param);

            microHttp.postRequest(MicroHttp.jsonUrl, parmatTmp)
                .then((response) => {

                    if(response.respCode === '0000'){

                    }else{
                        Alert.alert(response.respDesc);
                    }

                    console.log('300----------:' + response.respDesc+" ："+response.respCode);

                }).catch((error) => {
                Alert.alert(error);
            })
        });


        return;




        try {
            // fetch(url, {
            //     method: 'post',
            //     body: parmatTmp,
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            // }).then(function(response) {
            //     return response.json();
            // }).then((responseData) => {
            //     console.log('278-----------：'+responseData.application);
            // })
            //  .done();

            let microHttp = new MicroHttp();
            microHttp.postRequest(MicroHttp.jsonUrl, parmatTmp)
                .then((response) => {
                    console.log('300----------:' + response.respDesc);

                }).catch((error) => {
                    Alert.alert(error);
                })

        } catch (e) {
            //捕获异常消息
            console.log('310----------:' + e);
        }


    };

    register() {

    };


}

/**
 * 账号实体
 */
class AccountModel {

    constructor() {
        //super();
        this.account = '';
    };

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        //borderColor: 'blue',
        //margin: 5,
        //borderWidth: 1,
        flexDirection: 'column',    //从左往右排列

    },
    loginIcon: {
        width: 80,
        height: 60,
        marginTop: 10,
        alignSelf: 'center',
        resizeMode: 'contain',

    },

    inputTextStyle: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        //backgroundColor:'#ccbb33',
        flexDirection: 'row',
        //justifyContent:'center',
        alignItems: 'center',

    },

    accountPwdTextStyle: {
        fontSize: 14,
        color: 'gray',
        //alignSelf: 'flex-start',
        textAlign: 'center',

    },


    cancelImgStyle: {
        width: 40,
        height: 40,
        marginTop: 50,
        marginLeft: 30
    },

    clearTextinputStyle: {
        width: 50, height: 50,
        alignItems: 'flex-end',
        backgroundColor: '#bbcc99',
        justifyContent: 'center',
    },

    clearTextinputHiddlenStyle: {
        width: 0
    },

    clickButtonStyle: {
        margin: 15,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#7FFF00',
    },

    bottomStyle: {
        height: 40,
        //backgroundColor:'#ccbb33',
        flexDirection: 'row',
        marginBottom: 30,
        //justifyContent:'center',
        alignItems: 'center',
    },

    container: {
        marginTop: 5,
        height: 50,
        justifyContent: 'center',
    },
    item: {
        //backgroundColor: '#c5ecff',
        marginLeft: 15,
        //color:'#cbd233',
    },

});