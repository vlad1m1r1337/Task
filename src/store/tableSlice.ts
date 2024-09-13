import {AnyAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "./index";

export const API_URL = 'http://localhost:3001/users';

export const fetchTable = createAsyncThunk<Table[], undefined, {rejectValue: string}>(
    'table/fetchTable',
    async function (_,  {rejectWithValue}) {
        const response = await fetch(API_URL);

        if (!response.ok) {
            console.log(response);
            return rejectWithValue('Ошибка запроса');
        }

        return await response.json();
    }
);

export const postToTable = createAsyncThunk<Table[], Table, {rejectValue: string, dispatch: AppDispatch}>(
    'table/addToTable',
    async function (table, {rejectWithValue, dispatch}) {
        console.log('table', table);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(table)
        });

        if (!response.ok) {
            return rejectWithValue('Ошибка запроса');
        }
        dispatch(fetchTable());
        return await response.json();
    }
);

export type Table = {
    name: string;
    email: string;
    age: number;
    file: {
        objectURL: string;
    } | undefined;
}

type RequestStatus = {
    error: string | null;
    loading: boolean;
    fetch_loading: boolean;
}

interface InitialState {
    table: Table[];
    addToTable: Table;
    request_status: RequestStatus;
}

export const initialState: InitialState = {
    table: [],
    addToTable: {
        name: '',
        email: '',
        age: 0,
        file: {
            objectURL: ''
        }
    },
    request_status: {
        error: null,
        loading: false,
        fetch_loading: false,
    }
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTable.pending, state => {
                state.request_status.loading = true;
                state.request_status.fetch_loading = true;
                state.request_status.error = null;
            })
            .addCase(fetchTable.fulfilled , (state, action) => {
                state.table = action.payload;
                state.request_status.loading = false;
                state.request_status.fetch_loading = false;
            })
            .addCase(postToTable.pending, state => {
                state.request_status.loading = true;
                state.request_status.error = null;
            })
            .addMatcher(isError, (state) => {
                state.request_status.error = 'Ошибка запроса';
                state.request_status.loading = false;
                state.request_status.fetch_loading = false;
            })
    }
});

export default tableSlice.reducer;

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}