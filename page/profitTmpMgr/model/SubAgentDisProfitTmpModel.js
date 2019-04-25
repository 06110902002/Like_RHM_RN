import BaseModel from "../../../refresh/model/BaseModel";
import ModelType from "../../../refresh/model/ModelType";

/**
 * Created by 刘胡来
 * Date on 2019.04.23
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:下级代理分润数据模型
 */
export default class SubAgentDisProfitTmpModel extends BaseModel{

    constructor(){
        super();
        this.payAmount = '';
        this.frAmount = '';
        this.isdown = '';
        this.superCashReturnRule = '';
        this.newSuperCashReturnRule = '';
        this.status = '';
        this.newCashReturnRule = '';
        this.branchId = '';
        this.activateNum = '';
        this.cashReturnRule = '';
        this.branchName = '';
    };

    getItemType(){
        return ModelType.BellowBranchDisProfitTmp;
    };

}