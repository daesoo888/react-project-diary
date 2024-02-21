import React from "react";
import { useNavigate  } from "react-router-dom";
import { getEmotionImgById , getFormattedDate} from "../util";
import Button from "./Button";
import './DiaryItem.css';

const DiaryItem = ({id, emotionId, content, date }) => {
    const nevigate = useNavigate();
    const goDetail = () => {
        nevigate(`/diary/${id}`);
    };
    const goEdit = () => {
        nevigate(`/edit/${id}`);
    };

  return (
    <div className="DiaryItem">
        <div onClick={goDetail} className={[ "img_section" , `img_section_${emotionId}`].join(" ")}>
            <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)}/>
        </div>
        <div onClick={goDetail} className="info_section">
            <div className="date_wrapper">
                {/*new Date(parseInt(date)).toLocaleString()*/}
                {getFormattedDate(new Date(date))}
            </div>
            <div className="content_wrapper">{content.slice(0.25)}</div>
        </div>
        <div className="button_section" >
            <Button type={'default'} text={'일기 수정'} onClick={goEdit} />
        </div>


    </div>

  );  
}

export default React.memo(DiaryItem);