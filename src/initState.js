import { observe } from "./observe/index.js"

function initState(vm) {
    const opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
}
function initData(vm) {
    let data = vm.$options.data //data可能是函数或对象
    typeof data == 'function' ? data.call(vm) : data
    // 
    vm._data = data
    observe(data)
    //把_data代理到vm.data上
    for (let key in data) {
        proxy(vm, '_data', key)
    }
}

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key]
        },
        set(newValue) {
            vm[target][key] = newValue
        }
    })
}


export default initState