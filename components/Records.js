import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Record from './Record'

export default function Records(props) {
    const [data, setData] = useState()

    useEffect(() => {
    }, [props.data])

    if(props.data) {

        let lastRecords = props.data.slice(0, 5);
        return (
            <div className="records">
                <h3>Last 5 records</h3>
                {lastRecords.map((record, i) => {
                    return (
                        <Record data={record} key={i} />
                    )
                })}
                <Link href="/edit">
                    <div className="records__all box box__small">
                        All records
                    </div>
                </Link>
            </div>
        )
    } else {
        return (
            <p>loading</p>
        )
    }
}
