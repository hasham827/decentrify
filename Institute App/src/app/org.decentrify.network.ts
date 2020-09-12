import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.decentrify.network{
   export abstract class decentrifyParticipant extends Participant {
      id: string;
      name: string;
      email: string;
   }
   export class visitorParticipant extends decentrifyParticipant {
   }
   export class networkRegulatorParticipant extends decentrifyParticipant {
   }
   export class instituteParticipant extends decentrifyParticipant {
      yearFound: string;
      capacity: string;
   }
   export class employerParticipant extends decentrifyParticipant {
      address: string;
      phone: string;
      allowedViews: number;
      employerSecret: string;
   }
   export class studentParticipant extends decentrifyParticipant {
      fatherName: string;
      DOB: Date;
      studentSecret: string;
      institute: instituteParticipant;
   }
   export class degreeAsset extends Asset {
      degreeId: string;
      student: studentParticipant;
      institute: instituteParticipant;
      degreeName: string;
      degreeDuration: string;
      passingYear: string;
      cgpa: number;
      allowedViews: number;
   }
   export class invokeAccess extends Transaction {
      degree: degreeAsset;
      allowedViews: number;
      studentSecret: string;
   }
   export class viewDegree extends Transaction {
      degree: degreeAsset;
      employer: employerParticipant;
      employerSecret: string;
   }
   export class revokeAccess extends Transaction {
      degree: degreeAsset;
      employer: employerParticipant;
      studentSecret: string;
   }
// }
