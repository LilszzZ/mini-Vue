class Observe {
    constructor(data) {
        //Object.defineProperty只能劫持已经存在的属性(Vue因此单独写了一些api $set $delete)
        this.walk(data)
    }
    walk(data) { //循环对象，对属性依次劫持
        Object.keys(data).forEach(key =>
            defineReactive(data, key, data[key])
        )
    }
}
export function defineReactive(target, key, value) {
    Object.defineProperties(target, key, {
        get() {
            //取值的时候执行get
            return value
        },
        set(newValue) {
            //修改的时候执行set方法
            if (newValue == value) return
            value = newValue
        }
    })
}
export function observe(data) {
    console.log(data)
    //对这个对象进行劫持
    if (typeof data !== 'object' || data == null) {
        return
    }
    //如果一个对象被劫持过了，那就不需要再被劫持了。(要判断一个对象是否被劫持给,可以增添一个实例。用来判断是否被劫持过)
    return new Observe(data)

}