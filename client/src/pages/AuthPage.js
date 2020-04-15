import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
  const { loading, error, clearError, request } = useHttp()
  const message = useMessage()
  const auth = useContext(AuthContext)
  const [form, setForm] = useState({ email: '', password: '' })

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/user/register', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/user/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) { }
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center blue-grey-text">PURE URL</h1>
        <div className="card blue-grey darken-3">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input placeholder="Email" id="email" type="text" name="email" value={form.email} onChange={changeHandler} />
                <label htmlFor="email">Enter email</label>
              </div>
              <div className="input-field">
                <input placeholder="Password" id="password" type="password" name="password" value={form.password} onChange={changeHandler} />
                <label htmlFor="password">Enter password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn teal left"
              onClick={loginHandler}
              disabled={loading}
            >Sign IN</button>
            <button className="btn cyan right"
              onClick={registerHandler}
              disabled={loading}
            >Sign UP</button>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
