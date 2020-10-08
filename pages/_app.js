import App from 'next/app'
import { motion } from "framer-motion"
import '../styles/styles.scss'

import Header from "../components/Header";

function MyApp ({ Component, pageProps, router }) {
	return (
		<>
			<motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
					pageInitial: {
						opacity: 0
					},
					pageAnimate: {
						opacity: 1,
						transition: {
							duration: 0.3
						}
					},
				}}>
				<Header />
				<Component {...pageProps} />
			</motion.div>
		</>	
	)
}

MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default MyApp
