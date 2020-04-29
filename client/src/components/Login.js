import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import "./Login.css";

export class Login extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-1 col-lg-2' />
          <div className='col-12 col-sm-10 col-lg-8 mt-5'>
            <div className='text-center'>
              <h1 className='h4 bold'>Login</h1>
              <p>Welcome back</p>
            </div>
            <button className='btn-block btn btn-primary mt-5'>
              <i className='fab fa-facebook mr-2'></i> Login With Facebook
            </button>
            <div className='text-center my-4'>OR</div>
            <Form>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' />
              </Form.Group>
              <button className='btn-block btn btn-dark' type='submit'>
                Login
              </button>
            </Form>
            <div className='text-center mt-3'>
              <p>
                Don't have an account?{" "}
                <a href='#' className='text-secondary'>
                  Join
                </a>
              </p>
            </div>
          </div>
          <div className='col-sm-2 col-lg-2' />
        </div>
      </div>
    );
  }
}

export default Login;
