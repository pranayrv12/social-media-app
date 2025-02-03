import React from 'react'
import { Grid } from '@mui/material'
import HomePage from '../Home/HomePage'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from '../Profile/ProfilePage'
import FollowingPage from '../Profile/FollowingPage'
import FollowersPage from '../Profile/FollowersPage'
import BookmarksPage from '../Bookmarks/BookmarksPage'
import ExploreSidebar from '../Explore/ExploreSidebar'
import PostDetailsPage from '../PostDetails/PostDetailsPage'
import NavigationSidebar from '../Navigation/NavigationSidebar'
import NotificationsPage from '../Notifications/NotificationsPage'

export default function HomeRoutes() {
    const { auth, theme } = useSelector(store => store)

    return (
        <Grid container sx={{ width: '99vw', display: 'flex', justifyContent: 'center' }}>
            <Grid sx={{ width: '100%', maxWidth: '270px', position: 'relative' }}>
                <NavigationSidebar></NavigationSidebar>
            </Grid>
            <Grid
                sx={{
                    width: '100%',
                    display: 'flex',
                    maxWidth: '650px',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    borderLeft: theme.currentTheme === "dark" ? '1px solid #303030' : 'none',
                    borderRight: theme.currentTheme === "dark" ? '1px solid #303030' : 'none'
                }}
            >
                <Routes>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route path="/home" element={<HomePage></HomePage>}></Route>
                    <Route path="/post/:id" element={<PostDetailsPage></PostDetailsPage>}></Route>
                    <Route path="/profile/:id" element={<ProfilePage></ProfilePage>}></Route>
                    <Route path="/bookmarks" element={<BookmarksPage></BookmarksPage>}></Route>
                    <Route path="/notifications" element={<NotificationsPage></NotificationsPage>}></Route>
                    <Route path="/profile/:id/following" element={<FollowingPage></FollowingPage>}></Route>
                    <Route path="/profile/:id/followers" element={<FollowersPage></FollowersPage>}></Route>
                </Routes>
            </Grid>
            <Grid sx={{ width: '100%', maxWidth: '350px', marginLeft: '2rem', position: 'relative' }}>
                <ExploreSidebar></ExploreSidebar>
            </Grid>
        </Grid>
    )
}
