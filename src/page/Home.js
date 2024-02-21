import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import DiaryList from "../component/DiaryList";
import Editor from "../component/Editor";
import { getFormattedDate, getMonthRangeByDate, setPageTitle } from "../util";
import { DiaryStateContext } from "../App";

/*
const Home = () => {
    //const [seachParams, setSeachParams] = useSearchParams();
    //console.log(seachParams.get("sort"));
    const onSubmit = () => {
        alert('작성 완료!!');
    }

    return(
        <div>
            <Header  title={"HOME"} 
                     leftChild={<Button type={'positive'} text={'긍정버튼'} onClick={() => { alert('긍정버튼'); }}/>}    
                     rightChild={ <Button type={'negative'} text={'부정버튼'} onClick={() => { alert('부정버튼'); }}/>}
                     />
  
            <Editor onSubmit={onSubmit} initData={{
                date : getFormattedDate(new Date()),
                emotionId:1,
                content:'이전에 썻던 내용',
            }}/> 
        </div>
    );
}
*/

const Home = () => {
    
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData , setFilteredData]= useState([]);
    const title = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;

    useEffect(() => {
        setPageTitle("Winterlood의 감정 일기장");
    },[]);

    useEffect(() => {
        if(data.length > 0){
           const {beginTimeStamp , endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter( (it) => beginTimeStamp <= it.date &&  it.date <= endTimeStamp  )
            );
            
        }else{
            setFilteredData([]);
        }


    },[data , pivotDate]);

    

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear() , pivotDate.getMonth()+1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear() , pivotDate.getMonth()-1));
    };


    return (
        <div>
            <Header  title={title} 
                     leftChild={ <Button  text={'<'} onClick={onDecreaseMonth}/>}    
                     rightChild={ <Button text={'>'} onClick={onIncreaseMonth}/>}
                     />
            <DiaryList data={filteredData}/>
        </div>
    );
};

export default Home;