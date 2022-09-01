import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://swapi.dev/api/";

const initialState = {
  planets: null,
  people: null,
  species: null,
  receivedAll: false,
};

export const getAllPlanets = createAsyncThunk(
  "main/getAllPlanets",
  async () => {
    const response = await axios.get(`${baseUrl}/planets`);
    return response.data.results;
  }
);
export const getAllPeople = createAsyncThunk("main/getAllPeople", async () => {
  const response = await axios.get(`${baseUrl}/people`);
  return response.data.results;
});
export const getAllSpecies = createAsyncThunk(
  "main/getAllSpecies",
  async () => {
    const response = await axios.get(`${baseUrl}/species`);
    return response.data.results;
  }
);

const mainSlice = createSlice({
  initialState,
  name: "mainSlice",
  reducers: {
    setReceivedAll: (state, { payload }) => {
      state.receivedAll = payload;
    },
  },
  extraReducers: {
    [getAllPlanets.fulfilled]: (state, { payload }) => {
      state.planets = payload;
    },
    [getAllPeople.fulfilled]: (state, { payload }) => {
      state.people = payload;
    },
    [getAllSpecies.fulfilled]: (state, { payload }) => {
      state.species = payload;
    },
  },
});

export const { setReceivedAll } = mainSlice.actions;
const mainReducer = mainSlice.reducer;

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
