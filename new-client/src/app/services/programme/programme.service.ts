import {Injectable} from '@angular/core';
import {programmesDueForReview, programmesTable} from '../../constants/constants';
import {database, pb} from '../../database/db';
import {Consultations, ConsultationStakeholder, ConsultationSubmission, Programme} from '../../database/db.models';
import {createId} from '@paralleldrive/cuid2';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  constructor() {
  }

  async fetchAllProgrammes() {
    const user_id = pb.authStore.record?.id as string;
    const programmes = await pb.collection('v_programme').getList(1, 50,
      {
        filter: `lecturer = "${user_id}"`
      }
    );

    return programmes.items;
  }

  fetchProgrammesDueForReview(lecturerId: string) {
    return programmesDueForReview.filter(programme => programme.lecturer === lecturerId);
  }

  async addProgramme(programme: Programme) {
    await database.programmes.add(programme);
    await database.needAnalysis.add(
      {
        id: createId(),
        programme: programme.id,
        consultations: {
          id: createId(),
          startDate: null,
          endDate: null,
          complete: false,
          stakeholders: null,
          submissions: null
        },
        pdqaDecision: {id: createId(), decision: '', decisionMaker: 'pqda', dateSubmitted: null},
        bosConsultations: {id: createId(), decision: '', decisionMaker: 'bos', dateSubmitted: null},
        apcRecommendation: {id: createId(), decision: '', decisionMaker: 'apc', dateSubmitted: null},
        senateRecommendation: {id: createId(), decision: '', decisionMaker: 'senate', dateSubmitted: null}
      }
    )

    await database.programmeDevelopment.add(
      {
        id: createId(),
        curriculumDrafting: null,
        pdqaDecision: null,
        programme: programme.id,
        programmeDevelopmentCommittee: null
      }
    )

    await database.externalStakeholdersConsultation.add(
      {
        consultationAndBenchmarking: null,
        draftAndPDQARecommendation: null,
        draftProgramme: null,
        programme: programme.id,
        id: createId()
      }
    )
    await database.nqfRegistration.add(
      {
        documentation: false,
        feedback: null,
        programme: programme.id,
        registration: null,
        submission: null,
        id: createId()
      }
    )
    await database.bosApcSenate.add(
      {
        apcRecommendation: null,
        draftSubmission: null,
        facultyBOSConsultation: null,
        finalSenateRecommendation: null,
        programme: programme.id,
        id: createId()
      }
    )
  }

  async queryNeedAnalysis(programmeId: string) {
    return database.needAnalysis.get({programme: programmeId});
  }

  async queryNeedAnalysisConsultation(programmeId: string){
    const consultation = await pb.collection('consultation').getList(1, 1,
      {
        filter: `programme = "${programmeId}"`
      }
    );

    console.log(consultation.items[0]);

    return consultation.items[0];
  }

  async queryProgrammeDevelopment(programmeId: string) {
    return database.programmeDevelopment.get({programme: programmeId});
  }

  async queryExternalStakeholders(programmeId: string) {
    return database.externalStakeholdersConsultation.get({programme: programmeId});
  }

  async queryBOSAPCSenate(programmeId: string) {
    return database.bosApcSenate.get({programme: programmeId});
  }

  async queryNQFRegistration(programmeId: string) {
    return database.nqfRegistration.get({programme: programmeId});
  }


  async beginStakeholdersConsultation(consultationStartInformation: {
    startDate: Date,
    endDate: Date
  }, needAnalysisId: string) {
    database.needAnalysis.update(needAnalysisId, {
      "consultations.startDate": consultationStartInformation.startDate
    })

    if (consultationStartInformation.endDate) {
      database.needAnalysis.update(needAnalysisId, {
        "consultations.endDate": consultationStartInformation.endDate
      })
    }
  }

  async addStakeholder(stakeholder: ConsultationStakeholder, needAnalysisId: string) {
    const needAnalysis = await database.needAnalysis.get({id: needAnalysisId});

    if (!needAnalysis) {
      throw new Error("Need analysis not found")
    }

    const existingStakeholders = needAnalysis.consultations?.stakeholders || [];
    const stakeholders = [...existingStakeholders, stakeholder];

    database.needAnalysis.update(needAnalysisId, {
      "consultations.stakeholders": stakeholders
    })
  }

  async addSubmission(submission: ConsultationSubmission, needAnalysisId: string) {
    const needAnalysis = await database.needAnalysis.get({id: needAnalysisId});

    if (!needAnalysis) {
      throw new Error("Need analysis not found")
    }

    const existingSubmissions = needAnalysis.consultations?.submissions || [];
    const submissions = [...existingSubmissions, submission];

    database.needAnalysis.update(needAnalysisId, {
      "consultations.submissions": submissions
    })
  }

  async completeStakeholdersConsultation(needAnalysisId: string) {

    database.needAnalysis.update(needAnalysisId, {
      "consultations.complete": true
    })
  }
}
