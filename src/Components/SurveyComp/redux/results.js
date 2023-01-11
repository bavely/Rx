import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiBaseAddress } from './models/survey'

export const load = createAsyncThunk('results/load', async (id) => {
    const response = await axios.get(apiBaseAddress + '/results?postId=' + id)
    return response.data
})
// {postId, surveyResult, surveyResultText}
export const post = createAsyncThunk('results/post', async (data) => {
  const response = await axios.post(apiBaseAddress + '/post', data);
  return response.data
})
