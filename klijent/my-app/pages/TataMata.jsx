import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';


const TataMata = () => {

    return (

        
        <Row xs={1} md={3} className="g-4 mt-1 mb-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col key={idx}>
            <Link to={`/tatamata/${idx+1}`}>
                <Card border='primary'  style={{ width: '18rem' }}> 
                <Card.Img variant="top" src={`../images/img${idx+1}.png`} />
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
        

    )

}

export default TataMata;