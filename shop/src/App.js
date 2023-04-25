import logo from './logo.svg';
import './App.css';
import { Button, Nav, Navbar, Container, Row, Col } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">다판다</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>
      <Container>
        <Row>
          <Col md={4}>
            <img src={process.env.PUBLIC_URL + '/mac1.jpg'} className='img-fluid' />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col md={4}>
            <img src={process.env.PUBLIC_URL + '/mac2.jpg'} className='img-fluid' />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col md={4}>
            <img src={process.env.PUBLIC_URL + '/mac3.jpg'} className='img-fluid' />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
