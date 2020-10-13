import Head from 'next/head'

import Graph from '../components/Graph';
import Add from '../components/Add';

export default function Home() {


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
