import Dep from './dep.js'
let id = 0
//Dep收集的流程
//1.当我们创建渲染Watcher的时候我们把当前的渲染Watcher放到Dep.target上。
//2.调用_render()会取值 走到get上


//每一个属性有一个dep(属性是被观察者),watcher是观察者(属性变化了会通知观察者更新) =>观察者模式
class Watcher(){//不同组件有不同的watcher
    constructor(vm, fn){
        //fn是vm._update(vm._render)
        this.id = id++
        this.getter = fn; //getter意味着调用这个函数可以发生取值操作
        //当new Watcher就执行contructor中的代码，get就会执行。
        this.get()
        this.deps = [] //后续实现computed需要
        this.depsId = new Set() //用于去重
    }
    addDep(dep){//一个组件对应多个属性，重复的属性也不用去记录
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.push(id)
            dep.addSub(this)//watcher已经记住了dep,此时让dep也记住watcher
        }
    }
    get(){
        Dep.target = this //静态属性只有一份
        this.getter()//会去vm上取值 vm._update(vm._render)
        Dep.target = null //渲染完后清空
    }
    update(){
        this.get()//重新渲染
    }
}

//需要给每个属性增加一个dep，目的就是收集watcher

//一个组件中有多少个属性就有多少dep,n个dep对应一个watcher
//一个属性对应着多个组件， 一个dep对应多个watcher
//多对多的关系
//例如：vuex中有一个name属性。在多个组件中都用到了这个name属性。那么这个name属性就对应多个watcher

export default Watcher