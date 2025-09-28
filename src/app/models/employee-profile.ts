import {Experience} from './experience';
import {Education} from './education';
import {AchievedCompetence} from './competence';
import {FollowedCourse} from './courses';
import {ObtainedCertificate} from './certificate';
import {Language} from './language';
import {PassedExam} from "./exam";

export interface EmployeeProfile {
  experiences: Experience[];
  educations: Education[];
  competences: AchievedCompetence[];
  courses: FollowedCourse[];
  certificates: ObtainedCertificate[];
  languages: Language[];
  exams: PassedExam[];
}
