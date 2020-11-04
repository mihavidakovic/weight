import { useState, setState, useEffect } from "react";
import Head from 'next/head'
import Loader from "react-loader-spinner";

import Graph from '../components/Graph';
import Add from '../components/Add';
import Statistics from '../components/Statistics';
import Records from "../components/Records";

export default function Home() {
	const [data, setData] = useState();

	function fetchData() {
		fetch("/api/weights")
			.then(response => {
				if (!response.ok) { throw response }
				return response.json()  //we only get here if there is no error
			})
			.then(json => {
				setData(json.data)
			})
			.catch(err => {
				console.log(err)
			});
	}

	useEffect(() => {
		fetchData()
	}, [])

	function handleAdd() {
		fetchData()
	}


	if (data) {
		return (
			<>
				<Head>
					<title>Home - WeightApp</title>
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

				<main className="home">
					<div className="container">
						<div className="sidebar">
							<Add isAdded={handleAdd} />
							<Records data={data} />
						</div>
						<div className="main">
							<div className="statistics">
								<Statistics data={data} />
							</div>
							<div className="graph">
								<Graph className="graph__box" data={data} />
							</div>
						</div>
					</div>
				</main>
			</>
		)
	} else {
		return (
			<>
				<Head>
					<title>Home - WeightApp</title>
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

				<main className="home">
					<div className="container">
						<Loader
							className="loading__spinner"
							type="Rings"
							color="#888"
							height={100}
							width={100}
						/>
					</div>
			</main>
			</>

		)
	}
}
