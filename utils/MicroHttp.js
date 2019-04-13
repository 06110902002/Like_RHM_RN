/**
 * Created by 刘胡来
 * Date on http网络请求管理器
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:
 */

export default class MicroHttp{

    static jsonUrl = 'https://rhbapp.ruiyinxin.com:7024/unifiedAction.json';
    constructor(){

        //默认网络请求头
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };

    }
    setHeaders(headers){
        if(headers){
            this.headers = headers;
        }

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