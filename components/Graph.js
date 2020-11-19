import { useState, setState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import dayjs from "dayjs"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Graph(props) {
  const [weights, setWeights] = useState();
  const [dates, setDates] = useState();
  const [selectedWeight, setSelectedWeight] = useState()
  const [selectedDates, setSelectedDates] = useState()
  const [selectedSpan, setSelectedSpan] = useState("all")

  function sortData() {
    let newWeights = [];
    for (var i = props.data.length - 1; i >= 0; i--) {
      newWeights.push(Object.values(props.data[i])[1])
    }
    setWeights(newWeights)
    setSelectedWeight(newWeights)

    let newDates = [];
    for (var i = props.data.length - 1; i >= 0; i--) {
      newDates.push(dayjs(Object.values(props.data[i])[2]).format("D. M."))
    }
    setDates(newDates)
    setSelectedDates(newDates)
  }


  useEffect(() => {
    sortData()
  }, [props.data])

  function selectData(event) {
    setSelectedSpan(event.target.value)
    let nW = weights;
    let nD = dates; 
    nW = nW.slice(- event.target.value);
    nD = nD.slice(- event.target.value);
    setSelectedWeight(nW)
    setSelectedDates(nD)
    console.log(nW)
  }

  if (selectedDates && selectedWeight) {
    const data = {
      labels: selectedDates,
      datasets: [{
        label: 'kg',
        data: selectedWeight,
        fill: true,
        lineTension: 0,
        backgroundColor: 'rgba(32, 112, 229, 0.2)',
        borderColor: 'rgba(32, 112, 229, 0.6)',
        borderCapStyle: 'butt',
        pointHitRadius: 30
      }]
    }

    return (
      <>
        <div className="graph__head">
          <h3>Weight graph</h3>
          <select className="input" onChange={(e) => selectData(e)} value={selectedSpan}>
            <option value="all">All</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">1 month</option>
            <option value="90">3 months</option>
            <option value="180">6 months</option>
            <option value="365">1 year</option>
          </select>
        </div>
        <div className="graph__box">
          <Line
            data={data}
            height={400}
            options={{
              maintainAspectRatio: false,
              trendlineLinear: {
                style: "rgba(255,105,180, .8)",
                lineStyle: "solid",
                width: 2
              }
            }}
            className="graph__box"
          />
        </div>
      </>
    );

  } else {
    return (
      <div style={{ width: "100%", height: "350px", position: "relative" }}>
        <Loader
          className="loading__spinner"
          type="Rings"
          color="#888"
          height={100}
          width={100}
        />
      </div>
    )
  }
}

export default Graph;
