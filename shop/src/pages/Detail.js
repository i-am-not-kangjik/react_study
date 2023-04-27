import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addCartItem } from "../store/cartSlice";
import { useDispatch } from 'react-redux';

function Detail(props) {

    let [fade2, setFade2] = useState('');

    useEffect(() => {
        let fadeTimer2 = setTimeout(() => { setFade2('end'); }, 10)
        return () => {
            clearTimeout(fadeTimer2);
            setFade2('');
        }
    }, [])

    useEffect(() => {
        let a = setTimeout(() => { setAlert(false) }, 1000, [])

        return () => {
            clearTimeout(a);    // 기존 데이터 요청을 제거 (clean-up function)
            // useEffect 동작 전에 실행됨
        }
    });

    let { id } = useParams();
    let found_id = props.info.find((x) => x.id == id) || {};
    let [alert, setAlert] = useState(true);
    let [tabNum, setTabNum] = useState(0);
    let dispatch = useDispatch();

    useEffect(() => {
        const watched = JSON.parse(localStorage.getItem('watched')) || []; // 기존에 저장된 watched 값을 가져옴
        const exists = watched.some((item) => item.id === found_id.id); // 현재 상품이 이미 watched에 존재하는지 확인
    
        if (!exists) {
          watched.push({ id: found_id.id }); // 새로운 상품을 watched에 추가
          localStorage.setItem('watched', JSON.stringify(watched)); // watched 값을 localStorage에 저장
        }
      }, [found_id]);    

    return (
        <div className={`container mt-5 start ${fade2}`}>
            {
                alert == true ?
                    <div className="alert alert-warning">
                        1초이내 구매시 할인
                    </div>
                    : null
            }
            <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="col-md-6 mt-5">
                    <img src={process.env.PUBLIC_URL + '/laptop' + id + '.jpg'} className='img-fluid rounded' style={{ maxHeight: '500px' }} />
                </div>
                <div className="col-md-6 mt-2">
                    <h2 className="pt-5">{found_id.title}</h2>
                    <p style={{ fontSize: '1.5rem' }}>{found_id.content}</p>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{found_id.price + '원'}</p>
                    <button onClick={()=>{
                        dispatch(addCartItem({
                            id: found_id.id,
                            name: found_id.title,
                            count: 1
                        }));
                    }} className="btn btn-primary btn-lg">장바구니에 추가</button>
                </div>
            </div>

            <Nav className="mt-4" variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { setTabNum(0) }} eventKey="link0" className={tabNum === 0 ? "nav-link bg-success text-white active" : "nav-link"}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTabNum(1) }} eventKey="link1" className={tabNum === 1 ? "nav-link bg-success text-white active" : "nav-link"}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTabNum(2) }} eventKey="link2" className={tabNum === 2 ? "nav-link bg-success text-white active" : "nav-link"}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>


            <TabContent tabNum={tabNum} />




        </div>
    )
}

function TabContent({ tabNum }) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        let fadeTimer = setTimeout(() => { setFade('end'); }, 10)
        return () => {
            clearTimeout(fadeTimer);
            setFade('');
        }
    }, [tabNum])

    return (
        <div className={`start ${fade}`}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabNum]}
        </div>
    );
}

export default Detail;
