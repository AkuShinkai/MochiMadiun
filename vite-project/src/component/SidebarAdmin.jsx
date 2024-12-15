import React, { useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { ADMIN_SIDEBAR_LINKS, ADMIN_SIDEBAR_BOTTOM_LINKS } from '../lib/constants'
import Logout from '../pages/Logout'
// Import logo UMKM
import logoUMKM from '../assets/Dinada.png'

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#FF9843] hover:no-underline hover:text-white active:text-white active:bg-[#FF9843] rounded-full text-base'

export default function SidebarAdmin() {
    const [showModal, setShowModal] = useState(false);
	return (
		<div className="hidden bg-amber-900 p-3 md:flex flex-col w-[250px]">
			{/* Bagian logo UMKM dengan tautan ke dashboard */}
			<div className="flex justify-center items-center mx-2 my-2">
				<Link to="/">
					<img
						src={logoUMKM}
						alt="Logo UMKM"
						style={{ width: '70px', height: 'auto', cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<div className="pt-7 pb-8 flex flex-1 flex-col gap-1">
				{ADMIN_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-400">
				{ADMIN_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<button className={classNames(linkClass, 'cursor-pointer text-red-500')}
					onClick={() => {
						setShowModal(true);
					}}>
					<span className="text-xl" >
						<HiOutlineLogout />
					</span>
					Log Out
				</button>
				{showModal && <Logout setOpen={setShowModal} />}
			</div>
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-orange-300 text-white' : 'text-white', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}
