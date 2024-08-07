import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import { uninstallPreLoad } from './utils/tools'
import CodeEditor from './components/CodeEditor.vue'
import ColorPicker from './components/ColorPicker.vue'
import ImagePicker from './components/ImagePicker.vue'
import registerSFEl from './components/SchemaForm/registerSFEl'
import './assets/iconfont/iconfont.css'
import GEchart from '@/components/GEchart/GEchart.vue'
import VisualGroup from '@/components/VisualGroup/VisualGroup.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(registerSFEl,{
    'code-editor':CodeEditor,
    'color-picker':ColorPicker,
    'image-picker':ImagePicker
})
app.component('GEchart',GEchart)
app.component('VisualGroup',VisualGroup)
app.mount('#app')
uninstallPreLoad()
