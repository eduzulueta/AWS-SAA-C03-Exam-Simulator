
import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import StudyGuide from './components/StudyGuide';
import PracticeExam from './components/PracticeExam';
import Results from './components/Results';
import { View, ExamDomain, Question, UserAnswer } from './types';
import { EXAM_DOMAINS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedDomain, setSelectedDomain] = useState<ExamDomain | null>(null);
  const [examResults, setExamResults] = useState<{ questions: Question[], userAnswers: UserAnswer[] } | null>(null);

  const handleStartStudy = useCallback((domain: ExamDomain) => {
    setSelectedDomain(domain);
    setCurrentView('study');
  }, []);

  const handleStartExam = useCallback((domain: ExamDomain) => {
    setSelectedDomain(domain);
    setExamResults(null);
    setCurrentView('exam');
  }, []);

  const handleFinishExam = useCallback((questions: Question[], userAnswers: UserAnswer[]) => {
    setExamResults({ questions, userAnswers });
    setCurrentView('results');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedDomain(null);
    setExamResults(null);
    setCurrentView('dashboard');
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'study':
        return selectedDomain && <StudyGuide domain={selectedDomain} onBack={handleBackToDashboard} />;
      case 'exam':
        return selectedDomain && <PracticeExam domain={selectedDomain} onFinish={handleFinishExam} onBack={handleBackToDashboard}/>;
      case 'results':
        return examResults && selectedDomain && (
          <Results 
            questions={examResults.questions}
            userAnswers={examResults.userAnswers}
            domain={selectedDomain}
            onRestart={handleBackToDashboard}
          />
        );
      case 'dashboard':
      default:
        return <Dashboard onStartStudy={handleStartStudy} onStartExam={handleStartExam} />;
    }
  };

  return <div className="bg-aws-blue min-h-screen">{renderContent()}</div>;
};

export default App;
