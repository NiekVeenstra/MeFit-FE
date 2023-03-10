import React from 'react'
import Calendar from './Calendar'
import DaysLeft from './DaysLeft'

const GoalsInfo = () => {
    return (
        <div>GoalsInfo
            <div>How many goals this week</div>
            <div>Count down days left<DaysLeft /></div>
            <div><Calendar /></div>
        </div>
    )
}

export default GoalsInfo