
export interface ExamDomain {
  id: string;
  title: string;
  weighting: number;
  description: string;
  details: string[];
  studyGuide: string;
}

export interface Option {
  text: string;
}

export interface Question {
  questionText: string;
  options: Option[];
  correctAnswerIndices: number[];
  explanation: string;
  questionType: 'multiple-choice' | 'multiple-response';
}

export type View = 'dashboard' | 'study' | 'exam' | 'results';

export interface UserAnswer {
  questionIndex: number;
  selectedIndices: number[];
}