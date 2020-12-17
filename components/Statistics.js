import React, { useEffect, useState } from 'react'
import dayjs from "dayjs"
require('dayjs/locale/sl')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
import { FaAngleDoubleRight } from 'react-icons/fa';
var classNames = require('classnames');

export default function Statistics(props) {
    const [startWeight, setStartWeight] = useState();
    const [currentWeight, setCurrentWeight] = useState();
    const [allLostWeight, setAllLostWeight] = useState();
    const [lostWeightWeek, setLostWeightWeek] = useState();
    const [bmi, setBmi] = useState({
        number: null,
        definition: ""
    })

    function getLostWeight() {
        let newItems = [];
        for (var i = props.data.length - 1; i >= 0; i--) {
            (dayjs(props.data[i].created_at).isBetween(dayjs().subtract(7, 'day'), dayjs()))
                newItems.push(props.data[i])
        }
        console.log(newItems[0].weight)
        console.log([...newItems].pop().weight)
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
        getBMI(props.data[0].weight, 184);
    }

    function getBMI(weight, height) {
        let num = Math.round(weight / Math.pow(height, 2) * 10000);
        let def = "";

        if (num < 18.5) {
            setBmi({
                number: num,
                definition: "Underweight"
            })
        }
        else if (num >= 18.5 && num <= 25) {
            setBmi({
                number: num,
                definition: "Normal"
            })

        }
        else if (num >= 25 && num <= 30) {
            setBmi({
                number: num,
                definition: "Obese"
            })
        }
        else if (num > 30) {
            setBmi({
                number: num,
                definition: "Overweight"
            })
        }
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
                <div className="flex flex-col md:flex-row mb-4 relative">
                    <div className="box w-full md:w-1/3 flex flex-col items-center justify-center">
                        <span className="font-bold text-base mb-1">{startWeight} kg</span>
                        <span className="text-xs text-gray-500">Start weight</span>
                    </div>
                    <div className="absolute inset-x-1/3 inset-y-1/2 transform -translate-x-1/3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-sm">
                        <FaAngleDoubleRight />
                    </div>
                    <div className="box w-full md:w-1/3 mx-0 md:mx-4 my-4 md:my-0 flex flex-col items-center justify-center">
                        <span className="font-bold text-base mb-1">{currentWeight} kg</span>
                        <span className="text-xs text-gray-500">Current weight</span>
                    </div>
                    <div className="box w-full md:w-1/3 flex flex-col items-center justify-center">
                        <span className="font-bold text-base mb-1">BMI: {bmi.number}</span>
                        <span className={
                            classNames(
                                'text-xs font-bold',
                                 {
                                    "text-grenn-500": bmi.number >= 18.5 && bmi.number <= 25,
                                    "text-yellow-600": bmi.number >= 25 && bmi.number <= 30,
                                    "text-red-500": bmi.number > 30,
                                })
                        }>{bmi.definition}</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mb-6">
                    <div className="box w-full md:w-1/3 flex items-center justify-center">
                        <div className="flex flex-col text-center py-3">
                            <span className="font-bold text-2xl mb-1">{allLostWeight.toFixed(1)} kg</span>
                            <span className="text-xs text-gray-500">Weight lost over-all</span>
                        </div>
                    </div>
                    <div className="box w-full md:w-1/3 mx-0 md:mx-4 my-4 md:my-0 flex items-center justify-center">
                        <div className="flex flex-col text-center py-3">
                            <span className="font-bold text-2xl mb-1">{lostWeightWeek.toFixed(1)} kg</span>
                            <span className="text-xs text-gray-500">Weight lost since last week</span>
                        </div>
                    </div>
                    <div className="box w-full md:w-1/3 flex items-center justify-center">
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