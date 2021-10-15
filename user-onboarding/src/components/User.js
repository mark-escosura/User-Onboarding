import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Working fetching your User&apos;s details...</h3>
  }

  return (
    <div className='user container'>
      <h2>{details.name}</h2>
      <p>{details.email}</p>
      <p>{details.password}</p>
      <p>{details.terms}</p>
    </div>
  )
}

export default User;
