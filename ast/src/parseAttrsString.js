export default function parseAttrString(str){
    let attrs = [], flag = null, key='', value='';
    // 遍历
    str = str.trim()
    for(let i=0;i<str.length;i++){
        // 属于引号
        if(str[i]==='"' || str[i]==="'"){
            // 开引号
            if(!flag){
                flag = str[i]
            }else if(flag === str[i]){
                // 闭引号
                attrs.push({key,value})
                flag = null;
                key = ''
                value = ''
            }else{
                // 该引号属于内容
                value+=str[i]
            }
        }else if(!flag){
            // 寻找key
            if(str[i] === '=' || str[i]===' '){
                continue;
            }
            key+=str[i];
        }else{
            // 寻找value
            value+=str[i]
        }
    }
    return attrs;
}
