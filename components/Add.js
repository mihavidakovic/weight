import { useState, setState, useEffect } from "react";
import Message from './Message';

export default function Add() {
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
				console.log(json)
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

	return (
		<>
			<div className="add flex flex-col mb-4">
				<h3 className="title mb-2">Add weight</h3>
				<div className="add__form box flex flex-col">
					<div className="flex flex-row items-center">
						<input type="number" value={weight} placeholder="96kg" className="input w-full mr-2" onChange={handleChange} />
						<div className="btn btn-primary ml-2" onClick={() => submit(weight)}>
							Add
						</div>
					</div>
					<Message type="success" number={addedWeight} visible={status} />
				</div>
			</div>
		</>
	)
}

