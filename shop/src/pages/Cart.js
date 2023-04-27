import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, minusCount, removeCartItem } from "../store/cartSlice";
import data from "../data";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch(); // store.js로 요청을 보내주는 함수

  return (
    <div>
      <h5 className="h5 text-muted">
        {state.user.name} {state.user.age}의 장바구니
      </h5>
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
          {state.cart.map((a, i) => {
            // 상품 이름을 찾습니다.
            const product = data.find((item) => item.id === a.id);
            const productName = product ? product.title : "상품 정보를 찾을 수 없음";

            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{productName}</td>
                <td>{a.count}</td>
                <td>
                  <Button
                    size="sm"
                    className="mx-1"
                    variant="danger"
                    onClick={() => {
                      dispatch(addCount(a));
                    }}
                  >
                    +
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      dispatch(minusCount(a));
                    }}
                  >
                    -
                  </Button>

                  <button
                    className="btn btn-secondary btn-sm mx-1"
                    onClick={() => {
                      dispatch(removeCartItem(a.id));
                    }}
                  >
                    삭제하기
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
