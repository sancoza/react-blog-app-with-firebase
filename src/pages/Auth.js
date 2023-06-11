import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSingUp] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const hendleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        setActive('home');
      } else {
        return toast.error('Please fill all the fields');
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error('Passwords do not match');
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: firstName + ' ' + lastName });
        setActive('home');
      } else {
        return toast.error('Please fill all the fields');
      }
    }
    navigate('/');
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {signUp ? 'Sign-In' : 'Sign-Up'}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={hendleAuth}>
              {signUp && (
                <>
                  <div className="col-6 py-3">
                    <input
                      className="form-control input-text-box"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="col-6 py-3">
                    <input
                      className="form-control input-text-box"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    ></input>
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input
                  className="form-control input-text-box"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="col-12 py-3">
                <input
                  className="form-control input-text-box"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                ></input>
              </div>
              {signUp && (
                <div className="col-12 py-3">
                  <input
                    className="form-control input-text-box"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  ></input>
                </div>
              )}

              <div className="col-12 py-3 text-center">
                <button
                  className={`btn ${!signUp ? 'btn-sign-in' : 'btn-sign-up'}`}
                  type="submit"
                >
                  {!signUp ? 'Sign-In' : 'Sign-Up'}
                </button>
              </div>
            </form>
            <div>
              {!signUp ? (
                <>
                  <div className="text-center justify-content-center mtt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?&nbsp;
                      <span
                        className="link-danger"
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        onClick={() => setSingUp(true)}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center justify-content-center mtt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account?&nbsp;
                      <span
                        style={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          color: '#298af2',
                        }}
                        onClick={() => setSingUp(false)}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
