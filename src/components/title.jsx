import React from 'react';

const Title = ({title, subtitle}) => {
    return (
        <div className="title-component">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    )
}

export default Title;