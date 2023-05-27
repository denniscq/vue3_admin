import { createApp } from 'vue'
import App from '@/App.vue'
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'

const app = createApp(App)

/**
 * @deprecated register global svg-icon customized component
 */
app.use(globalComponent)

app.mount('#app')