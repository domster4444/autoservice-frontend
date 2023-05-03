import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container className='not-found'>
      <Row className='mt-5 pt-5'>
        <Col className='text-center mt-5 text-primary-blue'>
          <h1 className='title display-1 roboto_bold'>Oops!</h1>
          <p className='message roboto_regular'>We can't seem to find the page you're looking for.</p>
          <Link to='/' className='button'>
            <Button variant='primary bg-primary-blue'>Go back to home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
