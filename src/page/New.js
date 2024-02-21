import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { DiaryDispatchContext } from "../App";
import { getFormattedDate, getMonthRangeByDate, setPageTitle } from "../util";

const New = () => {
    

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const {onCreate} = useContext(DiaryDispatchContext);
    
    const onSubmit = (data) => {
        const { date, content , emotionId } = data;
        onCreate( date, content, emotionId);
        navigate("/", {replace: true});
    }

    useEffect(() => {
        setPageTitle("새 일기 쓰기");
    },[]);

    return(
        <div>
            <Header  title={'새 일기 쓰기'} 
                     leftChild={ <Button  text={'< 뒤로 가기'} onClick={goBack}/>}    
                     />
            <Editor onSubmit={onSubmit}/> 
        </div>
    );
}

export default New;