import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { API_ENPOINT } from '../Api';
import '../stylesheets/Login.css';  

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                jwtDecode(token);
                navigate('/dashboard');  
            } catch {
                console.error("Error decoding token", error);
                localStorage.removeItem('token');
                navigate("/login"); 
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please enter username and password');
            return;
        }
        try {

            const response = await axios.post(`${API_ENPOINT}/auth/login`, { username, password });

            // Handle response and store token
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                setError('');  // Clear error message
                navigate('/dashboard');  // Redirect on success
            } else {
                throw new Error("Token not found");
            }
        } catch (err) {
            setError('Invalid username or password');  
            console.error("Login error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }

    return (
        <Container className="login-container">
            <Row className="justify-content-center">
                <div className="login-content">
                    {/* X (Twitter) logo */}
                    <img 
                        src="https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png" 
                        alt="X Logo" 
                        className="logo" 
                        width="120" 
                    />
                    
                    {/* X tagline */}
                    <h5 className="login-heading" style={{ color: '#1d9bf0' }}>Sign in to X</h5>

                    <Col md={4} className="login-form" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                        {/* Error message */}
                        {error && <div className="alert alert-danger" style={{ backgroundColor: '#ff4d4d', color: 'white' }}>{error}</div>}

                        <Form onSubmit={handleSubmit} className="login-form_1">
                            {/* Username input */}
                            <Form.Group controlId="username" className='username'>
                                <Form.Control 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="custom-input"
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', color: '#333' }}
                                    placeholder="Phone, email, or username" 
                                />
                            </Form.Group>

                            {/* Password input */}
                            <Form.Group controlId="password" className="mt-3">
                                <Form.Control 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="custom-input"
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', color: '#333' }}
                                    placeholder="Password" 
                                />
                            </Form.Group>

                            {/* Login button */}
                            <Button 
                                variant="primary" 
                                type="submit" 
                                style={{ 
                                    backgroundColor: '#1d9bf0', 
                                    color: 'white', 
                                    padding: '12px', 
                                    width: '100%', 
                                    borderRadius: '6px',
                                    border: 'none',
                                    fontSize: '16px'
                                }}
                            >
                                Log In
                            </Button>

                            {/* Forgot password */}
                            <p className="forgot-password" style={{ textAlign: 'center', marginTop: '10px', color: '#1d9bf0', fontSize: '14px' }}>Forgot password?</p>
                            
                            <div style={{ marginTop: '15px', borderTop: '1px solid #ccc', paddingTop: '24px', width: '250px', margin: 'auto' }}>
                                {/* Create new account */}
                                <Button 
                                    className='sign-up'
                                    variant="link" 
                                    style={{ color: '#1d9bf0', fontSize: '14px', textDecoration: 'none' }}
                                >
                                    Don't have an account? Sign up
                                </Button>
                            </div>
                        </Form>
                    </Col>

                </div>
            </Row>
        </Container>
    );
}

export default Login;
