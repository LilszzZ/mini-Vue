import Watcher from './observe/watcher.js'
import { createElementVNode, createTextVNode } from './vdom/index.js'
function createElm(vnode) {
    let { tag, data, children, text } = vnode
    if (typeof tag === 'string') {
        //通过vnode创建真实DOM
        vnode.el = document.createElement(tag)//将真实节点和虚拟节点对应起来

        patchProps(vnode.el, data)

        children.foreach(child => {
            vnode.el.appendChild(createElement(child))//递归渲染，把虚拟节点变为真实节点
        })
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
function patchProps(el, props) {
    for (let key in props) {
        if (key === 'style') {
            for (let styleName in props.style) {
                el.style[styleName] = props.style[styleName]
            }
        }
        else {
            el.setAttribute(key, props[key])
        }
    }
    el.setAttribute(key, props[key])
}
function patch(oldVNode, vnode) {
    const isRealElement = oldVNode.nodeType
    if (isRealElement) {
        const elm = isRealElement//获取真实元素
        const parentElm = elm.parentNode//拿到父元素
        parentElm.insertBefore(newElm, elm.nextSilibing)
        parentElm.removeChild(elm)//删除老节点

        createElm(vnode)
    } else {
        //diff算法
    }
}
export function initLifeCycle(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this
        const el = vm.$el
        //patch方法既有初始化的功能，又有更新的功能
        patch(el, vnode) //el：需要更新的节点。 vnode:要替换的部分
    }
    //_c('div',{},children)
    Vue.prototype._c = function () {
        return createElementVNode(this, ...arguments)
    }
    Vue.prototype._v = function () {
        return createTextVNode(this, ...arguments)
    }
    Vue.prototype._s = function (value) {
        return JSON.stringify(value)
    }
    Vue.prototype._render = function () {
        const vm = this
        return vm.$options._render.call(vm)//通过AST语法转义生成的render方法。
    }
}


export function mountComponent(vm, el) {
    //1调用render方法 生成虚拟DOM
    const updateComponent = () => {
        vm._update(vm._render)
    }
    new Watcher(vm, updateComponent, true)//true用于标识是一个渲染watcher
    //2根据虚拟DOM产生真实DOM




}
//Vue的核心流程：创建响应式数据，把模板转为AST语法树，将AST语法树转为render函数生成虚拟DOM。后续每次更新只执行render函数(无需再次执行ast转化的过程)
//render函数会产生虚拟节点(使用数据响应式)
//根据生成的虚拟节点产生真实DOM


//虚拟DOM --->真实DOM
/*在Vue中，虚拟DOM更新后如何同步到真实DOM上的过程如下：
首先，Vue会将新的虚拟DOM树（由render函数返回）和旧的虚拟DOM树进行比较，查找出两棵树之间的差异，这个过程称为diff算法。
diff算法会找出哪些DOM节点需要被添加、删除或更新，通过比较新旧虚拟DOM节点，判断是否需要创建新的DOM节点或者更新现有的DOM节点的属性和内容。
一旦找到了需要更新的DOM节点，Vue会调用patch函数进行节点的更新。patch函数会根据需要执行创建新的DOM节点、删除节点、更新节点属性等操作，从而将更新同步到实际的DOM树上。
当所有的节点都更新完毕后，Vue会触发updated钩子函数，通知我们组件的状态已经被更新，接着我们可以做一些处理。
总之，Vue通过比较新旧虚拟DOM树之间的差异，并将更新同步到实际的DOM树上，从而实现了更新页面的目的。同时，Vue还针对不同的浏览器和平台对DOM操作进行了优化，从而提高了页面渲染的效率。*/