import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiLockPasswordFill } from "react-icons/ri";

import { useSendForgotPasswordEmailMutation } from "redux/api/auth/authApi";

// ? utilities
import LoginFormAnimation from "library/utilities/animations/LoginFormAnimation";
import LoginHeadingAnimation from "library/utilities/animations/LoginHeadingsAnimations";
import FormErrorTag from "components/FormErrorTag/FormErrorTag";

// * components
import Logo from "components/Logo";
import Heading from "components/polymorphicComponents/Heading";
import SubParagraph from "components/SubParagraph";
import { TertiaryBtn } from "components/Buttons/Buttons";

// * skeleton components
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

const ForgotPassword = () => {
  const [sendForgotPasswordEmail, { isLoading: isSendForgotPassEmailLoading }] = useSendForgotPasswordEmailMutation();

  const onSubmit = (values, actions) => {
    console.log(`submitted values ${values.phoneNumber} `);

    sendForgotPasswordEmail({ phone_number: values.phoneNumber })
      .then((res) => {
        console.log(res);
        toastMsg(res.data.message, true);
      })
      .catch((err) => {
        toastMsg("Unable to send reset password email", false);
      });
  };

  const forgotPasswordSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: "",
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
          Forgot Password
          {/* <div className='ms-2 pt-2'>
              <Skeleton style={{ width: "4rem", height: "0.8rem" }} duration={0.7} />
            </div> */}
        </Heading>
      </header>
      <SubParagraph className='text-center'>
        We will send you otp for password reset.
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
          <FormInput name='phoneNumber' placeholder='Enter  phone number' type='text' className='roboto_regular mt-3 ' value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
          {errors.phoneNumber && <FormErrorTag> {errors.phoneNumber}</FormErrorTag>}

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
            {(() => {
              if (isSendForgotPassEmailLoading) {
                return (
                  <div className='spinner-border text-white' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                );
              } else {
                return "Send OTP";
              }
            })()}
          </TertiaryBtn>
        </Form>
      </LoginFormAnimation>
    </ForgotPasswordBody>
  );
};

export default ForgotPassword;
