import React, { useEffect, useState } from 'react'
import Record from './Record'

export default function Records(props) {
    const [data, setData] = useState()

    useEffect(() => {
        console.log(props.data)
    }, [props.data])

    if(props.data) {

        let lastRecords = props.data.slice(0, 5);
        return (
            <div className="records">
                <h3>Last added records</h3>
                {lastRecords.map((record, i) => {
                    return (
                        <Record data={record} key={i} />
                    )
                })}
            </div>
        )
    } else {
        return (
            <p>loading</p>
        )
    }
}
