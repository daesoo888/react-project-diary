import { Routes , Route , Link} from 'react-router-dom';
import './App.css';
//import { getEmotionImgById } from './util';
import Home from './page/Home';
import New from './page/New';
import Diary from './page/Diary';
import Edit from './page/Edit';
import Header from './component/Header';
import React , { useEffect, useReducer, useRef, useState } from 'react';

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const mockData = [
  {
    id:"mock1",
    date: new Date().getTime()-1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id:"mock2",
    date: new Date().getTime()-2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id:"mock3",
    date: new Date().getTime()-3,
    content: "mock3",
    emotionId: 3,
  },
];

function reducer(state , action){
  switch(action.type){
    case "INIT":{
      return action.data;
    }
    case "CREATE":{
      const newState = [action.data, ...state];
      localStorage.setItem("diary" , JSON.stringify(newState));
      return newState;
    }
    case "UPDATE":{
      const newState = state.map((it) => String(it.id) == action.data.id ? action.data: it );
      localStorage.setItem("diary" , JSON.stringify(newState));
      return newState;
    }
    case "DELETE":{
      const newState = state.filter( (it) => String(it.id) != String(action.targetId) );
      localStorage.setItem("diary" , JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}


function App() {
  const [data , dispatch] = useReducer(reducer,[]);
  const idRef = useRef(1);
  const [isDataLoaded , setIsDataLoaded] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if(!rawData){
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if(localData.length <= 0){
      setIsDataLoaded(true);
      return;
    }

    localData.sort((a,b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;

    dispatch({type:"INIT" , data: localData});
    setIsDataLoaded(true);
  },[]);

  const onCreate = (date , content , emotionId) => {
    dispatch({
      type:"CREATE",
      data:{
        id:idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId
      },
    });
    idRef.current += 1;
  };
  const onUpdate = ( id , date , content , emotionId ) => {
    dispatch({
      type:"UPDATE",
      data : {
        id: id,
        date : new Date(date).getTime(),
        content : content,
        emotionId : emotionId
      }
      
    });

  };
  const onDelete = (targetId) => {
    dispatch({
      type:"DELETE",
      targetId,
    });
    
  };

  if(!isDataLoaded){
    return (
      <div>로딩중 ... </div>
    );
  }else{
        return (
          <div className="App">
              {/*<h1>감정일기장</h1>*/}
              {/*
              <img alt='감정1' src={getEmotionImgById(1)}/>
              <img alt='감정2' src={getEmotionImgById(2)}/>
              <img alt='감정3' src={getEmotionImgById(3)}/>
              <img alt='감정4' src={getEmotionImgById(4)}/>
              <img alt='감정5' src={getEmotionImgById(5)}/>
            */}
            <DiaryStateContext.Provider value={data}>
              <DiaryDispatchContext.Provider value={{onCreate,onUpdate,onDelete}}>
                <Routes>
                  <Route path='/' element={<Home/>}></Route>
                  <Route path='/new' element={<New/>}></Route>
                  <Route path='/diary/:id' element={<Diary/>}></Route>
                  <Route path='/edit/:id' element={<Edit/>}></Route>
                </Routes>
              </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
            {/*
            <div>
              <Link to={"/"}>Home</Link>
              <Link to={"/new"}>New</Link>
              <Link to={"/diary/:id"}>Diary</Link>
              <Link to={"/edit"}>Edit</Link>
            </div>
          */}

          </div>
        );

  }



}

export default App;
