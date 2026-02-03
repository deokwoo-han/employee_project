import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Employee} from "@/types/types";

const API_URL = "http://localhost:3001";

// Get All infos
export const fetchGetEmployeeInfos =
    // return value, input value, error value
    createAsyncThunk<Employee[], void, { rejectValue: string }>(
        "fetchGetEmployeeInfos",
        async (_, thunkAPI) => {
            try {
                const response = await axios.get(`${API_URL}/app/emp`);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to load data");
            }
        }
    )


// post info
export const fetchPostEmployeeInfos =
    createAsyncThunk<Employee, Employee, { rejectValue: string }>(
        "fetchPostEmployeeInfos",
        async (empInfo, thunkAPI) => {
            try {
                const response = await axios.post(`${API_URL}/app/emp`, empInfo);
                console.log("response:", response.data);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to load data");
            }
        }
    )

// update info
export const fetchPutEmployeeInfos =
    createAsyncThunk<Employee, Employee, { rejectValue: string }>(
        "fetchPutEmployeeInfos",
        async (empInfo, thunkAPI) => {
            try {
                console.log("body:", empInfo);
                const response = await axios.put(`${API_URL}/app/emp/${empInfo.id}`, empInfo);
                console.log("response:", response.data);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to load data");
            }
        }
    )