import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";


const store=configureStore({    //it is a functionality
    reducer:{
        auth:user
    }
})
export default store