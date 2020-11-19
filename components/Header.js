import Link from 'next/link'
import { useRouter } from "next/router";
import {RiScales2Line} from "react-icons/ri"


export default function Header() {
	const router = useRouter();

	return (
		<header className="fixed w-full top-0 left-0 bg-gray-800 shadow-header">
			<div className="container flex flex-row justify-between items-center py-4">
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

