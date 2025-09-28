export interface AchievedCompetence {
  achievedCompetenceId: number;
  level: number;
  competence: Competence;
}

export interface Competence {
  competenceId: number;
  name: string;
}
