import { useState, useEffect } from 'react';
import './App.css';
import { Button, Nav, Navbar, Container, Row, Spinner } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Detail from './pages/Detail.js'
import About from './pages/About';
import EventPage from './pages/EventPage';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';
import { selectTotalCartCount } from './store/cartSlice';

function App() {

  const totalCartCount = useSelector(selectTotalCartCount);
  let navigate = useNavigate();
  const [info, setInfo] = useState(data);
  const chunkSize = 3;
  const chunks = Array(Math.ceil(info.length / chunkSize))
    .fill()
    .map((_, index) => index * chunkSize)
    .map(begin => info.slice(begin, begin + chunkSize));

  const [loadCount, setLoadCount] = useState(0); // loadCount 변수와 setLoadCount 함수 정의
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // isLoading 변수와 setIsLoading 함수 정의
  const handleItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleLoadMore = () => {
    const dataUrl = ['https://codingapple1.github.io/shop/data2.json', 'https://codingapple1.github.io/shop/data3.json'];

    setIsLoading(true); // 로딩중입니다 표시

    // 불러올 데이터가 없을 경우
    if (loadCount >= dataUrl.length) {
      setIsButtonVisible(false);
      setIsLoading(false); // 로딩중입니다 숨기기
      return;
    }

    axios.get(dataUrl[loadCount])
      .then((res) => {
        setInfo(info.concat(res.data));
        setLoadCount(loadCount + 1);

        // 더보기 버튼을 최대 두번 누를 수 있도록 제한
        if (loadCount >= dataUrl.length - 1) {
          setIsButtonVisible(false);
        }

        setIsLoading(false); // 로딩중입니다 숨기기
      })
      .catch(() => {
        console.log('실패');
        setIsLoading(false); // 로딩중입니다 숨기기
      });
  };

  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const watchedData = JSON.parse(localStorage.getItem('watched')) || [];
    const newWatched = [];
    for (let i = 0; i < watchedData.length; i++) {
      const id = watchedData[i].id;
      const exists = info.some((item) => item.id === id);
      if (exists) {
        newWatched.push(watchedData[i]);
      }
    }
    setWatched(newWatched);
  }, [info, watched]);






  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand className='ms-4' onClick={() => navigate('/')}>다판다</Navbar.Brand>
          <Nav className="ms-auto justify-content-between">
            <Nav.Link onClick={() => { navigate('/watched') }}>
              <div style={{ position: 'relative' }}>
                {watched.length > 3 && (
                  <div style={{ position: 'absolute', top: -5, right: -10, backgroundColor: 'red', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    +{watched.length - 3}
                  </div>
                )}
                {watched.slice(0, 3).map((item) => (
                  <img
                    key={item.id}
                    src={process.env.PUBLIC_URL + '/laptop' + item.id + '.jpg?' + Date.now()}
                    alt={item.title}
                    style={{ height: '30px', width: '30px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px' }}
                  />
                ))}
                {(watched.length > 0 && watched.length <= 3) && (
                  <div style={{ position: 'absolute', top: -5, right: -10, backgroundColor: 'red', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {watched.length}
                  </div>
                )}
              </div>
            </Nav.Link>


            <Nav.Link className='ml-4' onClick={() => { navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event') }}>Event</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart ({totalCartCount})</Nav.Link>
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
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <Spinner animation="border" variant="secondary" />
              </div>
            ) : (
              <>
                {isButtonVisible ? (
                  <Button className="mt-4" variant="secondary" onClick={handleLoadMore}>
                    더보기
                  </Button>
                ) : (
                  <div className="mt-4" style={{ height: 0 }}></div>
                )}
              </>
            )}
          </>
        }
        />

        <Route path='/detail/:id' element={<Detail info={info} />} />
        <Route path='/cart' element={<Cart />} />

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
    </div>
  );
}

export default App;
