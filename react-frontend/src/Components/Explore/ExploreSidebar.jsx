import React from 'react'
import image3 from '../Images/image3.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PremiumModal from '../Premium/PremiumModal'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsersByNameOrEmail } from '../../Store/Authentication/Action'
import { retrieveUsersExcludingFollowed } from '../../Store/Authentication/Action'
import { Box, Avatar, Button, TextField, Typography, InputAdornment, CircularProgress } from '@mui/material'

export default function ExploreSidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { auth } = useSelector(store => store)

    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const navigateToProfile = (id) => {
        navigate(`/profile/${id}`)
        setSearchQuery('')
    }
    const [openPremiumModal, setOpenPremiumModal] = useState(false)
    const closeModal = () => setOpenPremiumModal(false)
    const openModal = () => setOpenPremiumModal(true)

    const handleSearchUsersByNameOrEmail = (keyword) => {
        setSearchQuery(keyword)

        if (keyword.trim()) {
            setIsLoading(true)
            dispatch(searchUsersByNameOrEmail(keyword)).finally(() => {
                setIsLoading(false)
            })
        }
    }
    useEffect(() => {
        dispatch(retrieveUsersExcludingFollowed(auth.user.id))
    }, [dispatch, auth.user.id])

    return (
        <div style={{ top: '0rem', height: '100vh', overflowY: 'auto', position: 'sticky' }}>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', marginBottom: '1rem' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        height: '44.8px',
                        marginTop: '0.3rem',
                        borderRadius: '30px',
                        alignItems: 'center',
                        backgroundColor: '#000000',
                        transition: 'all 0.2s ease',
                        border: '2px solid #303030',
                        '&:hover': {
                            border: '2px solid #FFFFFF'
                        },
                        '&:focus-within': {
                            border: '2px solid #1DA1F2'
                        }
                    }}
                >
                    <TextField
                        fullWidth
                        variant='standard'
                        value={searchQuery}
                        placeholder='Search'
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon></SearchIcon>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => handleSearchUsersByNameOrEmail(e.target.value)}
                        sx={{
                            marginLeft: '18px',
                            '& .MuiInputBase-input': {
                                color: '#FFFFFF',
                                padding: '10px 0px',
                                fontSize: '1.125rem',
                            },
                            transition: 'all 0.2s ease',
                            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                                color: '#FFFFFF'
                            },
                            '&:focus-within .MuiInputAdornment-root .MuiSvgIcon-root': {
                                color: '#1DA1F2'
                            }
                        }}>
                    </TextField>
                </Box>
                {searchQuery && (
                    <Box
                        sx={{
                            left: 0,
                            right: 0.5,
                            zIndex: 50,
                            width: '98%',
                            margin: 'auto',
                            height: '432px',
                            overflowY: 'auto',
                            position: 'absolute',
                            marginTop: '30.8rem',
                            paddingTop: '0.5rem',
                            borderRadius: '12px',
                            paddingBottom: '0.8rem',
                            backgroundColor: '#000000',
                            transition: 'all 0.2s ease',
                            boxShadow: '0px 0px 10px #787878',
                            display: isLoading ? 'flex' : 'initial',
                            alignItems: isLoading ? 'center' : 'initial',
                            flexDirection: isLoading ? 'column' : 'initial',
                            justifyContent: isLoading ? 'center' : 'initial'
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={28} thickness={4} sx={{ color: '#1DA1F2' }}></CircularProgress>
                        ) : (auth.searchResult.length === 0) ? (
                            <Typography
                                variant='body1'
                                sx={{
                                    color: '#787878',
                                    fontSize: '0.96rem',
                                    paddingTop: '0.8rem',
                                    paddingLeft: '1.4rem',
                                    paddingRight: '1.4rem'
                                }}
                            >
                                Couldn't find anyone. Maybe invite your friends to join?
                            </Typography>
                        ) : (
                            auth.searchResult.map((user) => (
                                <Box
                                    key={user.id}
                                    onClick={() => navigateToProfile(user.id)}
                                    sx={{
                                        display: 'flex',
                                        cursor: 'pointer',
                                        padding: '0.80rem',
                                        alignItems: 'center',
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF16'
                                        },
                                        transition: 'background-color 0.2s ease'
                                    }}
                                >
                                    <Avatar alt={user.name} src={user.profileImage}></Avatar>
                                    <Box sx={{ marginTop: '-0.4rem', marginLeft: '0.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                                                    {user.name}
                                                </Typography>
                                                {user.premium && (
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
                                                @{user.name.split(' ').join('_').toLowerCase()}
                                            </Typography>
                                        </div>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                )}
            </div>
            <Box sx={{ borderRadius: '16px', paddingTop: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem', marginBottom: '1rem', paddingBottom: '0.8rem', border: '1px solid #303030' }}>
                {auth.user.premium ? (
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: '1.34rem', marginBottom: '0.28rem' }}>
                            Welcome to Premium
                        </Typography>
                        <img src={image3} style={{ width: '1.30rem', height: '1.30rem', marginLeft: '0.3rem', marginBottom: '0.3rem' }}></img>
                    </div>
                ) : (
                    <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: '1.34rem', marginBottom: '0.28rem' }}>
                        Subscribe to Premium
                    </Typography>
                )}
                <Typography variant='body1' sx={{ fontSize: '0.96rem', marginBottom: '0.6rem' }}>
                    {auth.user.premium ? (
                        'Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.'
                    ) : (
                        'Subscribe to unlock new features and if eligible, receive a share of revenue.'
                    )}
                </Typography>
                {!auth.user.premium && (
                    <Button
                        variant='contained'
                        onClick={openModal}
                        sx={{
                            height: '42px',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            backgroundColor: '#1DA1F2',
                            '&:hover': { backgroundColor: '#1D8CD6' }
                        }}
                    >
                        Subscribe
                    </Button>
                )}
            </Box>
            <Box sx={{ borderRadius: '16px', paddingTop: '0.5rem', marginBottom: '1rem', paddingBottom: '0.8rem', border: '1px solid #303030' }}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', marginLeft: '1rem', marginRight: '1rem', fontSize: '1.34rem', marginBottom: '0.50rem' }}>
                    What's happening
                </Typography>
                <Box sx={{ paddingX: '1rem', paddingY: '0.70rem', transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: '#1010109A' } }}>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>Music · Trending</Typography>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Kendrick Lamar</Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>44K Posts</Typography>
                </Box>
                <Box sx={{ paddingX: '1rem', paddingY: '0.70rem', transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: '#1010109A' } }}>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>Sports · Trending</Typography>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Liverpool</Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>21.2K Posts</Typography>
                </Box>
                <Box sx={{ paddingX: '1rem', paddingY: '0.70rem', transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: '#1010109A' } }}>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>Gaming · Trending</Typography>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>#GTA6</Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>65K Posts</Typography>
                </Box>
                <Box sx={{ paddingX: '1rem', paddingY: '0.70rem', transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: '#1010109A' } }}>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>Entertainment · Trending</Typography>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>#GoodBadUgly</Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem' }}>90K Posts</Typography>
                </Box>
            </Box>
            <Box sx={{ borderRadius: '16px', paddingTop: '0.5rem', marginBottom: '1rem', paddingBottom: '0.8rem', border: '1px solid #303030' }}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', marginLeft: '1rem', marginRight: '1rem', fontSize: '1.34rem', marginBottom: auth.filteredUsers.length > 0 && '0.5rem' }}>
                    Who to follow
                </Typography>
                {auth.filteredUsers.length === 0 ? (
                    <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem', paddingLeft: '1rem', paddingRight: '1rem', marginTop: '0.28rem' }}>
                        It looks like you're all caught up! Check back later for new recommendations.
                    </Typography>
                ) : (
                    auth.filteredUsers.slice(Math.max(auth.filteredUsers.length - 3, 0)).map((user) => (
                        <Box
                            key={user.id}
                            onClick={() => navigateToProfile(user.id)}
                            sx={{
                                display: 'flex',
                                cursor: 'pointer',
                                padding: '0.80rem',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                '&:hover': {
                                    backgroundColor: '#1010109A'
                                },
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={user.name} src={user.profileImage}></Avatar>
                                <Box sx={{ marginTop: '-0.4rem', marginLeft: '0.5rem' }}>
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
                                    </div>
                                </Box>
                            </div>
                            <Button
                                variant='contained'
                                onClick={(e) => { e.stopPropagation(); navigateToProfile(user.id) }}
                                sx={{
                                    color: '#000000',
                                    fontWeight: 'bold',
                                    borderRadius: '30px',
                                    backgroundColor: '#FFFFFF',
                                    '&:hover': { backgroundColor: '#DCDCDC' }
                                }}
                            >
                                View Profile
                            </Button>
                        </Box>
                    ))
                )}
            </Box>
            <section>
                <PremiumModal open={openPremiumModal} handleClose={closeModal}></PremiumModal>
            </section>
        </div>
    )
}
