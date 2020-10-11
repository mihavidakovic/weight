import Head from 'next/head'
import { useState, setState, useEffect } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen } from 'react-icons/fa';

export default function Edit() {
  const [weights, setWeights] = useState();

  function fetchData() {
	 fetch("/api/weights")
	  .then( response => {
		if (!response.ok) { throw response }
		return response.json()  //we only get here if there is no error
	  })
	  .then( json => {
		setWeights(json.data)
	  })
	  .catch( err => {
		console.log(err)
	  });
  }

  function deleteRecord(id) {
  	const url = "/api/weights/" + id; 
	fetch(url, {
		method: "DELETE",
	})
		.then( response => {
			if (!response.ok) { throw response }
			return response.json()
		})
		.then( json => {
			console.log(json)
		})
		.catch( err => {
			console.log(err)
		});
  }

  useEffect(() => {
	fetchData()
  }, [])

  let data = weights;

	if (weights) {
		return (
			<>
				<Head>
					<title>Edit</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className="edit">
					<div className="container">
						<h2>Edit records</h2>
						<div className="records">
							{weights.map((record, i) => {
								return (
									<div className="record" key={i}>
										<div className="record__info">
											<span className="record__weight">{record.weight} kg</span>
											<span className="record__time">{dayjs(record.created_at).locale("sl").format("D. MMM YYYY H:mm")}</span>
										</div>
										<div className="record__actions">
											<FaPen className="action action__edit" />
											<FaTrash className="action action__delete" onClick={() => deleteRecord(record._id)} />
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</main>
			</>
		)
	} else {
		return(
			<>
				<span>Loading</span>
			</>
		)
	}
}
