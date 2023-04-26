import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { changeName, increaseAge } from "../store/userSlice";

function Cart() {

    let state = useSelector((state) => { return state });
    let dispatch = useDispatch() // store.js로 요청을 보내주는 함수

    return (
        <div>
            <h5 className="h5 text-muted">{state.user.name} {state.user.age}의 장바구니</h5>
            <button onClick={()=> {
                dispatch(increaseAge(100))
            }}>버튼</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td><button onClick={() => {
                                        dispatch(changeName())
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;