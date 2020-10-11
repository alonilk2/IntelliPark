import React from 'react';
import './footer.css';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
export default function Footer(props) {
    return (
        <div className="footer">
            <div className="row">
                <div className="col-6 left">
                    <Form inline>
                        <Form.Group>
                            <Form.Control
                            size="lg"
                            type="email"
                            className="inputEmailField"
                            id="inputEmail"
                            aria-describedby="emailInput"
                            placeholder="Email Address"
                            />
                        </Form.Group>
                        <Button type="submit" size="lg" className="footer-sign-up-btn">Sign Up</Button>
                    </Form>
                </div>
                <div className="col-6 right">
                    <h4 className="footer-menu-title">IntelliPark</h4>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Our Solution</li>
                        <li>Download App</li>
                        <li>Contact Us</li>
                        <li>Manage Profile</li>
                    </ul>
                </div>
            </div>
            <div className="row rights-row">
                <div className="col footer-rights">
                    <p>All Rights Reserved</p>   
                </div>
            </div>
        </div>
    )
}