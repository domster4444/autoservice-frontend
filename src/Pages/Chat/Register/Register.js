import React, { useState } from "react";
import Layout from "../components/Layout";
import Card from "Pages/Chat/components/Layout/UI/Card";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <div className='registerContainer'>
        <Card>
          <form action=''>
            <label htmlFor=''>
              First Name
              <input
                placeholder='First Name'
                name='first-name'
                type='text'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <label htmlFor=''>
              last name
              <input
                placeholder='Last Name'
                name='last-name'
                type='text'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
            <label htmlFor=''>
              password
              <input
                placeholder='Email'
                name='email'
                type='text'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor=''>
              Password
              <input
                placeholder='Password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>

            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
