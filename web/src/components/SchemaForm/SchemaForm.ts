import { h, toRefs, ref, inject } from 'vue'
import type { Prop } from 'vue'
import type { SchemaProperties, ControlType, Schema, SchemaLayout, FormFieldInfo } from './ISchema'
import type { Obj } from '@/model'
import {
  Input,
  Select,
  Form,
  FormItem,
  InputNumber,
  DatePicker,
  TreeSelect,
  RadioButton,
  RadioGroup,
  type RadioChangeEvent,
  Switch,
  Textarea
} from 'ant-design-vue'
import { compileText, execFun } from './core'
import { getDeepValue, setDeepValue } from '@/utils/tools'
import { GuPubSub } from 'gaius-utils'
import { defineExpose } from 'vue'
import { cloneDeep } from 'lodash-es'
const createUIControl = (
  formData: Obj<any>,
  key: string,
  type: ControlType,
  ctx: any,
  component?: Obj<any>
) => {
  let Node
  switch (type) {
    case 'string':
      Node = h(Input, {
        ...component,
        value: getDeepValue(formData, key),
        onChange: (e: Event) => {
          setDeepValue(formData, key, (e.target as HTMLInputElement).value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({
            formData: formData,
            field: key,
            value: (e.target as HTMLInputElement).value
          })
        }
      })
      break
    case 'textarea':
      Node = h(Textarea, {
        ...component,
        value: getDeepValue(formData, key),
        onChange: (e: Event) => {
          setDeepValue(formData, key, (e.target as HTMLInputElement).value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({
            formData: formData,
            field: key,
            value: (e.target as HTMLInputElement).value
          })
        }
      })
      break
    case 'select':
      Node = h(Select, {
        ...component,
        options: ctx.options[key] || [],
        value: getDeepValue(formData, key),
        onChange: (value: any) => {
          setDeepValue(formData, key, value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({ formData: formData, field: key, value: value })
        }
      })
      break
    case 'number':
      Node = h(InputNumber, {
        ...component,
        value: getDeepValue(formData, key),
        onChange: (value: any) => {
          setDeepValue(formData, key, value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({ formData: formData, field: key, value: value })
        }
      })
      break
    case 'date':
      Node = h(DatePicker, {
        ...component,
        value: getDeepValue(formData, key),
        onChange: (value: any) => {
          setDeepValue(formData, key, value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({ formData: formData, field: key, value: value })
        }
      })

      break
    case 'tree':
      Node = h(TreeSelect, {
        ...component,
        options: ctx.options[key] || [],
        value: getDeepValue(formData, key),
        onChange: (value: any) => {
          setDeepValue(formData, key, value)
          ctx.onChange({ formData: formData, field: key, value: value })
        }
      })
      break
    case 'radio':
      Node = h(
        RadioGroup,
        {
          ...component,
          value: getDeepValue(formData, key),
          onChange: (e: RadioChangeEvent) => {
            setDeepValue(formData, key, e.target!.value)
            ctx.pubSub.onPublish(key)
            ctx.onChange({ formData: formData, field: key, value: e.target!.value })
          }
        },
        {
          default: () =>
            (ctx.options[key] || []).map((item: any) => {
              return h(
                RadioButton,
                {
                  value: item.value,
                  key: item.value
                },
                {
                  default: () => item.label
                }
              )
            })
        }
      )
      break
    case 'switch':
      Node = h(Switch, {
        checked: getDeepValue(formData, key),
        onChange(value: any) {
          setDeepValue(formData, key, value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({ formData: formData, field: key, value: value })
        }
      })
      break
    default:
      Node = h(Input, {
        ...component,
        value: getDeepValue(formData, key),
        onChange: (e: Event) => {
          setDeepValue(formData, key, (e.target as HTMLInputElement).value)
          ctx.pubSub.onPublish(key)
          ctx.onChange({
            formData: formData,
            field: key,
            value: (e.target as HTMLInputElement).value
          })
        }
      })
      break
  }
  return Node
}

const createSchemaFormItem = (
  formData: Obj<any>,
  key: string,
  prop: SchemaProperties,
  ctx: any
) => {
  const { type, label, component, rules, tooltip } = prop
  let childrenNode
  if (component?.name) {
    const { name } = component
    const itemProps = cloneDeep(component)
    Reflect.deleteProperty(itemProps, 'onChange')
    if (!ctx.sfProvideEL[name]) {
      throw new Error(`${name} is not registered,provide('sfProvideEL','${name}',Component)`)
    }
    childrenNode = h(ctx.sfProvideEL[name], {
      ...itemProps,
      formData,
      value: getDeepValue(formData, key),
      onChange: (value: any) => {
        formData[key] = value
        setDeepValue(formData, key, value)
        if (component.onChange) {
          try {
            component.onChange(value, formData, key)
          } catch (error: any) {
            throw new Error(error)
          }
        }
      }
    })
  } else {
    childrenNode = createUIControl(formData, key, type, ctx, component)
  }
  return (
    ctx.visibleInfo[key] &&
    h(
      FormItem,
      {
        label,
        name: key,
        rules,
        tooltip
      },
      {
        default: () => [childrenNode]
      }
    )
  )
}

const SchemaForm = {
  name: 'SchemaForm',
  props: {
    layout: {
      type: Object as Prop<SchemaLayout>
    },
    properties: {
      type: Object as Prop<SchemaProperties>
    },
    formData: {
      type: Object as Prop<Obj<any>>,
      required: true
    }
  },
  setup(props: Schema) {
    const { layout, properties, formData } = toRefs(props)
    const sfProvideEL = inject('sfProvideEL')
    const options = ref<Obj<any>>({})
    const linkData = Object.entries(properties.value).filter(([, propItem]) => {
      return propItem?.component?.dataSource || propItem?.component?.asyncData
    })
    const getOptions = async (key: string, propItem: SchemaProperties) => {
      const { dataSource, asyncData } = propItem.component!
      if (dataSource) {
        options.value[key] = dataSource
      } else {
        options.value[key] = await asyncData!(formData!.value!, key)
      }
    }
    linkData.map(async ([key, propItem]) => {
      await getOptions(key, propItem)
    })
    /**
     * 用于刷新对应formItem的下拉数据
     * @param key  字段名称
     */
    const refreshOption = (key: string) => {
      const [pKey, propItem] = Object.entries(properties.value).find(([propKey]) => key == propKey)!
      if (propItem) {
        getOptions(pKey, propItem)
      }
    }
    const pubSub = new GuPubSub()
    const onChange = (data: FormFieldInfo) => {
      const { field } = data
      const changeFn = properties.value[field]?.component?.onChange
      if (changeFn) {
        changeFn(data)
      }
    }
    const expose = defineExpose({
      refreshOption
    })
    const setVisibleInfo = () => {
      Object.entries(properties.value).map(([key, propItem]) => {
        if (typeof propItem.show == 'undefined') {
          visibleInfo.value[key] = true
        } else if (typeof propItem.show == 'boolean') {
          visibleInfo.value[key] = propItem.show
        } else if (typeof propItem.show == 'string') {
          const showStr = propItem.show as string
          visibleInfo.value[key] = execFun(showStr, formData!.value!)
          const depend = compileText(showStr)
          depend.map((dependKey) => {
            pubSub.onSubscribe(dependKey, () => {
              visibleInfo.value[key] = execFun(showStr, formData!.value!)
            })
          })
        }
      })
    }
    const visibleInfo = ref<Obj<boolean>>({})
    setVisibleInfo()
    return {
      layout,
      properties,
      refreshOption,
      formData,
      options,
      visibleInfo,
      pubSub,
      sfProvideEL,
      onChange,
      expose
    }
  },
  render: (ctx: any) => {
    return h(
      Form,
      { ...ctx.layout },
      {
        default: () => [
          ...Object.entries(ctx.properties as Obj<SchemaProperties>).map(
            ([key, propItem]: [string, SchemaProperties]) =>
              createSchemaFormItem(ctx.formData, key, propItem, ctx)
          )
        ]
      }
    )
  }
}
export default SchemaForm
