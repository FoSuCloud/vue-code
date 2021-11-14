import parseAttrString from './parseAttrsString.js'
export default function parse (templateString) {
    // 考虑到h1-6
    let start = /^\<([a-z]+[1-6]?)(\s*[^\>]*)?\>/
    let end = /^\<\/([a-z]+[1-6]?)\>/
    // let single = /^\<([a-z]+[1-6]?)(\s*[^\\]*)?\/\>/
    let content = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/
    let tagStack = [];
    // 1. 开始标签
    // 2. 结束标签
    // 3. 自闭合标签
    // 4. 标签内容区域
    let rest = templateString;
    let astStack = []
    while(rest.length){
        if(start.test(rest)){
            let attrList = rest.match(start)
            // 其他属性 从下标2开始, id,class...
            tagStack.push(attrList[1])
            // 存储node节点
            if(attrList.length>2 && attrList[2]){
                astStack.push({tag:attrList[1],attr:parseAttrString(attrList[2]),children:[]})
            }else{
                astStack.push({tag:attrList[1],children:[]})
            }
            // todo +2是因为 符号< >占两位
            rest = rest.substring(attrList[1].length+2+(attrList[2]?attrList[2].length:0))
        }else if(end.test(rest)){
            let tag = rest.match(end)[1]
            if(tag === tagStack[tagStack.length-1]){
                tagStack.pop()
                if(astStack.length>=2){
                    // 把当前节点内容放进父节点
                    let last  = astStack.pop()
                    astStack[astStack.length-1].children.push(last)
                }
            }
            rest = rest.substring(tag.length+3)
        }
        // else if(single.test(rest)){
        //     // 自闭合标签先不处理
        //     let attr = rest.match(single)[1]
        //     tagStack.push(attr)
        //     rest = rest.substring(attr.length+3)
        // }
        else{
            // todo 注意，这种文字检测方式不对。。只能检测到特定几种情况的文字
            let word = rest.match(content)
            if(word && word.length>=2){
                // 文本节点放入父节点中
                if(astStack.length){
                    astStack[astStack.length-1].children.push({value:word[1],type:3})
                }else{
                    astStack.push({value:word[1],type:3})
                }
            }
            rest = rest.substring((word&&word.length>=2)?word[1].length:1)
        }
        rest = rest.trim()
    }
    return astStack;
}
