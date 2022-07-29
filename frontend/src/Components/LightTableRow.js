import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const LightTableRow = (props) => {
const { _id, name, MAC, project } = props.obj;

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
const sendLight = () => {
	axios.post("http://localhost:5000/lights/create-light/" + _id)
	.then((res) => {
		if (res.status === 200) {
			alert("Light successfully added");
			window.location.reload();
		} else Promise.reject();
	})
}
return (
	<tr>
	<td>{name}</td>
	<td>{MAC}</td>
	<td>{project}</td>
	<td>
		<Link className="edit-link"
		to={"/update-light/" + _id}>
		    Edit
		</Link>
		<Button onClick={deleteLight} size="sm" variant="danger">
		    Delete
		</Button>
		<Button onClick={sendLight} size = "sm" variant="success" class="ml-1">
			Send MQTT
		</Button>
	</td>
	</tr>
);
};

export default LightTableRow;
