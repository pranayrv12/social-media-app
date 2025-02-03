import React from 'react'
import { useState } from 'react'
import ViewsModal from './ViewsModal'
import ReplyModal from './ReplyModal'
import { PostDate } from './PostDate'
import { PostTime } from './PostTime'
import image3 from '../Images/image3.png'
import InfoIcon from '@mui/icons-material/Info'
import RepeatIcon from '@mui/icons-material/Repeat'
import { useDispatch, useSelector } from 'react-redux'
import BarChartIcon from '@mui/icons-material/BarChart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { Menu, Avatar, Divider, MenuItem, Typography, IconButton } from '@mui/material'
import { likePost, deletePost, repostPost, highlightPost, bookmarkPost } from '../../Store/Post/Action'

export default function PostCard({ post, isReply, isPostDetails }) {
    const param = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userID = Number(param.id)

    const { auth } = useSelector(store => store)

    const [anchorEl, setAnchorEl] = useState(null)
    const [isHovered, setIsHovered] = useState(false)

    const [isLiked, setIsLiked] = useState(post.liked)
    const [likes, setLikes] = useState(post.totalLikes)

    const [isRepost, setIsRepost] = useState(post.repost)
    const [repost, setRepost] = useState(post.totalReposts)

    const [openViewsModal, setViewsModal] = useState(false)
    const [openReplyModal, setReplyModal] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const [bookmarks, setBookmarks] = useState(post.totalBookmarks)
    const [isBookmarked, setIsBookmarked] = useState(post.bookmarked)

    const handleSnackBar = () => setOpenSnackBar(false)
    const handleOpenReplyModal = () => setReplyModal(true)
    const handleOpenViewsModal = () => setViewsModal(true)
    const handleCloseReplyModal = () => setReplyModal(false)
    const handleCloseViewsModal = () => setViewsModal(false)

    const openMenu = Boolean(anchorEl)

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleBookmarkPost = (count) => {
        dispatch(bookmarkPost(post.id))
        setIsBookmarked(!isBookmarked)
        setBookmarks(bookmarks + count)

        if (isBookmarked) {
            setSnackbarMessage("Removed From Your Bookmarks!")
            setOpenSnackBar(true)
        } else {
            setSnackbarMessage("Added To Your Bookmarks!")
            setOpenSnackBar(true)
        }
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleDeletePost = () => {
        dispatch(deletePost(post.id))
        handleCloseMenu()
    }
    const handleHighlightPost = () => {
        dispatch(highlightPost(post.id))
        handleCloseMenu()
    }
    const handleLikePost = (count) => {
        dispatch(likePost(post.id))
        setIsLiked(!isLiked)
        setLikes(likes + count)
    }
    const handleRepostPost = () => {
        dispatch(repostPost(post.id))
        setRepost(isRepost ? repost - 1 : repost + 1)
        setIsRepost(!repost)
    }

    const navigateToProfile = () => {
        navigate(`/profile/${post.user.id}`)
    }
    const navigateToPost = () => {
        const targetId = isReply ? post.mainPostId : post.id
        navigate(`/post/${targetId}`)
    }

    return (
        <React.Fragment>
            <div
                onMouseEnter={() => !isPostDetails && setIsHovered(true)}
                onMouseLeave={() => !isPostDetails && setIsHovered(false)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '1px solid #303030',
                    cursor: !isPostDetails && 'pointer',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: isHovered && !isPostDetails ? '#1010109A' : '#000000'
                }}
            >
                {post.reposters.includes(userID) && location.pathname === `/profile/${userID}` && (
                    <div onClick={navigateToPost} style={{ gap: '0.5rem', display: 'flex', alignItems: 'center', marginLeft: '2.3rem', marginTop: '0.40rem' }}>
                        <RepeatIcon sx={{ color: '#787878', fontSize: '1.10rem' }}></RepeatIcon>
                        {userID === auth.user.id ? (
                            <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.85rem', fontWeight: 'bold' }}>You Reposted</Typography>
                        ) : (
                            <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.85rem', fontWeight: 'bold' }}>{auth.findUser.name} Reposted</Typography>
                        )}
                    </div>
                )}
                <div
                    className='space-x-2'
                    style={{
                        display: 'flex',
                        paddingLeft: '0.80rem',
                        paddingRight: '0.80rem',
                        paddingBottom: '0.80rem',
                        paddingTop: post.reposters.includes(userID) && location.pathname === `/profile/${userID}` ? '0.20rem' : '0.80rem'
                    }}
                >
                    <Avatar alt='Avatar' className='cursor-pointer' onClick={navigateToProfile} src={post.user.profileImage}></Avatar>
                    <div style={{ width: '100%', marginTop: isPostDetails ? '-0.1rem' : '-0.5rem', marginLeft: isPostDetails ? '0.5rem' : '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    cursor: 'pointer',
                                    gap: isPostDetails ? '0' : '0.25rem',
                                    flexDirection: isPostDetails ? 'column' : 'row',
                                    alignItems: isPostDetails ? 'flex-start' : 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <Typography
                                        variant='body1'
                                        onClick={navigateToProfile}
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
                                        {post.user.name}
                                    </Typography>
                                    {post.user.premium && (
                                        <img src={image3} style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.3rem' }}></img>
                                    )}
                                </div>
                                <Typography variant='body1' onClick={navigateToProfile} sx={{ color: '#787878', fontSize: '0.96rem', textTransform: 'lowercase', lineHeight: isPostDetails && 1 }}>
                                    @{post.user.name.toLowerCase().split(" ").join("_")}
                                    {isPostDetails ? '' : ' · '}
                                </Typography>
                                {!isPostDetails && (
                                    <Typography variant='body1' onClick={navigateToPost} sx={{ color: '#787878', fontSize: '0.96rem', '&:hover': { textDecoration: 'underline' } }}>
                                        {PostDate(post.createdAt)}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <IconButton
                                    onClick={handleOpenMenu}
                                    sx={{
                                        borderRadius: '50%',
                                        marginRight: '-0.3rem',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#1DA1F21A',
                                            '& svg': { color: '#1DA1F2' }
                                        }
                                    }}
                                >
                                    <MoreHorizIcon sx={{ color: '#787878', fontSize: '1.30rem' }}></MoreHorizIcon>
                                </IconButton>
                                <Menu
                                    open={openMenu}
                                    anchorEl={anchorEl}
                                    id='Post Card Menu'
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    onClose={handleCloseMenu}
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
                                    {post.user.id === auth.user.id && (
                                        <MenuItem
                                            onClick={handleDeletePost}
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
                                            <DeleteOutlineIcon sx={{ color: '#CB202D', fontSize: '1.30rem', marginRight: '10px' }}></DeleteOutlineIcon>Delete Post
                                        </MenuItem>
                                    )}
                                    {post.user.id === auth.user.id && (
                                        <MenuItem
                                            onClick={handleHighlightPost}
                                            sx={{
                                                color: '#FFFFFF',
                                                fontWeight: 'bold',
                                                fontSize: '0.96rem',
                                                paddingX: '0.80rem',
                                                paddingY: '0.70rem',
                                                '&:hover': {
                                                    backgroundColor: '#FFFFFF16'
                                                }
                                            }}
                                        >
                                            <AutoAwesomeIcon
                                                sx={{
                                                    color: '#FFFFFF',
                                                    marginRight: '10px',
                                                    fontSize: '1.30rem',
                                                }}>
                                            </AutoAwesomeIcon>
                                            {post.highlight ? 'Unhighlight From Your Profile' : 'Highlight On Your Profile'}
                                        </MenuItem>
                                    )}
                                    <MenuItem
                                        onClick={!isPostDetails ? navigateToPost : handleCloseMenu}
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
                                        <InfoIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem', marginRight: '0.625rem' }}></InfoIcon>View Post Details
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div style={{ marginLeft: isPostDetails && '-2.80rem' }}>
                            <div onClick={() => !isPostDetails && navigateToPost()} style={{ marginTop: isPostDetails ? '1rem' : '-0.6rem' }}>
                                <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: isPostDetails ? '1rem' : '0.96rem', marginBottom: isPostDetails ? '0.8rem' : '0.6rem' }}>
                                    {post.description}
                                </Typography>
                                {post.image && (
                                    <img
                                        src={post.image}
                                        style={{
                                            borderRadius: '16px',
                                            border: '1px solid #303030',
                                            width: isPostDetails ? '38.50rem' : '35.60rem',
                                            maxHeight: isPostDetails ? '100%' : '35.60rem',
                                        }}>
                                    </img>
                                )}
                                {post.video && (
                                    <video
                                        autoplay
                                        controls
                                        src={post.video}
                                        style={{
                                            borderRadius: '16px',
                                            border: '1px solid #303030',
                                            width: isPostDetails ? '38.50rem' : '35.60rem',
                                            maxHeight: isPostDetails ? '100%' : '35.60rem',
                                        }}>
                                    </video>
                                )}
                                {isPostDetails && (
                                    <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem', marginTop: isPostDetails ? '0.8rem' : '0.6rem' }}>
                                        {PostTime(post.createdAt)} · {PostDate(post.createdAt)}&nbsp;·&nbsp;
                                        <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                            {post.totalViews}
                                        </span>
                                        <span style={{ color: '#787878' }}>
                                            &nbsp;{post.totalViews === 1 ? 'View' : `Views`}
                                        </span>
                                    </Typography>
                                )}
                            </div>
                            {isPostDetails && <Divider sx={{ marginTop: '0.8rem', marginRight: '0.2rem', borderColor: '#303030', marginBottom: '0.80rem' }}></Divider>}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '-0.5rem',
                                    marginBottom: '-0.4rem',
                                    justifyContent: 'space-between',
                                    marginTop: isPostDetails ? '-0.4rem' : '0.4rem',
                                    marginRight: isPostDetails ? '-0.9rem' : '-1rem'
                                }}
                            >
                                <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                    <IconButton
                                        onClick={handleOpenReplyModal}
                                        sx={{
                                            borderRadius: '50%',
                                            backgroundColor: 'transparent',
                                            '&:hover': {
                                                '~ p': { color: '#1DA1F2' },
                                                backgroundColor: '#1DA1F21A',
                                                '& svg': { color: '#1DA1F2' }
                                            }
                                        }}
                                    >
                                        <ChatBubbleOutlineIcon sx={{ color: '#787878', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></ChatBubbleOutlineIcon>
                                    </IconButton>
                                    {post.totalReplies > 0 && <Typography variant='body2' sx={{ color: '#787878' }}>{post.totalReplies}</Typography>}
                                </div>
                                <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                    <IconButton
                                        onClick={handleRepostPost}
                                        sx={{
                                            borderRadius: '50%',
                                            backgroundColor: 'transparent',
                                            '&:hover': {
                                                '~ p': { color: '#00BF00' },
                                                backgroundColor: '#00BF001A',
                                                '& svg': { color: '#00BF00' }
                                            }
                                        }}
                                    >
                                        <RepeatIcon sx={{ color: isRepost ? '#00BF00' : '#787878', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></RepeatIcon>
                                    </IconButton>
                                    {repost > 0 && <Typography variant='body2' sx={{ color: isRepost ? '#00BF00' : '#787878' }}>{repost}</Typography>}
                                </div>
                                {isLiked ? (
                                    <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => handleLikePost(-1)}
                                            sx={{
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    '~ p': { color: '#D81B60' },
                                                    backgroundColor: '#D81B601A',
                                                    '& svg': { color: '#D81B60' }
                                                }
                                            }}
                                        >
                                            <FavoriteIcon sx={{ color: '#D81B60', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></FavoriteIcon>
                                        </IconButton>
                                        {likes > 0 && <Typography variant='body2' sx={{ color: '#D81B60' }}>{likes}</Typography>}
                                    </div>
                                ) : (
                                    <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => handleLikePost(1)}
                                            sx={{
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    '~ p': { color: '#D81B60' },
                                                    backgroundColor: '#D81B601A',
                                                    '& svg': { color: '#D81B60' }
                                                }
                                            }}
                                        >
                                            <FavoriteBorderIcon sx={{ color: '#787878', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></FavoriteBorderIcon>
                                        </IconButton>
                                        {likes > 0 && <Typography variant='body2' sx={{ color: '#787878' }}>{likes}</Typography>}
                                    </div>
                                )}
                                {!isPostDetails && (
                                    <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={handleOpenViewsModal}
                                            sx={{
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    '~ p': { color: '#1DA1F2' },
                                                    backgroundColor: '#1DA1F21A',
                                                    '& svg': { color: '#1DA1F2' }
                                                }
                                            }}
                                        >
                                            <BarChartIcon sx={{ color: '#787878', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></BarChartIcon>
                                        </IconButton>
                                        {post.totalViews > 0 && <Typography variant='body2' sx={{ color: '#787878' }}>{post.totalViews}</Typography>}
                                    </div>
                                )}
                                {isBookmarked ? (
                                    <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => handleBookmarkPost(-1)}
                                            sx={{
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    '~ p': { color: '#1DA1F2' },
                                                    backgroundColor: '#1DA1F21A',
                                                    '& svg': { color: '#1DA1F2' }
                                                }
                                            }}
                                        >
                                            <BookmarkIcon sx={{ color: '#1DA1F2', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></BookmarkIcon>
                                        </IconButton>
                                        {bookmarks > 0 && <Typography variant='body2' sx={{ color: '#1DA1F2' }}>{bookmarks}</Typography>}
                                    </div>
                                ) : (
                                    <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => handleBookmarkPost(1)}
                                            sx={{
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    '~ p': { color: '#1DA1F2' },
                                                    backgroundColor: '#1DA1F21A',
                                                    '& svg': { color: '#1DA1F2' }
                                                }
                                            }}
                                        >
                                            <BookmarkBorderIcon sx={{ color: '#787878', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></BookmarkBorderIcon>
                                        </IconButton>
                                        {bookmarks > 0 && <Typography variant='body2' sx={{ color: '#787878' }}>{bookmarks}</Typography>}
                                    </div>
                                )}
                                <div className='-space-y-0.5' style={{ display: 'flex', gap: '0.125rem', minWidth: '3rem', alignItems: 'center' }}>
                                    <IconButton
                                        sx={{
                                            borderRadius: '50%',
                                            backgroundColor: 'transparent',
                                            '&:hover': {
                                                '~ p': { color: '#1DA1F2' },
                                                backgroundColor: '#1DA1F21A',
                                                '& svg': { color: '#1DA1F2' }
                                            }
                                        }}
                                    >
                                        <FileUploadIcon sx={{ color: '#787878', fontSize: isPostDetails ? '1.40rem' : '1.30rem' }}></FileUploadIcon>
                                    </IconButton>
                                </div>
                            </div>
                            {isPostDetails && <Divider sx={{ marginTop: '0.8rem', marginRight: '0.2rem', borderColor: '#303030' }}></Divider>}
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <ViewsModal open={openViewsModal} handleClose={handleCloseViewsModal}></ViewsModal>
            </section>
            <section>
                <ReplyModal postData={post} open={openReplyModal} handleClose={handleCloseReplyModal}></ReplyModal>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={snackbarMessage}></SnackbarComponent>
            </section>
        </React.Fragment>
    )
}
