import React, { useEffect, useState } from 'react';
import Axiosinstance from '../../services/Axios';
import ReactApexChart from 'react-apexcharts';

export default function Chart() {
  const [orderstatus, setOrderstatus] = useState({});
  const [confirmorder, setConfirmorder] = useState(0);
  const [cancelorder, setCancelorder] = useState(0);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Confirmed Booking ', 'Cancelled Booking '],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await Axiosinstance.get('booking/salesreport/');
        console.log("object saleslist", response.data);
        setOrderstatus(response.data);
        setCancelorder(response.data.cancelled_obj_count);
        setConfirmorder(response.data.confirem_obj_count);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBooking();
  }, []);

  const series = [confirmorder, cancelorder];

  return (
    <div>
      <p>Booking Status</p>
      {orderstatus ? (
        <div id="chart" className='mt-1'>
          <ReactApexChart options={options} series={series} type="pie" width={350} />
        </div>
      ) : (
        <p>No Booking</p>
      )}
    </div>
  );
}
