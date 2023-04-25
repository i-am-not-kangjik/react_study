import { useParams } from "react-router-dom";
import styled from "styled-components";

// let YellowBtn = styled.button`
//     background : ${props => props.bg};
//     color : ${props => props.bg == 'blue' ? 'white' : 'black'};
//     padiing : 10px;
// `

function Detail(props) {

    let { id } = useParams();
    let found_id = props.info.find((x) => x.id == id)

    return (
        <div className="container mt-5">
            {/* <YellowBtn bg='blue'>버튼</YellowBtn>
            <YellowBtn bg='orange'>버튼</YellowBtn> */}
            <div className="row">
                <div className="col-md-6 mt-5">
                    <img src={process.env.PUBLIC_URL + '/mac' + (parseInt(id) + 1) + '.jpg'} className='img-fluid rounded' style={{ maxHeight: '500px' }} />
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
