import React from 'react'
import { useEffect } from 'react'
import image3 from '../Images/image3.png'
import DoneIcon from '@mui/icons-material/Done'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { activatePremium } from '../../Store/Payment/Action'
import BackdropComponent from '../Backdrop/BackdropComponent'
import PremiumBackground from '../Images/PremiumBackground.png'
import { retrieveUserProfile } from '../../Store/Authentication/Action'

export default function PremiumSuccessPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { planType } = useParams()
    const jwt = localStorage.getItem('jwt')

    const { auth } = useSelector(store => store)

    const handleUpdateUser = () => {
        dispatch(retrieveUserProfile(jwt)).then(() => {
            navigate(`/profile/${auth.user.id}`)
        })
    }
    useEffect(() => {
        if (planType && auth.user && !auth.user.premium) {
            dispatch(activatePremium(planType))
        }
    }, [dispatch, planType, auth.user])

    if (!auth.user) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
    }

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundSize: 'cover',
                backgroundColor: '#000000',
                backgroundImage: `url(${PremiumBackground})`
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '7.5rem' }}>
                <Typography variant='h1' sx={{ fontSize: '4.5rem', fontWeight: 'bold' }}>
                    Premium Activated
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={image3} style={{ width: '4rem', height: '4rem', marginLeft: '0.8rem' }}></img>
                </div>
            </div>
            <Typography variant='h6' sx={{ color: '#787878', fontSize: '1.4rem', marginTop: '1rem' }}>
                Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.
            </Typography>
            <section style={{ display: 'flex', marginTop: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: 330,
                        height: 370,
                        display: 'flex',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        flexDirection: 'column',
                        backgroundColor: '#1F2226',
                        border: '2px solid #1DA1F2'
                    }}
                >
                    <Typography variant='h4' sx={{ color: '#1DA1F2', fontSize: '1.4rem', fontWeight: 'bold' }}>
                        {planType === 'annual' ? 'Annual Plan' : 'Monthly Plan'}
                    </Typography>
                    <div style={{ display: 'flex', marginTop: '0.5rem', flexDirection: 'row', alignItems: 'baseline' }}>
                        <Typography variant='h4' sx={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
                            {planType === 'annual' ? '₹566.67' : '₹650'}&nbsp;
                        </Typography>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            / Month
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', flexDirection: 'row' }}>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            {planType === 'annual' ? '₹6,800 Billed Annually' : 'Billed Monthly'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.62rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Checkmark
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Longer Posts
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Highlights Tab
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Large Reply Boost
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Post Longer Videos
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Background Video Playback
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                        <DoneIcon sx={{ color: '#1DA1F2', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                            Half Ads In For You and Following
                        </Typography>
                    </div>
                </Box>
            </section>
            <Button
                variant='contained'
                onClick={handleUpdateUser}
                sx={{
                    height: '42px',
                    width: '330px',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    marginTop: '2.5rem',
                    borderRadius: '30px',
                    backgroundColor: '#1DA1F2',
                    '&:hover': { backgroundColor: '#1D8CD6' }
                }}
            >
                View Your Profile
            </Button>
        </div>
    )
}
