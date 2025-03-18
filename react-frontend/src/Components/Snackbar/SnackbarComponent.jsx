import React from 'react'
import { Fragment } from 'react'
import { Alert, Snackbar } from '@mui/material'

export default function SnackbarComponent({ open, message, severity, handleClose }) {
    return (
        <Fragment>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    variant='standard'
                    severity={severity}
                    onClose={handleClose}
                    sx={{
                        width: '100%',
                        color: '#FFFFFF',
                        '& .MuiAlert-icon': {
                            color: '#FFFFFF'
                        },
                        backgroundColor: severity === 'success' ? '#1DA1F2' : '#CB202D'
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}
