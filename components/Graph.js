import { useState, setState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import dayjs from "dayjs"

function Graph() {
  const [weights, setWeights] = useState();
  const [dates, setDates] = useState();

  useEffect(() => {

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

  }, [setWeights])

  if (weights && dates) {
    const data = {
      labels: dates,
      datasets: [{
        label: 'kg',
        data: weights,
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 1,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 30
      }]
    }

    return (
      <div>
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
