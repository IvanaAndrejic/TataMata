import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const TataMata = () => {
  return (
    <div className="d-flex justify-content-center mt-4 mb-4">
      <div 
        className="d-flex flex-wrap justify-content-center" 
        style={{ gap: '1rem', width: '100%', maxWidth: '1300px' }} // Razmak između kartica
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <Link 
            to={`/tatamata/${idx + 1}`} 
            style={{ textDecoration: "none", width: 'calc(33.33% - 1rem)' }} // Kartice zauzimaju po trećinu prostora
            key={idx}
          >
            <Card 
              
              className="p-1" 
              style={{
                maxWidth: '15rem', 
                minHeight: '15rem', 
                borderWidth: '1px', 
                height: 'auto',
                marginBottom: '1rem'
              }}
            >
              <Card.Body className="p-2" style={{ height: '100%', width: '100%' }}>
                <img
                  src={`/images/img${idx + 1}.png`}
                  alt={`img${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '0.25rem'
                  }}
                />
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TataMata;
