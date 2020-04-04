import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const [link, setLink] = useState('')
  const { request } = useHttp()
  const auth = useContext(AuthContext)
  const history = useHistory()

  const pressHandler = async event => {
    if (event.key !== 'Enter') {
      return
    }
    try {
      const data = await request('/api/link/generate', 'POST', { from: link }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detail/${data.link._id}`)
    } catch (e) { }
  }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input placeholder="Link" id="link" type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Paste the link</label>
        </div>
      </div>
    </div>
  )
}
