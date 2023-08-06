import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Замените BASE_URL на адрес вашего API
const BASE_URL = 'https://api.yii2-stage.test.wooppay.com';


export const fetchCurrentData = createAsyncThunk('api/fetchData/currentCategorySlice', async (endpoint) => {
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
    name: 'currentCategorySlice',
    initialState: {
        currentCategoryData: null,
        currentCategoryLoading: false,
        currentCategoryError: null,
    },
    reducers: {
        clearData(state, action) {
            state.currentCategoryData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentData.pending, (state) => {
                state.currentCategoryLoading = true;
                state.currentCategoryError = null;
            })
            .addCase(fetchCurrentData.fulfilled, (state, action) => {
                state.currentCategoryLoading = false;
                state.currentCategoryData = action.payload;
            })
            .addCase(fetchCurrentData.rejected, (state, action) => {
                state.currentCategoryLoading = false;
                state.currentCategoryError = action.error.message;
            })
    },
});

export const { clearData } = catalogSlice.actions;
export default catalogSlice.reducer;