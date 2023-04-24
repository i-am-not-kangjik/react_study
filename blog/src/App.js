import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let blogTitle = 'ReactBlog';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [작성일, 작성일변경] = useState(['2월 18일', '2월 19일', '2월 20일']);

  const handleSortClick = () => {
    let sortedData = [...글제목].map((title, index) => {
      return { title, like: 따봉[index], date: 작성일[index] };
    });
  
    sortedData.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  
    let sortedTitles = sortedData.map((data) => {
      return data.title;
    });
  
    let sortedLikes = sortedData.map((data) => {
      return data.like;
    });
  
    let sortedDates = sortedData.map((data) => {
      return data.date;
    });
  
    글제목변경(sortedTitles);
    따봉변경(sortedLikes);
    작성일변경(sortedDates);
  };  

  const handleAddClick = () => {
    if (!입력값) {
      return;
    }
    let copy글제목 = [...글제목];
    let copy따봉 = [...따봉];
    let currentDate = new Date();
    let formattedDate = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
    let copy작성일 = [...작성일];
    copy글제목.unshift(입력값);
    copy따봉.unshift(0);
    copy작성일.unshift(formattedDate);
    글제목변경(copy글제목);
    따봉변경(copy따봉);
    작성일변경(copy작성일);
    입력값변경('');
  };  

  const handleLikeClick = (index) => {
    const new따봉 = [...따봉];
    new따봉[index] += 1;
    따봉변경(new따봉);
  };

  const handleRemoveClick = (index) => {
    let copy글제목 = [...글제목];
    let copy따봉 = [...따봉];
    copy글제목.splice(index, 1);
    copy따봉.splice(index, 1);
    글제목변경(copy글제목);
    따봉변경(copy따봉);
  };

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

      {
        글제목.map(function (a, i) {
          return (
            <div className='list'>
              <h4 onClick={() => { setModal(true); setTitle(i) }}>{a}
                <span onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick(i);
                }}>👍</span>{따봉[i]}
              </h4>
              <p>{작성일[i]} 발행</p>
              <span onClick={() => handleRemoveClick(i)}>
               글 삭제
              </span>
            </div>
          )
        })
      }
      <div className='add-post'>
        <div>
          <input value={입력값} onChange={(e) => {
            입력값변경(e.target.value);
          }}></input>
          <button onClick={handleAddClick}>글 발행</button>
        </div>
      </div>

      {
        modal === true ? <Modal title={title} 글제목={글제목} 따봉={따봉}/> : null
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
      <p>{props.따봉[props.title]}</p>
      <button>글수정</button>
    </div>
  )
}

export default App;
