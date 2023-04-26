import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";

function Cart() {

    let state = useSelector((state) => { return state.cart });

    return (
        <div>
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
                        state.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{state[i].name}</td>
                                    <td>{state[i].count}</td>
                                    <td>안안안녕</td>
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