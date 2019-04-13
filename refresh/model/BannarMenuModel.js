import BaseModel from "./BaseModel";
import ModelType from "./ModelType";

/**
 * Created by 刘胡来
 * DateUtils on 首页菜单中间的bannar图
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:
 */
export default class BannarMenuModel extends BaseModel{

    constructor(){
        super();
        this.bannarUrl = '';
    };

    getItemType(){
        return ModelType.BannarMenu;
    };
    
}