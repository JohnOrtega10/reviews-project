import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { LoadingContext } from '../LoadingProvider';
import getConfig from '../utils/getConfig';
import api from '../utils/axios';

const BasicInformation = ({
  firstName: firstNameInitial,
  lastName: lastNameInitial,
  email,
  reloadProfile
}) => {
  const { setIsLoading } = useContext(LoadingContext);

  const [showErrorNames, setShowErrorNames] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (firstNameInitial) {
      setFirstName(firstNameInitial);
      setLastName(lastNameInitial);
    }
  }, [firstNameInitial, lastNameInitial]);

  const updateNames = () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      setShowErrorNames('Los campos no pueden estar vacíos');
      return;
    }

    const data = {
      firstName,
      lastName
    };

    setIsLoading(true);
    api
      .patch('/users/profile', data, getConfig())
      .then((res) => {
        reloadProfile();
        setShowErrorNames('');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex flex-column">
      <div className="mb-4">
        <h6>Información basica</h6>
        <Form.Control
          type="text"
          placeholder="Nombres"
          className="mb-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Form.Control
          type="text"
          placeholder="Apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {showErrorNames && (
          <Alert variant="danger" className="py-2 mt-2">
            {showErrorNames}
          </Alert>
        )}
      </div>
      <div>
        <h6>Email</h6>
        <p>{email}</p>
      </div>
      <Button
        variant="primary ms-auto mt-3"
        type="submit"
        onClick={updateNames}
      >
        Guardar
      </Button>
    </div>
  );
};

export default BasicInformation;
