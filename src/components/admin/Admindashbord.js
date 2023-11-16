// import React, { useContext } from "react";
// import AuthContext from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
//   Alert,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import {
//   ChevronRightIcon,
//   ChevronDownIcon,
//   CubeTransparentIcon,
// } from "@heroicons/react/24/outline";

// export function Admindashboard() {
//   const [open, setOpen] = React.useState(0);
//   const [openAlert, setOpenAlert] = React.useState(true);
//   const { logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);

//     const handleProperty = () => {
//       navigate("/");
//     };
//     const openuserlist = (e) => {
//       navigate("/");
//     };
//   };
  
//   return (
//     <div className="bg-gray-200 h-screen">
//       <div className="flex">
//         <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
//           <div className="mb-2 p-10">
//             <Typography variant="h5" color="blue-gray">
//               DASHBOARD
//             </Typography>
//           </div>
//           <List>
//             <Accordion
//               open={open === 1}
//               icon={
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`mx-auto h-4 w-4 transition-transform ${
//                     open === 1 ? "rotate-180" : ""
//                   }`}
//                 />
//               }
//             >
//               <ListItem className="p-0" selected={open === 1}>
//                 <AccordionHeader
//                   onClick={() => handleOpen(1)}
//                   className="border-b-0 p-3"
//                 >
//                   <ListItemPrefix>
//                     <PresentationChartBarIcon className="h-5 w-5" />
//                   </ListItemPrefix>
//                   <Typography color="blue-gray" className="mr-auto font-normal">
//                     Admin Dashboard
//                   </Typography>
//                 </AccordionHeader>
//               </ListItem>
//               <AccordionBody className="py-1">
//                 <List className="p-0">
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     TOTAL WALLET MONEY
//                   </ListItem>
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Reporting
//                   </ListItem>
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Projects
//                   </ListItem>
//                 </List>
//               </AccordionBody>
//             </Accordion>
//             <Accordion
//               open={open === 2}
//               icon={
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`mx-auto h-4 w-4 transition-transform ${
//                     open === 2 ? "rotate-180" : ""
//                   }`}
//                 />
//               }
//             >
//               <ListItem className="p-0" selected={open === 2}>
//                 <AccordionHeader
//                   onClick={() => handleOpen(2)}
//                   className="border-b-0 p-3"
//                 >
//                   <ListItemPrefix>
//                     <ShoppingBagIcon className="h-5 w-5" />
//                   </ListItemPrefix>
//                   <Typography color="blue-gray"  className="mr-auto font-normal">
//                     Properties
//                   </Typography>
//                 </AccordionHeader>
//               </ListItem>
//               <AccordionBody className="py-1">
//                 <List className="p-0">
//                   {/* <ListItem
//                     onClick={(e) => {
//                       navigate("/Addproperty");
//                     }}
//                   >
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Add Properties
//                   </ListItem> */}
//                   <ListItem onClick={(e)=>navigate("/propertylist")}>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix >
//                     Properties
//                   </ListItem>
//                 </List>
//               </AccordionBody>
//             </Accordion>
//             <hr className="my-2 border-blue-gray-50" />
//             <ListItem onClick={(e) => navigate("/userlist")}>
//               <ListItemPrefix>
//                 <InboxIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Users
//               <ListItemSuffix>
//                 {/* <Chip
//                   value="14"
//                   size="sm"
//                   variant="ghost"
//                   color="blue-gray"
//                   className="rounded-full"
//                 /> */}
//               </ListItemSuffix>
//             </ListItem>
//             <ListItem onClick={(e) => navigate("/bookinglistall")}>
//               <ListItemPrefix>
//                 <InboxIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Booking List
//               <ListItemSuffix>
             
//               </ListItemSuffix>
//             </ListItem>
//             <ListItem onClick={(e) => navigate("/pendingproperty")}>
//               <ListItemPrefix>
//                 <UserCircleIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Verification Request
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <Cog6ToothIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Settings
//             </ListItem>
//             <ListItem onClick={logoutUser}>
//               <ListItemPrefix>
//                 <PowerIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Log Out
//             </ListItem>
//           </List>
//         </Card>
//         <div className="ml-4 p-4">
//           {/* Content to display to the right of the sidebar */}
    
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admindashboard;


import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems} from './Listitems'
import Chart from './Chart';
import Deposits from './Deposit';
import Orders from './Booking';

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Admindashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar> */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            {/* < sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </div>
  );
}
export default Admindashboard