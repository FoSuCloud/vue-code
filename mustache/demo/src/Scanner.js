export  class Scanner{
    str = ''; // 字符串
    pos = 0; // 指针
    tail = ''; // 尾巴
    constructor(str) {
        this.str = str;
        this.tail = str;
    }
    // 扫描
    scan(tag){
        if(!this.tail.includes(tag)){
            return ;
        }
        if(this.tail.indexOf(tag)===0){
            this.pos+=2;
            this.tail = this.str.substring(this.pos,this.str.length)
        }
    }
    // 扫描工具，匹配扫描内容
    scanUtil(stopTag){
        if(!this.tail.includes(stopTag)){
            return  ''
        }
        let start = this.pos;
        while(this.tail.indexOf(stopTag)!==0){
            this.pos++;
            this.tail = this.str.substring(this.pos,this.str.length)
        }
        return this.str.substring(start,this.pos)
    }
}
