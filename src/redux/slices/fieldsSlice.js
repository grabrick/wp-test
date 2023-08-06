import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Замените BASE_URL на адрес вашего API
const BASE_URL = 'https://api.yii2-stage.test.wooppay.com';


export const fetchFieldsData = createAsyncThunk('api/fetchFieldsData/fields', async (endpoint) => {
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

const fieldsSlice = createSlice({
    name: 'catalog',
    initialState: {
        fieldData: null,
        fieldLoading: false,
        fieldError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFieldsData.pending, (state) => {
                state.fieldLoading = true;
                state.fieldError = null;
            })
            .addCase(fetchFieldsData.fulfilled, (state, action) => {
                state.fieldLoading = false;
                state.fieldData = action.payload;
            })
            .addCase(fetchFieldsData.rejected, (state, action) => {
                state.fieldLoading = false;
                state.fieldError = action.error.message;
            });
    },
});

export default fieldsSlice.reducer;