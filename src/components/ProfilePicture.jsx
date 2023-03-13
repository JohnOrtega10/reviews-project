import React, { useContext, useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { LoadingContext } from '../LoadingProvider';
import getConfig from '../utils/getConfig';
import api from '../utils/axios';

const ProfilePicture = ({ reloadProfile }) => {
  const { setIsLoading } = useContext(LoadingContext);

  const [profilePicture, setProfilePicture] = useState('');
  const [showErrorPicture, setShowErrorPicture] = useState('');
  const inputRef = useRef(null);

  const updateProfilePicture = () => {
    if (!profilePicture.name) {
      setShowErrorPicture('No se ha seleccionado un archivo');
      return;
    }
    if (!profilePicture.type.startsWith('image/')) {
      setShowErrorPicture('Solo se permiten archivos de imagen');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    setIsLoading(true);
    api
      .patch('/users/profile', formData, getConfig())
      .then(() => {
        reloadProfile();
        setShowErrorPicture('');
        inputRef.current.value = '';
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex flex-column">
      <h6>Añadir o cambiar imagen</h6>
      <Form.Group controlId="formFile">
        <Form.Control
          ref={inputRef}
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </Form.Group>
      {showErrorPicture && (
        <Alert variant="danger" className="py-2 mt-2">
          {showErrorPicture}
        </Alert>
      )}
      <Button variant="primary ms-auto mt-3" onClick={updateProfilePicture}>
        Guardar
      </Button>
    </div>
  );
};

export default ProfilePicture;
