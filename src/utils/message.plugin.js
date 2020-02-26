import localize from '../filters/localize.filter'
export default {
  install(Vue, options) {
    Vue.prototype.$message = function(text) {
      M.toast({ html: text })
    }
    Vue.prototype.$error = function(text) {
      M.toast({ html: `[${localize('Error')}]: ${text}` })
    }
  }
}
