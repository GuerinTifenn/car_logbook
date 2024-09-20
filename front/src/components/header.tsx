import React, { FC } from "react";
import Image from 'next/image'

const Header: FC = ({}) => {
	return (
		<header>
			<nav className="flex justify-between m-5">
			<Image src='../assets/logo.svg'
			width={48}
			height={48}
			alt="Autolog logo">
			</Image>
			<Image src="../assets/user_white.svg"
			width={48}
			height={48}
			alt="user not connected logo">
			</Image>
			</nav>
		</header>
	)
}

export default Header
