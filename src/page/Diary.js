import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Viewer from "../component/Viewer"
import { getFormattedDate, getMonthRangeByDate, setPageTitle } from "../util";

const Diary = () => {
    
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const {date , emotionId , content} = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

    const goBack = () => {
        navigate(-1);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }

    useEffect(() => {
        setPageTitle(`${id}번 일기`);
    },[]);
    

    if(!data){
        return <div>로딩중 ...</div>
    }else{

        return(
            <div>
                    <Header  title={title} 
                     leftChild={ <Button  text={'< 뒤로 가기'} onClick={goBack}/>}    
                     rightChild={ <Button text={'수정하기'} onClick={goEdit}/>}
                     />
                <Viewer content={content} emotionId={emotionId} />
            </div>
        );

    }

    
}

export default Diary;