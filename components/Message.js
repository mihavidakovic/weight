import { FaTimes } from 'react-icons/fa';

export default function Message(props) {

	return (
		<div className={props.visible ? "message visible" : "message"}>
			<span>Successfully added weight of {props.number} kg.</span>
		</div>
	)
}

