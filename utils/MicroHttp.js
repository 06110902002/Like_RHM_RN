/**
 * Created by 刘胡来
 * DateUtils on http网络请求管理器
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:
 */
import DateUtils from "./DateUtils";

export default class MicroHttp{

    static jsonUrl = 'https://rhbapp.ruiyinxin.com:7024/unifiedAction.json';
    static kIMPSignKey = "3suw72wy25we2ref3su6er39nh5qmkaq";
    constructor(){

        //默认网络请求头
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        this.requestParmas = null;


    }

    /**
     * 设置 http协议报文头，设置接受与请求报文类型
     *
     * @param headers
     */
    setHeaders(headers){
        if(headers){
            this.headers = headers;
        }

    };

    buildPublicRequestBody(){
        this.requestParmas = {
            transDate: DateUtils.getDateAndTimes()[0],
            //application: 'GetAgencyId.Req',
            loginAppUserType: 'ruihuami_ruihuabao',
            clientType: '04',
            transTime: DateUtils.getDateAndTimes()[1],
            dataRequestType: "JSON",
            mobileSerialNum: "EECC4087BF3820F33B394D7AD652138B00000000",    //待定
            userIP: "192.168.3.65",//待定
            appVersion: "V3",
            //customerId: "0000",
            latitude: "31.215770",
            version: "1.2.0",
            sign: MicroHttp.kIMPSignKey,
            //mobileNo: "18751586817",
            token: "0000",//待定
            longitude: "121.530926",
            //phone: "0000",
            transLogNo: "000003",
            appUser: "ruihuami",
            osType: "iOS12.1.4"   //待定
        };

        return this.requestParmas;


    };


    /**
     * 设置请求超时函数
     * @param timeOut
     * @returns {Promise<any> | Promise}
     */
    httpTimeOut(timeOut = 8*1000){

        return new Promise((resolve,reject) =>{
            setTimeout(() =>{
                reject(new Error('网络超时'));
            },timeOut);
        })

    };

    fetchPromise(method,url, formData){

        return new Promise((resolve, reject) => {
            fetch(url,{

                method: method,
                body:formData,
                headers: this.headers,

            }).then((response) => {

                if (response.ok) {

                    return response.json();

                } else {

                    reject(new Error('服务器异常'));
                }
            }).then((responseJson) => {

                resolve (responseJson);
                //console.log('67-----------：'+responseJson.application);

            }).catch((err) => {

                reject(new Error(err));
            })
        })
    };

    _fetch(fetchPromise, timeout){

        return Promise.race([fetchPromise,this.httpTimeOut(timeout)]);
    };

    postRequest(url, formData,timeout = 8*1000){
        return this._fetch(this.fetchPromise('POST', url, formData), timeout);
    };

    getRequest(url,timeout = 8*1000){
        return this._fetch(this.fetchPromise('Get', url), timeout);
    };

}