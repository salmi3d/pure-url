import React from 'react'
import { Link } from 'react-router-dom'


export const LinksList = ({ links }) => {
  if (links.length === 0) {
    return <p className="center">There is no links yet</p>
  }

  return (
    <table className="striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Origin link</th>
          <th>Short link</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td><Link to={`/detail/${link._id}`}>show</Link></td>
            </tr>
          )
        })}

      </tbody>
    </table>
  )
}
