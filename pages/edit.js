import Head from 'next/head'
import { useState, setState, useEffect } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen } from 'react-icons/fa';

import Record from "../components/Record"

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
									<Record data={record} key={i} />
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
