import { useCallback } from 'react'

export const useMessage = () => useCallback(msg => {
  if (window.M && msg) {
    window.M.toast({ html: msg })
  }
}, [])
