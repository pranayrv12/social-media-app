import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationCard from './NotificationCard'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useDispatch, useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BackdropComponent from '../Backdrop/BackdropComponent'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Menu, MenuItem, IconButton, Typography } from '@mui/material'
import { deleteUserNotifications, retrieveUserNotifications, markAllUserNotificationsAsRead } from '../../Store/Authentication/Action'

export default function NotificationsPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBack = () => navigate(-1)
    const [anchorEl, setAnchorEl] = useState(null)

    const { auth, theme } = useSelector(store => store)

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const openMenu = Boolean(anchorEl)

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    useEffect(() => {
        dispatch(retrieveUserNotifications())
    }, [dispatch])

    const handleDeleteUserNotifications = () => {
        dispatch(deleteUserNotifications())
        handleCloseMenu()
    }
    const handleMarkAllUserNotificationsAsRead = () => {
        dispatch(markAllUserNotificationsAsRead())
        handleCloseMenu()
    }

    return (
        <div>
            <section
                style={{
                    top: 0,
                    zIndex: 50,
                    display: 'flex',
                    position: 'sticky',
                    alignItems: 'center',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: '#00000080',
                    justifyContent: 'space-between',
                    borderBottom: auth.notifications.length > 0 ? 'none' : '1px solid #303030'
                }}
            >
                <section style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            marginTop: '0.5rem',
                            marginLeft: '0.5rem',
                            marginBottom: '0.5rem',
                            backgroundColor: 'transparent',
                            '&:hover': { backgroundColor: '#FFFFFF16' }
                        }}
                    >
                        <ArrowBackIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></ArrowBackIcon>
                    </IconButton>
                    <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginLeft: '1.7rem' }}>Notifications</Typography>
                </section>
                {auth.notifications.length > 0 && (
                    <React.Fragment>
                        <IconButton
                            onClick={handleOpenMenu}
                            sx={{
                                color: '#FFFFFF',
                                borderRadius: '50%',
                                marginTop: '0.5rem',
                                marginRight: '0.5rem',
                                marginBottom: '0.5rem',
                                backgroundColor: 'transparent',
                                '&:hover': { backgroundColor: '#FFFFFF16' }
                            }}
                        >
                            <SettingsIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></SettingsIcon>
                        </IconButton>
                        <Menu
                            open={openMenu}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            onClose={handleCloseMenu}
                            id='Notifications Page Menu'
                            MenuListProps={{
                                'aria-labelledby': 'basic-button'
                            }}
                            sx={{
                                '& .MuiMenu-list': {
                                    backgroundColor: '#000000'
                                },
                                '& .MuiMenu-paper': {
                                    color: '#FFFFFF',
                                    minWidth: '270px',
                                    borderRadius: '12px',
                                    boxShadow: '0px 0px 10px #787878'
                                }
                            }}
                        >
                            <MenuItem
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '0.96rem',
                                    paddingX: '0.80rem',
                                    paddingY: '0.70rem',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF16'
                                    }
                                }}
                                onClick={handleMarkAllUserNotificationsAsRead}
                            >
                                <DoneAllIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem', marginRight: '10px' }}></DoneAllIcon>Mark All As Read
                            </MenuItem>
                            <MenuItem
                                onClick={handleDeleteUserNotifications}
                                sx={{
                                    color: '#CB202D',
                                    fontWeight: 'bold',
                                    fontSize: '0.96rem',
                                    paddingX: '0.80rem',
                                    paddingY: '0.70rem',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF16'
                                    }
                                }}
                            >
                                <DeleteOutlineIcon sx={{ color: '#CB202D', fontSize: '1.30rem', marginRight: '10px' }}></DeleteOutlineIcon>Delete All Notifications
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </section>
            {auth.notifications.length > 0 ? (
                <div style={{ borderBottom: '1px solid #303030' }}>
                    {auth.notifications.map((notification) => (
                        <NotificationCard notification={notification}></NotificationCard>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                        Your Recent Notifications
                    </Typography>
                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                        Stay up to date with the latest notifications so you never miss out on what's happening.
                    </Typography>
                </div>
            )}
            <section>
                <BackdropComponent open={auth.loading}></BackdropComponent>
            </section>
        </div>
    )
}
