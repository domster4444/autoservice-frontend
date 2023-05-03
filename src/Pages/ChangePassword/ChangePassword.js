import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiLockPasswordFill } from "react-icons/ri";

import { useParams } from "react-router-dom";

import { useChangePasswordMutation } from "redux/api/auth/authApi";

// ? utilities
import LoginFormAnimation from "library/utilities/animations/LoginFormAnimation";
import LoginHeadingAnimation from "library/utilities/animations/LoginHeadingsAnimations";
import FormErrorTag from "components/FormErrorTag/FormErrorTag";

// * components
import Logo from "components/Logo";
import Heading from "components/polymorphicComponents/Heading";
import SubParagraph from "components/SubParagraph";
import { TertiaryBtn } from "components/Buttons/Buttons";
import toastMsg from "library/utilities/toastMsg";

const ForgotPasswordBody = styled.main`
  min-height: 100vh;
  background: var(--primary-blue);
`;

const Form = styled.form`
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const FormInput = styled.input`
  outline: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
`;

const ChangePassword = () => {
  const [changePassword, { isLoading: isChangePassLoading }] = useChangePasswordMutation();

  const { id } = useParams();

  const onSubmit = (values, actions) => {
    actions.resetForm();
    console.log(values);
    const { password, confirmPassword } = values;
    console.log(password, confirmPassword, id);

    changePassword({ password, token: id })
      .then((res) => {
        console.log(res);
        if (res.error) {
          toastMsg(res.error.data.error[0].msg, false);
        } else {
          toastMsg(res.data.message, true);
        }
      })
      .catch((err) => {
        console.log(err);
        toastMsg("unable to change password", false);
      });
  };

  const forgotPasswordSchema = Yup.object().shape({
    // schema for password and confirm password
    password: Yup.string().required("Password is required"),
    // confirm password should be same as password
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit,
  });

  return (
    <ForgotPasswordBody>
      {/* ---------------------  */}
      <LoginHeadingAnimation>
        <div className='d-flex justify-content-center pt-5'>
          <Logo size='50px' alt='deerwalk logo' className='mt-5 mb-4' />
          {/* <div className='mt-5 mb-4'>
          <LogoSkeleton />
        </div> */}
        </div>
      </LoginHeadingAnimation>
      <Heading as='h1' className='text-white text-center mt-4'>
        Deerwalk Autoservice
        {/* <div className='ms-2 pt-2'>
          <Skeleton style={{ width: "15rem", height: "1.5rem" }} duration={0.7} />
        </div> */}
      </Heading>

      <div className='text-center display-3 mt-3 mb-2 text-white'>
        <RiLockPasswordFill />
      </div>

      <header>
        <Heading as='h5' className='text-white text-center'>
          Change Password
          {/* <div className='ms-2 pt-2'>
              <Skeleton style={{ width: "4rem", height: "0.8rem" }} duration={0.7} />
            </div> */}
        </Heading>
      </header>
      <SubParagraph className='text-center'>
        Please enter your new password.
        {/* <div>
          <Skeleton style={{ width: "18rem", height: "0.9rem" }} duration={0.7} />
        </div> */}
      </SubParagraph>

      {/* ---------------------  */}

      <LoginFormAnimation>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <header>
            <Heading as='h5' className='text-white text-center'>
              Login
              {/* <div className='ms-2 pt-2'>
              <Skeleton style={{ width: "4rem", height: "0.8rem" }} duration={0.7} />
            </div> */}
            </Heading>
          </header>

          {/* add password field */}
          <FormInput name='password' placeholder='Enter  password' type='password' className='roboto_regular mt-3 ' value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {errors.password && <FormErrorTag> {errors.password}</FormErrorTag>}

          {/* add confirm password field */}
          <FormInput name='confirmPassword' placeholder='Enter  confirm password' type='password' className='roboto_regular mt-3 ' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
          {errors.confirmPassword && <FormErrorTag> {errors.confirmPassword}</FormErrorTag>}

          <div className='d-flex justify-content-end mt-3'>
            <Link to='/'>
              <SubParagraph className='text-center'>
                Back to login ?
                {/* <div>
          <Skeleton style={{ width: "18rem", height: "0.9rem" }} duration={0.7} />
        </div> */}
              </SubParagraph>
            </Link>
          </div>

          <TertiaryBtn type='submit' className='text-white mt-3'>
            Submit
          </TertiaryBtn>
        </Form>
      </LoginFormAnimation>
    </ForgotPasswordBody>
  );
};

export default ChangePassword;
