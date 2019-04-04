/**
 * FlatList 的数据模型基类
 * 对于基要展示的所有数据均扩展此类
 */

import ModelType from './ModelType';

export default class BaseModel{

    /**
     * 子类需要扩展本接口
     * @returns {string}
     */
    getItemType(){

        return ModelType.default;
    };


}