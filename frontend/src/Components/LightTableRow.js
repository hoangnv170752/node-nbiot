import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "react-bootstrap";
import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LightTableRow = (props) => {
	const { _id, project, SERVER_ADDRESS, SERVER_MQTT_PORT, SERVER_MQTT_USER, SERVER_MQTT_PASS, CSE_ID, CSE_NAME, FROM_ID, APP_ID, MAC, STATUS} = props.obj;
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
	const deleteLight = () => {
		axios
		.delete(
		"http://localhost:5000/lights/delete-light/" + _id)
		.then((res) => {
			if (res.status === 200) {
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
	}

		return (
			<>
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
						<Chip label = {STATUS.toString() == "true" ? "Đã cấu hình" : "Chưa cấu hình"} variant="filled"  color = "success" />
					</TableCell>
					<TableCell>
						<Button  onClick={handleClickOpen} size="sm" variant="danger">
							Xóa đèn
							<ToastContainer />
						</Button>
					</TableCell>
				</TableRow>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle>{"Xác nhận lại việc sẽ xóa đèn"}</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Anh/chị sẽ xóa dữ liệu đèn và không thể khôi phục lại được
					</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button onClick={handleClose} size="sm">Hủy</Button>
					<Button onClick={deleteLight} size="sm" variant="danger">Nhất quyết xóa</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	};

export default LightTableRow;
