import React, { useState, useEffect } from 'react';

const Clock = () => {

    const [currDate, setCurrDate] = useState(new Date().toDateString());
    const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setInterval(() => {
            setCurrDate(new Date().toDateString());
        }, 1 * 1000);
        return function cleanup() {
            clearInterval();
        };
    });

    useEffect(() => {
        setInterval(() => {
            setCurrTime(new Date().toLocaleTimeString());
        }, 1 * 1000);
        return function cleanup() {
            clearInterval();
        };
    });

    return (
        <div>
            <>
                {currDate}
            </>
            <br />
            <>
                {currTime}
            </>
            <br />
        </div>
    );
}

export default Clock;