import React, { useEffect, useState } from 'react'
import dayjs from "dayjs"
require('dayjs/locale/sl')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
import { FaAngleDoubleRight } from 'react-icons/fa';

export default function Statistics(props) {
    const [startWeight, setStartWeight] = useState();
    const [currentWeight, setCurrentWeight] = useState();
    const [allLostWeight, setAllLostWeight] = useState();
    const [lostWeightWeek, setLostWeightWeek] = useState();

    function getLostWeight() {
        let newItems = [];
        for (var i = props.data.length - 1; i >= 0; i--) {
            if ((dayjs(props.data[i].created_at).isBetween(dayjs().subtract(7, 'day'), dayjs()))) {
                newItems.push(props.data[i])
            }
        }
        setLostWeightWeek(newItems[0].weight - [...newItems].pop().weight)
    }
    function getAllLostWeight() {
        setAllLostWeight([...props.data].pop().weight - props.data[0].weight)
    }

    function getStartWeight() {
        setStartWeight([...props.data].pop().weight)
    }

    function getCurrentWeight() {
        setCurrentWeight(props.data[0].weight)
    }

    useEffect(() => {
        getLostWeight()
        getAllLostWeight()
        getStartWeight()
        getCurrentWeight()
    }, [props])

    if (lostWeightWeek && allLostWeight && startWeight && currentWeight) {
        return (
            <>
                <h3 className="title mb-2">Statistics</h3>
                <div className="flex flex-row mb-4 relative">
                    <div className="box w-1/2 mr-2 flex flex-col text-center">
                        <span className="font-bold text-base mb-1">{startWeight} kg</span>
                        <span className="text-xs text-gray-500">Start weight</span>
                    </div>
                    <div className="absolute inset-x-1/2 inset-y-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-sm">
                        <FaAngleDoubleRight />
                    </div>
                    <div className="box w-1/2 ml-2 flex flex-col text-center">
                        <span className="font-bold text-base mb-1">{currentWeight} kg</span>
                        <span className="text-xs text-gray-500">Current weight</span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row mb-6">
                    <div className="box w-full lg:w-1/3 flex items-center justify-center">
                        <div className="flex flex-col text-center py-3">
                            <span className="font-bold text-2xl mb-1">{allLostWeight.toFixed(1)} kg</span>
                            <span className="text-xs text-gray-500">Weight lost over-all</span>
                        </div>
                    </div>
                    <div className="box w-full lg:w-1/3 mx-0 lg:mx-4 my-4 lg:my-0 flex items-center justify-center">
                        <div className="flex flex-col text-center py-3">
                            <span className="font-bold text-2xl mb-1">{lostWeightWeek.toFixed(1)} kg</span>
                            <span className="text-xs text-gray-500">Weight lost since last week</span>
                        </div>
                    </div>
                    <div className="box w-full lg:w-1/3 flex items-center justify-center">
                        <div className="flex flex-col text-center py-3">
                            <span className="font-bold text-2xl mb-1">{props.data.length}</span>
                            <span className="text-xs text-gray-500">Days of logging weight</span>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h3>Statistics</h3>
                <div className="boxes">
                    <div className="box">
                        <span className="box__title">0 kg</span>
                        <span className="box__subtitle">Weight lost last week</span>
                    </div>
                </div>
            </>
        )

    }
}