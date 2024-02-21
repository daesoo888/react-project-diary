import { useParams , useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App"; 
import { getFormattedDate, getMonthRangeByDate, setPageTitle } from "../util";

const Edit = () => {
    
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const { onDelete , onUpdate } = useContext(DiaryDispatchContext);

    const goBack = () => {
        navigate(-1);
    }

    const onClickDelete = () => {
        if(window.confirm("일기를 삭제 하시겠습니까?")){
            onDelete(id);
            navigate("/", {replace: true});
        }
        
    }

    const onSubmit = (data) => {
        const { id, date, content , emotionId } = data;
        onUpdate( id, date, content, emotionId);
        navigate("/", {replace: true});
    }

    useEffect(() => {
        setPageTitle(`${id}번 일기 `);
    },[]);


    if(!data){
        return <div>로딩중 ...</div>
    }else{
        data.date = new Date(data.date).getTime(); 
        return(
            <div>
                <Header  title={'일기 수정하기'} 
                     leftChild={ <Button  text={'< 뒤로 가기'} onClick={goBack}/>}  
                     rightChild={ <Button  type={'negative'} text={'삭제하기'} onClick={onClickDelete}/>}   
                     />
                 <Editor onSubmit={onSubmit} initData={data}/> 
            </div>
        );
    }
    
}

export default Edit;