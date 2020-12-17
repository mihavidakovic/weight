import Head from 'next/head'
import { useState, setState, useEffect, useRef } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen, FaCheck } from 'react-icons/fa';
import ContentEditable from 'react-contenteditable'

export default function Record(props) {
	const [isDeleted, setIsDeleted] = useState(false);
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
				setIsDeleted(true)
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
				<div className={isDeleted ? "record hidden" : "box mb-3 hover:shadow-lg transition"}>
					<div className="group flex flex-row items-center">
						<div className={isEditing ? "hidden" : "visible w-5/6 flex flex-col flex-shrink-0"}>
							<span className="record__weight font-bold text-lg mb-1">{data.weight} kg</span>
							<span className="record__time text-xs text-gray-500">{dayjs(data.created_at).locale("sl").format("D. MMM YYYY H:mm")}</span>
						</div>
						<div className={isEditing ? "visible w-5/6 flex flex-col flex-shrink-0" : "hidden"}>
							<ContentEditable className="font-bold text-lg mb-1" ref={weightRef} html={data.weight} onChange={handleWeightChange} />
							<ContentEditable className="text-xs text-gray-500" ref={timeRef} html={data.created_at} onChange={handleDateChange} />
						</div>
						<div className={isEditing ? "record__actions w-1/6 flex flex-row items-center justify-between opacity-100" : "record__actions w-1/6 flex flex-row items-center justify-between opacity-0 group-hover:opacity-100"}>
							{isEditing ?
								<FaCheck className="text-green-500 hover:text-green-700 cursor-pointer transition" onClick={() => {
										setIsEditing(!isEditing);
										updateRecord(data._id);
									}
								} />
								:
								<FaPen className="text-gray-500 hover:text-gray-700 cursor-pointer transition" onClick={() => setIsEditing(!isEditing)} />}
							<FaTrash className="text-red-500 hover:text-red-700 cursor-pointer transition" onClick={() => deleteRecord(data._id)} />
						</div>
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
