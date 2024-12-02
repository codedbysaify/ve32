import { createSlice } from "@reduxjs/toolkit";

const editedVideo=createSlice({
    name:"editedVideo",
    initialState:null,
    reducers:{
        setEditedvideoURL:(state,action)=>{
            return action.payload;
        }
    }

})
export const {setEditedvideoURL}=editedVideo.actions;
export default editedVideo.reducer;