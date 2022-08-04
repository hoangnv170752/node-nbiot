import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormGroup, Button } from "react-bootstrap";


const LightTableRow = (props) => {
const { _id, name, MAC, project, ip, port } = props.obj;

const deleteLight = () => {
	axios
	.delete(
	"http://localhost:5000/lights/delete-light/" + _id)
	.then((res) => {
		if (res.status === 200) {
			// alert("Light successfully deleted");
			toast.warning("Delete light successfully", {
				position: toast.POSITION.TOP_CENTER
			});
			setTimeout(function(){
				window.location.reload(1);
			 }, 5000);
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};
// const sendLight = () => {
// 	let ipserver = ""
// 	let port = ""
// 	const url = "http://" + ipserver + ":" + port
// 	const urljson = JSON.stringify(url);
	// if (ipserver == null && port == null) {
	// 	return (
			
	// 	)
	// }
	
// }
const [lights, setLights] = ''
const httpConfig = () => {
	axios.get('http://localhost:5000/lights/')
		.then(
			res => {
				const lights = res.data;
				this.useState({lights});
			}
		)
	if (lights != null) {
		axios.post('http://localhost:5000/lights/create-light' , lights.MAC )
		.then(res => {
			if (res.status === 200) {
				// alert('Light successfully created') 
				toast.success("Successful adding light !", {
					position: toast.POSITION.TOP_CENTER
				});
				setTimeout(function(){
					window.location.reload(1);
				 }, 5000);
			}
			else
			Promise.reject()
		})
		.catch(err => alert('Something went wrong'))
	}
}

	return (
		<tr>
		<td>{name}</td>
		<td>{MAC}</td>
		<td>{project}</td>
		<td>{ip}</td>
		<td>{port}</td>
		<td>
			{/* <Link className="edit-link"
			to={"/update-light/" + _id}>
				Edit
			</Link> */}
			<div className="row">
				<div className="col">
					<Button onClick={deleteLight } size="sm" variant="danger">
						Delete
						<ToastContainer />
					</Button>
				</div>
				{/* <div className="col">
					<Form>
						<Field type="text" className="form-control" onChange = {(e) => setIp(e.target.value)} />
					</Form>
				</div>	 */}
				<div className="col mx-auto">
					<Button onClick={httpConfig} size="sm" variant="success" class="ml-1">
						Send
					</Button>
				</div>
				
			</div>
		</td>
		</tr>
	);
};

export default LightTableRow;
