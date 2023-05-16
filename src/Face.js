import Webcam from "react-webcam"
import {useState} from "react"
import axios from "axios"
import React from "react"
import {useNavigate} from "react-router-dom"



export default function FaceRec(){

    const [faceVerified,setFaceVerified]=useState(false);
    let navigate=useNavigate();

    const videoConstraints={
        width:1920,
        height:1080,
        facingMode:"user"
    }
    const webcamref= React.useRef(null)
    async function verifyFace(){
        const data={
            image:webcamref.current.getScreenshot()
        }
        const resp=await axios.post("http://192.168.0.110:8080/face",data)
        alert(resp.data.status)
        if(resp.data.status=="user_found"){
            setFaceVerified(true)
        }
        else {
            alert("Face Not Matched")
            navigate("/")
        }
    }

    const [audiType, setAudioType] = useState(1);
    const [resp, set_resp] = useState('');

    async function recognise_voice(){
        await axios.get('http://192.168.0.110:8080/', {
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
    return(<>
    {faceVerified?(<>
        <div>
            <div className="audioInput">
                <select onChange={set_audio}>
                    <option value="0" >0 - mac pro microphone</option>
                    <option value="1" >1 - custom input</option>
                </select>
                <button onClick={async ()=>{await recognise_voice()}} >audio recogs</button>
            </div>
            <div className="">
                {resp}
            </div>

        </div>
    </>):(
        <>
            <div className="face_rec" >
                <Webcam
                    audio={false}
                    height={300}
                    ref={webcamref}
                    screenshotFormat="image/jpeg"
                    width={500}
                    videoConstraints={videoConstraints}>
                </Webcam>
                <button
                    type="button"
                    onClick={async(e)=>{
                        await verifyFace()
                    }}
                    className="submitButton"
                >
                    Verify
                </button>
            </div>
        </>)}
        
    </>)
}