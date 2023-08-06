import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Замените BASE_URL на адрес вашего API
const BASE_URL = 'https://api.yii2-stage.test.wooppay.com';


export const fetchSearchData = createAsyncThunk('api/fetchData/search', async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data.');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch data.');
    }
});

const searchSlice = createSlice({
    name: 'catalog',
    initialState: {
        searchData: null,
        searchLoading: false,
        searchError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchData.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(fetchSearchData.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchData = action.payload;
            })
            .addCase(fetchSearchData.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message;
            });
    },
});

export default searchSlice.reducer;