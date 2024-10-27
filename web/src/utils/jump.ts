import router from '@/router/index'
import type { ResMenuItem } from '@/model'
export default (data: Partial<ResMenuItem>) => {
  const { type, address, openType } = data
  switch (type) {
    case 'front':
      if (openType == '_self') {
        router.push({
          path: address,
          query:{
            menuId:data.id
          }
        })
      } else if (openType == '_blank') {
        window.open(address, '_blank')
      }
      break
    case 'iframe':
      router.push({
        path: '/apply/iframe',
        query: {
          id: encodeURIComponent(address!),
          menuId:data.id
        }
      })
      break
    default:
      break
  }
}
