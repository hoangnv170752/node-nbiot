import React, { useState, useEffect } from "react";
import axios from "axios";
import LightForm from "./LightForm";

// EditStudent Component
const Editlight = (props) => {
const [formValues, setFormValues] = useState({
	name: "",
	email: "",
	rollno: "",
});
	
//onSubmit handler
const onSubmit = (lightObject) => {
	axios
	.put(
		"http://localhost:5000/lights/update-light/" +
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
		"http://localhost:5000/lights/update-light/"
		+ props.match.params.id
	)
	.then((res) => {
		const { name, email, rollno } = res.data;
		setFormValues({ name, email, rollno });
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
