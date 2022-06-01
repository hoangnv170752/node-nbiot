import React, { useState, useEffect } from "react";
import axios from 'axios';

import LightForm from "./LightForm";

// Createlight Component
const Createlight = () => {
const [formValues, setFormValues] =
	useState({ name: '', email: '', rollno: '' })
// onSubmit handler
const onSubmit = lightObject => {
	axios.post(
'http://localhost:5000/lights/create-light',
	lightObject)
	.then(res => {
		if (res.status === 200)
		alert('Light successfully created')
		else
		Promise.reject()
	})
	.catch(err => alert('Something went wrong'))
}
	

return(
	<LightForm 
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize>
        Add Light MAC
	</LightForm>
)
}

export default Createlight
