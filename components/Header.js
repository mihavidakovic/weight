import Link from 'next/link'
import { useRouter } from "next/router";
<<<<<<< HEAD
import { FaBalanceScale, FaBalanceScaleLeft } from 'react-icons/fa';
import { RiScales2Line } from 'react-icons/ri';
=======
import { RiScales2Line } from "react-icons/ri"
>>>>>>> dev


export default function Header() {
	const router = useRouter();

	return (
		<header style={{ padding: "1.125em 0", backgroundColor: "rgba(0,0,0,.8)", position: "fixed", width: "100%", left: 0, top: 0, zIndex: 999, backdropFilter: "blur(10px)", boxShadow: "0 2px 10px 0 rgba(0,0,0,.3)" }}>
			<div className="container flex flex-row justify-between items-center">
				<div className="logo cursor-pointer">
					<Link href="/">
<<<<<<< HEAD
						<div className="logo__content">
							<RiScales2Line></RiScales2Line>
							<span>WeightApp</span>
=======
						<div className="logo__content flex flex-row text-white">
							<RiScales2Line className="mr-2 text-2xl"></RiScales2Line>
							<span className="font-bold">WeightApp</span>
>>>>>>> dev
						</div>
					</Link>
				</div>
				<div className="nav flex flex-row items-center">
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
					<span>
						<select className="border-none outline-none">
							<option value="kg">kg</option>
							<option value="lb">lbs</option>
						</select>
					</span>
				</div>
			</div>
		</header>
	)
}

