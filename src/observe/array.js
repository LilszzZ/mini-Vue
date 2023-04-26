let oldArrayProto = Array.prototype
let newArrayProto = Object.create(oldArrayProto)

let methods = [
    //找出所有变异方法push,pop,shift,unshift,splice,reverse,sort
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort'
]
methods.forEach(method => {
    //
    newArrayProto[method] = function (...args) {
        //使用call方法使oldArrayProto中的方法在newArr中仍然存在
        const result = oldArrayProto[method].call(this, ...args)
        return result
    }
})

