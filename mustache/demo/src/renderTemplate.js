function renderTemplate(tokens,data){
    let str = ''
    tokens.forEach((token)=>{
        if(token[0]==='text'){
            str+=token[1]
        }else if(token[0]==='key'){
            // . 表示是当前值
            if(token[1] === '.'){
                str+=data
            }else{
                // 可能是a.b.c这种形式 ， 需要递进查找
                str+=lookup(token[1],data)
            }
        }else if(token[0]==='#'){
            // 数组
            str+=data[token[1]].reduce((a,b)=>{
                // 数组元素逐个遍历 并递增，传递token结构，对应元素的值
                return a+renderTemplate(token[2],b)
            },'')
        }
    })
    return str;
}

function lookup(str,data){
    let keyList = str.split('.')
    if(!keyList || !keyList.length){
        console.error('throw error')
        return ''
    }
    let value = data;
    for(let key of keyList){
        if(Object.prototype.hasOwnProperty.call(value,key)){
            value = value[key]
        }else{
            console.error('throw error')
        }
    }
    return value

}

export {renderTemplate}
