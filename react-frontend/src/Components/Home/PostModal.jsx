import React from 'react'
import * as Yup from 'yup'
import { createPortal } from 'react-dom'
import EmojiPicker from 'emoji-picker-react'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import { useRef, Fragment, useState } from 'react'
import { createPost } from '../../Store/Post/Action'
import { CloudImages } from '../../Utils/CloudImages'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import BackdropComponent from '../Backdrop/BackdropComponent'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { Box, Modal, Avatar, Button, Divider, TextField, IconButton } from '@mui/material'

const style = {
    top: '5%',
    width: 600,
    left: '50%',
    maxHeight: 880,
    outline: 'none',
    borderRadius: 4,
    overflowY: 'auto',
    position: 'absolute',
    paddingBottom: '0.80rem',
    bgcolor: 'background.paper',
    transform: 'translate(-50%)'
}

const initialValues = {
    image: "",
    video: "",
    isPost: true,
    description: ""
}

const validationSchema = Yup.object().shape({
    description: Yup.string().required("Post Text is Required!")
})

export default function PostModal({ open, handleClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const buttonRef = useRef(null)
    const imageFileRef = useRef(null)
    const videoFileRef = useRef(null)
    const descriptionRef = useRef(null)

    const { auth, theme } = useSelector(store => store)

    const [selectedImage, setSelectedImage] = useState("")
    const [selectedVideo, setSelectedVideo] = useState("")

    const [openEmoticon, setOpenEmoticon] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const [uploadingFile, setUploadingFile] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const handleSnackBar = () => setOpenSnackBar(false)
    const handleCloseEmoticon = () => setOpenEmoticon(false)
    const handleOpenEmoticon = () => setOpenEmoticon(!openEmoticon)

    const handleRemoveFile = (formik) => {
        if (selectedImage) {
            setSelectedImage("")
            formik.setFieldValue("image", "")
        }
        if (selectedVideo) {
            setSelectedVideo("")
            formik.setFieldValue("video", "")
        }
    }
    const handleSelectImage = async (event, formik) => {
        const file = event.target.files[0]

        if (file && !file.type.startsWith('image/')) {
            setSnackbarMessage("Invalid Image File Type Selected!")
            setOpenSnackBar(true)
            return
        }
        setUploadingFile(true)
        const imgURL = await CloudImages(file, "image")
        formik.setFieldValue("image", imgURL)
        setSelectedImage(imgURL)
        setUploadingFile(false)
    }
    const handleSelectVideo = async (event, formik) => {
        const file = event.target.files[0]

        if (file && !file.type.startsWith('video/')) {
            setSnackbarMessage("Invalid Video File Type Selected!")
            setOpenSnackBar(true)
            return
        }
        setUploadingFile(true)
        const vidURL = await CloudImages(file, "video")
        formik.setFieldValue("video", vidURL)
        setSelectedVideo(vidURL)
        setUploadingFile(false)
    }
    const calculatePosition = () => {
        if (buttonRef.current) {
            const isAbove = selectedImage || selectedVideo
            const rect = buttonRef.current.getBoundingClientRect()

            return {
                left: rect.left + rect.width / 2,
                top: isAbove ? rect.top + window.scrollY - 406 - 6 : rect.bottom + window.scrollY + 6
            }
        }
        return { top: 0, left: 0 }
    }
    const { top, left } = calculatePosition()

    const handleEmoticonMenu = (value, formik) => {
        const { emoji } = value
        const textField = descriptionRef.current

        if (textField) {
            const prevValue = textField.value || ""
            const cursorPosition = textField.selectionStart

            const currValue = prevValue.slice(0, cursorPosition) + emoji + prevValue.slice(cursorPosition)

            formik.setFieldValue("description", currValue)
        }
    }
    const handleSubmit = (values, actions) => {
        dispatch(createPost(values))

        actions.resetForm()
        setSelectedImage("")
        setSelectedVideo("")
        handleCloseEmoticon()

        handleClose()
    }
    const navigateToProfile = () => {
        handleClose()
        navigate(`/profile/${auth.user.id}`)
    }

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='Post Modal'
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(35, 44, 51, 0.65)'
                    }
                }}
            >
                <Box sx={style}>
                    <section
                        style={{
                            top: 0,
                            zIndex: 50,
                            position: 'sticky',
                            alignItems: 'center',
                            backgroundColor: '#00000098'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                paddingTop: '0.50rem',
                                paddingBottom: '0.50rem',
                                justifyContent: 'space-between'
                            }}
                        >
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
                        </div>
                    </section>
                    <section style={{ marginLeft: '1rem', marginTop: '1.2rem', marginRight: '1rem' }}>
                        <div className='space-x-3' style={{ display: 'flex' }}>
                            <Avatar alt='Avatar' className='cursor-pointer' src={auth.user.profileImage} onClick={navigateToProfile}></Avatar>
                            <div style={{ width: '100%', marginTop: '-0.6rem', marginLeft: '-0.2rem' }}>
                                <Formik
                                    onSubmit={handleSubmit}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                >
                                    {formik => (
                                        <Form>
                                            <div style={{ marginBottom: selectedImage !== "" || selectedVideo !== "" ? '0.80rem' : '6rem' }}>
                                                <Field
                                                    fullWidth
                                                    as={TextField}
                                                    name='description'
                                                    inputRef={descriptionRef}
                                                    onBlur={formik.handleBlur}
                                                    placeholder='What is happening?!'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.description}
                                                    InputProps={{
                                                        style: { fontSize: '1.30rem' }
                                                    }}
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: '#FFFFFF',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            color: '#CB202D',
                                                            fontSize: '0.90rem',
                                                        },
                                                        '& .MuiInputBase-input::placeholder': {
                                                            opacity: 1,
                                                            color: '#787878'
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                                    }}
                                                    helperText={
                                                        <ErrorMessage name='description'>
                                                            {message => <span style={{ color: '#CB202D' }}>{message}</span>}
                                                        </ErrorMessage>
                                                    }
                                                    error={formik.touched.description && Boolean(formik.errors.description)}>
                                                </Field>
                                                {!uploadingFile && (
                                                    <div style={{ marginLeft: '0.8rem' }}>
                                                        {selectedImage && (
                                                            <div style={{ position: 'relative' }}>
                                                                <img
                                                                    src={selectedImage}
                                                                    style={{
                                                                        width: '35.60rem',
                                                                        maxHeight: '48.5rem',
                                                                        borderRadius: '16px',
                                                                        border: '1px solid #303030'
                                                                    }}>
                                                                </img>
                                                                <IconButton
                                                                    onClick={() => handleRemoveFile(formik)}
                                                                    sx={{
                                                                        top: '5px',
                                                                        right: '5px',
                                                                        color: '#FFFFFF',
                                                                        borderRadius: '50%',
                                                                        position: 'absolute',
                                                                        backgroundColor: '#000000B8',
                                                                        transition: 'background-color 0.2s ease',
                                                                        '&:hover': { backgroundColor: '#00000098' }
                                                                    }}
                                                                >
                                                                    <ClearIcon sx={{ fontSize: '1rem' }}></ClearIcon>
                                                                </IconButton>
                                                            </div>
                                                        )}
                                                        {selectedVideo && (
                                                            <div style={{ position: 'relative' }}>
                                                                <video
                                                                    autoplay
                                                                    controls
                                                                    src={selectedVideo}
                                                                    style={{
                                                                        width: '35.60rem',
                                                                        maxHeight: '48.5rem',
                                                                        borderRadius: '16px',
                                                                        border: '1px solid #303030'
                                                                    }}>
                                                                </video>
                                                                <IconButton
                                                                    onClick={() => handleRemoveFile(formik)}
                                                                    sx={{
                                                                        top: '5px',
                                                                        right: '5px',
                                                                        color: '#FFFFFF',
                                                                        borderRadius: '50%',
                                                                        position: 'absolute',
                                                                        backgroundColor: '#000000B8',
                                                                        transition: 'background-color 0.2s ease',
                                                                        '&:hover': { backgroundColor: '#00000098' }
                                                                    }}
                                                                >
                                                                    <ClearIcon sx={{ fontSize: '1rem' }}></ClearIcon>
                                                                </IconButton>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <Divider sx={{ marginLeft: '-2.05rem', backgroundColor: '#303030' }}></Divider>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    position: 'relative',
                                                    marginTop: '0.80rem',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginLeft: '-2.7rem',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton
                                                        onClick={() => imageFileRef.current.click()}
                                                        sx={{
                                                            borderRadius: '50%',
                                                            backgroundColor: 'transparent',
                                                            '&:hover': {
                                                                backgroundColor: '#1DA1F21A',
                                                                '& svg': { color: '#1DA1F2' }
                                                            }
                                                        }}
                                                    >
                                                        <ImageIcon sx={{ color: '#1DA1F2', fontSize: '1.30rem' }}></ImageIcon>
                                                    </IconButton>
                                                    <input type='file' accept='image/*' name='imageFile' ref={imageFileRef} style={{ display: 'none' }} onChange={(event) => handleSelectImage(event, formik)}></input>
                                                    <IconButton
                                                        onClick={() => videoFileRef.current.click()}
                                                        sx={{
                                                            borderRadius: '50%',
                                                            backgroundColor: 'transparent',
                                                            '&:hover': {
                                                                backgroundColor: '#1DA1F21A',
                                                                '& svg': { color: '#1DA1F2' }
                                                            }
                                                        }}
                                                    >
                                                        <PlayCircleOutlineIcon sx={{ color: '#1DA1F2', fontSize: '1.30rem' }}></PlayCircleOutlineIcon>
                                                    </IconButton>
                                                    <input type='file' accept='video/*' name='videoFile' ref={videoFileRef} style={{ display: 'none' }} onChange={(event) => handleSelectVideo(event, formik)}></input>
                                                    <div style={{ position: 'relative' }}>
                                                        <IconButton
                                                            ref={buttonRef}
                                                            onClick={handleOpenEmoticon}
                                                            sx={{
                                                                borderRadius: '50%',
                                                                backgroundColor: 'transparent',
                                                                '&:hover': {
                                                                    backgroundColor: '#1DA1F21A',
                                                                    '& svg': { color: '#1DA1F2' }
                                                                }
                                                            }}
                                                        >
                                                            <SentimentSatisfiedAltIcon sx={{ color: '#1DA1F2', fontSize: '1.30rem' }}></SentimentSatisfiedAltIcon>
                                                        </IconButton>
                                                        {openEmoticon &&
                                                            createPortal(
                                                                <div
                                                                    style={{
                                                                        zIndex: 1400,
                                                                        top: `${top}px`,
                                                                        left: `${left}px`,
                                                                        position: 'absolute',
                                                                        transform: 'translate(-50%, 0)'
                                                                    }}
                                                                >
                                                                    <EmojiPicker
                                                                        width={340}
                                                                        height={406}
                                                                        emojiStyle='twitter'
                                                                        lazyLoadEmojis={true}
                                                                        theme={theme.currentTheme}
                                                                        style={{
                                                                            borderRadius: '16px',
                                                                            '--epr-bg-color': '#000000',
                                                                            '--epr-text-color': '#FFFFFF',
                                                                            boxShadow: '0px 0px 10px #787878',
                                                                            '--epr-category-label-bg-color': '#000000',
                                                                        }}
                                                                        onEmojiClick={(value) => handleEmoticonMenu(value, formik)}>
                                                                    </EmojiPicker>
                                                                </div>,
                                                                document.body
                                                            )}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                        type='submit'
                                                        variant='contained'
                                                        sx={{
                                                            width: '90px',
                                                            color: '#000000',
                                                            fontSize: '15px',
                                                            fontWeight: 'bold',
                                                            borderRadius: '30px',
                                                            backgroundColor: '#FFFFFF',
                                                            '&:hover': { backgroundColor: '#DCDCDC' }
                                                        }}
                                                    >
                                                        Post
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </section>
                    <section>
                        {<BackdropComponent open={uploadingFile}></BackdropComponent>}
                    </section>
                </Box>
            </Modal>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'error'} handleClose={handleSnackBar} message={snackbarMessage}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
