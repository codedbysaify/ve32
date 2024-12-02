"use client";
//! puts Data for edit whenever use adds an element to time line 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditedvideoURL } from "../statemanagement/slices/editedvideo";
import axios from "axios";

const useFetchOnStateChange = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.currentVideo);

  const payload = {
    timeline: {
      background: '#000000', // Black background
      tracks: [
        {
          clips: [
            {
              asset: {
                type: 'title',
                text: "What's up", // Text to display
                style: 'minimal', // A clean text style
                size: 'medium', // Medium size text
                color: '#FFFFFF', // White text color
              },
              start: 0, // Start at the beginning of the video
              length: 5, // Display for 5 seconds
            },
          ],
        },
      ],
    },
    output: {
      // Output details without resolution
      format: 'mp4', // Specify the output format
      resolution: '1080'
      // No resolution specified
    },
  };
  

  useEffect(() => {
    // Return early if currentState is empty or invalid
    if (!currentState || currentState.length === 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const putvideoToqueue = await axios.post(
          process.env.NEXT_PUBLIC_SHOTSTACK_URL, // Use process.env for environment variables
          payload,
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_SHOTSTACK_API_KEY,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        // Log the result data for debugging
        console.log('Render Result:', putvideoToqueue.data);
        if (putvideoToqueue.data.success) {
          console.log('Render ID:', putvideoToqueue.data.response.id); // Extract render ID for tracking
          // Dispatch action to update Redux store (example, change as needed)
          
            const renderId=putvideoToqueue.data.response.id;
            let status="rendering";
            let editedUrl='';
            do {
                let response=await axios.get(`${process.env.NEXT_PUBLIC_SHOTSTACK_URL}/${renderId}`,{
                    headers:{
                        'x-api-key':process.env.NEXT_PUBLIC_SHOTSTACK_API_KEY
                    }
                })
                status=response.data.response.status;
                    //! console.log('Render completed:', response.data.response);

                 editedUrl=response.data.response.url;
            } while (status !== 'done');

          //!  console.log("Edited Url:  ",editedUrl)


          dispatch(setEditedvideoURL(editedUrl));
        } else {
          console.error('Render failed:', putvideoToqueue.data.response.message);
        }
      } catch (error) {
        // Log detailed error response for troubleshooting
        console.error('Error during API request:', error.response?.data || error.message);
      }
    };

    fetchData();
  }, [currentState, dispatch]); // Trigger the effect when currentState changes

};

export default useFetchOnStateChange;
