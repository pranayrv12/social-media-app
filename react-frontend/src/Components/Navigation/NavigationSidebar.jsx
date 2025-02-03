import React from 'react'
import { useState } from 'react'
import XIcon from '@mui/icons-material/X'
import image3 from '../Images/image3.png'
import PostModal from '../Home/PostModal'
import { navigationMenu } from './NavigationMenu'
import PremiumModal from '../Premium/PremiumModal'
import { changeTheme } from '../../Store/Theme/Action'
import { useDispatch, useSelector } from 'react-redux'
import ContrastIcon from '@mui/icons-material/Contrast'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutUser } from '../../Store/Authentication/Action'
import { Box, Menu, Avatar, Button, MenuItem, IconButton, Typography } from '@mui/material'

export default function NavigationSidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [anchorEl, setAnchorEl] = useState(null)
    const [activeMenu, setActiveMenu] = useState(null)

    const { auth, theme } = useSelector(store => store)

    const [openPostModal, setPostModal] = useState(false)
    const [openPremiumModal, setPremiumModal] = useState(false)

    const handleCloseMenu = () => { setAnchorEl(null) }
    const handleOpenPostModal = () => setPostModal(true)
    const handleClosePostModal = () => setPostModal(false)
    const handleOpenPremiumModal = () => setPremiumModal(true)
    const handleClosePremiumModal = () => setPremiumModal(false)

    const handleLogout = () => {
        dispatch(logoutUser())
        handleCloseMenu()
    }
    const openLogoutMenu = Boolean(anchorEl)

    const handleOpenLogoutMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleMenuClick = (menu) => {
        setActiveMenu(menu.title)

        if (menu.title === "Profile") {
            navigate(`/profile/${auth.user?.id}`)
        } else if (menu.title === "Premium") {
            if (auth.user?.premium === false) {
                handleOpenPremiumModal()
            } else {
                navigate(`/premium/${auth.user?.premiumPlanType}`)
            }
        } else {
            navigate(menu.path)
        }
    }
    const handleChangeTheme = () => {
        dispatch(changeTheme(theme.currentTheme === 'dark' ? 'light' : 'dark'))
        handleCloseMenu()
    }

    return (
        <div style={{ top: '0rem', height: '100vh', overflowY: 'auto', position: 'sticky' }}>
            <div>
                <IconButton
                    disableRipple
                    onClick={() => navigate("/home")}
                    sx={{
                        borderRadius: '50%',
                        marginTop: '0.36rem',
                        marginBottom: '0.8rem',
                        backgroundColor: 'transparent',
                        '&:hover': { backgroundColor: '#FFFFFF16' }
                    }}
                >
                    <XIcon sx={{ color: '#FFFFFF', fontSize: '2rem' }}></XIcon>
                </IconButton>
                <div className='space-y-3'>
                    {navigationMenu.map((menu) => (
                        <div key={menu.title}>
                            <IconButton
                                disableRipple
                                className='space-x-3'
                                sx={{
                                    outline: 'none',
                                    paddingX: '26px',
                                    paddingY: '10px',
                                    cursor: 'pointer',
                                    borderRadius: '30px',
                                    alignItems: 'center',
                                    '&:hover': {
                                        outline: 'none',
                                        paddingX: '26px',
                                        paddingY: '10px',
                                        borderRadius: '30px',
                                        backgroundColor: '#FFFFFF16'
                                    }
                                }}
                                onClick={() => handleMenuClick(menu)}
                            >
                                {menu.icon}
                                <Typography
                                    variant='body1'
                                    sx={{
                                        top: '2px',
                                        fontSize: '1.34rem',
                                        position: 'relative',
                                        fontWeight: (activeMenu === menu.title) || (location.pathname === menu.path) ? 'bold' : 'normal'
                                    }}
                                >
                                    {menu.title}
                                </Typography>
                            </IconButton>
                        </div>
                    ))}
                </div>
                <Button
                    type='submit'
                    variant='contained'
                    onClick={handleOpenPostModal}
                    sx={{
                        width: '240px',
                        color: '#000000',
                        fontSize: '15px',
                        padding: '0.80rem',
                        fontWeight: 'bold',
                        marginTop: '1.8rem',
                        borderRadius: '30px',
                        backgroundColor: '#FFFFFF',
                        '&:hover': { backgroundColor: '#DCDCDC' }
                    }}
                >
                    Post
                </Button>
            </div>
            <div style={{ marginTop: '1.8rem' }}>
                <Button
                    onClick={handleOpenLogoutMenu}
                    sx={{
                        width: '96%',
                        padding: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '50px',
                        justifyContent: 'space-between',
                        '&:hover': { backgroundColor: '#FFFFFF16' }
                    }}
                >
                    <div style={{ gap: '0.75rem', display: 'flex', alignItems: 'center' }}>
                        <Avatar alt='username' src={auth.user?.profileImage} sx={{ marginLeft: '0.1rem', marginBottom: '0.2rem' }}></Avatar>
                        <Box style={{ display: 'flex', marginTop: '-0.5rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        fontSize: '0.96rem',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {auth.user?.name}
                                </Typography>
                                {auth.user?.premium && (
                                    <img src={image3} style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.3rem' }}></img>
                                )}
                            </div>
                            <Typography
                                variant='body1'
                                sx={{
                                    lineHeight: 1,
                                    color: '#787878',
                                    fontSize: '0.96rem',
                                    textTransform: 'lowercase'
                                }}
                            >
                                @{auth.user?.name.split(' ').join('_').toLowerCase()}
                            </Typography>
                        </Box>
                    </div>
                    <MoreHorizIcon sx={{ color: '#FFFFFF' }}></MoreHorizIcon>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={openLogoutMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    onClose={handleCloseMenu}
                    id='Navigation Sidebar Menu'
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
                        onClick={handleChangeTheme}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '0.96rem',
                            paddingX: '0.80rem',
                            paddingY: '0.70rem',
                            '&:hover': {
                                backgroundColor: '#FFFFFF16'
                            }
                        }}
                    >
                        <ContrastIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem', marginRight: '10px' }}></ContrastIcon>Change Theme
                    </MenuItem>
                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '0.96rem',
                            paddingX: '0.80rem',
                            paddingY: '0.70rem',
                            '&:hover': {
                                backgroundColor: '#FFFFFF16'
                            }
                        }}
                    >
                        Log out @{auth.user?.name.split(' ').join('_').toLowerCase()}
                    </MenuItem>
                </Menu>
            </div>
            <section>
                <PostModal open={openPostModal} handleClose={handleClosePostModal}></PostModal>
            </section>
            <section>
                <PremiumModal open={openPremiumModal} handleClose={handleClosePremiumModal}></PremiumModal>
            </section>
        </div>
    )
}
