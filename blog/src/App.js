import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let blogTitle = 'ReactBlog';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  let [따봉, 따봉변경] = useState(0);

  const handleSortClick = () => {
    const sortedTitles = [...글제목].sort();
    글제목변경(sortedTitles);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{ blogTitle }</h4>
      </div>

      <button onClick={()=> {
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
      }}>글수정</button>

      <button onClick={handleSortClick}>제목 정렬</button>

      <div className="list">
        <h4>{ 글제목[0] } <span onClick={ ()=>{ 따봉변경(따봉+1) } }>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
