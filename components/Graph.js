import { useState, setState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import dayjs from "dayjs"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Graph() {
  const [weights, setWeights] = useState();
  const [dates, setDates] = useState();

  function fetchData() {
     fetch("/api/weights")
      .then( response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error
      })
      .then( json => {
        let newWeights = [];
        for (var i = json.data.length - 1; i >= 0; i--) {
          newWeights.push(Object.values(json.data[i])[1])
        }
        setWeights(newWeights)

        let newDates = [];
        for (var i = json.data.length - 1; i >= 0; i--) {
          newDates.push(dayjs(Object.values(json.data[i])[2]).format("D. M."))
        }
        setDates(newDates)



      })
      .catch( err => {
        console.log(err)
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      <div>
        <h2>Weight graph</h2>
        <Line
          data={data}
          height={300}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
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
