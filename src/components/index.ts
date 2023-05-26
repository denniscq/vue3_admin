/**
 * @deprecated global component register
 */
import { App, Component } from 'vue'
import svgIcon from './icon/svgIcon.vue'

const allGlobalComponent: { [key: string]: Component } = { svgIcon }
export default {
  install(app: App<Element>) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
