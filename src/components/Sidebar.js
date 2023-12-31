import React, { useState } from 'react'; // Add 'React' here
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { SidebarContext, SubMenu } from 'react-pro-sidebar';
import { logout } from '../state/actions/authActions';


// Import other icons and components as needed
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';



const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
  
    <MenuItem
      active={selected === title}
      // style={{
      //   color: 'black',
      //   backgroundColor: selected === title ? colors.active : 'transparent',
      //   fontWeight: 'bold',
      //   borderRadius: '5px',
      // }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title.toUpperCase()}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const deliveryAgent = useSelector((state) => state.auth.deliveryAgent)
  const currentLoc = useLocation().pathname.split('/')[1]

  const [selected, setSelected] = useState(
    currentLoc === 'auth'
      ? deliveryAgent == null
        ? 'dashboard'
        : 'pickup'
      : currentLoc
  )

  const dispatch = useDispatch()

  return (
    <Box
      id='sidebar'
      sx={{
        // '& .pro-sidebar-inner': {
        //   background: `${colors.primary} !important`,
        // },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
      }}
    >
      <Sidebar collapsed={false}>
        <SidebarContext>
          <Menu iconShape='square'>
            <MenuItem
              style={{
                margin: '10px 0 20px 0',
                color: 'black',
              }}
            >
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography
                  variant='h5'
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  CourierTnM
                </Typography>
                <img
                  src=''              
                    alt='DROPOFF'
                  height={75}
                />
              </Box>
            </MenuItem>

            <Box mb='25px'>
  
              </Box>
            {deliveryAgent ? (
              <Box>
                <Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
                  <Item
                    title='pickup'
                    to='/pickup'
                    icon={<AppRegistrationOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
                  <Item
                    title='deliver'
                    to='/deliver'
                    icon={<DeliveryDiningOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Box>
            ) : (
              <Box>
                <Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
                  <Item
                    title='dashboard'
                    to='/dashboard'
                    icon={<HomeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>

                <Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
                  <Item
                    title='profile'
                    to='/profile'
                    icon={<ManageAccountsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>

                <Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
                  <Item
                    title='couriers'
                    to='/couriers'
                    icon={<LocalShippingOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
                  <Item
                    title='track'
                    to='/track/courier'
                    icon={<ShareLocationOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Box>
            )}
          </Menu>
        </SidebarContext>
        <SubMenu>
          <Menu iconShape='square'>
            <MenuItem
              active={selected === 'Logout'}
              onClick={() => dispatch(logout())}
              icon={
                <LogoutOutlinedIcon
                  sx={{
                    color: 'black',
                  }}
                />
              }
            >
              <Typography color={'black'}>{'Logout'}</Typography>
            </MenuItem>
          </Menu>
        </SubMenu>
      </Sidebar>
    </Box>
  )
}

export default Sidebar
