import React from 'react'
import { useDispatch } from 'react-redux'
import { Fragment, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { generatePaymentLink } from '../../Store/Payment/Action'
import { Box, Modal, Button, IconButton, Typography, ButtonGroup } from '@mui/material'

const style = {
    top: '50%',
    width: 600,
    left: '50%',
    border: 'none',
    outline: 'none',
    borderRadius: 4,
    overflowY: 'auto',
    position: 'absolute',
    paddingBottom: '2rem',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

export default function PremiumModal({ open, handleClose }) {
    const dispatch = useDispatch()

    const [selectedPlan, setSelectedPlan] = useState('annual')

    const handleSelect = (plan) => {
        setSelectedPlan(plan)
    }
    const handleGeneratePaymentLink = () => {
        dispatch(generatePaymentLink(selectedPlan))
    }

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='Premium Modal'
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
                            <Typography
                                variant='h4'
                                sx={{
                                    left: '50%',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    fontSize: '1.50rem',
                                    position: 'absolute',
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                Upgrade to Premium
                            </Typography>
                        </div>
                    </section>
                    <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant='h6' sx={{ color: '#787878', textAlign: 'center', fontSize: '1.125rem' }}>
                            Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.
                        </Typography>
                        <Box sx={{ display: 'flex', marginTop: '0.8rem', alignItems: 'center', justifyContent: 'center' }}>
                            <ButtonGroup
                                disableElevation
                                variant='contained'
                                sx={{
                                    borderRadius: '30px',
                                    backgroundColor: '#1F2226',
                                    border: '2px solid #1F2226',
                                    '& .MuiButton-root': {
                                        border: 'none',
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        borderRadius: '30px',
                                        backgroundColor: '#1F2226',
                                        '&:hover': {
                                            backgroundColor: '#1F2226'
                                        }
                                    },
                                    '& .MuiButton-root.Mui-selected': {
                                        border: 'none',
                                        color: '#FFFFFF',
                                        backgroundColor: '#000000',
                                        '&:hover': {
                                            backgroundColor: '#000000'
                                        }
                                    }
                                }}
                            >
                                <Button
                                    disableRipple
                                    onClick={() => handleSelect('annual')}
                                    className={selectedPlan === 'annual' ? 'Mui-selected' : ''}
                                >
                                    Annual
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#B5E3D0',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            marginLeft: '0.5rem',
                                            borderRadius: '30px',
                                            padding: '0.2rem 0.6rem',
                                            backgroundColor: '#002419'
                                        }}
                                    >
                                        Best Value
                                    </Typography>
                                </Button>
                                <Button
                                    disableRipple
                                    onClick={() => handleSelect('monthly')}
                                    className={selectedPlan === 'monthly' ? 'Mui-selected' : ''}
                                >
                                    Monthly
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </section>
                    <section style={{ display: 'flex', marginTop: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                width: 330,
                                height: 358,
                                display: 'flex',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                flexDirection: 'column',
                                backgroundColor: '#1F2226',
                                border: '2px solid #1DA1F2'
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                                <Typography variant='h4' style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
                                    {selectedPlan === 'annual' ? '₹566.67' : '₹650'}&nbsp;
                                </Typography>
                                <Typography variant='body1' style={{ fontSize: '0.96rem' }}>
                                    / Month
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: '0.5rem', flexDirection: 'row' }}>
                                <Typography variant='body1' style={{ fontSize: '0.96rem' }}>
                                    {selectedPlan === 'annual' ? '₹6,800 Billed Annually' : 'Billed Monthly'}
                                </Typography>
                                {selectedPlan === 'annual' && (
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            height: '25px',
                                            color: '#B5E3D0',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            marginLeft: '0.5rem',
                                            borderRadius: '30px',
                                            padding: '0.2rem 0.6rem',
                                            backgroundColor: '#002419'
                                        }}
                                    >
                                        SAVE 12%
                                    </Typography>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: selectedPlan === 'annual' ? '0.5rem' : '0.62rem' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Checkmark
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Longer Posts
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Highlights Tab
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Large Reply Boost
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Post Longer Videos
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: selectedPlan === 'annual' ? '0.5rem' : '0.52rem', alignItems: 'center', flexDirection: 'row' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Background Video Playback
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', flexDirection: 'row' }}>
                                <DoneIcon sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginRight: '0.5rem' }}></DoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '0.96rem' }}>
                                    Half Ads In For You and Following
                                </Typography>
                            </div>
                        </Box>
                    </section>
                    <section style={{ display: 'flex', marginTop: '0.6rem', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
                        <Typography variant='h4' sx={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
                            {selectedPlan === 'annual' ? '₹6,800' : '₹650'}&nbsp;
                        </Typography>
                        <Typography variant='body1' sx={{ fontSize: '0.96rem', marginBottom: '0.6rem' }}>
                            {selectedPlan === 'annual' ? '/ Year' : '/ Month'}
                        </Typography>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        <Button
                            variant='contained'
                            onClick={handleGeneratePaymentLink}
                            sx={{
                                height: '42px',
                                width: '508px',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                backgroundColor: '#1DA1F2',
                                '&:hover': { backgroundColor: '#1D8CD6' }
                            }}
                        >
                            Subscribe & Pay
                        </Button>
                        <Box sx={{ width: '508px', padding: '0.5rem', marginTop: '1rem', borderRadius: '8px', border: '1px solid #787878' }}>
                            <Typography sx={{ fontSize: '0.80rem' }}>
                                By subscribing, you agree to our Purchaser Terms of Service. Manage your subscription through the platform you subscribed on.
                            </Typography>
                        </Box>
                    </section>
                </Box>
            </Modal>
        </Fragment>
    )
}
