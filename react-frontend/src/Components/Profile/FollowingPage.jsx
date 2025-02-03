import React from 'react'
import { useEffect } from 'react'
import image3 from '../Images/image3.png'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams, useNavigate } from 'react-router-dom'
import BackdropComponent from '../Backdrop/BackdropComponent'
import { retrieveUserById } from '../../Store/Authentication/Action'
import { Box, Avatar, Button, IconButton, Typography } from '@mui/material'

export default function FollowingPage() {
    const param = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBack = () => navigate(-1)

    const { auth } = useSelector(store => store)

    const navigateToProfile = (id) => {
        navigate(`/profile/${id}`)
    }
    useEffect(() => {
        dispatch(retrieveUserById(param.id))
    }, [dispatch, param.id])

    if (!auth.findUser) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
    }
    const following = auth.findUser.following || []

    return (
        <React.Fragment>
            <section
                style={{
                    top: 0,
                    zIndex: 50,
                    display: 'flex',
                    position: 'sticky',
                    alignItems: 'center',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: '#00000080',
                    borderBottom: '1px solid #303030'
                }}
            >
                <IconButton
                    onClick={handleBack}
                    sx={{
                        borderRadius: '50%',
                        marginTop: '0.50rem',
                        marginLeft: '0.50rem',
                        marginBottom: '0.50rem',
                        backgroundColor: 'transparent',
                        '&:hover': { backgroundColor: '#FFFFFF16' }
                    }}
                >
                    <ArrowBackIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></ArrowBackIcon>
                </IconButton>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginLeft: '1.7rem' }}>
                        {auth.findUser.name}
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem', marginTop: '-0.1rem', marginLeft: '1.7rem' }}>
                        @{auth.findUser.name.split(' ').join('_').toLowerCase()}
                    </Typography>
                </div>
            </section>
            {following.length > 0 ? (
                <section>
                    {following.map((user) => (
                        <Box
                            key={user.id}
                            onClick={() => navigateToProfile(user.id)}
                            sx={{
                                display: 'flex',
                                cursor: 'pointer',
                                padding: '0.80rem',
                                flexDirection: 'column',
                                '&:hover': {
                                    backgroundColor: '#1010109A'
                                },
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar alt={user.name} src={user.profileImage}></Avatar>
                                    <Box sx={{ marginLeft: '0.5rem', marginTop: auth.user.followers.some((follower) => follower.id === user.id) ? '-0.2rem' : '-0.4rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                                <Typography
                                                    variant='body1'
                                                    sx={{
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.96rem',
                                                        textTransform: 'capitalize',
                                                        '&:hover': {
                                                            textDecoration: 'underline'
                                                        }
                                                    }}
                                                >
                                                    {user.name}
                                                </Typography>
                                                {user.premium && (
                                                    <img src={image3} style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.3rem' }}></img>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                                <Typography
                                                    variant='body1'
                                                    sx={{
                                                        lineHeight: 1,
                                                        color: '#787878',
                                                        fontSize: '0.96rem',
                                                        textTransform: 'lowercase'
                                                    }}
                                                >
                                                    @{user.name.split(' ').join('_').toLowerCase()}
                                                </Typography>
                                                {auth.user.followers.some((follower) => follower.id === user.id) && (
                                                    <Typography
                                                        variant='caption'
                                                        sx={{
                                                            color: '#787878',
                                                            padding: '0px 4px',
                                                            borderRadius: '4px',
                                                            fontSize: '0.66rem',
                                                            marginLeft: '0.3rem',
                                                            backgroundColor: '#1F2226'
                                                        }}
                                                    >
                                                        Follows You
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                                <Button
                                    variant='contained'
                                    sx={{
                                        color: '#000000',
                                        fontWeight: 'bold',
                                        borderRadius: '30px',
                                        backgroundColor: '#FFFFFF',
                                        '&:hover': { backgroundColor: '#DCDCDC' }
                                    }}
                                    onClick={(e) => { e.stopPropagation(); navigateToProfile(user.id) }}
                                >
                                    View Profile
                                </Button>
                            </div>
                            <Typography
                                variant='body1'
                                sx={{
                                    color: '#FFFFFF',
                                    marginLeft: '3rem',
                                    marginTop: '0.2rem',
                                    fontSize: '0.96rem',
                                }}
                            >
                                {user.bio}
                            </Typography>
                        </Box>
                    ))}
                </section>
            ) : (auth.findUser.validatedUser) ? (
                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                        You Aren’t Following Anyone
                    </Typography>
                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                        Once you follow accounts, they’ll show up here.
                    </Typography>
                </div>
            ) : (
                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                        @{auth.findUser.name.split(' ').join('_').toLowerCase()} Isn’t Following Anyone
                    </Typography>
                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                        Once they follow accounts, they’ll show up here.
                    </Typography>
                </div>
            )}
        </React.Fragment>
    )
}
