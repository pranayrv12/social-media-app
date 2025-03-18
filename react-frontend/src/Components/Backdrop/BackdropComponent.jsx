import React from 'react'
import { Fragment } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export default function BackdropComponent({ open }) {
    return (
        <Fragment>
            <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress size={28} thickness={4} sx={{ color: '#1DA1F2' }}></CircularProgress>
            </Backdrop>
        </Fragment>
    )
}
