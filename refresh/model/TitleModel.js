

/**
 * 标题文本
 */
import BaseModel from './BaseModel'
import ModelType from "./ModelType";
export default class TitleModel extends BaseModel{

    constructor(){
        super();
        this.titleContent = '';
    };

    getItemType(){
        return ModelType.Title;
    };
}