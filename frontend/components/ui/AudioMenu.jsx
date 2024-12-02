'use client';
import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa'; // Importing the FaDownload icon
import axios from 'axios'; // Importing axios for making HTTP requests
import { useDispatch } from 'react-redux';
import { addToCurrentVideo } from '../statemanagement/slices/currentObjects';

function AudioMenu() {
    const [audioFile, setAudioFile] = useState(null);
    const dispatch=useDispatch()
    const [audioUrl, setAudioUrl] = useState(null);
    const [recentUploads, setRecentUploads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentUploadsLoading, setRecentUploadsLoading] = useState(true);
    const [mediaDurations, setMediaDurations] = useState({});
    const [userName, setUserName] = useState("Test");
    const [selectedAudio, setSelectedAudio] = useState(null); // Track selected audio for the main timeline
    const handleFileClick = () => {
      if (!audioFile) {
        document.getElementById("audioUpload").click();
      }
    };
  
    const getRecentUploads = async () => {
      try {
        setRecentUploadsLoading(true);
        const getURL = "http://localhost:4000/api/recentitems";
        const response = await axios.get(getURL, {
          params: { userId: userName },
        });
        setRecentUploads(response.data.filter((item) => item.type.startsWith("audio/")));
      } catch (error) {
        console.error("Error fetching recent uploads:", error);
      } finally {
        setRecentUploadsLoading(false);
      }
    };
  
    const handleLoadedMetadata = (mediaId, event) => {
      setMediaDurations((prev) => ({
        ...prev,
        [mediaId]: formatDuration(event.target.duration),
      }));
    };
  
    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      if (!file.type.startsWith("audio/")) {
        alert("Please select a valid audio file.");
        return;
      }
  
      const fileType = file.type;
      const fileName = file.name;
      const toGetURLparams = { fileType, fileName, userName };
      const getURL = "http://localhost:4000/api/uploadDataUrl";
  
      try {
        setLoading(true);
        const response = await axios.post(getURL, toGetURLparams);
        const { url } = response.data;
  
        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
  
        if (uploadResponse.status === 200) {
          const cloudUrl = url.split("?")[0];
          setAudioFile(cloudUrl);
          setAudioUrl(cloudUrl);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    // Handle audio selection from recent uploads
     
    const handleAudioSelect = (audio) => {
      setSelectedAudio(audio); 
      console.log("click")
      // const url = URL.createObjectURL(audio)
      let obj={
        url:audio,
        title:"firstaudio",
        type:"audio/" 
    }
    dispatch(addToCurrentVideo(obj))
      // Set the selected audio to pass it to the main timeline
    };
    
  
    useEffect(() => {
      getRecentUploads();
    }, []);
  
// drag functionality starts
const handleDragStart = (event, audio) => {
  console.log('Dragging audio:', audio);
  event.dataTransfer.setData('audioData', JSON.stringify(audio));
};

const handleDrop = (event) => {
  event.preventDefault();
  console.log('Dropping audio');
  const audioData = JSON.parse(event.dataTransfer.getData('audioData'));
  console.log('Dropped video data:', audioData);
};
//drag functionality ends

    return (
      <div className="flex flex-col items-center text-center">
        {/* Main upload box */}
        <div
          className={`${
            audioFile ? "border-blue-400" : "border-2"
          } border-2 hover:bg-gray-500 flex flex-col justify-center items-center rounded-[15px] w-[200px] h-[100px] overflow-hidden cursor-pointer relative`}
          onClick={handleFileClick}
        >
          {audioFile ? (
            <audio src={audioFile} controls className="w-full h-auto rounded-[15px]" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <FaDownload className="text-sm mr-2" />
              <p className="text-xs text-center">
                There is nothing yet.
                <br />
                Click here to upload.
              </p>
            </div>
          )}
        </div>
  
        <input
          type="file"
          id="audioUpload"
          style={{ display: "none" }}
          accept="audio/*"
          onChange={handleFileChange}
        />
  
        {/* Main Timeline */}
        {/* <h2 className="text-lg font-medium mt-4 mb-2">Audio Timeline</h2>
        <AudioOverlayTrack selectedAudio={selectedAudio} /> */}
  
        {/* Recent Uploads Section */}
        <h2 className="text-lg font-medium mt-4 mb-2">Recent Audio Files</h2>
        {recentUploadsLoading ? (
          <div className="flex justify-center items-center h-[100px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            {recentUploads.map((upload, index) => (
              <div
                key={index}
                className="w-[200px] h-[100px] rounded-[15px] bg-red-600 overflow-hidden relative cursor-pointer"
                onClick={() => handleAudioSelect(upload.url)}
                onDragStart={(e) => handleDragStart(e, upload)}
            draggable
                 // Set selected audio
              >
                <audio
                  src={upload.url}
                  controls
                  className="w-full"
                  onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                />
                {mediaDurations[index] && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    {mediaDurations[index]}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default AudioMenu;