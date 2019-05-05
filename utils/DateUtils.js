


export default class DateUtils {

    constructor(){};

    /**
     * 返回当前时间
     * @returns {*[]}
     */
    static getDateAndTimes(){

        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return [y+""+m+""+d,h+""+minute+""+second];

    };

    static getFormatDateAndTimes(){

        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return [y+"年"+m+"月"+d+'日',h+"时"+minute+"分"+second+'秒'];

    };

    static getCurMonth(){
        let date = new Date();
        return date.getMonth() + 1;
    };

}