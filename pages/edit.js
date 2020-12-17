import Head from 'next/head'
import { useState, setState, useEffect } from "react";
import dayjs from "dayjs"
require('dayjs/locale/sl')
import { FaTrash, FaPen, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Record from "../components/Record"

export default function Edit() {
	const [weights, setWeights] = useState();
	const [page, setPage] = useState({
		totalDocs: 0,
		num: 0,
		totalPages: 0,
		hasPrevPage: true,
		hasNextPage: true,
		prevPage: null,
		nextPage: null
	});

	async function fetchData(num) {
		let url = "/api/weights?page=" + num;
		await fetch(url)
			.then(response => {
				if (!response.ok) { throw response }
				return response.json()  //we only get here if there is no error
			})
			.then(json => {
				console.log(json)
				setWeights(json.data.docs)
				setPage({
					totalDocs: json.data.totalDocs,
					num: json.data.page,
					totalPages: json.data.totalPages,
					hasPrevPage: json.data.hasPrevPage,
					hasNextPage: json.data.hasNextPage,
					prevPage: json.data.prevPage,
					nextPage: json.data.nextPage
				})
			})
			.catch(err => {
				console.log(err)
			});
	}

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

  useEffect(() => {
	fetchData(0)
  }, [])

	function handlePrevPage() {
		if(page.hasPrevPage) {
			fetchData((page.num - 1) - 1)
		} else {
			return null
		}
	}
	function handleNextPage() {
		if(page.hasNextPage) {
			fetchData((page.num - 1) + 1)
		} else {
			return null
		}
	}

	function handleChangePage(num) {
		fetchData(num)
	}

	let data = weights;

	if (weights && page) {
		return (
			<>
				<Head>
					<title>Edit - WeightApp</title>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="apple-mobile-web-app-title" content="Weight" />
					<meta name="application-name" content="Weight" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#222222" />
				</Head>

				<main className="edit">
					<div className="container">
						<h2>Edit records ({page.totalDocs})</h2>
						<div className="pagination">
							<div className="pagination__box pagination__prev" onClick={() => handlePrevPage()}>
								<FaArrowLeft />
							</div>
							<div className="pagination__pages">
								{page.hasPrevPage ? (
									<div className="pagination__box" onClick={() => handlePrevPage()}>
										<span>{page.num - 1}</span>
									</div>
									)
									:
									""
								}

								<div className="pagination__box active">
									<span>{page.num}</span>
								</div>

								{page.hasNextPage ? (
									<div className="pagination__box" onClick={() => handleNextPage()}>
										<span>{page.num + 1}</span>
									</div>
									)
									:
									""
								}
							</div>
							<div className="pagination__box pagination__next" onClick={() => handleNextPage()}>
								<FaArrowRight />
							</div>
						</div>
						<div className="records">
							{weights.map((record, i) => {
								return (
									<Record data={record} key={i} />
								)
							})}
						</div>
						<div className="pagination">
							<div className="pagination__box pagination__prev" onClick={() => handlePrevPage()}>
								<FaArrowLeft />
							</div>
							<div className="pagination__pages">
								{page.hasPrevPage ? (
									<div className="pagination__box" onClick={() => handlePrevPage()}>
										<span>{page.num - 1}</span>
									</div>
									)
									:
									""
								}

								<div className="pagination__box active">
									<span>{page.num}</span>
								</div>

								{page.hasNextPage ? (
									<div className="pagination__box" onClick={() => handleNextPage()}>
										<span>{page.num + 1}</span>
									</div>
									)
									:
									""
								}
							</div>
							<div className="pagination__box pagination__next" onClick={() => handleNextPage()}>
								<FaArrowRight />
							</div>
						</div>
					</div>
				</main>
			</>
		)
	} else {
		return (
			<>
				<Head>
					<title>Edit - WeightApp</title>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="apple-mobile-web-app-title" content="Weight" />
					<meta name="application-name" content="Weight" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#222222" />
				</Head>

				<main className="edit">
					<div className="container">
						<h2>Edit records</h2>
						<div className="records">
							<Loader
								className="loading__spinner"
								type="Rings"
								color="#888"
								height={100}
								width={100}
							/>
						</div>
					</div>
				</main>
			</>
		)
	}
}
