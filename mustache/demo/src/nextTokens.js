function nextTokens(tokens){
    let nextTokens = []; // 描述页面结构 包括页面信息的数组（抽象语法树）
    let stack = []; // 栈 临时存储
    let collect = nextTokens; // 信息收集器
    // 指向会改变，由最外层逐渐指向最内层(#,/),最后由最内层递进指向最外层
    tokens.forEach((token) => {
        if(token[0]==='#'){
            // 先存储进收集器中(为了nextTokens结果存储到该token)
            collect.push(token)
            // 进栈
            stack.push(token)
            // token的第三个元素指向子元素！children
            // collect去收集内部依赖
            collect = token[2] = [];
        }else if(token[0]==='/'){
            stack.pop();
            // 内层收集完，去次一层或者最外层
            collect = stack.length?stack[stack.length-1][2]:nextTokens;
        }else{
            collect.push(token)
        }
    })
    return nextTokens
}

export {nextTokens}
