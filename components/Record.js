import Head from 'next/head'
import { useState, setState, useEffect } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen } from 'react-icons/fa';

export default function Record(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState(props.data.weight);
  const [date, setDate] = useState(props.data.created_at);

  function deleteRecord(id) {
  	const url = "/api/weights/" + id; 
	fetch(url, {
		method: "DELETE",
	})
		.then( response => {
			if (!response.ok) { throw response }
			return response.json()
		})
		.then( json => {
			console.log(json)
		})
		.catch( err => {
			console.log(err)
		});
  }

  function updateRecord(id) {
  	const url = "/api/weights/" + id;
  	let data = {
  		weight: weight,
  		created_at: date
  	}

	fetch(url, {
		method: "PUT",
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
			setIsEditing(false)
		})
		.catch( err => {
			console.log(err)
		});
  }

	function handleWeightChange(event) {
		setWeight(event.target.value)
	}

	function handleDateChange(event) {
		setDate(event.target.value)
	}

  let record = props.data;

  if (record) {
	return (
		<>
			<div className="record">
				<div className={isEditing ? "record__info" : "record__info visible"}>
					<span className="record__weight">{record.weight} kg</span>
					<span className="record__time">{dayjs(record.created_at).locale("sl").format("D. MMM YYYY H:mm")}</span>
				</div>
				<div className={isEditing ? "record__edit visible" : "record__edit"}>
					<input type="number" className="input" value={weight} onChange={handleWeightChange} />
					<input type="text" className="input" value={date} onChange={handleDateChange} />
					<div className="btn btn-primary" onClick={() => updateRecord(record._id)}>
						Ok
					</div>
				</div>
				<div className="record__actions">
					<FaPen className="action action__edit" onClick={() => setIsEditing(!isEditing)} />
					<FaTrash className="action action__delete" onClick={() => deleteRecord(record._id)} />
				</div>
			</div>
		</>
	)
  } else {
  	return (
  		<>
  		</>
  	)
  }
}
