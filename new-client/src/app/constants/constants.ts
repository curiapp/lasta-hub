
import {InjectionToken} from '@angular/core';
import {Store} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IProgramme, NeedAnalysisSubStage, NqfRegistrationSubStage, ProgrammeDevelopmentStage} from '../../models';



export const programmesTable: IProgramme[] = [
  {
    lecturer: 'janedoe@example.com',
    code: '00BACS',
    title: 'Bachelor of Computer Science',
    level: 7,
    developmentStage: {mainStage: ProgrammeDevelopmentStage.needAnalysis, subStage: {key: 'details', name: NeedAnalysisSubStage.details}},
    faculty: 'Computing and Informatics',
    department: 'Computer Science'
  },
  {
    lecturer: 'janedoe@example.com',
    code: '00BASE',
    title: 'Bachelor of Software Engineering',
    level: 7,
    developmentStage: {mainStage: ProgrammeDevelopmentStage.nqfRegistration, subStage: {key: 'documentation', name: NqfRegistrationSubStage.documentation}},
    faculty: 'Computing and Informatics',
    department: 'Software Engineering'
  }
]

export const programmesDueForReview = [
  {
    lecturer: 'janedoe@example.com',
    code: '00BACS',
    title: 'Bachelor of Computer Science',
    faculty: 'Computing and Informatics',
    dateCreated: '05 February 2002',
    lastReview: '05 February 2020'
  },
  {
    lecturer: 'janedoe@example.com',
    code: '00BASE',
    title: 'Bachelor of Software Engineering',
    faculty: 'Computing and Informatics',
    dateCreated: '05 February 2002',
    lastReview: '05 February 2020'
  }
]

export const REDUX_STORE = new InjectionToken<Store<RootState>>("REDUX_STORE");
