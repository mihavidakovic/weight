import Head from 'next/head'

import Graph from '../components/Graph';

export default function Home() {


    return (
      <div className="container">
        <Head>
          <title>Weight</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="container">
            <Graph />
          </div>
        </main>

      </div>
  )
}
