
export function createElementVNode(vm, tag, data = {}, ...children) {
    //创建Vnode虚拟DOM
    //key是为了diff算法准备的
    let key = data.key
    if (key) {
        delete data.key
    }
    return (vm, tag, key, data, children)
}

export function createTextVNode() {
    //文本节点
    return (undefined, undefined, undefined, undefined, undefined, text)
}
//返回的很像AST,AST是干什么的？AST是语法层面的
function vnode(vm, tag, key, data, children, text) {
    return {
        vm, tag, key, data, children, text
    }
}