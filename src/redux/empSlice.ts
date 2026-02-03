import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchGetEmployeeInfos, fetchPostEmployeeInfos, fetchPutEmployeeInfos} from "@/redux/empApi";
import {Employee} from "@/types/types";


export const tempEmp: Employee = {
    id: "", name: "", age: 0, job: "", language: "", pay: 0
}

type Mode = "" | "register" | "update" | "delete" | "reset"

export interface ModeItems {
    id: Mode;
    label: string;
}

export const modes: ModeItems[] = [
    {id: "register", label: "Register"},
    {id: "update", label: "Update"},
    {id: "delete", label: "Delete"},
    {id: "reset", label: "Reset"},
]

interface EmpState {
    mode: Mode,
    selectedId: string,
    upInfo: Employee,
    infos: Employee[],
    error: string | null,
    loading: boolean,
}

const initialData: Employee[] = [
  {id: "1", name: 'John', age: 35, job: "frontend", language: "react", pay: 1},
  {id: "2", name: 'Peter', age: 35, job: "backend", language: "python", pay: 1},
  {id: "3", name: 'Sue', age: 35, job: "frontend", language: "javascript", pay: 1},
  {id: "4", name: 'Susan', age: 35, job: "backend", language: "java", pay: 1},
]


const initialState: EmpState = {
    mode: "",
    selectedId: "",
    upInfo: tempEmp,
    infos: initialData,
    error: null,
    loading: false,
}

const empSlice = createSlice({
    name: "empSlice",
    initialState,
    reducers: {
        selectId(state: EmpState, action: PayloadAction<string>) {
            // console.log("selectId：", action.payload)
            state.selectedId = action.payload
            state.upInfo = state.infos.filter(info => info.id === action.payload)[0]
        },
        changeMode(state: EmpState, action: PayloadAction<Mode>) {
            if (action.payload === "delete") {
                state.infos = state.infos.filter(info => info.id !== state.selectedId);
                state.upInfo = tempEmp;
            }
            state.mode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload;
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "load failed";
            })
            .addCase(fetchPostEmployeeInfos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.upInfo = action.payload;
            })
            .addCase(fetchPostEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "load failed";
            })
            .addCase(fetchPutEmployeeInfos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPutEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.upInfo = action.payload;
            })
            .addCase(fetchPutEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "load failed";
            })
    }
})

export const {selectId, changeMode} = empSlice.actions;
export default empSlice.reducer;