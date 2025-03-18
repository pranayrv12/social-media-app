import React from 'react'
import * as Yup from 'yup'
import PostCard from '../Home/PostCard'
import EmojiPicker from 'emoji-picker-react'
import ClearIcon from '@mui/icons-material/Clear'
import ImageIcon from '@mui/icons-material/Image'
import { CloudImages } from '../../Utils/CloudImages'
import { createReply } from '../../Store/Post/Action'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { retrievePostById } from '../../Store/Post/Action'
import BackdropComponent from '../Backdrop/BackdropComponent'
import SnackbarComponent from '../Snackbar/SnackbarComponent'
import { useRef, Fragment, useState, useEffect } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { Box, Avatar, Button, TextField, Typography, IconButton } from '@mui/material'

const validationSchema = Yup.object().shape({
    description: Yup.string().required("Reply Text is Required!")
})

export default function PostDetailsPage() {
    const param = useParams()

    const initialValues = {
        image: "",
        video: "",
        description: "",
        postId: param.id
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const imageFileRef = useRef(null)
    const videoFileRef = useRef(null)
    const descriptionRef = useRef(null)

    const handleBack = () => navigate(-1)
    const { auth, post, theme } = useSelector(store => store)

    const [selectedImage, setSelectedImage] = useState("")
    const [selectedVideo, setSelectedVideo] = useState("")

    const [openEmoticon, setOpenEmoticon] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const [uploadingFile, setUploadingFile] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const handleSnackBar = () => setOpenSnackBar(false)
    const handleCloseEmoticon = () => setOpenEmoticon(false)
    const handleOpenEmoticon = () => setOpenEmoticon(!openEmoticon)

    useEffect(() => {
        dispatch(retrievePostById(param.id))
    }, [dispatch, param.id])

    const navigateToProfile = () => {
        navigate(`/profile/${auth.user.id}`)
    }
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
        dispatch(createReply(values))

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
                <IconButton
                    onClick={handleBack}
                    sx={{
                        borderRadius: '50%',
                        marginTop: '0.5rem',
                        marginLeft: '0.5rem',
                        marginBottom: '0.5rem',
                        backgroundColor: 'transparent',
                        '&:hover': { backgroundColor: '#FFFFFF16' }
                    }}
                >
                    <ArrowBackIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem' }}></ArrowBackIcon>
                </IconButton>
                <Typography variant='h6' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginLeft: '1.7rem' }}>Post</Typography>
            </section>
            {post.post && <PostCard post={post.post} isReply={false} isPostDetails={true}></PostCard>}
            <Box style={{ marginTop: '-0.2rem', paddingLeft: '0.80rem', paddingRight: '0.80rem', paddingBottom: '0.80rem' }}>
                <div className='space-x-2' style={{ display: 'flex', marginLeft: '3rem' }}>
                    <Typography variant='body1' sx={{ color: '#787878', fontSize: '0.96rem' }}>
                        Replying to{' '}
                        <Typography component='span' sx={{ color: '#1DA1F2', fontSize: '0.96rem' }}>
                            @
                        </Typography>
                        <Typography component='span' onClick={navigateToProfile} sx={{ color: '#1DA1F2', cursor: 'pointer', fontSize: '0.96rem', '&:hover': { textDecoration: 'underline' } }}>
                            {post.post?.user.name.toLowerCase().split(' ').join('_')}
                        </Typography>
                    </Typography>
                </div>
                <section>
                    <div className='space-x-3' style={{ display: 'flex' }}>
                        <Avatar alt='Avatar' className='cursor-pointer' onClick={navigateToProfile} src={auth.user.profileImage}></Avatar>
                        <div style={{ width: '100%', marginTop: '-0.6rem', marginLeft: '-0.2rem' }}>
                            <Formik
                                enableReinitialize
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
                                            placeholder='Post Your Reply'
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
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.80rem', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.4rem' }}>
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
                                                                zIndex: 50,
                                                                left: '50%',
                                                                position: 'absolute',
                                                                top: !(selectedImage || selectedVideo || post.post.image || post.post.video) ? '70%' : 'auto',
                                                                bottom: (selectedImage || selectedVideo || post.post.image || post.post.video) ? '28%' : 'auto',
                                                                transform: (selectedImage || selectedVideo || post.post.image || post.post.video) ? 'translate(-43%, -8.10%)' : 'translate(-43%, 4.10%)'
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
                                                                    '--epr-category-label-bg-color': '#000000'
                                                                }}
                                                                onEmojiClick={(value) => handleEmoticonMenu(value, formik)}>
                                                            </EmojiPicker>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                sx={{
                                                    width: '90px',
                                                    color: '#000000',
                                                    fontSize: '15px',
                                                    fontWeight: 'bold',
                                                    borderRadius: '30px',
                                                    marginRight: '0.2rem',
                                                    backgroundColor: '#FFFFFF',
                                                    '&:hover': { backgroundColor: '#DCDCDC' }
                                                }}
                                            >
                                                Reply
                                            </Button>
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
            <section style={{ borderBottom: '1px solid #303030' }}>
                {post.post?.replies.slice().reverse().map((posts) => <PostCard post={posts} isReply={false} isPostDetails={false}></PostCard>)}
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'error'} handleClose={handleSnackBar} message={snackbarMessage}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
