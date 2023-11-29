import  React,{useState,useEffect} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Axiosinstance from '../../services/Axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
    const [wallet,setWallet]=useState(0)
    useEffect(()=>{
        const fetchUserList = async () => {
            try {
              const response =await Axiosinstance.get(`booking/totalreveniue/`);
              console.log("response.data",response.data)
              setWallet(response.data);
              
              
      
            } catch (error) {
              console.error('Error fetching data:', error);
              
              
            }
          };
          
          fetchUserList();
        }, []);

  return (
    <React.Fragment>
      <Title>Total Revenue</Title>
      <Typography component="p" variant="h4">
      Rs: {wallet}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}