import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { addCount, minusCount } from "../store/cartSlice";

function Cart() {

    let state = useSelector((state) => { return state });
    let dispatch = useDispatch() // store.js로 요청을 보내주는 함수

    return (
        <div>
            <h5 className="h5 text-muted">{state.user.name} {state.user.age}의 장바구니</h5>
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
                                    <td>
                                        <Button className="mx-1" variant="danger" onClick={() => {
                                            dispatch(addCount(a))
                                        }}>+
                                        </Button>
                                        <Button variant="warning" onClick={() => {
                                            dispatch(minusCount(a))
                                        }}>-
                                        </Button>

                                    </td>
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