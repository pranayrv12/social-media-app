import XIcon from '@mui/icons-material/X'
import HomeIcon from '@mui/icons-material/Home'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import PendingIcon from '@mui/icons-material/Pending'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

export const navigationMenu = [
	{
		title: 'Home',
		path: '/home',
		icon: <HomeIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></HomeIcon>
	},
	{
		title: 'Explore',
		path: '/explore',
		icon: <SearchIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></SearchIcon>
	},
	{
		title: 'Notifications',
		path: '/notifications',
		icon: <NotificationsNoneIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></NotificationsNoneIcon>
	},
	{
		title: 'Messages',
		path: '/messages',
		icon: <EmailIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></EmailIcon>
	},
	{
		title: 'Bookmarks',
		path: '/bookmarks',
		icon: <BookmarksIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></BookmarksIcon>
	},
	{
		title: 'Communities',
		path: '/communities',
		icon: <PeopleAltIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></PeopleAltIcon>
	},
	{
		title: 'Premium',
		path: '/premium',
		icon: <XIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></XIcon>
	},
	{
		title: 'Profile',
		path: '/profile',
		icon: <PersonIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></PersonIcon>
	},
	{
		title: 'More',
		path: '/more',
		icon: <PendingIcon sx={{ fontSize: '1.90rem', marginLeft: '-1rem' }}></PendingIcon>
	}
]
