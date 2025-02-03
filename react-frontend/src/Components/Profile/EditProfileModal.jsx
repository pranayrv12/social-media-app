import React from 'react'
import * as Yup from 'yup'
import { useState } from 'react'
import { BirthDate } from './BirthDate'
import image5 from '../Images/image5.jpg'
import CloseIcon from '@mui/icons-material/Close'
import { CloudImages } from '../../Utils/CloudImages'
import { useDispatch, useSelector } from 'react-redux'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import BackdropComponent from '../Backdrop/BackdropComponent'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import { updateUserProfile } from '../../Store/Authentication/Action'
import { Box, Grid, Modal, Avatar, Button, Select, MenuItem, FormControl, IconButton, InputLabel, TextField, Typography } from '@mui/material'

const style = {
    top: '50%',
    width: 600,
    left: '50%',
    border: 'none',
    maxHeight: 654,
    outline: 'none',
    borderRadius: 4,
    overflowY: 'auto',
    position: 'absolute',
    paddingBottom: '2rem',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

const validationSchema = Yup.object().shape({
    website: Yup.string().url("Invalid URL!"),
    name: Yup.string().required("Name is Required!")
})

export default function EditProfileModal({ open, handleClose }) {
    const dispatch = useDispatch()
    const currYear = new Date().getFullYear()

    const { auth } = useSelector(store => store)

    const [showGrid, setShowGrid] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const months = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
    ]
    const handleSnackBar = () => setOpenSnackBar(false)

    const dates = Array.from({ length: 31 }, (_, i) => i + 1)
    const years = Array.from({ length: 90 }, (_, i) => currYear - i)

    const initialValues = {
        bio: auth.user.bio || "",
        name: auth.user.name || "",
        website: auth.user.website || "",
        location: auth.user.location || "",
        coverImage: auth.user.coverImage || "",
        profileImage: auth.user.profileImage || "",
        year: BirthDate(auth.user.birthDate).split(' ')[2] || "",
        date: BirthDate(auth.user.birthDate).split(' ')[1].replace(',', '') || "",
        month: months.find(month => month.label === BirthDate(auth.user.birthDate).split(' ')[0]).value || "",
    }
    const handleSubmit = (values) => {
        const { date, month, year } = values
        const birthDate = `${year} - ${month} - ${date}`
        values.birthDate = birthDate
        dispatch(updateUserProfile(values))
        setShowGrid(false)
        handleClose()
    }
    const handleImageChange = async (event, formik) => {
        const file = event.target.files[0]

        if (file && !file.type.startsWith('image/')) {
            setOpenSnackBar(true)
            return
        }
        setUploading(true)
        const { name } = event.target
        const imgURL = await CloudImages(file, "image")
        formik.setFieldValue(name, imgURL)
        setUploading(false)
    }
    const handleEditClick = (formik) => {
        setShowGrid(prevState => !prevState)

        if (showGrid === false) {
            formik.setFieldValue('date', initialValues.date)
            formik.setFieldValue('year', initialValues.year)
            formik.setFieldValue('month', initialValues.month)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='Edit Profile Modal'
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(35, 44, 51, 0.65)'
                    }
                }}
            >
                <Box sx={style}>
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {formik => (
                            <Form>
                                <section
                                    style={{
                                        top: 0,
                                        zIndex: 50,
                                        position: 'sticky',
                                        alignItems: 'center',
                                        backgroundColor: '#00000098'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                onClick={handleClose}
                                                sx={{
                                                    color: '#FFFFFF',
                                                    borderRadius: '50%',
                                                    marginLeft: '0.50rem',
                                                    backgroundColor: 'transparent',
                                                    transition: 'background-color 0.2s ease',
                                                    '&:hover': { backgroundColor: '#FFFFFF16' }
                                                }}
                                            >
                                                <CloseIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></CloseIcon>
                                            </IconButton>
                                            <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginLeft: '1.7rem' }}>Edit Profile</Typography>
                                        </div>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            sx={{
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                borderRadius: '30px',
                                                marginTop: '0.60rem',
                                                marginRight: '0.80rem',
                                                marginBottom: '0.60rem',
                                                backgroundColor: '#FFFFFF',
                                                '&:hover': { backgroundColor: '#DCDCDC' }
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </section>
                                <div>
                                    <React.Fragment>
                                        <div style={{ width: '100%', position: 'relative' }}>
                                            <img
                                                style={{
                                                    width: '100%',
                                                    height: '12.4rem',
                                                    objectFit: 'cover',
                                                    filter: 'brightness(0.65)'
                                                }}
                                                src={formik.values.coverImage || image5}>
                                            </img>
                                            <IconButton
                                                component='label'
                                                sx={{
                                                    top: '50%',
                                                    left: '50%',
                                                    width: '2.9rem',
                                                    color: '#FFFFFF',
                                                    height: '2.9rem',
                                                    position: 'absolute',
                                                    backgroundColor: '#00000080',
                                                    transform: 'translate(-50%, -50%)',
                                                    transition: 'background-color 0.2s ease',
                                                    '&:hover': { backgroundColor: '#00000060' }
                                                }}
                                            >
                                                <AddAPhotoIcon></AddAPhotoIcon>
                                                <input hidden type='file' accept='image/*' name='coverImage' onChange={(event) => handleImageChange(event, formik)}></input>
                                            </IconButton>
                                        </div>
                                        <Box
                                            sx={{
                                                width: '7.5rem',
                                                display: 'flex',
                                                height: '7.5rem',
                                                borderRadius: '50%',
                                                position: 'relative',
                                                marginTop: '-2.8rem',
                                                alignItems: 'center',
                                                background: '#000000',
                                                marginLeft: '0.80rem',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Avatar alt='Avatar' src={formik.values.profileImage} sx={{ width: '7rem', height: '7rem', filter: 'brightness(0.65)' }}></Avatar>
                                            <IconButton
                                                component='label'
                                                sx={{
                                                    width: '2.8rem',
                                                    color: '#FFFFFF',
                                                    height: '2.8rem',
                                                    position: 'absolute',
                                                    backgroundColor: '#00000080',
                                                    transition: 'background-color 0.2s ease',
                                                    '&:hover': { backgroundColor: '#00000060' }
                                                }}
                                            >
                                                <AddAPhotoIcon></AddAPhotoIcon>
                                                <input hidden type='file' accept='image/*' name='profileImage' onChange={(event) => handleImageChange(event, formik)}></input>
                                            </IconButton>
                                        </Box>
                                    </React.Fragment>
                                    <div style={{ marginLeft: '1rem', marginRight: '1rem', marginTop: '0.80rem' }}>
                                        <Field
                                            fullWidth
                                            id='name'
                                            name='name'
                                            label='Name'
                                            as={TextField}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            sx={{
                                                marginBottom: '1.60rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#1DA1F2'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#1DA1F2'
                                                    }
                                                }
                                            }}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={
                                                <ErrorMessage name='name'>
                                                    {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Field
                                            id='bio'
                                            rows={3}
                                            multiline
                                            fullWidth
                                            name='bio'
                                            label='Bio'
                                            as={TextField}
                                            value={formik.values.bio}
                                            onChange={formik.handleChange}
                                            error={formik.touched.bio && Boolean(formik.errors.bio)}
                                            sx={{
                                                marginBottom: '1.60rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#1DA1F2'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#1DA1F2'
                                                    }
                                                }
                                            }}
                                            helperText={
                                                <ErrorMessage name='bio'>
                                                    {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Field
                                            fullWidth
                                            id='location'
                                            as={TextField}
                                            name='location'
                                            label='Location'
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            sx={{
                                                marginBottom: '1.60rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#1DA1F2'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#1DA1F2'
                                                    }
                                                }
                                            }}
                                            helperText={
                                                <ErrorMessage name='location'>
                                                    {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                                </ErrorMessage>
                                            }
                                            error={formik.touched.location && Boolean(formik.errors.location)}>
                                        </Field>
                                        <Field
                                            fullWidth
                                            id='website'
                                            name='website'
                                            as={TextField}
                                            label='Website'
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            sx={{
                                                marginBottom: '1.60rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#1DA1F2'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#1DA1F2'
                                                    }
                                                }
                                            }}
                                            error={formik.touched.website && Boolean(formik.errors.website)}
                                            helperText={
                                                <ErrorMessage name='website'>
                                                    {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography
                                                    variant='body1'
                                                    style={{
                                                        fontSize: '0.96rem',
                                                        color: showGrid ? '#FFFFFF' : '#787878',
                                                        fontWeight: showGrid ? 'bold' : 'normal'
                                                    }}
                                                >
                                                    Birth Date
                                                </Typography>
                                                <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem' }}>&nbsp;·&nbsp;</Typography>
                                                <Typography
                                                    variant='body1'
                                                    onClick={() => handleEditClick(formik)}
                                                    sx={{
                                                        color: '#1DA1F2',
                                                        cursor: 'pointer',
                                                        fontSize: '0.96rem',
                                                        '&:hover': {
                                                            textDecoration: 'underline'
                                                        }
                                                    }}
                                                >
                                                    {showGrid ? 'Cancel' : 'Edit'}
                                                </Typography>
                                            </div>
                                            {!showGrid && (
                                                <Typography variant='h6' sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}>{BirthDate(auth.user.birthDate)}</Typography>
                                            )}
                                            {showGrid && (
                                                <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem', marginBottom: '0.4rem' }}>
                                                    This should be the date of birth of the person using the account. Even if you’re making an account for your business, event, or cat.
                                                </Typography>
                                            )}
                                        </div>
                                        {showGrid && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <FormControl
                                                        fullWidth
                                                        margin='normal'
                                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                                        sx={{
                                                            '& .MuiFormLabel-root': {
                                                                '&.Mui-error': {
                                                                    color: '#CB202D'
                                                                },
                                                                '&.Mui-focused': {
                                                                    color: '#1DA1F2'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#CB202D'
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#1DA1F2'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <InputLabel>Date</InputLabel>
                                                        <Field
                                                            id='date'
                                                            fullWidth
                                                            name='date'
                                                            as={Select}
                                                            label='Date'
                                                            value={formik.values.date}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: {
                                                                        color: '#FFFFFF',
                                                                        backgroundColor: '#000000',
                                                                        '& .MuiMenuItem-root': {
                                                                            backgroundColor: '#000000',
                                                                            '&:hover': {
                                                                                backgroundColor: '#787878'
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {dates.map((date) => (
                                                                <MenuItem key={date} value={date}>{date}</MenuItem>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name='date'>
                                                            {message => <span style={{ color: '#CB202D', fontSize: '12px', paddingTop: '4px', paddingLeft: '16px' }}>{message}</span>}
                                                        </ErrorMessage>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl
                                                        fullWidth
                                                        margin='normal'
                                                        error={formik.touched.month && Boolean(formik.errors.month)}
                                                        sx={{
                                                            '& .MuiFormLabel-root': {
                                                                '&.Mui-error': {
                                                                    color: '#CB202D'
                                                                },
                                                                '&.Mui-focused': {
                                                                    color: '#1DA1F2'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#CB202D'
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#1DA1F2'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <InputLabel>Month</InputLabel>
                                                        <Field
                                                            fullWidth
                                                            id='month'
                                                            as={Select}
                                                            name='month'
                                                            label='Month'
                                                            value={formik.values.month}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: {
                                                                        color: '#FFFFFF',
                                                                        backgroundColor: '#000000',
                                                                        '& .MuiMenuItem-root': {
                                                                            backgroundColor: '#000000',
                                                                            '&:hover': {
                                                                                backgroundColor: '#787878'
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {months.map((month) => (
                                                                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name='month'>
                                                            {message => <span style={{ color: '#CB202D', fontSize: '12px', paddingTop: '4px', paddingLeft: '16px' }}>{message}</span>}
                                                        </ErrorMessage>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl
                                                        fullWidth
                                                        margin='normal'
                                                        error={formik.touched.year && Boolean(formik.errors.year)}
                                                        sx={{
                                                            '& .MuiFormLabel-root': {
                                                                '&.Mui-error': {
                                                                    color: '#CB202D'
                                                                },
                                                                '&.Mui-focused': {
                                                                    color: '#1DA1F2'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#CB202D'
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#1DA1F2'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <InputLabel>Year</InputLabel>
                                                        <Field
                                                            id='year'
                                                            fullWidth
                                                            name='year'
                                                            as={Select}
                                                            label='Year'
                                                            value={formik.values.year}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: {
                                                                        color: '#FFFFFF',
                                                                        backgroundColor: '#000000',
                                                                        '& .MuiMenuItem-root': {
                                                                            backgroundColor: '#000000',
                                                                            '&:hover': {
                                                                                backgroundColor: '#787878'
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {years.map((year) => (
                                                                <MenuItem key={year} value={year}>{year}</MenuItem>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name='year'>
                                                            {message => <span style={{ color: '#CB202D', fontSize: '12px', paddingTop: '4px', paddingLeft: '16px' }}>{message}</span>}
                                                        </ErrorMessage>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </div>
                                </div>
                                <BackdropComponent open={uploading}></BackdropComponent>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'error'} handleClose={handleSnackBar} message={'Invalid Image File Type Selected!'}></SnackbarComponent>
            </section>
        </div>
    )
}
