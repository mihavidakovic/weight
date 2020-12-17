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

<<<<<<< HEAD
				<main className="home">
					<div className="container">
						<div className="sidebar">
=======
				<main className="mt-20">
					<div className="container flex flex-col lg:flex-row-reverse">
						<div className="sidebar w-full lg:w-2/5 ml-0 lg:ml-4 mb-6">
>>>>>>> dev
							<Add isAdded={handleAdd} />
							<Records data={data} />
						</div>
						<div className="main w-full mr-0 lg:mr-4 mb-4">
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

				<main className="mt-36 relative">
					<Loader
						className="absolute inset-x-1/2  transform -translate-x-1/2 w-24 h-24"
						type="Rings"
						color="#888"
						height={96}
						width={96}
					/>
			</main>
			</>

		)
	}
}
