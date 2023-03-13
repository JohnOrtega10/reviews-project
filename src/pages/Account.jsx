import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { LoadingContext } from '../LoadingProvider';
import BasicInformation from '../components/BasicInformation';
import ProfilePicture from '../components/ProfilePicture';
import ReviewsHistory from '../components/ReviewsHistory';
import api from '../utils/axios';
import getConfig from '../utils/getConfig';

const Account = () => {
  const { setIsLoading } = useContext(LoadingContext);

  const [currentUser, setCurrentUser] = useState({});
  const [reloadUserProfile, setReloadUserProfile] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/users/profile', getConfig())
      .then((res) => {
        setCurrentUser(res.data.data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [reloadUserProfile, setIsLoading]);

  const reloadProfile = () => {
    setReloadUserProfile(!reloadUserProfile);
  };

  return (
    <Container className="py-5 min-vh-100">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="justify-content-lg-center">
          <Col lg={3}>
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="img-perfil mb-3">
                <img src={currentUser.profilePicture} alt="Foto de perfil" />
              </div>
              <h5>{`${currentUser.firstName} ${currentUser.lastName}`}</h5>
            </div>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Mi perfil</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Fotografía</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Historial de reseñas</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={7}>
            <h4 className="mb-4 mt-4 mt-lg-0">PERFIL PUBLICO</h4>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <BasicInformation
                  firstName={currentUser.firstName}
                  lastName={currentUser.lastName}
                  email={currentUser.email}
                  reloadProfile={reloadProfile}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ProfilePicture reloadProfile={reloadProfile} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <ReviewsHistory />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Account;
