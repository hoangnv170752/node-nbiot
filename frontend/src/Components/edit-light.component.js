import React, { useState, useEffect } from "react";
import axios from "axios";
import LightForm from "./LightForm";

const Editlight = (props) => {
	const [formValues, setFormValues] = useState({
		Dev: "",
		project: "",
		SERVER_ADDRESS: "",
		SERVER_MQTT_PORT: "",
		SERVER_MQTT_USER: "",
		SERVER_MQTT_PASS: "",
	});
		
	//onSubmit handler
	const onSubmit = (lightObject) => {
		axios
		.put(
			"https://node-nbiot.onrender.com/lights/update-light/" +
			props.match.params.id,
			lightObject
		)
		.then((res) => {
			if (res.status === 200) {
			alert("Light successfully updated");
			props.history.push("/light-list");
			} else Promise.reject();
		})
		.catch((err) => alert("Something went wrong"));
	};

	useEffect(() => {
		axios
		.get(
			"https://node-nbiot.onrender.com/lights/update-light/"
			+ props.match.params.id
		)
		.then((res) => {
			const { Dev, project, SERVER_ADDRESS, SERVER_MQTT_PORT , SERVER_MQTT_USER, SERVER_MQTT_PASS} = res.data;
			setFormValues({ Dev, project, SERVER_ADDRESS, SERVER_MQTT_PORT , SERVER_MQTT_USER, SERVER_MQTT_PASS});
		})
		.catch((err) => console.log(err));
	}, []);

	return (
		<LightForm
			initialValues={formValues}
			onSubmit={onSubmit}
			enableReinitialize
		>
			Update Light
		</LightForm>
	);
};

export default Editlight;
