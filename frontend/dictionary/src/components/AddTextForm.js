import React, { useState } from "react"
import "../css/AddTextForm.css"

export default function AddTextForm(props) {
    const [text, setText] = useState("");
    const [translation, setTranslation] = useState("");
    const [transcription, setTranscription] = useState("");

    const clickFnc = () => {
        fetch("/dictionary/add",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                txt: text,
                trnsl: translation,
                trnsr: transcription,
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
         console.log("Response: ", data);
         setText('');
         setTranslation('');
         setTranscription('');
        });
    }

    return(
        <div className="inputForm">
            <input type="text" className="inputText" placeholder="текст" 
                value={text} onChange={e => setText(e.target.value)}></input><br/>
            <input type="text" className="inputTranslation" placeholder="перевод"
                value={translation} onChange={e => setTranslation(e.target.value)}></input><br/>
            <input type="text" className="inputTranscription" placeholder="транскрипция"
                value={transcription} onChange={e => setTranscription(e.target.value)}></input><br/>
            <button className="addButton" onClick={clickFnc}>Добавить в словарь</button>
        </div>
    )
}