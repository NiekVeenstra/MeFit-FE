import React from 'react'
import Calendar from './Calendar'
import DaysLeft from './DaysLeft'

const GoalsInfo = () => {
    return (
        <div Style="border: solid 3px black; width: 700px;">GoalsInfo
            <div>How many goals this week</div>
            <div Style="border: solid 3px black; width: 250px;">Days left to complete your goals <DaysLeft /></div>
            <div><Calendar /></div>
        </div>
    )
}

export default GoalsInfo