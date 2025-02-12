import {IProgramme} from '../../../models';
import {NeedAnalysis, Programme} from '../../database/db.models';


export interface ProgrammeState {
  selectedProgramme: Programme | null;
  needAnalysis: NeedAnalysis | null;
}
