import {
	HiOutlineViewGrid,
	HiClipboardCheck,
	HiOutlineUsers,
	HiOutlineQuestionMarkCircle,
    HiDesktopComputer,
	HiOutlineCog,
	HiOutlineUserGroup,
	HiIdentification,
	HiOutlineClipboardList

} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'project',
		label: 'Projects',
		path: '/project',
		icon: <HiDesktopComputer />
	},
	{
		key: 'logbook',
		label: 'LogBooks',
		path: '/logbooks',
		icon: <HiClipboardCheck />
	},
	{
		key: 'attendance',
		label: 'Attendance',
		path: '/attendance',
		icon: <HiOutlineUsers />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]

export const ADMIN_SIDEBAR_LINKS = [
	{
		key: 'dashboardAdmin',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'user',
		label: 'Users',
		path: '/dataintern',
		icon: < HiIdentification/>
	},
	{
		key: 'internshipqueue',
		label: 'Internship Queue',
		path: '/internshipqueue',
		icon: <HiOutlineUserGroup />
	},
	{
		key: 'dataLogbook',
		label: 'Data Logbook',
		path: '/dataLogbook',
		icon: <HiOutlineClipboardList />
	},
	{
		key: 'projectAdmin',
		label: 'Projects',
		path: '/projectintern',
		icon: <HiDesktopComputer />
	},
	{
		key: 'attend',
		label: 'Attendance',
		path: '/attend',
		icon: <HiOutlineUsers />
	}
]

export const ADMIN_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
