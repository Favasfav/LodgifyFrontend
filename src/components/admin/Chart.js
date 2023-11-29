import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useEffect ,useState} from 'react';
import Axiosinstance from '../../services/Axios';


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('01-05', 300),
  createData('05-10', 600),
  createData('10-15', 800),
  createData('15-20', 1500),
  createData('25:31', 2000),
  
  createData('31', undefined),
];

export default function Chart() {
  const [booking,setbooking]=useState([])
  useEffect(()=>{
    const fetchbooking=async()=>{
      try {
await Axiosinstance.get("booking/salesreport").then((response)=>{
setbooking(response.data)
})

      }
      catch{

      }
    }
fetchbooking()

  },[])
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Monthy Booking</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
          
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          > 
          <Label
        
              angle={360}
              position="start"
              style={{
                padding:'3px',
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
            Date
            </Label>
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}