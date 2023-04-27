import { Card, Col } from 'react-bootstrap';

function ItemCard({ item, onItemClick }) {
  return (
    <Col md={4}>
      <Card onClick={() => onItemClick(item.id)}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/laptop' + (item.id) + '.jpg'} className='img-fluid' />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ItemCard;
