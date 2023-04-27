import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from "../store/cartSlice";
import data from '../data';

function Watched() {
    const [watchedItems, setWatchedItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const watchedData = JSON.parse(localStorage.getItem('watched')) || [];
        const filteredWatchedData = watchedData.filter((item) => item.id !== undefined); // undefined 항목 제거
        setWatchedItems(filteredWatchedData);
    }, []);

    useEffect(() => {
        const watchedData = JSON.parse(localStorage.getItem('watched')) || [];
        const filteredWatchedData = watchedData.filter((item) => item.id !== undefined); // undefined 항목 제거
        setWatchedItems(filteredWatchedData);
        console.log('Watched items:', filteredWatchedData); // 콘솔에 출력하여 확인
    }, []);

    const findProductById = (id) => {
        return data.find((product) => product.id === id);
    };

    return (
        <div className="container my-5">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품 제목</th>
                        <th>장바구니</th>
                    </tr>
                </thead>
                <tbody>
                    {watchedItems.map((item) => {
                        const product = findProductById(item.id);

                        return (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/detail/${item.id}`}>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/laptop${item.id}.jpg`}
                                            alt={`Product ${item.id}`}
                                            style={{ height: '50px', width: '50px' }}
                                        />
                                    </Link>
                                </td>
                                <td>
                                    {product && product.title ? (
                                        <Link to={`/detail/${item.id}`}>{product.title}</Link>
                                    ) : (
                                        <span>상품 제목이 없습니다.</span>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(addCartItem({
                                            id: item.id,
                                            name: item.id.title,
                                            count: 1
                                        }));
                                    }} className="btn btn-primary btn-sm">장바구니에 추가</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Watched;
