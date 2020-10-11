import Head from 'next/head'

import Graph from '../components/Graph';
import Add from '../components/Add';

export default function Home() {


	return (
		<>
			<Head>
				<title>Weight</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="home">
				<div className="container">
					<div className="add">
						<Add />
					</div>
					<div className="graph">
						<Graph />
					</div>
				</div>
			</main>
		</>
	)
}
