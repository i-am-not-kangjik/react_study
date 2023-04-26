import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

        </div>
    )
}

export default Detail;
