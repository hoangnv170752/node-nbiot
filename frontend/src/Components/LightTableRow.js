import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormGroup, Button } from "react-bootstrap";
// import { useMqttState } from 'mqtt-react-hooks';
// import mqtt from 'mqtt';


const LightTableRow = (props) => {
	const { _id, project, SERVER_ADDRESS, SERVER_MQTT_PORT, SERVER_MQTT_USER, SERVER_MQTT_PASS, CSE_ID, CSE_NAME, FROM_ID, APP_ID, MAC} = props.obj;
	// const [connectionStatus, setConnectionStatus] = React.useState(false);
  	// const [messages, setMessages] = React.useState([]);

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
	// const { client } = useMqttState();
	// useEffect(() => {
	// 	const client = mqtt.connect('http://112.137.129.232:3705');
	// 	client.on('connect', () => setConnectionStatus(true));
	// 	client.on('message', (topic, payload, packet) => {
	// 		setMessages(messages.concat(payload.toString()));
	// 	});
	// }, []);
	const HttpConfig = (context) => {
		axios.get('http://localhost:5000/lights/light/' + _id)
			.then(
				(res) => {
					if (res.status === 200){
						console.log(res.data)
					}
					console.log(JSON.stringify(res.data));
					
				},
			)
			.catch((err) => alert("Something went wrong"));
			
		// const client = mqtt.connect('ws://112.137.129.232:3705')
		// client.on('connect', function () {
		// 	client.subscribe('presence', function (err) {
		// 		if (!err) {
		// 		client.publish('presence', 'Hello mqtt')
		// 		}
		// 	})
		// })			
	}
	// function handleClick(message) {
	// 	return client.publish('test/mqtt', message);
	//   }

		return (
			<tr>
			{/* <td>{Dev}</td> */}
			<td>{project}</td>
			<td>{SERVER_ADDRESS}</td>
			<td>{SERVER_MQTT_PORT}</td>
			<td>{SERVER_MQTT_USER}</td>
			<td>{SERVER_MQTT_PASS}</td>
			<td>{CSE_ID}</td>
			<td>{CSE_NAME}</td>
			<td>{FROM_ID}</td>
			<td>{APP_ID}</td>
			<td>{MAC}</td>
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
						<Button onClick={HttpConfig} size="sm" variant="success" class="ml-1">
							Send
						</Button>
					</div>
					<div>
					
					</div>
				</div>
			</td>
			</tr>
		);
	};

export default LightTableRow;
