import React from 'react'
import PostCard from '../Home/PostCard'
import { BirthDate } from './BirthDate'
import { JoinedDate } from './JoinedDate'
import image3 from '../Images/image3.png'
import image5 from '../Images/image5.jpg'
import { useState, useEffect } from 'react'
import CakeIcon from '@mui/icons-material/Cake'
import LinkIcon from '@mui/icons-material/Link'
import EditProfileModal from './EditProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BackdropComponent from '../Backdrop/BackdropComponent'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Box, Tab, Grid, Avatar, Button, IconButton, Typography } from '@mui/material'
import { followUnfollowUser, retrieveUserById } from '../../Store/Authentication/Action'
import { retrieveAllUserPosts, retrieveAllUserReplies, retrievePostsLikedByUser } from '../../Store/Post/Action'

export default function ProfilePage() {
    const param = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBack = () => navigate(-1)
    const { auth, post, theme } = useSelector(store => store)

    const [tabValue, setTabValue] = useState("1")
    const [isHovered, setIsHovered] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false)

    const posts = post.posts || []
    const replies = post.replies || []
    const liked = post.likedPosts || []
    const highlights = [...posts, ...replies].filter((item) => item.highlight) || []

    const imagePostsCount = posts.filter(p => p.repost === false && p.image.length > 0).length
    const videoPostsCount = posts.filter(p => p.repost === false && p.video?.length > 0).length

    const media = posts.filter((item) => item.repost === false && (item.image.length > 0 || item.video?.length > 0)) || []

    useEffect(() => {
        dispatch(retrieveUserById(param.id))
    }, [dispatch, param.id, auth.user])

    useEffect(() => {
        setOpenSnackBar(auth.updateUserProfile)
    }, [auth.updateUserProfile])

    const handleFollowUnfollowUser = () => {
        dispatch(followUnfollowUser(param.id))
    }
    useEffect(() => {
        dispatch(retrieveAllUserPosts(param.id))
        dispatch(retrieveAllUserReplies(param.id))
        dispatch(retrievePostsLikedByUser(param.id))
    }, [dispatch, param.id, post.repost])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)

        if (newValue === 1) {
            dispatch(retrieveAllUserPosts(param.id))
        } else if (newValue === 2) {
            dispatch(retrieveAllUserReplies(param.id))
        } else if (newValue === 6) {
            dispatch(retrievePostsLikedByUser(param.id))
        }
    }
    const handleSnackBar = () => setOpenSnackBar(false)
    const handleOpenModal = () => setOpenEditProfileModal(true)
    const handleCloseModal = () => setOpenEditProfileModal(false)

    const navigateToFollowing = () => {
        navigate(`/profile/${auth.findUser.id}/following`)
    }
    const navigateToFollowers = () => {
        navigate(`/profile/${auth.findUser.id}/followers`)
    }

    if (!auth.findUser) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
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
                    backgroundColor: '#00000080'
                }}
            >
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginLeft: '1.7rem' }}>{auth.findUser.name}</Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem', marginTop: '-0.1rem', marginLeft: '1.7rem' }}>
                        {tabValue === '4' ? (
                            `0 Articles`
                        ) : tabValue === '5' ? (
                            `${imagePostsCount} Photos & ${videoPostsCount} Videos`
                        ) : tabValue === '6' ? (
                            `${liked.length} Likes`
                        ) : (
                            `${posts.length + replies.length} Posts`
                        )}
                    </Typography>
                </div>
            </section>
            <section>
                <img src={auth.findUser.coverImage || image5} style={{ width: '100%', height: '12.4rem', objectFit: 'cover' }}></img>
            </section>
            <section style={{ marginLeft: '0.80rem', marginRight: '0.80rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            width: '8.8rem',
                            display: 'flex',
                            height: '8.8rem',
                            borderRadius: '50%',
                            marginTop: '-4.5rem',
                            alignItems: 'center',
                            background: '#000000',
                            justifyContent: 'center'
                        }}
                    >
                        <Avatar alt='Avatar' src={auth.findUser.profileImage} sx={{ width: '8.3rem', height: '8.3rem' }}></Avatar>
                    </Box>
                    {auth.findUser.validatedUser ? (
                        <Button
                            variant='outlined'
                            onClick={handleOpenModal}
                            sx={{
                                mt: '0.8rem',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                backgroundColor: '#000000',
                                transition: 'all 0.2s ease',
                                '&:hover': { backgroundColor: '#FFFFFF16' }
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (auth.findUser.followed) ? (
                        <Button
                            variant='outlined'
                            onClick={handleFollowUnfollowUser}
                            sx={{
                                mt: '0.8rem',
                                width: '116px',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: '#CB202D',
                                    borderColor: '#CB202D',
                                    backgroundColor: '#CB202D1A'
                                }
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? 'Unfollow' : 'Followed'}
                        </Button>
                    ) : (
                        <Button
                            variant='contained'
                            onClick={handleFollowUnfollowUser}
                            sx={{
                                mt: '0.8rem',
                                color: '#000000',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                backgroundColor: '#FFFFFF',
                                transition: 'all 0.2s ease',
                                '&:hover': { backgroundColor: '#DCDCDC' }
                            }}
                        >
                            Follow
                        </Button>
                    )}
                </div>
                <div style={{ display: 'flex', marginTop: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h5' sx={{ lineHeight: 1.2, fontWeight: 'bold', fontSize: '1.25rem' }}>
                            {auth.findUser.name}
                        </Typography>
                        {auth.findUser.premium && (
                            <img src={image3} style={{ width: '1.30rem', height: '1.30rem', marginLeft: '0.3rem', marginBottom: '0.1rem' }}></img>
                        )}
                    </div>
                    <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem', textTransform: 'lowercase' }}>
                        @{auth.findUser.name.toLowerCase().split(" ").join("_")}
                    </Typography>
                </div>
                <div style={{ marginTop: auth.findUser.bio ? '0.60rem' : '0.80rem' }}>
                    {auth.findUser.bio && (
                        <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '0.96rem', marginBottom: '0.60rem' }}>
                            {auth.findUser.bio}
                        </Typography>
                    )}
                    <div style={{ gap: 12, display: 'flex', alignItems: 'center', marginBottom: '0.60rem' }}>
                        {auth.findUser.location && (
                            <div style={{ display: 'flex', gap: '0.21875rem', alignItems: 'center' }}>
                                <LocationOnIcon className='transform -translate-y-0.5' sx={{ color: '#787878', fontSize: '1.30rem' }}></LocationOnIcon>
                                <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem' }}>{auth.findUser.location}</Typography>
                            </div>
                        )}
                        {auth.findUser.website && (
                            <div style={{ display: 'flex', gap: '0.21875rem', alignItems: 'center' }}>
                                <LinkIcon sx={{ color: '#787878', fontSize: '1.30rem' }}></LinkIcon>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={auth.findUser.website}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography variant='body1' sx={{ color: '#1DA1F2', fontSize: '0.96rem', '&:hover': { textDecoration: 'underline' } }}>
                                        {auth.findUser.website.replace(/^https?:\/\//, '').length < 20 ? (
                                            auth.findUser.website.replace(/^https?:\/\//, '')
                                        ) : (
                                            `${auth.findUser.website.replace(/^https?:\/\//, '').slice(0, 20)}...`
                                        )}
                                    </Typography>
                                </a>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '0.21875rem', alignItems: 'center' }}>
                            <CakeIcon className='transform -translate-y-0.5' sx={{ color: '#787878', fontSize: '1.30rem' }}></CakeIcon>
                            <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem' }}>Born {BirthDate(auth.findUser.birthDate)}</Typography>
                        </div>
                        <div style={{ display: 'flex', gap: '0.21875rem', alignItems: 'center' }}>
                            <CalendarMonthIcon className='transform -translate-y-0.5' sx={{ color: '#787878', fontSize: '1.30rem' }}></CalendarMonthIcon>
                            <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem' }}>Joined {JoinedDate(auth.findUser.createdAt)}</Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5625rem', alignItems: 'center' }}>
                        <div style={{ cursor: 'pointer', display: 'flex', gap: '0.21875rem', alignItems: 'center' }}>
                            <Typography
                                variant='body1'
                                onClick={navigateToFollowing}
                                sx={{
                                    color: '#FFFFFF',
                                    cursor: 'pointer',
                                    display: 'inline',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                <span style={{ color: '#FFFFFF' }}>{auth.findUser.following.length}</span>&nbsp;
                                <span style={{ color: '#787878' }}>Following</span>
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5625rem', alignItems: 'center' }}>
                            <Typography
                                variant='body1'
                                onClick={navigateToFollowers}
                                sx={{
                                    color: '#FFFFFF',
                                    cursor: 'pointer',
                                    display: 'inline',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                <span style={{ color: '#FFFFFF' }}>{auth.findUser.followers.length}</span>&nbsp;
                                <span style={{ color: '#787878' }}>Followers</span>
                            </Typography>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Box sx={{ width: '100%', marginTop: '20px' }}>
                    <TabContext value={tabValue}>
                        <Box>
                            <TabList
                                centered
                                aria-label='Tabs'
                                onChange={handleTabChange}
                                sx={{
                                    '& .MuiTabs-indicator': {
                                        height: '4px',
                                        transition: 'none',
                                        borderRadius: '4px',
                                        backgroundColor: '#1DA1F2'
                                    },
                                    '& .MuiTab-root': {
                                        flexGrow: 1,
                                        color: '#787878',
                                        transition: 'none',
                                        fontWeight: 'normal',
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF16'
                                        },
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }}
                            >
                                <Tab label='Posts' value='1' disableRipple></Tab>
                                <Tab label='Replies' value='2' disableRipple></Tab>
                                <Tab label='Highlights' value='3' disableRipple></Tab>
                                <Tab label='Articles' value='4' disableRipple></Tab>
                                <Tab label='Media' value='5' disableRipple></Tab>
                                <Tab label='Likes' value='6' disableRipple></Tab>
                            </TabList>
                        </Box>
                        <TabPanel value='1' sx={{ padding: 0, borderTop: posts.length > 0 ? 'none' : '1px solid #303030' }}>
                            {posts.length > 0 ? (
                                <section style={{ borderBottom: posts.length === 0 ? 'none' : '1px solid #303030' }}>
                                    {posts.map((item) => (
                                        <PostCard post={item} isReply={false} isPostDetails={false}></PostCard>
                                    ))}
                                </section>
                            ) : (auth.findUser.validatedUser) ? (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        Start A Conversation Now
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        When you create a post, they will show up here.
                                    </Typography>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        @{auth.findUser.name.split(' ').join('_').toLowerCase()} Doesn’t Have Any Posts
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        Once they do, those posts will show up here.
                                    </Typography>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value='2' sx={{ padding: 0, borderTop: replies.length > 0 ? 'none' : '1px solid #303030' }}>
                            {replies.length > 0 ? (
                                <section style={{ borderBottom: replies.length === 0 ? 'none' : '1px solid #303030' }}>
                                    {replies.map((item) => (
                                        <PostCard post={item} isReply={true} isPostDetails={false}></PostCard>
                                    ))}
                                </section>
                            ) : (auth.findUser.validatedUser) ? (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        Join The Conversation Now
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        When you reply to a post, they will show up here.
                                    </Typography>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        @{auth.findUser.name.split(' ').join('_').toLowerCase()} Doesn’t Have Any Replies
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        Once they do, those replies will show up here.
                                    </Typography>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value='3' sx={{ padding: 0, borderTop: highlights.length > 0 ? 'none' : '1px solid #303030' }}>
                            {highlights.length > 0 ? (
                                <section style={{ borderBottom: highlights.length === 0 ? 'none' : '1px solid #303030' }}>
                                    {highlights.map((item) => (
                                        <PostCard post={item} isReply={false} isPostDetails={false}></PostCard>
                                    ))}
                                </section>
                            ) : (auth.findUser.validatedUser) ? (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        Highlight On Your Profile
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        When you add a post to your highlights, they will show up here.
                                    </Typography>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        @{auth.findUser.name.split(' ').join('_').toLowerCase()} Doesn’t Have Any Highlights
                                    </Typography>
                                    <Typography variant='body1' style={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        Once they do, those highlights will show up here.
                                    </Typography>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value='4' sx={{ padding: 0, borderTop: '1px solid #303030' }}>
                            {auth.findUser.validatedUser ? (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        Write Articles On X
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        You must be subscribed to Premium+ to write Articles on X.
                                    </Typography>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        @{auth.findUser.name.toLowerCase().split(" ").join("_")} Hasn’t Written Article
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        Once they do, those articles will show up here.
                                    </Typography>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value='5' sx={{ padding: 0, borderTop: '1px solid #303030' }}>
                            {media.length > 0 ? (
                                <div style={{ marginLeft: '0.25rem', marginRight: '0.25rem', marginBottom: '0.25rem' }}>
                                    <Grid container spacing={0.5} sx={{ marginTop: '0rem' }}>
                                        {media.map((item) => (
                                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                                <div style={{ position: 'relative' }}>
                                                    {item.image.length > 0 && (
                                                        <div style={{ position: 'relative' }}>
                                                            <img
                                                                src={item.image}
                                                                onClick={() => navigate(`/post/${item.id}`)}
                                                                style={{ width: '100%', height: '12rem', cursor: 'pointer', objectFit: 'cover' }}>
                                                            </img>
                                                            {item.image.endsWith('.gif') && (
                                                                <Typography
                                                                    variant='caption'
                                                                    sx={{
                                                                        left: '8px',
                                                                        bottom: '8px',
                                                                        color: '#FFFFFF',
                                                                        padding: '2px 8px',
                                                                        fontWeight: 'bold',
                                                                        borderRadius: '4px',
                                                                        position: 'absolute',
                                                                        backgroundColor: '#0000009A'
                                                                    }}
                                                                >
                                                                    GIF
                                                                </Typography>
                                                            )}
                                                        </div>
                                                    )}
                                                    {item.video?.length > 0 && (
                                                        <div style={{ position: 'relative' }}>
                                                            <video
                                                                src={item.video}
                                                                onClick={() => navigate(`/post/${item.id}`)}
                                                                style={{ width: '100%', height: '12rem', cursor: 'pointer', objectFit: 'cover' }}>
                                                            </video>
                                                            <Typography
                                                                variant='caption'
                                                                sx={{
                                                                    left: '8px',
                                                                    bottom: '8px',
                                                                    color: '#FFFFFF',
                                                                    padding: '2px 8px',
                                                                    fontWeight: 'bold',
                                                                    borderRadius: '4px',
                                                                    position: 'absolute',
                                                                    backgroundColor: '#0000009A'
                                                                }}
                                                            >
                                                                Video
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            ) : (auth.findUser.validatedUser) ? (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        Lights, Camera ... Attachments!
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        When you post photos or videos, they will show up here.
                                    </Typography>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        @{auth.findUser.name.toLowerCase().split(" ").join("_")} Hasn’t Posted Media
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        Once they do, those posts will show up here.
                                    </Typography>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value='6' sx={{ padding: 0, borderTop: liked.length === 0 ? '1px solid #303030' : 'none' }}>
                            {liked.length > 0 ? (
                                <section style={{ borderBottom: liked.length === 0 ? 'none' : '1px solid #303030' }}>
                                    {liked.map((item) => (
                                        <PostCard post={item} isReply={false} isPostDetails={false}></PostCard>
                                    ))}
                                </section>
                            ) : (auth.findUser.validatedUser) ? (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        Explore Content You Like
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        When you start liking posts, they will show up here.
                                    </Typography>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                                        @{auth.findUser.name.toLowerCase().split(" ").join("_")} Hasn’t Liked Post
                                    </Typography>
                                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                                        Once they do, those posts will show up here.
                                    </Typography>
                                </div>
                            )}
                        </TabPanel>
                    </TabContext>
                </Box>
            </section>
            <section>
                <BackdropComponent open={post.loading}></BackdropComponent>
            </section>
            <section>
                <EditProfileModal handleClose={handleCloseModal} open={openEditProfileModal}></EditProfileModal>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={'User Profile Successfully Updated!'}></SnackbarComponent>
            </section>
        </div>
    )
}
