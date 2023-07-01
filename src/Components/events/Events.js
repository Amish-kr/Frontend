//import { useState } from 'react';
import './Events.css'
import Holi from '../../images/Holi_ext.png';
import Ramazan from '../../images/Ramazan.jpg';
import RamNavami from '../../images/RamNavami_ext.jpg';
import Eid from '../../images/Ramzan_Eid.svg';


function Events({date, time, content, subContent}){
    const pictures = [
        {
          "name": "Holi",
          "image": Holi,
        },
        {
            "name": "Eid",
            "image": Eid,
        },
        {
            "name": "Ramazan",
            "image": Ramazan,
        },
        {
            "name": "RamNavami",
            "image": RamNavami,
        }
    ];
    const imgFound = pictures.find((obj) => obj.name === content);
    if (imgFound) {
        var pic = imgFound.image;
    }
    var b = false
    if (subContent === "Holiday"){
        b = true
    }
    //const [holiday, isholiday] = useState(b);
    return(
        <div id="container">
            <div className='container1'>
                {b ? <div className='block-100'>
                    <div id="ellipse"></div>
                    <div id='date'>{date}</div>
                </div> : <div className='block-50'>
                    <div id="ellipse"></div>
                    <div id='date'>{date}</div>
                </div> }
                {b ? 
                 <></>
                : 
                <div className='block-1-2'>
                    <div id="ellipse"></div>
                    <div id='time'>{time}</div>
                </div>
                }
                {b ?<div className='block100'>
                <div className='block50'>
                    <div id="text1">{content}</div>
                    <div id="text2">{subContent}</div>                    
                </div>
                <div className='block50'>
                    <img id="image" src={pic} alt={content} height={50} width={50}/>
                </div></div>
                :
                <div className='block50'>
                    <div id="text1">{content}</div>
                    <div id="text2">{subContent}</div>                    
                </div>
                }
            </div>            
        </div>
    );
}

export default Events;

