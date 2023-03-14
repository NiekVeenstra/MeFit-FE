import React from 'react'

const Detail = ({exerciseDetail}) => {
  const { bodyPart, gifUrl, name, target, equipment} = exerciseDetail;

  const extraDetail = [
    {
        name: bodyPart
    },
    {
        name: target
    },
    {
        name: equipment
    }
  ]

  return (
    <div>
        <img src={gifUrl} alt={name} loading="lazy" />
        <div>
            <h1>{name}</h1>
            <p>
                Exercises keep you strong. {name} is one of the best exercises to target your {target}. It will help you improve your mood and gain energy.
            </p>
            {extraDetail.map((item, index) => (
                <div key={index}>
                    <h3>{item.name}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Detail