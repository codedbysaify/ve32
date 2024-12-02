import { configureStore } from "@reduxjs/toolkit";

import currentVideo from "./slices/currentObjects";
import editedVideoURL from "./slices/editedvideo"
export const store=configureStore({
    reducer:{
        currentVideo:currentVideo,
        editedVideo:editedVideoURL
    }
})