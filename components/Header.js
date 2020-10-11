import Link from 'next/link'
import { useRouter } from "next/router";


export default function Header() {
	const router = useRouter();

	return (
		<header className="header">
			<div className="container">
				<div className="logo">
					<Link href="/">
						<span>WeightApp</span>
					</Link>
				</div>
				<div className="nav">
					<Link href="/">
						<span className={router.pathname == "/" ? "active" : ""}>
							Home
						</span>
					</Link>
					<Link href="/edit">
						<span className={router.pathname == "/edit" ? "active" : ""}>
							Edit
						</span>
					</Link>
				</div>
			</div>
		</header>
	)
}

