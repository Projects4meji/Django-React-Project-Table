import React, { useState, useEffect, useMemo } from 'react'
import AxiosInstance from './Axios';
import {MaterialReactTable} from 'material-react-table';
import { Box, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Dayjs from 'dayjs';


const Home = () => {

  const [myData, setMyData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
  const GetData = () => {
    AxiosInstance.get('project/')
      .then((res) => {
        setMyData(res.data);
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


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
        size: 200,
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
        header: 'Start date',
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format('DD-MM-YYYY'),
        header: 'End date',
        size: 150,
      },
    ],
    [],
  );

  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px', paddingTop: '19px', paddingBottom: '20px', paddingLeft: '15px'}}>
        <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '19px',fontWeight: 600 }}>
          My Projects Table
        </Typography>
      </Box>
      {loading ? <p>Loading...</p> :
        <MaterialReactTable 
          columns={columns} 
          data={myData} 
          enableRowActions
          renderRowActions={({row}) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
              color="primary"
              component={Link} to={`edit/${row.original.id}`}
              >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              component={Link} to={`delete/${row.original.id}`}
              >
              <DeleteIcon />
            </IconButton>

          </Box> 
          )}
        />
      }
    </div>
  )
}

export default Home

