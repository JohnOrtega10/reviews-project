import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingContext } from '../LoadingProvider';
import api from '../utils/axios';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { setIsLoading } = useContext(LoadingContext);
  const [showError, setShowError] = useState(false);

  const submit = (data) => {
    setIsLoading(true);
    api
      .post('/users', data)
      .then(() => navigate('/login'))
      .catch((err) => {
        if (err.response.status === 401) {
          setShowError(true);
        } else {
          console.log(err.response.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h6 className="mb-0 d-flex align-items-center mb-5 me-auto">
        <Link to="/">Inicio</Link>
        <FontAwesomeIcon
          icon={faCircle}
          style={{ fontSize: '0.4rem', color: '#6a6f73' }}
          className="mx-2"
        />
        <Link to="/login">Iniciar sesión</Link>
        <FontAwesomeIcon
          icon={faCircle}
          style={{ fontSize: '0.4rem', color: '#6a6f73' }}
          className="mx-2"
        />
        Registrarse
      </h6>
      <Card className="border-0 w-100" style={{ maxWidth: 450 }}>
        <Card.Body>
          <Card.Title>REGÍSTRATE</Card.Title>
          <Card.Text>Ingresa tus datos personales para continuar.</Card.Text>
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Nombres *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                required
                {...register('firstName')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellidos *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                required
                {...register('lastName')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo electrónico *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                required
                {...register('email')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                required
                {...register('password')}
              />
            </Form.Group>
            {showError && (
              <Alert variant="danger" className="py-2">
                El correo electrónico ya está registrado
              </Alert>
            )}
            <Button
              variant="primary"
              type="submit"
              className="mb-3 border-bot w-100"
            >
              Registrarme
            </Button>
            <p className="border-top pt-2">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
