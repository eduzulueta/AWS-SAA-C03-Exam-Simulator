
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedIndices: number[];
  onAnswerSelect: (optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedIndices,
  onAnswerSelect,
}) => {
  const isMultipleResponse = question.questionType === 'multiple-response';

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <p className="text-sm font-semibold text-aws-dark-grey mb-2">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className="text-xl font-semibold text-aws-squid-ink mb-6" style={{ whiteSpace: 'pre-wrap' }}>{question.questionText}</h2>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedIndices.includes(index);
          const inputType = isMultipleResponse ? 'checkbox' : 'radio';
          const inputId = `option-${questionNumber}-${index}`;
          
          return (
            <div
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-aws-sea-blue/10 border-aws-sea-blue shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-aws-sea-blue/50 hover:bg-white'
              }`}
            >
              <input
                id={inputId}
                type={inputType}
                name={`question-${questionNumber}`}
                checked={isSelected}
                onChange={() => onAnswerSelect(index)}
                className={`form-${inputType} h-5 w-5 ${isMultipleResponse ? 'rounded' : 'rounded-full'} text-aws-sea-blue focus:ring-aws-orange`}
              />
              <label htmlFor={inputId} className="ml-4 text-base text-aws-squid-ink cursor-pointer flex-1">
                {option.text}
              </label>
            </div>
          );
        })}
      </div>
      
      {isMultipleResponse && (
        <div className="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
          <p className="text-sm font-medium">This is a multiple-response question. Please select all that apply.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
