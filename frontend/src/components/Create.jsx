import React, { useState, useEffect } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField';
import MyTextField from './forms/MyTextField';
import MySelectField from './forms/MySelectField';
import MyMultilineField from './forms/MyMultilineField';
import MyMultiSelectField from './forms/MyMultiSelectField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';

const Create = () => {

  const [projectmanager, setProjectmanager] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const hardcoded_options = [
    {id: '', name: 'None'},
    {id: 'Open', name: 'Open'},
    {id: 'In progress', name: 'In progress'},
    {id: 'Completed', name: 'Completed'},
  ]
  
  useEffect(() => {
  const GetData = () => {
    AxiosInstance.get('projectmanager/')
      .then((res) => {
        setProjectmanager(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });

      AxiosInstance.get('employees/')
      .then((res) => {
        setEmployees(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);  // Ensure loading state is cleared on error
      });
  };

    GetData();
  }, []);


  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const defaultValues = {
    name: '',
    comments: '',
    status: '',
    startDate: null,
    endDate: null,
  };

  const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    projectmanager: yup.string().required('Project manager is required'),
    status: yup.string().required('Status is required'),
    employees: yup.array().min(1, 'Pick atleast one option'),
    comments: yup.string(),
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date().required('End date is required').min(yup.ref('startDate'),'The end date cannot be before the start date'),
  })

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const { handleSubmit, reset, control } = useForm({ defaultValues, resolver: yupResolver(schema)});

  const submission = (data) => {
    const StartDate = Dayjs(data.startDate).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.endDate).format("YYYY-MM-DD");

    AxiosInstance.post(`project/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      comments: data.comments,
      employees: data.employees,
      status: data.status,
      start_date: StartDate,
      end_date: EndDate,
    })
    .then((res) => {
      navigate(`/`)
      reset(defaultValues);
    })
    .catch(error => {
      setSnackbarMessage('There was an error submitting the project.');
      setOpenSnackbar(true);
      console.error('There was an error submitting the project:', error);
    });
  };

  return (
    <div>
      {loading ? <p>Loading...</p> :
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px', paddingTop: '19px', paddingBottom: '20px', paddingLeft: '15px'}}>
          <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '19px',fontWeight: 600 }}>
            Create Records
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MyTextField
              label="Name"
              name="name"
              control={control}
              placeholder="Provide a project name"
              width={'20%'}
            />

            <MyMultilineField
              label="Comments"
              name="comments"
              control={control}
              placeholder="Provide project comments"
              width={'20%'}
            />

            <MySelectField
              label="Status"
              name="status"
              control={control}
              width={'20%'}
              options={hardcoded_options}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <MyDatePickerField
              label="Start Date"
              name="startDate"
              control={control}
              width={'20%'}
            />

            <MyDatePickerField
              label="End Date"
              name="endDate"
              control={control}
              width={'20%'}
            />

            <MySelectField
              label="Projectmanager"
              name="projectmanager"
              control={control}
              width={'20%'}
              options={projectmanager}
            />
          </Box> 

          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop:'40px'}}>

            <MyMultiSelectField
              label="Employees"
              name="employees"
              control={control}
              width={'20%'}
              options={employees}
            />
          </Box>

          <Box sx={{display:'flex', justifyContent:'center', marginTop:'40px'}}>
            <Button variant="contained" type="submit" sx={{ width: '10%'}}>
              Submit
            </Button>
        </Box> 
        </Box>

        

      </form>
      }

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Create;