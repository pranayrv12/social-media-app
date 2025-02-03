import React from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { signUpUser } from '../../Store/Authentication/Action'
import { Grid, Button, Select, MenuItem, Container, TextField, InputLabel, Typography, CssBaseline, FormControl } from '@mui/material'

const initialValues = {
    name: "",
    date: "",
    year: "",
    month: "",
    email: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required!"),
    date: Yup.string().required("Date is Required!"),
    year: Yup.string().required("Year is Required!"),
    month: Yup.string().required("Month is Required!"),
    email: Yup.string().email("Invalid Email ID Format!").required("Email ID is Required!"),
    password: Yup.string().required("Password is Required!").min(6, "Password must be at least 6 characters!")
})

export default function SignUpForm() {
    const dispatch = useDispatch()
    const currYear = new Date().getFullYear()

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
    const dates = Array.from({ length: 31 }, (_, i) => i + 1)
    const years = Array.from({ length: 90 }, (_, i) => currYear - i)

    const handleSubmit = (values) => {
        const { date, month, year } = values
        const birthDate = `${year} - ${month} - ${date}`
        values.birthDate = birthDate
        dispatch(signUpUser(values))
    }

    return (
        <Container component='main' maxWidth='s'>
            <CssBaseline></CssBaseline>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>
                        <Field
                            fullWidth
                            id='name'
                            name='name'
                            label='Name'
                            as={TextField}
                            variant='outlined'
                            autoComplete='name'
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
                            fullWidth
                            id='email'
                            name='email'
                            as={TextField}
                            label='Email ID'
                            variant='outlined'
                            autoComplete='email'
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
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={
                                <ErrorMessage name='email'>
                                    {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                </ErrorMessage>
                            }>
                        </Field>
                        <Field
                            fullWidth
                            id='password'
                            as={TextField}
                            name='password'
                            type='password'
                            label='Password'
                            variant='outlined'
                            sx={{
                                marginBottom: '2rem',
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
                                <ErrorMessage name='password'>
                                    {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                </ErrorMessage>
                            }
                            error={formik.touched.password && Boolean(formik.errors.password)}>
                        </Field>
                        <Typography variant='body1' sx={{ color: '#FFFFFF', fontWeight: 'bold', paddingBottom: '0.6rem' }}>Date of Birth</Typography>
                        <Typography variant='body2' sx={{ color: '#787878' }}>
                            This will be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl
                                    fullWidth
                                    margin='normal'
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
                                    error={formik.touched.date && Boolean(formik.errors.date)}
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
                                    error={formik.touched.month && Boolean(formik.errors.month)}
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
                                    error={formik.touched.year && Boolean(formik.errors.year)}
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
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            sx={{
                                color: '#000000',
                                fontSize: '15px',
                                padding: '0.80rem',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                marginTop: '1.50rem',
                                backgroundColor: '#FFFFFF',
                                '&:hover': { backgroundColor: '#DCDCDC' }
                            }}
                        >
                            Sign Up
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
