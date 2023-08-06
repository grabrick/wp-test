import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Замените BASE_URL на адрес вашего API
const BASE_URL = 'https://api.yii2-stage.test.wooppay.com';


export const fetchData = createAsyncThunk('api/fetchData/catalog', async (endpoint) => {
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

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        catalogData: null,
        catalogLoading: false,
        catalogError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.catalogLoading = true;
                state.catalogError = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.catalogLoading = false;
                state.catalogData = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.catalogLoading = false;
                state.catalogError = action.error.message;
            });
    },
});

export default catalogSlice.reducer;