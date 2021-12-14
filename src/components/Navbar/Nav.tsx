import React from 'react';
import './style.css';
import { GearIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					LOGO
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'
				>
					<button className='btn'>
						<Link to='/'>Home</Link>
					</button>
					<button className='btn'>
						<label>Assessments</label>
					</button>

					<button className='btn ms-auto'>
						<b>NL</b>
					</button>
					<button className='btn'>
						<GearIcon size={24} />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
