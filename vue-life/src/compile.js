import Watcher from "./Watcher";

export class Compile{
    constructor(el,vue) {
        // vue实例
        this.$vue = vue;
        this.$el = document.querySelector(el)
        if(this.$el){
            // 调用函数 让节点变为fragment 类似mustache中的tokens
            // 实际上用的是ast,这里是轻量级的fragment
            let $fragment = this.node2Fragment(this.$el)
            // 编译
            this.compile($fragment)
            // 把编译好的内容上溯
            this.$el.appendChild($fragment)
        }
    }
    /*
    * node转换为fragment
    * */
    node2Fragment(el){
        // createDocumentFragment 创建一个新的空文档片段
        let fragment = document.createDocumentFragment()
        let child;
        // 判断是否具有子节点
        // 通过   while让所有的子节点都可以进入fragment,否则只使用if判断会只有一个节点。
        while(child = el.firstChild){
            fragment.appendChild(child)
        }
        // 所有document进入fragment之后 视图中就消失了对应的document元素了！
        return fragment
    }
    /*
    * 编译
    * */
    compile(fragment){
        let childNodes = fragment.childNodes;
        let reg=/\{\{(.*)\}\}/
        childNodes.forEach((node)=>{
            let text = node.textContent;
            if(node.nodeType===1){
                // 元素节点
                this.compileElement(node)
            }else if(node.nodeType === 3){
                // 文本节点
                if(reg.test(text)){
                    this.compileText(node, text.match(reg)[1])
                }
            }
        })
    }
    /*
    * 编译元素节点
    * */
    compileElement(node){
        // todo 方便之处在于将HTML结构看成属性列表对象，而不是字符串！
        let nodeAttrs = node.attributes;
        // 类数组对象变为数组
        Array.prototype.slice.call(nodeAttrs).forEach((attr) => {
            // todo 分析指令！
            let {value,name} = attr;
            let suffix = name.substring(0,2) // 前缀
            let preffix = name.substring(2) // 后缀
            if(suffix !== 'v-'){
                return;
            }
            if(preffix ==='if'){
                console.log(preffix,value)
            }else if(preffix === 'model'){
                new Watcher(this.$vue, value, value => {
                    node.value = value;
                })
                let v = this.getVueVal(this.$vue,value)
                node.value = v;

                node.addEventListener('input',(e)=>{
                    let newVal = e.target.value
                    this.setVueVal(this.$vue,value,newVal)
                    node.value = newVal
                })
            }
        })
        console.log(nodeAttrs)
    }
    /*
    * 编译文本节点
    * */
    compileText(node,text){
        let value = this.getVueVal(this.$vue,text)
        node.textContent = value;
        new Watcher(this.$vue,text,newVal => {
            node.textContent = newVal;
        })
    }
    /*
     * 获取对应的模板渲染值
     * */
    getVueVal(vue,exp){
        let val = vue;
        exp = exp.split('.')
        exp.forEach((key) => {
            val = val[key]
        })
        return val;
    }
    /*
    * 设置对应的vue 值
    * */
    setVueVal(vue,exp,value){
        let val = vue;
        exp = exp.split('.')
        exp.forEach((cell,i) => {
            if(i<exp.length-1){
                val = val[cell]
            }else{
                // 给最后一层对象赋值
                val[cell] = value
            }
        })
    }
}
