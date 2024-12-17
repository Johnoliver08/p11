import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaUserAlt, FaPaperPlane } from 'react-icons/fa'; // Use X-like icons
import '../stylesheets/Navbar.css';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Navigate to the login page
        navigate('/login');
    };

    return (
        <Navbar expand="lg" variant="dark" sticky="top" className="navbar" style={{ backgroundColor: '#fff', borderBottom: '1px solid #e1e8ed', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-between' }}>
            {/* X logo (simple "X") */}
            <Navbar.Brand as={Link} to="/dashboard" className="navbar-brand-left" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1d9bf0' }}>
                X
            </Navbar.Brand>
            
            {/* Search bar in the center */}
            <Nav className="navbar-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div className="navbar-search-container" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f7f7f7', borderRadius: '20px', padding: '5px 10px', width: '250px' }}>
                    <FaSearch style={{ color: '#1d9bf0', marginRight: '5px', fontSize: '18px' }} />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="navbar-search" 
                        style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', width: '200px', backgroundColor: 'transparent' }} 
                    />
                </div>
            </Nav>

            {/* Right-side Icons */}
            <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                {/* Home Icon */}
                <Nav.Link as={Link} to="/dashboard" className="navbar-icon">
                    <FaHome style={{ fontSize: '20px', color: '#1d9bf0' }} />
                </Nav.Link>

                {/* Explore Icon */}
                <Nav.Link className="navbar-icon">
                    <FaSearch style={{ fontSize: '20px', color: '#1d9bf0' }} />
                </Nav.Link>

                {/* Notifications Icon */}
                <Nav.Link className="navbar-icon">
                    <FaHeart style={{ fontSize: '20px', color: '#1d9bf0' }} />
                </Nav.Link>

                {/* Direct Messages Icon */}
                <Nav.Link className="navbar-icon">
                    <FaPaperPlane style={{ fontSize: '20px', color: '#1d9bf0' }} />
                </Nav.Link>

                {/* Account Dropdown */}
                <NavDropdown title={<FaUserAlt style={{ fontSize: '20px', color: '#1d9bf0' }} />} id="basic-nav-dropdown" className="navbar-icon">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </div>
        </Navbar>
    );
}

export default NavBar;
