import { h, type DirectiveBinding,createApp } from 'vue'
import { Spin } from 'ant-design-vue'

const loadingFn = {
    render:(ctx:any)=>{
        return h(Spin)  
    }
} 
const createLoadingMask = () =>{
    const mask = document.createElement('div')
    Object.assign(mask.style,{
        position:'absolute',
        zIndex:2000,
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroudColor:'rgba(0,0,0,.2)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    })
    return mask
}
const mask = createLoadingMask()
const loadingComp = createApp(loadingFn)
loadingComp.mount(mask)
const loading ={
    name:'loading',
    options:{
        beforeMount(el:HTMLElement, binding:DirectiveBinding) {
            const {value,modifiers} = binding
            if(modifiers.fullscreen){
                el = document.body
            }else{
                el.setAttribute('old-position',el.style.position)
                el.style.position = 'relative'
            }
            if(value){
                el.appendChild(mask)
            }
        },
        update(el:HTMLElement, binding:DirectiveBinding){
            const {value,modifiers,} = binding
            if(modifiers.fullscreen){
                el = document.body
            }
            if(!value){
              const position =   el.getAttribute('old-position')
              if(position){
                el.style.position = position
              }else{
                Reflect.deleteProperty(el.style,'position')
              }
                el.removeChild(mask)
            }else{
                el.setAttribute('old-position',el.style.position)
                el.style.position = 'relative'
                el.appendChild(mask)
            }
        }

    }
}
export default loading