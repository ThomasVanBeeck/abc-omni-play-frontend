export interface Exam {
  examId: number;
  name: string;
  description: string;
  examCode: string;
}

export interface PassedExam {
  passedExamId: number;
  datePassed: Date;
  exam: Exam;
}
