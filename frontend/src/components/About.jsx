import { useState } from 'react';
import React from 'react'
import { Box, Typography, Dialog, IconButton, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const About = () => {

  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  const imagesBox1 = ['/img1.png', '/img2.png', '/img3.png'];
  const imagesBox2 = ['/img4.png', '/img5.png', '/img6.png'];
  const imagesBox3 = ['/img7.png', '/img8.png', '/img9.png'];
  const imagesBox4 = ['/img10.png', '/img11.png', '/img12.png', '/img13.png'];
  const imagesBox5 = ['/img14.png', '/img15.png'];
  const imagesBox6 = ['/img16.png', '/img17.png', '/img18.png', '/img19.png'];

  const handleClickOpen = (boxIndex) => {
    switch(boxIndex) {
      case 1:
        setCurrentImages(imagesBox1);
        break;
      case 2:
        setCurrentImages(imagesBox2);
        break;
      case 3:
        setCurrentImages(imagesBox3);
        break;
      case 4:
        setCurrentImages(imagesBox4);
        break;
      case 5:
        setCurrentImages(imagesBox5);
        break;
      case 6:
        setCurrentImages(imagesBox6);
        break;
      default:
        setCurrentImages([]);
    }
    setCurrentImageIndex(0);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + currentImages.length) % currentImages.length);
  };

  const imageStyle = {
    width: '150px',
    height: '250px',
    objectFit: 'cover',
    margin: '10px',
    borderRadius: '15px'
  };

  const dialogStyle = {
    padding: 2,
    width: '80vw',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const imgInDialogStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '10px',
  };

  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%', maxWidth: '1670px', backgroundColor: '#265073', marginBottom: '10px', paddingTop: '19px', paddingBottom: '20px', paddingLeft: '15px'}}>
        <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '22px',fontWeight: 600 }}>
          Setup Process
        </Typography>
      </Box>

      <Box sx={{
        display:'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr',
          md: '(2, 1fr)',
          },
        gridTemplateRows: {
          xs: 'repeat(6, 1fr)',
          sm: 'repeat(6, 1fr)',
          md: 'repeat(3, 1fr)',
          },
        }}>
        <Box sx={{display:"flex", flexDirection:'row', justifyContent:'space-between', gap:'20px'}}>
          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor:'#ECF4D6'}}>
            <Typography sx={{ marginLeft: '20px', fontSize: '19px',fontWeight: 600, color:'#265073' }}>
              1. Setting up Python Backend
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box>
                <ul style={{ fontSize: '14px',fontWeight: 600, color:'#2D9596' }}>
                  <li>Create main folder.</li>
                  <li>Create two folders within the main folder named <span style={{color: '#000000', fontStyle:'italic'}}>"frontend"</span> and <span style={{color: '#000000', fontStyle:'italic'}}>"backend"</span>.</li>
                  <li>Inside the backend folder create a virtual environment.</li>
                  <li>Activate the virtual environment.</li>
                  <li>Install Django and Node JS.</li>
                  <li>Install Django rest framework which is the api framework.</li>
                  <li>Start the Django Project.</li>
                  <li>Create a new app.</li>
                  <li>In the <span style={{color: '#000000', fontStyle:'italic'}}>"settings.py"</span> file add rest framework and app name under <span style={{color: '#000000', fontStyle:'italic'}}>"Installed Apps"</span>.</li>
                  <li>In order to pass the app to Django project we need to setup <span style={{color: '#000000', fontStyle:'italic'}}>"urls.py"</span> file.</li>
                </ul>
                <p style={{color:'#B8001F', paddingLeft:'40px', fontWeight:'bold'}}>Click on the Image to open popup slider.</p>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <img
                  style={imageStyle}
                  src={imagesBox1[0]}
                  alt="Box 1 thumbnail"
                  onClick={() => handleClickOpen(1)}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor:'#ECF4D6'}}>
            <Typography sx={{ marginLeft: '20px', fontSize: '19px',fontWeight: 600, color:'#265073' }}>
              2. Creating React JS Frontend
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box>
                <ul style={{ fontSize: '14px',fontWeight: 600, color:'#2D9596' }}>
                  <li>Create React JS app in the frontend folder.</li>
                  <li>Create a folder named <span style={{color: '#000000', fontStyle:'italic'}}>"components"</span> inside the frontend folder where we will add smaller components which will be used in different pages of our project.</li>
                  <li>In order to connect the frontend to the backend we need to install <span style={{color: '#000000', fontStyle:'italic'}}>"django-cors-header"</span>.</li>
                  <li>In the <span style={{color: '#000000', fontStyle:'italic'}}>"settings.py"</span> file add <span style={{color: '#000000', fontStyle:'italic'}}>"corsheader"</span> under <span style={{color: '#000000', fontStyle:'italic'}}>"Installed Apps"</span> and add <span style={{color: '#000000', fontStyle:'italic'}}>"corsheader.middleware.CorsMiddleware"</span> under <span style={{color: '#000000', fontStyle:'italic'}}>"Middleware"</span>.</li>
                  <li>The CorsMiddleware should be placed as high as possible so that it can add CORS headers to different responses.</li>
                  <li>In order to configure the middleware's behaviour in your Django settings, we need to add <span style={{color: '#000000', fontStyle:'italic'}}>"CORS_ALLOWED_ORIGINS"</span>. In this we will specify all the urls that need to communicate with our Django app (localhost:3000).</li>
                </ul>
              </Box> 
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <img
                  style={imageStyle}
                  src={imagesBox2[0]}
                  alt="Box 1 thumbnail"
                  onClick={() => handleClickOpen(2)}
                />
              </Box>
            </Box>
          </Box>
        </Box>


        <Box sx={{display:"flex", flexDirection:'row', justifyContent:'space-between', marginTop:'20px', gap:'20px'}}>
          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor:'#ECF4D6'}}>
            <Typography sx={{ marginLeft: '20px', fontSize: '19px',fontWeight: 600, color:'#265073' }}>
              3. Page navigation with React Router
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box>
                <ul style={{ fontSize: '14px',fontWeight: 600, color:'#2D9596' }}>
                  <li>Install React Router Dom.</li>
                  <li>Add Browser Router in our main.jsx file.</li>
                  <li>Create JavaScript pages (Home.jsx, Procedure.jsx, Create.jsx).</li>
                  <li>Create Navbar.js file for the navigation bar.</li>
                  <li>Import all the JS files and add Routes in our app.jsx file.</li>
                  <li>Keep the Navbar.jsx file above the Route.</li>
                  <li>Make the Navbar Responsive.</li>
                </ul>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <img
                  style={imageStyle}
                  src={imagesBox3[0]}
                  alt="Box 3 thumbnail"
                  onClick={() => handleClickOpen(3)}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor:'#ECF4D6', gap:'20px'}}>
            <Typography sx={{ marginLeft: '20px', fontSize: '19px',fontWeight: 600, color:'#265073' }}>
              4. Basic CRUD Operations
            </Typography> 
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box>
                <ul style={{ fontSize: '14px',fontWeight: 600, color:'#2D9596' }}>
                  <li>In backend api folder create models.py file for the project.</li>
                  <li>In models.py file create a class <span style={{color: '#000000', fontStyle:'italic'}}>"Project"</span> and define its attributes (name, comments, status, start date, end date, created, modified).</li>
                  <li>Activate virtual environment and Migrate your models.</li>
                  <li>Import models to your addmin.py file and register your models.</li>
                  <li>Create user in order to access your admin portal.</li>
                  <li>Create views.py file to perform different requests to our database by importing Viewsets and permissions in the views.py file.</li>
                  <li>In views.py file first import all from models and then create a class <span style={{color: '#000000', fontStyle:'italic'}}>"ProjectViewset"</span> and define the functions that you want to perform on the database.</li>
                  <li>In urls.py create urls for the different functions.</li>
                  <li>Create serializer.py file .</li>
                  <li>The serializer acts as a bridge and translates the backend to the frontend.</li>
                </ul>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center' }}>
                <img
                  style={imageStyle}
                  src={imagesBox4[0]}
                  alt="Box 4 thumbnail"
                  onClick={() => handleClickOpen(4)}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display:"flex", flexDirection:'row', justifyContent:'space-between', marginTop:'20px', gap:'20px' }}>
          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor:'#ECF4D6'}}>
            <Typography sx={{ marginLeft: '20px', fontSize: '19px',fontWeight: 600, color:'#265073' }}>
              5. Form Creation
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box>
                <ul style={{ fontSize: '14px',fontWeight: 600, color:'#2D9596' }}>
                  <li>In the frontend folder install required packages (material-ui, date-picker, dayjs & react-hook-form).</li>
                  <li>Create a new folder named <span style={{color: '#000000', fontStyle:'italic'}}>"forms"</span> inside the component folder.</li>
                  <li>Create JS files inside the forms folder according to the attributes described in the models.py file. (Textfield for name, Selectfield for status, Datepicker for start/end date, Multilinefield for comments).</li>
                  <li>Add material ui components inside the JS files.</li>
                  <li>Modify forms for React Form Hook.</li>
                  <li>Create form box.</li>
                  <li>Put Forms on the Create.js page.</li>
                  <li>Create submit button and submitting data to the console.</li>
                </ul>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <img
                  style={imageStyle}
                  src={imagesBox5[0]}
                  alt="Box 5 thumbail"
                  onClick={() => handleClickOpen(5)}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor:'#ECF4D6'}}>
            <Typography sx={{ marginLeft: '20px', fontSize: '19px',fontWeight: 600, color:'#265073' }}>
              6. Adding Project manager & Employees
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box>
                <ul style={{fontSize: '14px', fontWeight: 600, color:'#2D9596' }}>
                  <li>In models.py file create a class <span style={{color: '#000000', fontStyle:'italic'}}>"ProjectManager"</span> and define its attributes (name, created, modified).</li>
                  <li>Now create a class <span style={{color: '#000000', fontStyle:'italic'}}>"Employees"</span> and define its attributes (name, created, modified).</li>
                  <li>Activate virtual environment and Migrate your models.</li>
                  <li>Import models to your addmin.py file and register your models.</li>
                  <li>In views.py file first import the newly created models and then create respective classes <span style={{color: '#000000', fontStyle:'italic'}}>"ProjectManagerViewset & EmployeesViewset"</span> and define the functions that you want to perform on the database.</li>
                  <li>Add urls of these function in the urls.py file.</li>
                  <li>Describe these models fields in the serializer.py file .</li>
                </ul>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <img
                  style={imageStyle}
                  src={imagesBox6[0]}
                  alt="Box 6 thumnail"
                  onClick={() => handleClickOpen(6)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth={true}
        sx={{ 
          '& .MuiDialog-paper': {
          maxWidth: '90vw', 
          maxHeight: '90vh',
          width: '80vw', 
          height: '80vh',
          backgroundColor:'transparent',
          }
        }}>
        <Box sx={dialogStyle}>
          <IconButton sx={{backgroundColor:'white'}} onClick={handlePrev} disabled={currentImages.length <= 1}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {currentImages.length > 0 && (
            <img src={currentImages[currentImageIndex]} alt="Selected" style={imgInDialogStyle} />
            )}
          </Box>
          <IconButton sx={{backgroundColor:'white'}} onClick={handleNext} disabled={currentImages.length <= 1}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Dialog>
    </div>
  )
}

export default About
