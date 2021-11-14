import {parse} from "./Parse.js";
import {renderTemplate} from "./renderTemplate.js";

export class engine{
    render(str,data){
        /**
         * 流程：
         * parse 解析
         *       1。使用scan扫描 获取tokens二维数组
         *       2。nextTokens 组合tokens 生成抽象语法树(或者数组) 可以用来表示页面结构
         * */
        let tokens =  parse(str)
        // 把获取到的tokens语法树 渲染为DOM字符串
        let text = renderTemplate(tokens,data)
        return text;
    }
}
