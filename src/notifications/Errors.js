import React from 'react'


const Errors = (props) => {
  const { errors } = props
  return (
    <div>
      <ul>
        {errors.map(errors => (
          <li key={errors.time}>{errors.body}</li>
        ))}
      </ul>
    </div>
  )
}


export default Errors