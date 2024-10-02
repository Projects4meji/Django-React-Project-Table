import {React, useEffect, useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import AxiosInstance from './Axios';
import {useNavigate, useParams} from 'react-router-dom';

const Delete = () => {
  const MyParam = useParams();
  const MyId = MyParam.id
  const navigate = useNavigate();

  const [myData, setMyData] = useState([])
  const [loading, setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`)
      .then((res) => {
        setMyData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[] );

  const submission = (data) => {
    AxiosInstance.delete(`project/${MyId}/`, {})

    .then((res) => {
      navigate(`/`)
    })
    .catch(error => {
      console.error('There was an error updating the project:', error);
    });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px', paddingTop: '19px', paddingBottom: '20px', paddingLeft: '15px'}}>
        <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '19px',fontWeight: 600 }}>
          Delete project: {myData.name}
        </Typography>
      </Box>

      {loading ? <p>Loading...</p> : 
        
      <div>

        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
            Are you sure you want to delete project: {myData.name}
          </Box>

          <Box sx={{display:'flex', width: '5%', justifyItems:'center', textAlign:'center' }}>

            <Button color="error" variant="contained" onClick={submission} sx={{ width: '100%', display:'flex', justifyItems:'center' }}>
              Delete
            </Button>

          </Box>

        </Box>

      </div>

      }

    </div>
  );
};

export default Delete;