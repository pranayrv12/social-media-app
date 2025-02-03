import React from 'react'
import { useEffect } from 'react'
import PostCard from '../Home/PostCard'
import { useNavigate } from 'react-router-dom'
import { Typography, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BackdropComponent from '../Backdrop/BackdropComponent'
import { retrievePostsBookmarkedByUser } from '../../Store/Post/Action'

export default function BookmarksPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleBack = () => navigate(-1)

    const { auth, post, theme } = useSelector(store => store)

    useEffect(() => {
        dispatch(retrievePostsBookmarkedByUser(auth.user.id))
    }, [dispatch, auth.user.id])

    const bookmarkedPosts = post.bookmarkedPosts || []

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
                    borderBottom: bookmarkedPosts.length > 0 ? 'none' : '1px solid #303030'
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
                    <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginLeft: '1.7rem' }}>Bookmarks</Typography>
                    <Typography variant='body2' sx={{ color: '#787878', fontSize: '0.8rem', marginTop: '-0.1rem', marginLeft: '1.7rem' }}>
                        {bookmarkedPosts.length} Bookmarked Posts
                    </Typography>
                </div>
            </section>
            {bookmarkedPosts.length > 0 ? (
                <div style={{ borderBottom: '1px solid #303030' }}>
                    {bookmarkedPosts.map((item) => (
                        <PostCard post={item} isReply={false} isPostDetails={false}></PostCard>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', fontSize: '2rem', maxWidth: '22rem', textAlign: 'left', fontWeight: 'bold' }}>
                        Save Posts For Later
                    </Typography>
                    <Typography variant='body1' sx={{ width: '100%', color: '#787878', maxWidth: '22rem', textAlign: 'left', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                        Bookmark posts to easily find them again in the future.
                    </Typography>
                </div>
            )}
            <section>
                <BackdropComponent open={post.loading}></BackdropComponent>
            </section>
        </React.Fragment>
    )
}
