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
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import QRCode from "react-qr-code";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
  	flexDirection: 'column',
	alignItems: 'center', 
  	justifyContent: 'center',  
};
const useStyles = makeStyles({
  cell: {
    maxWidth: 200, // Adjust this value to control the maximum width of the cell
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  action: {
	flexDirection: 'row',
  }
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LightTableRow = (props) => {
	const { _id, project, vendor, CLIENT_ID, SERVER_ADDRESS, SERVER_MQTT_PORT, SERVER_MQTT_USER, SERVER_MQTT_PASS, CSE_ID, CSE_NAME, FROM_ID, APP_ID, MAC, STATUS} = props.obj;
	const [open, setOpen] = React.useState(false);
	const [projectName, setProjectName] = React.useState('Rạng Đông');
	const [openQr, setOpenQr] = React.useState(false);
	const handleOpenModal = () => setOpenQr(true);
	const handleCloseModal = () => setOpenQr(false);
	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
	const deleteLight = () => {
		axios
		.delete(
		"http://103.116.8.27:5001/lights/delete-light/" + _id)
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
		axios.get('http://103.116.8.27:5001/lights/light/' + _id)
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
	const handleProjectName = (vendorId) => {
		if (vendor === 0) {
			setProjectName("Rang Dong")
		} else if (vendor === 1) {
			setProjectName("VNPT")
		} else if (vendor === 2) {
			setProjectName("Viettel")
		}
	}

	React.useEffect(() => {
		handleProjectName(vendor);
	}, [])
	const classes = useStyles();

		return (
			<>
				<TableRow>
					{/* <td>{Dev}</td> */}
					<TableCell className={classes.cell}>{project}
						<Tooltip title={`Dự án chiếu sáng tại: ${projectName}`}>
							<Chip label={projectName} onClick={() => {}} variant="outlined"/>
						</Tooltip>
					</TableCell>
					<TableCell>{SERVER_ADDRESS}</TableCell>
					<TableCell className={classes.cell}>{CLIENT_ID}</TableCell>
					<TableCell>{SERVER_MQTT_PORT}</TableCell>
					<TableCell>{SERVER_MQTT_USER}</TableCell>
					<TableCell>{SERVER_MQTT_PASS}</TableCell>
					<TableCell>{CSE_ID}</TableCell>
					<TableCell>{CSE_NAME}</TableCell>
					<TableCell className={classes.cell}>{FROM_ID}</TableCell>
					<TableCell>{APP_ID}</TableCell>
					<TableCell>{MAC}</TableCell>
					<TableCell>      
						<Chip label = {STATUS.toString() === "true" ? "Đã cấu hình" : "Chưa cấu hình"} variant="filled"  color = {STATUS.toString() === "true" ? "success" : "warning"} />
					</TableCell>
					<TableCell className={classes.action}>
						<Button  onClick={handleClickOpen} size="sm" variant="danger">
							Xóa đèn
							<ToastContainer />
						</Button>
						<Button  onClick={handleOpenModal} size="sm" variant="primary" style={{marginLeft: 10}}>
							Tạo QR đèn
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
				<Modal
					open={openQr}
					onClose={handleCloseModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Thông tin MAC QR của Đèn
						</Typography>
						<QRCode
							size={256}
							style={{ height: "auto", maxWidth: "100%", width: "100%" }}
							value={MAC}
							viewBox={`0 0 256 256`}
						/>
					</Box>
				</Modal>
			</>
		);
	};

export default LightTableRow;
