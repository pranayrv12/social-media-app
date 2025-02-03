import React from 'react'
import { useEffect } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import { useSelector } from 'react-redux'
import XIcon from '@mui/icons-material/X'
import CloseIcon from '@mui/icons-material/Close'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Modal, Button, IconButton, Typography } from '@mui/material'

const style = {
    top: '50%',
    width: 600,
    left: '50%',
    border: 'none',
    outline: 'none',
    borderRadius: 4,
    overflowY: 'auto',
    position: 'absolute',
    paddingBottom: '1.5rem',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

export default function AuthModal({ open, handleClose }) {
    const location = useLocation()
    const navigate = useNavigate()

    const { auth } = useSelector(store => store)

    useEffect(() => {
        if (auth.user?.name) {
            handleClose()
        }
    }, [auth.user])

    const handleNavigate = () => {
        const path = location.pathname === "/signin" ? "/signup" : "/signin"
        navigate(path)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='Auth Modal'
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(35, 44, 51, 0.65)'
                    }
                }}
            >
                <Box sx={style}>
                    <section
                        style={{
                            top: 0,
                            zIndex: 50,
                            position: 'sticky',
                            alignItems: 'center',
                            backgroundColor: '#00000098'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                paddingTop: '0.50rem',
                                paddingBottom: '0.50rem',
                                justifyContent: 'space-between'
                            }}
                        >
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    color: '#FFFFFF',
                                    borderRadius: '50%',
                                    marginLeft: '0.50rem',
                                    backgroundColor: 'transparent',
                                    transition: 'background-color 0.2s ease',
                                    '&:hover': { backgroundColor: '#FFFFFF16' }
                                }}
                            >
                                <CloseIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></CloseIcon>
                            </IconButton>
                            <XIcon
                                sx={{
                                    left: '50%',
                                    color: '#FFFFFF',
                                    fontSize: '2rem',
                                    position: 'absolute',
                                    transform: 'translateX(-50%)'
                                }}>
                            </XIcon>
                        </div>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ width: '73.6%', textAlign: 'left', marginTop: '1.2rem' }}>
                            <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.90rem' }}>
                                {location.pathname === "/signin" ? "Sign In To Your Account" : "Create Your Account"}
                            </Typography>
                        </div>
                        <div style={{ width: '81.2%', display: 'flex', marginTop: '2rem', alignItems: 'center', flexDirection: 'column' }}>
                            {location.pathname === "/signin" ? <SignInForm></SignInForm> : <SignUpForm></SignUpForm>}
                        </div>
                        <div style={{ width: '73.6%', textAlign: 'left', marginTop: '1.20rem' }}>
                            <Typography variant='h6' sx={{ color: '#787878', fontWeight: 'bold', fontSize: '1.20rem' }}>
                                {location.pathname === "/signin" ? "Don't have an account?" : "Already have an account?"}
                            </Typography>
                        </div>
                        <Button
                            variant='outlined'
                            onClick={handleNavigate}
                            sx={{
                                width: '73.6%',
                                color: '#FFFFFF',
                                fontSize: '15px',
                                padding: '0.80rem',
                                fontWeight: 'bold',
                                marginTop: '1.20rem',
                                borderRadius: '30px',
                                backgroundColor: '#000000',
                                '&:hover': { backgroundColor: '#FFFFFF16' }
                            }}
                        >
                            {location.pathname === "/signin" ? "Sign Up" : "Sign In"}
                        </Button>
                    </section>
                </Box>
            </Modal>
        </div>
    )
}
