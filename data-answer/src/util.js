function def(obj,key,value,enumerable){
    Object.defineProperty(obj,key,{
        value,
        enumerable,
        writable:true,
        configurable:true
    })
}
// todo 用于获取数据的嵌套数据 例如a.b.c.d ;获取到d的数据
function parsePath(expression){
    let segments = expression.split('.');
    return obj => {
        for(let i=0;i<segments.length;i++){
            if(!obj){
                return;
            }
            // todo 触发getter函数 也就是此刻进行依赖收集
            obj=obj[segments[i]]
        }
        return obj;
    }
}

function isObject(obj){
    return obj!==null && typeof obj === 'object'
}
export {def,isObject,parsePath}
