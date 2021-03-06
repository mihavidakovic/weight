import App from 'next/app'
import { motion } from "framer-motion"
import '../styles/styles.scss'
import '../styles/tailwind.css'

import Header from "../components/Header";

function WeightApp ({ Component, pageProps, router }) {
	return (
		<>
			<motion.div className="font-sans" key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
				}}>
				<Header />
				<Component {...pageProps} />
			</motion.div>
		</>	
	)
}

WeightApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default WeightApp
