import Head from 'next/head'
import { useState, setState, useEffect, useRef } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen, FaCheck } from 'react-icons/fa';
import ContentEditable from 'react-contenteditable'

export default function Record(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [data, setData] = useState();
	const weightRef = useRef(null);
	const timeRef = useRef(null);

	function deleteRecord(id) {
		const url = "/api/weights/" + id;
		fetch(url, {
			method: "DELETE",
		})
			.then(response => {
				if (!response.ok) { throw response }
				return response.json()
			})
			.then(json => {
				console.log(json)
			})
			.catch(err => {
				console.log(err)
			});
	}

	function updateRecord(id) {
		const url = "/api/weights/" + id;
		let newData = {
			weight: data.weight,
			created_at: data.created_at
		}

		fetch(url, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newData)
		})
			.then(response => {
				if (!response.ok) { throw response }
				return response.json()
			})
			.then(json => {
				console.log(json)
				setIsEditing(false)
			})
			.catch(err => {
				console.log(err)
			});
	}
	const handleWeightChange = evt => {
		setData({...data, weight: evt.target.value});
	};

	const handleDateChange = evt => {
		setData({...data, created_at: evt.target.value});
	};

	useEffect(() => {
		setData(props.data)
	}, [props.data])

	if (data) {
		return (
			<>
				<div className="record">
					<div className={isEditing ? "record__info" : "record__info visible"}>
						<span className="record__weight">{data.weight} kg</span>
						<span className="record__time">{dayjs(data.created_at).locale("sl").format("D. MMM YYYY H:mm")}</span>
					</div>
					<div className={isEditing ? "record__edit visible" : "record__edit"}>
					<ContentEditable className="record__weight" ref={weightRef} html={data.weight} onChange={handleWeightChange} />
					<ContentEditable className="record__time" ref={timeRef} html={data.created_at} onChange={handleDateChange} />
					</div>
					<div className="record__actions">
						{isEditing ?
							<FaCheck className="action action__edit" onClick={() => {
									setIsEditing(!isEditing);
									updateRecord(data._id);
								}
							} />
							:
							<FaPen className="action action__edit" onClick={() => setIsEditing(!isEditing)} />}
						<FaTrash className="action action__delete" onClick={() =>deleteRecord(data._id)} />
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
