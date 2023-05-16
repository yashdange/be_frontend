import { useState } from "react";
import axios from 'axios';


function Dropdown( props ) {

    const [audiType, setAudioType] = useState(1);
    const [resp, set_resp] = useState('');

    function recognise_voice(){
        axios.get('http://192.168.0.110:8080/', {
            params: {
              Index: audiType
            }
          })
          .then(function (response) {
            set_resp(response.data);
          })          
    }
    function set_audio(e){
        setAudioType(parseInt(e.target.value));
        console.log(audiType);
    }
    return (
        <div>
            <div className="audioInput">
                <select onChange={set_audio}>
                    <option value="0" >0 - mac pro microphone</option>
                    <option value="1" >1 - custom input</option>
                </select>
                <button onClick={recognise_voice} >audio recogs</button>
            </div>
            <div className="">
                {resp}
            </div>

        </div>

    )

}

export default Dropdown ;
