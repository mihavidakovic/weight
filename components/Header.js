import Link from 'next/link'
import { useRouter } from "next/router";
import { FaBalanceScale, FaBalanceScaleLeft } from 'react-icons/fa';
import { RiScales2Line } from 'react-icons/ri';


export default function Header() {
	const router = useRouter();

	return (
		<header className="header">
			<div className="container">
				<div className="logo">
					<Link href="/">
						<div className="logo__content">
							<RiScales2Line></RiScales2Line>
							<span>WeightApp</span>
						</div>
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

