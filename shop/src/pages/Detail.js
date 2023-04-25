import { useParams } from "react-router-dom";

function Detail(props) {

    let {id} = useParams();

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + '/mac' + (parseInt(id) + 1) + '.jpg'} className='img-fluid rounded' style={{maxHeight: '500px'}} />
                </div>
                <div className="col-md-6">
                    <h2 className="pt-5">{props.info[id].title}</h2>
                    <p style={{fontSize: '1.5rem'}}>{props.info[id].content}</p>
                    <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{props.info[id].price}</p>
                    <button className="btn btn-danger btn-lg">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;
