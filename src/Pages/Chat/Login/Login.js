import React, { useState } from "react";
import Layout from "../components/Layout";
import Card from "Pages/Chat/components/Layout/UI/Card";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Layout>
        <div className='loginContainer'>
          <Card>
            <form action=''>
              <input
                placeholder='Password'
                name='email'
                type='text'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                placeholder='Password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div>
                <button type='submit'>Login</button>
              </div>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Login;
