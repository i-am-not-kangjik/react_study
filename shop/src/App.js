import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Button, Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import data from './data.js';

function App() {

  const [info] = useState(data);
  const chunkSize = 3;
  const chunks = Array(Math.ceil(info.length / chunkSize))
    .fill()
    .map((_, index) => index * chunkSize)
    .map(begin => info.slice(begin, begin + chunkSize));

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
      <Container className='mt-4'>
        {
          chunks.map((chunk, rowIndex) => (
            <Row key={rowIndex}>
              {chunk.map((item, colIndex) => (
                <Col key={colIndex} md={4}>
                  <img src={process.env.PUBLIC_URL + '/mac' + (item.id+1) + '.jpg'} className='img-fluid' />
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                </Col>
              ))}
            </Row>
          ))
        }
      </Container>
    </div>
  );
}

export default App;
