import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const TataMata = () => {
  return (
    <div className="d-flex justify-content-center mt-4 mb-4">
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col key={idx} className="d-flex justify-content-center">
            <Link to={`/tatamata/${idx + 1}`} style={{ textDecoration: "none" }}>
            <Card 
  border="warning" 
  className="p-1" // mali padding da border dobije prostor
  style={{ width: '15rem', height: '15rem', borderWidth: '1px' }} // možeš povećati širinu bordera ako želiš
>
  <Card.Body className="p-0" style={{ height: '100%', width: '100%' }}>
    <img
      src={`/images/img${idx + 1}.png`}
      alt={`img${idx + 1}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: '0.25rem' // ako želiš da slika prati zaobljenje Card-a
      }}
    />
  </Card.Body>
</Card>

              
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TataMata;
