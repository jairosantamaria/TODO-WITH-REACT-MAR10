import React, { useState, useEffect } from "react";

function Todo() {
	const [task, setTask] = useState("");
	const [listTask, setListTask] = useState([]);

	useEffect(() => {
		fetch(
			"https://api.unsplash.com/photos/?client_id=LgyVosnwyQpll1wv5tVfJssZCvVnNdH2SB9PLQdBDe4"
		)
			.then(resp => {
				return resp.json();
			})
			.then(resp => {
				setListTask(resp);
				console.log(listTask);
			});
	}, []);

	const putTask = () => {
		if (task != "") {
			setListTask([...listTask, task]);
			setTask("");
		} else {
			alert("Por favor ingrese tarea antes de confirmar");
		}
	};
	const clearList = () => {
		setListTask([]);
	};

	const deleteTask = indexDelete => {
		let resultado = listTask.filter((task, index) => index != indexDelete);
		setListTask(resultado);
	};

	return (
		<div className="container">
			<div className="todo-box">
				<h1>To Do</h1>
				<button
					onClick={clearList}
					className="btn btn-outline-secondary"
					type="button">
					Clear List
				</button>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="add new task"
						onChange={e => {
							setTask(e.target.value);
						}}
						value={task}
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
							<li key={index} className="list-group-item">
								{item.alt_description}
								<button
									onClick={() => {
										deleteTask(index);
									}}
									type="button"
									className="btn btn-secondary">
									x
								</button>
							</li>
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
