import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widgets/widgets'

export const Home = () => {
    return (
        <div className='home'>Home
            <Navbar />
            <div className='homeContainer'>container</div>
            <div className='widgets'>widgets
                <Widget type="user" />
                <Widget type="calendar" />
                <Widget type="goals" />
                <Widget type="remaining" />
            </div>
        </div>

    )
}
