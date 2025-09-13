
import React, { useState, useEffect, useCallback } from 'react';
import { ExamDomain, Question, UserAnswer } from '../types';
import { generateExamQuestions } from '../services/geminiService';
import Spinner from './Spinner';
import QuestionCard from './QuestionCard';
import { TOTAL_PRACTICE_QUESTIONS } from '../constants';
import { ChevronLeftIcon } from './Icons';

interface PracticeExamProps {
  domain: ExamDomain;
  onFinish: (questions: Question[], userAnswers: UserAnswer[]) => void;
  onBack: () => void;
}

const PracticeExam: React.FC<PracticeExamProps> = ({ domain, onFinish, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const fetchedQuestions = await generateExamQuestions(domain, TOTAL_PRACTICE_QUESTIONS);
      setQuestions(fetchedQuestions);
      // Initialize answers
      setUserAnswers(fetchedQuestions.map((_, index) => ({ questionIndex: index, selectedIndices: [] })));
      setIsLoading(false);
    };
    fetchQuestions();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const handleAnswerSelect = useCallback((optionIndex: number) => {
    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      const currentAnswer = newAnswers[currentQuestionIndex];
      const currentQuestion = questions[currentQuestionIndex];
      
      if (currentQuestion.questionType === 'multiple-choice') {
        currentAnswer.selectedIndices = [optionIndex];
      } else { // multiple-response
        const selected = currentAnswer.selectedIndices;
        if (selected.includes(optionIndex)) {
          currentAnswer.selectedIndices = selected.filter(i => i !== optionIndex);
        } else {
          currentAnswer.selectedIndices = [...selected, optionIndex];
        }
      }
      return newAnswers;
    });
  }, [currentQuestionIndex, questions]);
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleFinish = () => {
      if(window.confirm("Are you sure you want to finish the exam?")) {
          onFinish(questions, userAnswers);
      }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-aws-light-grey">
        <Spinner text={`Generating ${TOTAL_PRACTICE_QUESTIONS} questions for ${domain.title}...`} />
      </div>
    );
  }

  if (!questions.length) {
    return <div className="text-center p-8">No questions available.</div>;
  }
  
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const currentSelections = userAnswers[currentQuestionIndex]?.selectedIndices || [];

  return (
    <div className="min-h-screen bg-aws-light-grey flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-4xl mb-4">
         <button
            onClick={onBack}
            className="flex items-center text-aws-sea-blue hover:text-aws-orange font-semibold transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
        </button>
      </div>
      
      <div className="w-full max-w-4xl mb-6">
        <h1 className="text-2xl font-bold text-aws-squid-ink mb-2">{domain.title} Practice Exam</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-aws-orange h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedIndices={currentSelections}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <div className="flex justify-between w-full max-w-4xl mt-6">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 border border-aws-dark-grey text-aws-dark-grey font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Finish Exam
          </button>
        ) : (
          <button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="px-6 py-3 bg-aws-orange text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeExam;
