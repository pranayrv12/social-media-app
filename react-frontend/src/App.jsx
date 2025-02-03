import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import darkTheme from './Components/Theme/DarkTheme'
import { useDispatch, useSelector } from 'react-redux'
import lightTheme from './Components/Theme/LightTheme'
import HomeRoutes from './Components/Routes/HomeRoutes'
import { retrieveUserProfile } from './Store/Authentication/Action'
import PremiumSuccessPage from './Components/Premium/PremiumSuccessPage'
import AuthenticationPage from './Components/Authentication/AuthenticationPage'

export default function App() {
    const dispatch = useDispatch()

    const jwt = localStorage.getItem('jwt')

    const { auth } = useSelector(store => store)
    const { theme } = useSelector(store => store)

    const [currentTheme, setCurrentTheme] = useState('')

    useEffect(() => {
        if (jwt) {
            dispatch(retrieveUserProfile(jwt))
        }
    }, [jwt, auth.jwt, dispatch])

    useEffect(() => {
        setCurrentTheme(localStorage.getItem('theme') || 'dark')
    }, [theme.currentTheme])

    return (
        <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline></CssBaseline>
            <Box>
                <Routes>
                    <Route
                        path='/signin'
                        element={<AuthenticationPage></AuthenticationPage>}>
                    </Route>
                    <Route
                        path='/signup'
                        element={<AuthenticationPage></AuthenticationPage>}>
                    </Route>
                    <Route
                        path='/premium/:planType'
                        element={<PremiumSuccessPage></PremiumSuccessPage>}>
                    </Route>
                    <Route
                        path='/*'
                        element={
                            auth.user?.name ? (
                                <HomeRoutes></HomeRoutes>
                            ) : (
                                <AuthenticationPage></AuthenticationPage>
                            )
                        }>
                    </Route>
                </Routes>
            </Box>
        </ThemeProvider>
    )
}
