import React from 'react'
import * as Yup from 'yup'
import PostCard from './PostCard'
import EmojiPicker from 'emoji-picker-react'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import ImageIcon from '@mui/icons-material/Image'
import { CloudImages } from '../../Utils/CloudImages'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import BackdropComponent from '../Backdrop/BackdropComponent'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import { useRef, Fragment, useState, useEffect } from 'react'
import { createPost, retrieveAllPosts } from '../../Store/Post/Action'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { Avatar, Button, Divider, TextField, Typography, IconButton } from '@mui/material'

const initialValues = {
    image: "",
    video: "",
    isPost: true,
    description: ""
}

const validationSchema = Yup.object().shape({
    description: Yup.string().required("Post Text is Required!")
})

export default function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const imageFileRef = useRef(null)
    const videoFileRef = useRef(null)
    const descriptionRef = useRef(null)

    const [selectedImage, setSelectedImage] = useState("")
    const [selectedVideo, setSelectedVideo] = useState("")

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [openEmoticon, setOpenEmoticon] = useState(false)

    const handleSnackBar = () => setOpenSnackBar(false)
    const { auth, post, theme } = useSelector(store => store)

    const [uploadingFile, setUploadingFile] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    useEffect(() => { dispatch(retrieveAllPosts()) }, [dispatch])

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
    }

    return (
        <Fragment>
            <section
                style={{
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    position: 'sticky',
                    alignItems: 'center',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: '#00000080'
                }}
            >
                <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', paddingY: '0.65rem', marginLeft: '0.80rem' }}>Home</Typography>
            </section>
            <section
                style={{
                    paddingTop: '1rem',
                    paddingLeft: '0.80rem',
                    paddingRight: '0.80rem',
                    paddingBottom: '0.80rem',
                    borderTop: '1px solid #303030',
                    borderBottom: post.posts.length > 0 ? 'none' : '1px solid #303030'
                }}
            >
                <div className='space-x-3' style={{ display: 'flex' }}>
                    <Avatar alt='Avatar' className='cursor-pointer' src={auth.user.profileImage} onClick={() => navigate(`/profile/${auth.user.id}`)}></Avatar>
                    <div style={{ width: '100%', marginTop: '-0.6rem', marginLeft: '-0.2rem' }}>
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            {formik => (
                                <Form>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        name='description'
                                        inputRef={descriptionRef}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        placeholder='What is happening?!'
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
                                                            right: '8px',
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
                                                            right: '8px',
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
                                            {(selectedImage || selectedVideo) && (<Divider sx={{ marginTop: '0.8rem', marginRight: '0.2rem', backgroundColor: '#303030' }}></Divider>)}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.80rem', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: '0.2rem', marginLeft: '0.2rem' }}>
                                            <IconButton
                                                sx={{
                                                    borderRadius: '50%',
                                                    backgroundColor: 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: '#1DA1F21A',
                                                        '& svg': { color: '#1DA1F2' }
                                                    }
                                                }}
                                                onClick={() => imageFileRef.current.click()}
                                            >
                                                <ImageIcon sx={{ color: '#1DA1F2', fontSize: '1.30rem' }}></ImageIcon>
                                            </IconButton>
                                            <input type='file' accept='image/*' name='imageFile' ref={imageFileRef} style={{ display: 'none' }} onChange={(event) => handleSelectImage(event, formik)}></input>
                                            <IconButton
                                                sx={{
                                                    borderRadius: '50%',
                                                    backgroundColor: 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: '#1DA1F21A',
                                                        '& svg': { color: '#1DA1F2' }
                                                    }
                                                }}
                                                onClick={() => videoFileRef.current.click()}
                                            >
                                                <PlayCircleOutlineIcon sx={{ color: '#1DA1F2', fontSize: '1.30rem' }}></PlayCircleOutlineIcon>
                                            </IconButton>
                                            <input type='file' accept='video/*' name='videoFile' ref={videoFileRef} style={{ display: 'none' }} onChange={(event) => handleSelectVideo(event, formik)}></input>
                                            <div style={{ position: 'relative' }}>
                                                <IconButton
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
                                                {openEmoticon && (
                                                    <div
                                                        style={{
                                                            top: '48%',
                                                            zIndex: 50,
                                                            left: '50%',
                                                            position: 'absolute',
                                                            transform: 'translate(-42%, 6.10%)'
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
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                sx={{
                                                    color: '#000000',
                                                    fontSize: '15px',
                                                    fontWeight: 'bold',
                                                    borderRadius: '30px',
                                                    marginRight: '0.2rem',
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
            <section style={{ borderBottom: post.posts.length === 0 ? 'none' : '1px solid #303030' }}>
                {post.posts?.map((item) => (<PostCard post={item} isReply={false} isPostDetails={false}></PostCard>))}
            </section>
            <section>
                <BackdropComponent open={post.loading}></BackdropComponent>
            </section>
            <section>
                <BackdropComponent open={uploadingFile}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'error'} handleClose={handleSnackBar} message={snackbarMessage}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
