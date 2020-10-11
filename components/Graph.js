import { useState, setState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import dayjs from "dayjs"

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
        lineTension: 0.5,
        backgroundColor: 'rgba(32, 112, 229, 0.2)',
        borderColor: 'rgba(32, 112, 229, 0.6)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 1,
        borderWeight: 3,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(32, 112, 229, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(32, 112, 229, 1)',
        pointHoverBorderColor: 'rgba(32, 112, 229, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
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
    <>
      <p>nothing</p>
    </>
    )
  }
}

export default Graph;
