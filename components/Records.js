import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Record from './Record'

export default function Records(props) {
    const [data, setData] = useState()

    useEffect(() => {
    }, [props.data])

    if (props.data) {

        let lastRecords = props.data.slice(0, 5);
        return (
            <div className="flex flex-col">
                <h3 className="title mb-2">Last 5 records</h3>
                <div className="">
                    {lastRecords.map((record, i) => {
                        return (
                            <Record data={record} key={i} />
                        )
                    })}
                </div>
                <Link href="/edit">
                    <div className="box text-center font-bold text-sm text-gray-500 hover:text-gray-600 cursor-pointer transition">
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
