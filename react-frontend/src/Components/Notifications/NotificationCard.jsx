import React from 'react'
import image3 from '../Images/image3.png'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function NotificationCard({ notification }) {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)

    const navigateToPost = () => {
        navigate(`/post/${notification.postId}`)
    }
    const navigateToProfile = () => {
        navigate(`/profile/${notification.senderId}`)
    }

    return (
        <Fragment>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={notification.postId ? navigateToPost : navigateToProfile}
                style={{
                    display: 'flex',
                    cursor: 'pointer',
                    flexDirection: 'row',
                    borderTop: '1px solid #303030',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: notification.read ? isHovered ? '#1010109A' : '#000000' : isHovered ? '#1010109A' : '#1DA1F22A'
                }}
            >
                <div className='space-x-2' style={{ display: 'flex', paddingTop: '0.8rem', paddingLeft: '1.8rem', paddingRight: '1.8rem', paddingBottom: '0.8rem' }}>
                    {notification.postId === null ? (
                        <PersonIcon sx={{ color: '#1DA1F2', fontSize: '1.8rem' }}></PersonIcon>
                    ) : (
                        <FavoriteIcon sx={{ color: '#D81B60', fontSize: '1.8rem' }}></FavoriteIcon>
                    )}
                    <div style={{ gap: '0.6rem', display: 'flex', flexDirection: 'column' }}>
                        <Avatar
                            alt='Avatar'
                            sx={{
                                width: 36,
                                height: 36
                            }}
                            src={notification.profileImage}
                            onClick={(e) => { e.stopPropagation(); navigateToProfile() }}>
                        </Avatar>
                        <div style={{ gap: '0.25rem', display: 'flex', flexDirection: 'row' }}>
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
                                onClick={(e) => { e.stopPropagation(); navigateToProfile() }}
                            >
                                {notification.senderName}
                            </Typography>
                            {notification.premium && (
                                <img src={image3} style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.05rem' }}></img>
                            )}
                            <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '0.96rem' }}>
                                {notification.message}
                            </Typography>
                        </div>
                        {notification.postId && (
                            <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem' }}>
                                {notification.description}
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
