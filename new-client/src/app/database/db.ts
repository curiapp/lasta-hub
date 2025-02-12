import Dexie, { Table } from 'Dexie';
import PocketBase from 'pocketbase';
import {
  BOSAPCSenateConsultation,
  ExternalStakeholdersConsultation,
  NeedAnalysis,
  NQFRegistration,
  Programme,
  ProgrammeDevelopment
} from './db.models';
import {createId} from '@paralleldrive/cuid2';

export class PDQADB extends Dexie {
  programmes!: Table<Programme, string>;
  needAnalysis!: Table<NeedAnalysis, string>;
  programmeDevelopment!: Table<ProgrammeDevelopment, string>;
  externalStakeholdersConsultation!: Table<ExternalStakeholdersConsultation, string>;
  bosApcSenate!: Table<BOSAPCSenateConsultation, string>
  nqfRegistration!: Table<NQFRegistration, string>;

  constructor() {
    super('ngdexielivequery');
    this.version(3).stores({
      programmes: '++id, lecturer',
      needAnalysis: '++id, programme',
      programmeDevelopment: '++id, programme',
      externalStakeholdersConsultation: '++id, programme',
      nqfRegistration: '++id, programme',
      bosApcSenate: '++id, programme',
    });
    this.on('populate', () => this.populate())
  }

  async populate() {
    await database.programmes.bulkAdd([
      {
        id: createId(),
        lecturer: 'janedoe@example.com',
        code: '09BHSE',
        title: 'Bachelor of Computer Science Honours (Software Engineering)',
        level: 8,
        faculty: 'Computing and Informatics',
        department: 'Software Engineering'
      },
      {
        id: createId(),
        lecturer: 'johndoe@example.com',
        code: '09BHSE',
        title: 'Bachelor of Computer Science Honours (Software Engineering)',
        level: 8,
        faculty: 'Computing and Informatics',
        department: 'Software Engineering'
      }
    ])
  }
}
export const pb = new PocketBase('http://127.0.0.1:8090')



export const database = new PDQADB()
