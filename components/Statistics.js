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
                <h3>Statistics</h3>
                <div className="boxes boxes__two">
                    <div className="box">
                        <span className="box__title">{startWeight} kg</span>
                        <span className="box__subtitle">Start weight</span>
                    </div>
                    <div className="box__icon">
                        <FaAngleDoubleRight />
                    </div>
                    <div className="box">
                        <span className="box__title">{currentWeight} kg</span>
                        <span className="box__subtitle">Current weight</span>
                    </div>
                </div>
                <div className="boxes boxes__three">
                    <div className="box">
                        <span className="box__title">{allLostWeight.toFixed(1)} kg</span>
                        <span className="box__subtitle">Weight lost over-all</span>
                    </div>
                    <div className="box">
                        <span className="box__title">{lostWeightWeek.toFixed(1)} kg</span>
                        <span className="box__subtitle">Weight lost last week</span>
                    </div>
                    <div className="box">
                        <span className="box__title">{props.data.length}</span>
                        <span className="box__subtitle">Days of logging weight</span>
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