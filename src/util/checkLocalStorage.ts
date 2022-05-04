export function checkLocalStorage(key:string) {
    let keyValue: string =''
    try {
      if (typeof localStorage !== 'undefined') {
        keyValue = localStorage.getItem(key)
          ? JSON.parse(localStorage.getItem(key) || '')
          : ''
      }
    } catch (e:any) {
      console.log('error ', e)
    }
    return keyValue
  }
  