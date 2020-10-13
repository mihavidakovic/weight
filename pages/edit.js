import Head from 'next/head'
import { useState, setState, useEffect } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen } from 'react-icons/fa';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
					<title>Edit - WeightApp</title>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="apple-mobile-web-app-title" content="Weight" />
					<meta name="application-name" content="Weight" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#222222" />
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
				<Loader
					className="loading__spinner"
					type="Rings"
					color="#888"
					height={100}
					width={100}
				/>
			</>
		)
	}
}
