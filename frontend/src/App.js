// Import React
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
// Import Custom CSS
import "./App.css";
// Import from react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Import other React Component
import Createlight from "./Components/create-light.component";
import Editlight from "./Components/edit-light.component";
import Lightlist from "./Components/light-list.component";
import Login from "./Components/sign-in.component";
import { useAuth0 } from '@auth0/auth0-react';
import LoadingScreen from 'react-loading-screen';
import NavigationBar from "./Components/navigation-bar.component";
import { Container, Row } from "react-bootstrap";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginButton from "./Components/LoginButton";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/profile.php?id=100008450770058">
        Hoang Dep trai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
// App Component
function App() {
  const theme = createTheme();

  const { isLoading } = useAuth0();
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated == false) return <ThemeProvider theme={theme}>
  <Grid container component="main" sx={{ height: '100vh' }}>
    <CssBaseline />
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: 'url(https://www.agcled.com/static/blog/led-street-light-02.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log in NB - IOT management 
        </Typography>
        
          
          <LoginButton />
          <Copyright sx={{ mt: 5 }} />

        </Box>
    </Grid>
  </Grid>
</ThemeProvider>
  if (isLoading) return <div>
    <LoadingScreen
      loading={true}
      bgColor='#f1f1f1'
      spinnerColor='#9ee5f8'
      textColor='#676767'
      logoSrc='http://14.225.13.96:5555/assets/images/logo.png'
      text='A web application for managing lights'
    > 
      // ...
      // here loadable content
      // for example, async data
      //<div>Loadable content</div>
    </LoadingScreen></div>;
  return (
  //  isAuthenticated && (
    <Router>
      <div className='App'>
      <header className="App-header">
        <NavigationBar />
      </header>
      <Container>
        <Row>            
        <Routes>
              <Route path="/" element={<Login /> } />
              {/* <Route path="/">{
                user && user._id ? <Createlight />:<Login />
              }<Createlight/></Route> */}
              <Route path="/login" element={<Login /> } />
              <Route path="/create-light"
                element={ <Createlight />  } />
              <Route path="/edit-light/:id"
                element={<Editlight />} />
              <Route path="/light-list"
                element={<Lightlist />} />
            </Routes>
            </Row>
      </Container>  
      </div>

    </Router>
 //   ) 
  );
};

export default App;
