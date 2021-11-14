import {Scanner} from "./Scanner.js";
import {nextTokens} from "./nextTokens.js";
// 把模板字符串转换为tokens数组
function parse(str){
    // 实例化一个扫描器
    let scanner = new Scanner(str);
    let tokens = []
    let i = 0;
    while(scanner.pos <= str.length){
        i++
        let word = scanner.scanUtil('{{')
        if(word!==''){
            tokens.push(['text',word])
        }else{
            tokens.push(['text',scanner.tail])
            break;
        }
        scanner.scan('{{')
        let key = scanner.scanUtil('}}')
        if(key!==''){
            // #
            if(key[0] === '#'){
                tokens.push(['#',key.substr(1)])
            }else if(key[0] === '/'){
                tokens.push(['/',key.substr(1)])
            }else{
                tokens.push(['key',key])
            }
        }
        scanner.scan('}}')
    }
    return  nextTokens(tokens)
}

export {parse}
