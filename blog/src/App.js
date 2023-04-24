import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let blogTitle = 'ReactBlog';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);

  const handleSortClick = () => {
    const sortedTitles = [...글제목].sort();
    글제목변경(sortedTitles);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{blogTitle}</h4>
      </div>

      <button onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
      }}>글수정</button>

      <button onClick={handleSortClick}>제목 정렬</button>

      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={ ()=>{ 따봉변경(따봉++) } }>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{ setModal(!modal) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}
      {
        글제목.map(function (a, i) {
          return (
            <div className='list'>
              <h4 onClick={()=>{setModal(true); setTitle(i)}}>{a}
              <span onClick={() => {
                let copy = [...따봉];
                copy[i]++;
                따봉변경(copy);
              }}>👍</span>{따봉[i]}
              </h4>
              <p>2월 18일 발행</p>
            </div>
          )
        })
      }
      {
        modal == true ? <Modal title={title} 글제목={글제목}></Modal> : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}

export default App;
