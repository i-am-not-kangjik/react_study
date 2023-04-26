import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Button, Nav, Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js'
import About from './pages/About';
import EventPage from './pages/EventPage';
import axios from 'axios';
import ItemCard from './components/ItemCard';

function App() {

  let navigate = useNavigate();
  const [info, setInfo] = useState(data);
  const chunkSize = 3;
  const chunks = Array(Math.ceil(info.length / chunkSize))
    .fill()
    .map((_, index) => index * chunkSize)
    .map(begin => info.slice(begin, begin + chunkSize));

  const handleItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleLoadMore = () => {
    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((res) => {
        setInfo(info.concat(res.data));
      })
      .catch(() => {
        console.log('실패');
      })
  };

  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand className='ms-4' href="/">다판다</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event') }}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <Container className='mt-4'>
              {chunks.map((chunk, rowIndex) => (
                <Row key={rowIndex} className={rowIndex > 0 ? 'mt-4' : ''}>
                  {chunk.map((item, colIndex) => (
                    <ItemCard key={colIndex} item={item} onItemClick={handleItemClick} />
                  ))}
                </Row>
              ))}
            </Container>
          </>
        }
        />

        <Route path='/detail/:id' element={<Detail info={info} />} />

        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치임</div>} />
        </Route>

        <Route path='/event' element={<EventPage />}>
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path='two' element={<p>생일기념 쿠폰받기</p>} />

        </Route>

        <Route path='*' element={<div>없는 페이지</div>} />

      </Routes>
      <button onClick={handleLoadMore}>더보기</button>
    </div>
  );
}

export default App;
