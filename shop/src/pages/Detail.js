import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { tab } from "@testing-library/user-event/dist/tab";

function Detail(props) {

    useEffect(() => {
        let a = setTimeout(() => { setAlert(false) }, 1000, [])

        return () => {
            clearTimeout(a);    // 기존 데이터 요청을 제거 (clean-up function)
            // useEffect 동작 전에 실행됨
        }
    });

    let { id } = useParams();
    let found_id = props.info.find((x) => x.id == id);
    let [alert, setAlert] = useState(true);
    let [tabNum, setTabNum] = useState(0);

    return (
        <div className="container mt-5">
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
                    <button className="btn btn-danger btn-lg">주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
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
    return ([<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabNum]);
}

export default Detail;
