import React from 'react';
import styles from './breadcrumbs.module.css';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = (props) => {
	const { pathname } = useLocation();//pathname та страница где находимся
	return (
		<div className={styles.wrapper}>
			<img src='/images/breadcrumb-logo.png' alt='' className={styles.icon} />
            <h1>{props.title}</h1>
			<div className={styles.breadcrumb}>
				<Link to='/'>Home</Link>
                &#8594; <Link to={pathname} >{props.title}</Link> 
			</div>
		</div>
	);
};

export default Breadcrumbs;
