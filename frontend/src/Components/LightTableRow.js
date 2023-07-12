import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormGroup, Button } from "react-bootstrap";
// import { useMqttState } from 'mqtt-react-hooks';
// import mqtt from 'mqtt';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const LightTableRow = (props) => {
	const { _id, project, SERVER_ADDRESS, SERVER_MQTT_PORT, SERVER_MQTT_USER, SERVER_MQTT_PASS, CSE_ID, CSE_NAME, FROM_ID, APP_ID, MAC, STATUS} = props.obj;
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
			<TableRow>
			{/* <td>{Dev}</td> */}
			<TableCell>{project}</TableCell>
			<TableCell>{SERVER_ADDRESS}</TableCell>
			<TableCell>{SERVER_MQTT_PORT}</TableCell>
			<TableCell>{SERVER_MQTT_USER}</TableCell>
			<TableCell>{SERVER_MQTT_PASS}</TableCell>
			<TableCell>{CSE_ID}</TableCell>
			<TableCell>{CSE_NAME}</TableCell>
			<TableCell>{FROM_ID}</TableCell>
			<TableCell>{APP_ID}</TableCell>
			<TableCell>{MAC}</TableCell>
			<TableCell>      
				<Chip label = {STATUS.toString()} variant="outlined"  color = "success" />
			</TableCell>
			
			</TableRow>
		);
	};

export default LightTableRow;
