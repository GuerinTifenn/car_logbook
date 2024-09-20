import React, { FC } from "react";
import Image from 'next/image'
import logo from '../public/assets/logo.svg';
import userIconWhite from '../public/assets/user_white.svg';

const Header: FC = ({}) => {
	return (
		<header>
			<nav className="flex justify-between m-5">
			<Image src={logo}
			width={48}
			height={48}
			alt="Autolog logo">
			</Image>
			<Image src={userIconWhite}
			width={48}
			height={48}
			alt="user not connected logo">
			</Image>
			</nav>
		</header>
	)
}

export default Header
