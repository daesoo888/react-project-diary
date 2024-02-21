import "./EmotionItem.css";
import React from "react";

const EmotionItem = ({id, img, name, onClick, isSelected}) => {
    const handleClick = () => {
        onClick(id);
    };

    return (
        <div className={["EmotionItem", isSelected? `EmotionItem_on_${id}`:  `EmotionItem_off`].join(" ")}>
            <div className="EmotionItem" onClick={handleClick}>
                <img alt={`emotion${id}`} src={img}/>
                <span>{name}</span>
            </div>
        </div>
        
    );
};

export default React.memo(EmotionItem);