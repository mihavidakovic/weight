import { FaTimes } from 'react-icons/fa';

export default function Message(props) {

	return (
		<div className={props.visible ? "bg-indigo-200 px-4 py-3 text-sm text-indigo-900 border border-indigo-400 font-bold rounded shadow-lg mt-4" : "bg-indigo-200 px-4 py-3 text-sm text-indigo-900 border border-indigo-400 font-bold rounded shadow-lg hidden"}>
			<span>Successfully added weight of {props.number} kg.</span>
		</div>
	)
}

