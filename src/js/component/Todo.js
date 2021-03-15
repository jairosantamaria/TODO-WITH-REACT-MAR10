import React, { useState, useEffect } from "react";

function Todo() {
	//objeto tarea
	const [task, setTask] = useState({ label: "", done: false });
	//una lista de objetos de tipo tarea
	const [listTask, setListTask] = useState([]);
	//variable para determinar si se esta pasando el mouse encima de las tareas y mostrar el boton de eliminar
	const [isHovering, setisHovering] = useState(-1);

	useEffect(() => {
		//este api es para obtener la lista de tareas almacenadas
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jairojsantamaria"
		)
			.then(resp => {
				return resp.json();
			})
			.then(resp => {
				setListTask(
					resp.map(item => {
						return { label: item.label, done: item.done };
					})
				);
				//console.log(listTask);
			})
			.catch(error => {
				console.log("error", error);
			});
	}, []);

	const putTask = () => {
		if (task.label != "") {
			//obtengo la lista de tareas y seguido
			//obtengo el task que agregue en el input, y lo agrego como un objeto {} label y done son
			//propiedades del objeto, a label se le agrega el valor que se ingreso en el input
			//y a done false por defecto
			setListTask([...listTask, { label: task, done: false }]);
			//FETCH PUT
			putFetch();
			setTask({ label: "", done: "" });
		} else {
			alert("Por favor ingrese tarea antes de confirmar");
		}
	};

	const putFetch = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(listTask);
		console.log(raw);
		//este fetch es para actualizar la lista en bd
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jairosantamaria",
			requestOptions
		)
			.then(async response => response.text())
			.then(result => console.log("Resultado", result))
			.catch(error => console.log("Error", error));
	};

	const clearList = () => {
		setListTask([]);
		putFetch();
	};

	const deleteTask = indexDelete => {
		let resultado = listTask.filter((task, index) => index != indexDelete);
		setListTask(resultado);
		putFetch();
	};

	return (
		<div className="container">
			<div className="todo-box">
				<h1>To Do</h1>
				<button
					onClick={clearList}
					className="btn btn-outline-primary m-2"
					type="button">
					Clear List
				</button>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder={`${
							listTask.length == 0
								? "No task in list to do, add a new task"
								: "Add new task"
						}`}
						onChange={e => {
							setTask(e.target.value);
						}}
						value={task.label}
					/>
					<div className="input-group-append">
						<button
							onClick={putTask}
							className="btn btn-outline-secondary"
							type="button">
							confirm
						</button>
					</div>
				</div>
				<ul className="list-group">
					{listTask.map((item, index) => {
						return (
							<div
								key={index}
								onMouseEnter={() => setisHovering(index)}
								onMouseLeave={() => setisHovering(-1)}>
								<li key={index} className="list-group-item">
									{item.label} -{" "}
									{item.done ? "Terminada" : "Sin Terminar"}
									<button
										onClick={() => {
											deleteTask(index);
										}}
										type="button"
										className={`btn btn-secondary ml-4 ${
											isHovering === index ? "" : "hidden"
										}`}>
										x
									</button>
								</li>
							</div>
						);
					})}
				</ul>
				<small className="text-muted">
					{listTask.length} tareas por hacer
				</small>
			</div>
		</div>
	);
}

export default Todo;
