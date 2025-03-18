import React from 'react'
import { Fragment } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal, Button, IconButton, Typography } from '@mui/material'

const style = {
    top: '50%',
    width: 600,
    left: '50%',
    outline: 'none',
    borderRadius: 4,
    overflowY: 'auto',
    position: 'absolute',
    paddingBottom: '4.90rem',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

export default function ViewsModal({ open, handleClose }) {
    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='Views Modal'
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(35, 44, 51, 0.65)'
                    }
                }}
            >
                <Box sx={style}>
                    <div style={{ paddingTop: '0.50rem', paddingLeft: '0.50rem' }}>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: 'transparent',
                                transition: 'background-color 0.2s ease',
                                '&:hover': { backgroundColor: '#FFFFFF16' }
                            }}
                        >
                            <CloseIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></CloseIcon>
                        </IconButton>
                    </div>
                    <div style={{ display: 'flex', marginTop: '2.6rem', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant='h6' sx={{ width: '100%', lineHeight: 1.2, color: '#FFFFFF', textAlign: 'left', maxWidth: '25rem', fontSize: '1.7rem', fontWeight: 'bold' }}>
                            Views
                        </Typography>
                        <Typography variant='body1' sx={{ width: '100%', color: '#787878', textAlign: 'left', maxWidth: '25rem', fontSize: '0.96rem', marginTop: '0.3rem' }}>
                            Times this post was seen. Views are counted when a user views a post's details.
                        </Typography>
                        <Button
                            disableRipple
                            variant='contained'
                            onClick={handleClose}
                            sx={{
                                width: '400px',
                                color: '#000000',
                                fontSize: '15px',
                                padding: '0.80rem',
                                fontWeight: 'bold',
                                marginTop: '1.8rem',
                                borderRadius: '30px',
                                backgroundColor: '#FFFFFF',
                                '&:hover': { backgroundColor: '#DCDCDC' }
                            }}
                        >
                            Dismiss
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Fragment>
    )
}
