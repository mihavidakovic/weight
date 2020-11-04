import { useState, setState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import dayjs from "dayjs"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Graph(props) {
  const [weights, setWeights] = useState();
  const [dates, setDates] = useState();

  useEffect(() => {
    let newWeights = [];
      for (var i = props.data.length - 1; i >= 0; i--) {
        newWeights.push(Object.values(props.data[i])[1])
      }
      setWeights(newWeights)

      let newDates = [];
      for (var i = props.data.length - 1; i >= 0; i--) {
        newDates.push(dayjs(Object.values(props.data[i])[2]).format("D. M."))
      }
      setDates(newDates)
      console.log(props.data)
}, [props.data])

  if (weights && dates) {
    const data = {
      labels: dates,
      datasets: [{
        label: 'kg',
        data: weights,
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
        <h3>Weight graph</h3>
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
    <div style={{width: "100%", height: "350px", position: "relative"}}>
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
