import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ProgrammeState} from './programme.model';
import {IProgramme} from '../../../models';
import {NeedAnalysis, Programme} from '../../database/db.models';


const initialState: ProgrammeState = {
  selectedProgramme: null,
  needAnalysis: null,
}

export const programmeSlice = createSlice({
  name: "programme",
  initialState,
  reducers: {
    setSelectedProgramme: (state, action: PayloadAction<Programme>) => {
      state.selectedProgramme = action.payload;
    },
    setProgrammeNeedAnalysis: (state, action: PayloadAction<NeedAnalysis>) => {
      state.needAnalysis = action.payload;
    }
  }
})

export const { setSelectedProgramme, setProgrammeNeedAnalysis } = programmeSlice.actions;

export  default programmeSlice.reducer
