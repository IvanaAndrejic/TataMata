import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cleanupComponentStyles } from '../src/js/styleCleaner';
import Spinner from 'react-bootstrap/Spinner';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  width: calc(33.33% - 1rem);
  max-width: 300px;
`;

const StyledCard = styled(Card)`
  max-width: 15rem;
  min-height: 15rem;
  border-width: 1px;
  height: auto;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px #0d1e49;
  border-radius: 5px;
  background-color: rgba(254, 231, 175, 0.91);
`;

const CardBody = styled(Card.Body)`
  height: 100%;
  width: 100%;
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0.25rem;
  height: auto;
`;

const TataMata = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    cleanupComponentStyles(['tm-tatamata']);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => {
      clearTimeout(timeout);
      cleanupComponentStyles(['tm-tatamata']);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container>
      <CardContainer>
        {Array.from({ length: 6 }).map((_, idx) => (
          <CardLink to={`/tatamata/${idx + 1}`} key={idx}>
            <StyledCard>
              <CardBody>
                <CardImage
                  src={`/images/img${idx + 1}.png`}
                  alt={`img${idx + 1}`}
                />
              </CardBody>
            </StyledCard>
          </CardLink>
        ))}
      </CardContainer>
    </Container>
  );
};

export default TataMata;
