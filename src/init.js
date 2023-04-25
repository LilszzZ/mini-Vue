//给vue增加init方法
import initState from "./initState"
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this //把Vue实例挂载到vm上
        vm.$options = options  //将用户的配置选择options挂载到实例vm上

        //初始化状态
        initState(vm)
    }
}
