import React, { useEffect, useState } from "react";


import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

import S3FileUpload from 'react-s3';
import Confetti from 'react-confetti'
import './App.css';

window.Buffer = window.Buffer || require("buffer").Buffer;


function DragDrop() {

  const [File, setFile] = useState([]);

 
  const [data, setdata] = useState([]);

  const [load,setload]=useState(false)

  const [count,setCount]=useState(0)

  const config = {
    bucketName: 'react-uploder',

    region: 'us-east-2',
    accessKeyId: 'AKIAR3ODRKDPPPZA43XT',
    secretAccessKey: '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',
  }






  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragEnter = (e) => {
    e.preventDefault()
  }

  const onFileDrop = (e) => {

    e.preventDefault()
    console.log(e.dataTransfer.files)
    setFile([...e.dataTransfer.files])
   
  }



  const handleChange = (e) => {
    setFile([...e.target.files])

    console.log(e.target.files)
  }






async function upload() {
  
  try{

    setload(true)

    if(File.length>1){
    File.map((async(file,i)=>{
  
  
     await S3FileUpload
      .uploadFile(file,config)
      .then(res => setdata((arr)=>[...arr,res])).then(()=>{setload(false)}).then(()=>setFile((arr)=>arr.splice(i,1)))
      .catch(err => console.error(err))
    
       
  }
  ))}


  if(File.length==1){
    await S3FileUpload
    .uploadFile(File,config)
    .then(res => setdata((arr)=>[...arr,res])).then(()=>{setload(false)}).then(()=>setFile((arr)=>arr.splice(0,1)))
    .catch(err => console.error(err))

  }
  
  
  
  
  
  }
  
  catch(e){
    console.log(e)
  }
  

}

useEffect(()=>{



},[File])


  return (
    <div style={{ height: "50%" }}>




    {
      data.length>0&&File.length==0?<Confetti recycle={false}/>:""
    }
  
    
    
          {
            data?data.map((res,i)=>{

             

         return(
              <div className="video-card">
              <video width="320" height="240" controls>
                <source src={res.location.split(" ").join("+")} type="video/mp4" />
    
    
              </video>
            </div>
)


            }) 
              : ""}



      <div className="content"
        onDragEnter={(e) => { onDragEnter(e) }}
        onDragOver={(e) => { onDragOver(e) }}
        onDrop={(e) => { onFileDrop(e) }}  >

        {
          File.length>0&&<diV className="upload-button" style={{marginBottom:"20px"}} class="btn btn-info btn-lg" onClick={()=>{upload()}}>
          <span class="glyphicon glyphicon-cloud-upload" ></span>click here to Upload to  Cloud
        </diV>
        }

        {
        File.length==0&&<p style={{ color: "black" }}>Drag and drop file here</p>
        
        }

       

{

 load&&<div><img style={{height:"200px",width:"200px"}} src="https://media.tenor.com/6gHLhmwO87sAAAAi/gg.gif" alt=""></img></div>

}
          


        <div>

      
         
     
          <input onChange={(e) => { handleChange(e) }} type="file" id="file-upload" multiple></input></div>




        {
          File ?

            File.map((data,i) => {
            
              (setInterval(() => {
                
                  
                setCount((count)=>Math.min(count+ Math.random() * 10, 100));
              },1800))
          

              return (
                <div className="card"><p className="card-title">{data.name}</p>
                
                <ProgressBar now={count} />
             
                </div>

              )

            }





            )

            : ""}



      </div>


      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>


      

    </div>


  )

}

export default DragDrop;
