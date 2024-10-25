import { useSystemStore } from "@/stores/system"
import type { DirectiveBinding } from 'vue'
import { storeToRefs } from "pinia"
const permission ={
    name:'has-perm',
    options:{
        beforeMount(el:HTMLElement, binding:DirectiveBinding) {
            const systemStore = useSystemStore()
            const { permissionInfo } = storeToRefs(systemStore)
            if (!permissionInfo.value.includes(binding.value) && !permissionInfo.value.includes('*')) {
                el.style.display = 'none'
            }
        },

    }
}
export default permission