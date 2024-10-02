import {React, useEffect, useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField';
import MyTextField from './forms/MyTextField';
import MySelectField from './forms/MySelectField';
import MyMultilineField from './forms/MyMultilineField';
import MyMultiSelectField from './forms/MyMultiSelectField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate, useParams} from 'react-router-dom';

const Edit = () => {
  const { id: MyId } = useParams();

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
    
  };

    GetData();
  }, []);

  const navigate = useNavigate();

  const defaultValues = {
    name: '',
    comments: '',
    status: '',
    startDate: null,
    endDate: null,
  };

  const { handleSubmit, setValue, control } = useForm({ defaultValues });

  useEffect(() => {

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
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });


    const GetData = () => {
      AxiosInstance.get(`project/${MyId}`)
        .then((res) => {
          console.log(res.data);
          setValue('name', res.data.name);
          setValue('status', res.data.status);
          setValue('employees', res.data.employees);
          setValue('projectmanager', res.data.projectmanager);
          setValue('comments', res.data.comments);
          setValue('startDate', Dayjs(res.data.start_date));
          setValue('endDate', Dayjs(res.data.end_date));
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the project data:', error);
          setLoading(false);
        });
    };

    GetData();
  }, [MyId, setValue]);

  const submission = (data) => {
    const StartDate = Dayjs(data.startDate).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.endDate).format("YYYY-MM-DD");

    AxiosInstance.put(`project/${MyId}/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      comments: data.comments,
      status: data.status,
      start_date: StartDate,
      end_date: EndDate,
    })
    .then((res) => {
      navigate(`/`)
    })
    .catch(error => {
      console.error('There was an error updating the project:', error);
    });
  };

  return (
    <div>
      {loading ? <p>Loading...</p> :
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px', paddingTop: '19px', paddingBottom: '20px', paddingLeft: '15px'}}>
          <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '19px',fontWeight: 600 }}>
            Edit Records
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

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
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
              label="Project manager"
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
    </div>
  );
};

export default Edit;