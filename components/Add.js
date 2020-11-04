import { useState, setState, useEffect } from "react";
import Message from './Message';

export default function Add(props) {
	const [weight, setWeight] = useState("");
	const [addedWeight, setAddedWeight] = useState(0);
	const [status, setStatus] = useState(false);

	function submit(number) {
		const data = {
			weight: number,
			created_at: new Date()
		}

		fetch("/api/weights", {
			method: "POST",
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then( response => {
				if (!response.ok) { throw response }
				return response.json()
			})
			.then( json => {
				setWeight("")
				setAddedWeight(number)
				setStatus(true)
				setTimeout(() => {
					setStatus(false)
				}, 3000)
			})
			.catch( err => {
				console.log(err)
			});
	}

	function handleChange(event) {
		setWeight(event.target.value)
	}

	function handleAdded() {
		props.isAdded()
	}

	return (
		<div className="add">
			<h3>Add weight</h3>
			<div className="add__form">
				<div className="form">
					<input type="number" value={weight} placeholder="96kg" className="input" onChange={handleChange} />
					<div className="btn btn-primary" onClick={() => {
						submit(weight)
						handleAdded()
					}}>
						Add
					</div>
				</div>
				<Message type="success" number={addedWeight} visible={status} />
			</div>
		</div>
	)
}

