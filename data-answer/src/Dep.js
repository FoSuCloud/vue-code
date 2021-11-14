let uid = 0;

export default class Dep{
    constructor() {
        // 存储自己的订阅者，也就是watcher实例
        this.subs = [];
        // 每个依赖都要有一个uid
        this.id=uid++;
    }
    // 添加依赖，也就是添加watcher
    addSub(sub){
        this.subs.push(sub)
    }
    // 添加依赖
    depend(){
        // Dep.target是一个全局的位置，例如window.target
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }
    // 遍历通知该dep的依赖
    notify(){
        console.log('notify')
        let subs = this.subs.slice()
        subs.forEach(sub => {
            // todo sub其实就是watcher实例本身! 所以其实就是通知watcher去更新
            sub.update();
        })
    }
}

// todo 全局唯一的一个依赖收集位置表示
Dep.target = null;
