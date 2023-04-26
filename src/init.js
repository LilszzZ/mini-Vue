//给vue增加init方法
import initState from "./initState"
import { compileToFunction } from './compile/index.js'
import { mountComponent } from "./lifecycle"
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this //把Vue实例挂载到vm上
        vm.$options = options  //将用户的配置选择options挂载到实例vm上

        //初始化状态
        initState(vm)
        //解析模板参数 将template模板转为render函数。
        if (options.el) {
            //传入的有el就需要挂载
            vm.$mount(options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this
        el = document.querySelector(el)
        let opts = vm.$options
        //没有render函数
        if (!opts.render) {
            //没有template模板,但是写了el
            if (!opts.template && el) {
                let template = el.outerHTML
            } else {
                if (el) {
                    template == opts.template
                }
            }
            if (template && el) {
                const render = compileToFunction(template)
                opts.render = render
            }
        }
        mountComponent(vm, el) //组件挂载
    }
}
