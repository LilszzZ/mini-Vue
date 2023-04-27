let id = 0
class Dep {
    constructor() {
        this.id = id++ //
        this.subs = [] //这里存放着当前属性对应的watcher有哪些
    }
    depend() {
        //不需要放重复的wathcer,现在简单的push是一个单向过程。subs去收集watcher,希望是一个双向的
        this.subs.push(Dep.target)
        //让wathcer记住当前的dep;Dep.target是watcher。watcher收集dep
        Dep.target.addDep(this)
        //dep和watcher是多对多的关系
    }
    notify() {
        this.subs.forEach(watcher => {
            watcher.update() //告诉watcher要更新
        })
    }
}