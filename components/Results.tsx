
import React from 'react';
import { Question, UserAnswer, ExamDomain } from '../types';
import { PASSING_PERCENTAGE } from '../constants';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ChevronLeftIcon } from './Icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ResultsProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  domain: ExamDomain;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, domain, onRestart }) => {
  let correctCount = 0;
  questions.forEach((q, index) => {
    const userAnswer = userAnswers.find(a => a.questionIndex === index);
    if (!userAnswer) return;
    const sortedUserAnswers = [...userAnswer.selectedIndices].sort();
    const sortedCorrectAnswers = [...q.correctAnswerIndices].sort();
    if (JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers)) {
      correctCount++;
    }
  });

  const score = (correctCount / questions.length) * 100;
  const passed = score >= PASSING_PERCENTAGE;

  const chartData = [
    { name: 'Correct', value: correctCount },
    { name: 'Incorrect', value: questions.length - correctCount },
  ];
  const COLORS = ['#22c55e', '#ef4444'];

  const isCorrect = (question: Question, userAnswer: UserAnswer | undefined): boolean => {
    if (!userAnswer) return false;
    const sortedUser = [...userAnswer.selectedIndices].sort();
    const sortedCorrect = [...question.correctAnswerIndices].sort();
    return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
  };
  
  return (
    <div className="min-h-screen bg-aws-light-grey p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
         <button
            onClick={onRestart}
            className="flex items-center text-aws-sea-blue hover:text-aws-orange font-semibold transition-colors duration-200 mb-6"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-aws-squid-ink text-center">Exam Results</h1>
          <p className="text-center text-aws-dark-grey mt-1">Domain: {domain.title}</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
            <div className="w-full md:w-1/3 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center md:text-left">
               <p className={`text-6xl font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>{score.toFixed(0)}%</p>
               <p className={`text-2xl font-semibold mt-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'Congratulations, you passed!' : 'Keep studying, you can do it!'}
               </p>
               <p className="text-aws-dark-grey mt-2">Passing score is {PASSING_PERCENTAGE}%. You answered {correctCount} out of {questions.length} questions correctly.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-aws-squid-ink mb-6">Detailed Question Review</h2>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers.find(a => a.questionIndex === index);
            const wasCorrect = isCorrect(question, userAnswer);

            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    {wasCorrect ? (
                       <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    ) : (
                       <XCircleIcon className="w-8 h-8 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-aws-dark-grey">Question {index + 1}</p>
                    <p className="text-aws-squid-ink" style={{whiteSpace: 'pre-wrap'}}>{question.questionText}</p>
                  </div>
                </div>

                <div className="space-y-3 pl-12">
                  {question.options.map((option, optIndex) => {
                    const isUserChoice = userAnswer?.selectedIndices.includes(optIndex);
                    const isCorrectChoice = question.correctAnswerIndices.includes(optIndex);

                    let borderColor = "border-gray-300";
                    let bgColor = "bg-gray-50";
                    if (isCorrectChoice) {
                        borderColor = "border-green-500";
                        bgColor = "bg-green-100";
                    } else if (isUserChoice && !isCorrectChoice) {
                        borderColor = "border-red-500";
                        bgColor = "bg-red-100";
                    }
                    
                    return (
                        <div key={optIndex} className={`p-3 border-l-4 ${borderColor} ${bgColor} rounded`}>
                            <p className="text-sm text-aws-squid-ink">{option.text}</p>
                        </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-aws-sea-blue rounded-r-lg flex items-start">
                    <InformationCircleIcon className="w-8 h-8 text-aws-sea-blue mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-aws-squid-ink">Explanation</h4>
                        <p className="text-sm text-aws-dark-grey mt-1">{question.explanation}</p>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
