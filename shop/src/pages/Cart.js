import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";

function Cart() {

    let stock = useSelector((state) => { return state.stock });
    console.log(stock)

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품 명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>안녕</td>
                        <td>안안녕</td>
                        <td>안안안녕</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;