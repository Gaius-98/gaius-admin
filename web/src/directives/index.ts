import permission from "./permission"
import type { App } from "vue"
import { copy } from 'gaius-utils'
import loading from "./loading"
const directives = [permission,copy,loading]
const install = (app:App) => {
    
    directives.map(directive =>{
        app.directive(directive.name, directive.options)
    })
}
export default install