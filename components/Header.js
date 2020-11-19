import Link from 'next/link'
import { useRouter } from "next/router";
import {RiScales2Line} from "react-icons/ri"


export default function Header() {
	const router = useRouter();

	return (
		<header style={{padding: "1.125em 0", backgroundColor: "rgba(0,0,0,.8)", position: "fixed", width: "100%", left: 0, top: 0, zIndex: 999, backdropFilter: "blur(10px)", boxShadow: "0 2px 10px 0 rgba(0,0,0,.3)"}}>
			<div className="container flex flex-row justify-between items-center">
				<div className="logo cursor-pointer">
					<Link href="/">
						<div className="logo__content flex flex-row text-white">
							<RiScales2Line className="mr-2 text-2xl"></RiScales2Line>
							<span className="font-bold">WeightApp</span>
						</div>
					</Link>
				</div>
				<div className="nav flex flex-row">
					<Link href="/">
						<span className={router.pathname == "/" ? "active text-white text-xs uppercase font-bold cursor-pointer transition mr-4 last:mr-0" : "text-gray-300 hover:text-gray-100 text-xs uppercase font-bold cursor-pointer transition mr-4 last:mr-0"}>
							Home
						</span>
					</Link>
					<Link href="/edit">
						<span className={router.pathname == "/edit" ? "active text-white text-xs uppercase font-bold cursor-pointer transition mr-4 last:mr-0" : "text-gray-300 hover:text-gray-100 text-xs uppercase font-bold cursor-pointer transition mr-4 last:mr-0"}>
							Edit
						</span>
					</Link>
				</div>
			</div>
		</header>
	)
}

