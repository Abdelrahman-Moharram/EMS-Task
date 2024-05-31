import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	isSelected?: boolean;
	isMobile?: boolean;
	isBanner?: boolean;
	href?: string;
	children: React.ReactNode;
	[rest: string]: any;
}

export default function NavLink({
	isSelected,
	isMobile,
	isBanner,
	href,
	children,
	...rest
}: Props) {
	
	if (!href) {
		return (
			<span className={rest.className+' text-white rounded-md px-3 py-2 font-medium'} role='button' onClick={rest.onClick}>
				{children}
			</span>
		);
	}

	return (
		<Link className={rest.className+' text-white rounded-md px-3 py-2 font-medium'} to={href}>
			{children}
		</Link>
	);
}