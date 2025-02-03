import React from 'react'
import AuthModal from './AuthModal'
import image6 from '../Images/image6.png'
import { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import { Grid, Button, Divider, Typography } from '@mui/material'
import { signInUserWithGoogle } from '../../Store/Authentication/Action'

export default function AuthenticationPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { auth } = useSelector(store => store)

    const [openAuthModal, setOpenAuthModal] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)

    const handleCloseModal = () => {
        setOpenAuthModal(false)
        navigate("/")
    }
    const handleOpenModal = (path) => {
        setOpenAuthModal(true)
        navigate(path)
    }
    const handleSignInUserWithGoogle = (loginData) => {
        dispatch(signInUserWithGoogle(loginData))
    }
    useEffect(() => {
        if (location.pathname === "/signin" || location.pathname === "/signup") {
            setOpenAuthModal(true)
        }
    }, [location.pathname])
    useEffect(() => {
        if (auth.error && (location.pathname === "/signin" || location.pathname === "/signup")) {
            setOpenSnackBar(true)
        } else {
            setOpenSnackBar(false)
        }
    }, [auth.error, location.pathname])

    return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid container sx={{ overflowY: 'hidden' }}>
                <Grid lg={6.6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={image6} style={{ marginBottom: '3rem', marginRight: '1.1rem' }}></img>
                </Grid>
                <Grid item xs={12} lg={5.4} className='px-4'>
                    <Typography variant='h6' sx={{ fontSize: '4.5rem', fontWeight: 'bold', marginTop: '14rem' }}>Happening Now</Typography>
                    <Typography variant='h6' sx={{ fontSize: '2.125rem', fontWeight: 'bold', marginTop: '1.4rem', marginBottom: '1.5rem' }}>Join Today.</Typography>
                    <div style={{ width: '300px' }}>
                        <div>
                            <GoogleLogin
                                width={300}
                                shape='pill'
                                text='signin_with'
                                logo_alignment='center'
                                onSuccess={handleSignInUserWithGoogle}
                                onError={() => { console.log('Login Failed') }}>
                            </GoogleLogin>
                            <div className='py-2' style={{ display: 'flex', alignItems: 'center' }}>
                                <Divider sx={{ flexGrow: 1 }}></Divider>
                                <Typography variant='body2' className='px-2' sx={{ color: '#FFFFFF' }}>OR</Typography>
                                <Divider sx={{ flexGrow: 1 }}></Divider>
                            </div>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={() => handleOpenModal("/signup")}
                                sx={{
                                    height: '42px',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    borderRadius: '30px',
                                    backgroundColor: '#1DA1F2',
                                    '&:hover': { backgroundColor: '#1D8CD6' }
                                }}
                            >
                                Create Account
                            </Button>
                            <Typography variant='body1' sx={{ fontSize: '0.66rem', marginTop: '0.35rem' }}>
                                <span style={{ color: '#787878' }}>By signing up, you agree to the</span>{' '}
                                <span style={{ color: '#1DA1F2', cursor: 'pointer' }}>Terms of Service</span>{' '}
                                <span style={{ color: '#787878' }}>and</span>{' '}
                                <span style={{ color: '#1DA1F2', cursor: 'pointer' }}>Privacy Policy,</span>{' '}
                                <span style={{ color: '#787878' }}>including</span>{' '}
                                <span style={{ color: '#1DA1F2', cursor: 'pointer' }}>Cookie Use.</span>
                            </Typography>
                        </div>
                        <div style={{ marginTop: '3.5rem' }}>
                            <Typography variant='h6' sx={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Already have an account?</Typography>
                            <Button
                                fullWidth
                                variant='outlined'
                                onClick={() => handleOpenModal("/signin")}
                                sx={{
                                    height: '42px',
                                    color: '#1DA1F2',
                                    fontWeight: 'bold',
                                    borderRadius: '30px',
                                    '&:hover': { backgroundColor: '#1DA1F21A' }
                                }}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <footer
                style={{
                    left: 0,
                    right: 0,
                    display: 'flex',
                    margin: '0 auto',
                    bottom: '0.8rem',
                    flexWrap: 'flex',
                    position: 'fixed',
                    maxWidth: '1570px',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>About</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Download the X App</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Help Center</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Terms of Service</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Privacy Policy</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Cookie Policy</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Accessibility</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Ads Info</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Blog</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Careers</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Brand Resources</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Advertising</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Marketing</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>X for Business</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Developers</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Directory</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem', '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Settings</Typography>
                <Typography variant='caption' sx={{ color: '#787878', fontSize: '0.84rem' }}>© 2025 X Corp.</Typography>
            </footer>
            <section>
                <AuthModal open={openAuthModal} handleClose={handleCloseModal}></AuthModal>
            </section>
            <section>
                <SnackbarComponent
                    severity={'error'}
                    open={openSnackBar}
                    handleClose={handleSnackBar}
                    message={location.pathname === "/signin" ? 'Invalid Email ID, or Password!' : 'Another Account is already associated with this Email ID!'}>
                </SnackbarComponent>
            </section>
        </div>
    )
}
