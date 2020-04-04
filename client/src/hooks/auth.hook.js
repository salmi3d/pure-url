import { useState, useCallback, useEffect } from 'react'

const STORAGE_NAME = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwt, id) => {
    setToken(jwt)
    setUserId(id)

    localStorage.setItem(STORAGE_NAME, JSON.stringify({ userId: id, token: jwt }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(STORAGE_NAME)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
    if (data && data.token && data.userId) {
      login(data.token, data.userId)
    }
  }, [login])

  return { login, logout, userId, token }
}
