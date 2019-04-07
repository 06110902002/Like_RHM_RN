import BaseModel from "./BaseModel";
import ModelType from "./ModelType";

/**
 * Created by 刘胡来
 * Date on 2019.04.05
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 首页菜单项
 */
export default class HomeMenuItemModel extends BaseModel{


    constructor(){
        super();
        this.menuTxt = '菜单项-待定';
        this.menuIcon = 'url';
    };

    getItemType(){
        return ModelType.HomeFuncMenu;
    };
}