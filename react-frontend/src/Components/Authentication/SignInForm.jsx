import React from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { signInUser } from '../../Store/Authentication/Action'
import { Button, Container, TextField, CssBaseline } from '@mui/material'

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email ID Format!").required("Email ID is Required!"),
    password: Yup.string().required("Password is Required!").min(6, "Password must be at least 6 characters!")
})

export default function SignInForm() {
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        dispatch(signInUser(values))
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
                                <ErrorMessage name='password'>
                                    {message=> <span style={{ color: '#CB202D' }}>{message}</span>}
                                </ErrorMessage>
                            }
                            error={formik.touched.password && Boolean(formik.errors.password)}>
                        </Field>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            sx={{
                                color: '#000000',
                                fontSize: '15px',
                                padding: '0.80rem',
                                fontWeight: 'bold',
                                marginTop: '0.2rem',
                                borderRadius: '30px',
                                backgroundColor: '#FFFFFF',
                                '&:hover': { backgroundColor: '#DCDCDC' }
                            }}
                        >
                            Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
