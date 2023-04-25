import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Button, Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link } from 'react-router-dom'

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
          <Navbar.Brand href="/">다판다</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <Container className='mt-4'>
              {
                chunks.map((chunk, rowIndex) => (
                  <Row key={rowIndex}>
                    {chunk.map((item, colIndex) => (
                      <Col key={colIndex} md={4}>
                        <img src={process.env.PUBLIC_URL + '/mac' + (item.id + 1) + '.jpg'} className='img-fluid' />
                        <h4>{item.title}</h4>
                        <p>{item.price}</p>
                      </Col>
                    ))}
                  </Row>
                ))
              }
            </Container>
          </>
        }
        />
        <Route path='/detail' element={<div>상세페이지임</div>} />
      </Routes>

    </div>
  );
}

export default App;
