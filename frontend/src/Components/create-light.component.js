import React, { useState, useEffect } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LightForm from "./LightForm";
import Form from "react-bootstrap/Form";
import { FormControl, InputGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Createlight Component
const Createlight = () => {
    const { user } = useAuth0();
    const [formValues, setFormValues] =
        useState({ name: '', MAC: '', project: '', ip: '', port: ''})
    // onSubmit handler
    const onSubmit = lightObject => {
        Axios.post(
        'http://localhost:5000/lights/create-light',
        lightObject)
        .then(res => {
            if (res.status === 200) {
                // alert('Light successfully created') 
                toast.success("Successful adding light !", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else
            Promise.reject()
        })
        .catch(err => alert('Something went wrong'))
    }
    // let formData = new FormData();
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${light}`)
    }
    // const onFileChange = (e) => {
    //     console.log(e.target.files[0])
    //     if(e.target && e.target.files[0]) {
    //         formData.append('file', e.target.files[0]);
    //     }
    // }
    const [light, setLight] = useState("");
    
	const onSubmitfile = () => {
        if(light != null) {
            Axios.post(
                'http://localhost:5000/lights/create-light', light, {
                    headers: {
                      // Overwrite Axios's automatically set Content-Type
                      'Content-Type': 'application/json'
                    }
                  } )
        
                .then(res => {
                    if (res.status === 200) {
                        // alert('Add file lights successfully')
                        toast.success("Add light successfully", {
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
    
    
    return(
        <div className="container" >
            <div className="row ">
                <div className="col mt-100">
                    <LightForm 
                        initialValues={formValues}
                        onSubmit={onSubmit }
                        enableReinitialize>
                        Add Light MAC
                        <ToastContainer />
                    </LightForm>
                </div>
          
                <div className="col mt-100">
                    <Form onSubmit={handleSubmit}>
                        INPUT MULTI LIGHTS FIELD 
                        <FormControl
                            type="text" name="myFile" onChange={(e) => setLight(e.target.value)} />
                        
                        <FormControl
                            type="submit" value="Upload multi lights" onClick={() => onSubmitfile()}
                        />
                    </Form>
              {/*  <JSONPretty data={user} /> */}
                </div> 

            </div>
        </div>
        
    );
}
export default Createlight
