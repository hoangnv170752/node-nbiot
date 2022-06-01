import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const LightTableRow = (props) => {
const { _id, name, email, rollno } = props.obj;

const deleteLight = () => {
	axios
	.delete(
"http://localhost:5000/lights/delete-light/" + _id)
	.then((res) => {
		if (res.status === 200) {
		alert("Light successfully deleted");
		window.location.reload();
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

return (
	<tr>
	<td>{name}</td>
	<td>{email}</td>
	<td>{rollno}</td>
	<td>
		<Link className="edit-link"
		to={"/edit-light/" + _id}>
		    Edit
		</Link>
		<Button onClick={deleteLight}
		size="sm" variant="danger">
		    Delete
		</Button>
	</td>
	</tr>
);
};

export default LightTableRow;
