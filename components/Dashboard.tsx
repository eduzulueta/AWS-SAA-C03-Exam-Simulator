
import React from 'react';
import { EXAM_DOMAINS } from '../constants';
import { ExamDomain } from '../types';
import { AwsIcon, BookOpenIcon, BeakerIcon } from './Icons';

interface DashboardProps {
  onStartStudy: (domain: ExamDomain) => void;
  onStartExam: (domain: ExamDomain) => void;
}

const DomainCard: React.FC<{ domain: ExamDomain; onStartStudy: (domain: ExamDomain) => void; onStartExam: (domain: ExamDomain) => void; }> = ({ domain, onStartStudy, onStartExam }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-aws-orange/20 rounded-full mr-4">
            <AwsIcon className="w-8 h-8 text-aws-orange" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-aws-squid-ink">{domain.title}</h3>
            <p className="text-sm font-semibold text-aws-dark-grey">{domain.weighting}% of Exam</p>
          </div>
        </div>
        <p className="text-aws-dark-grey mb-4 text-base">{domain.description}</p>
        <ul className="text-sm text-aws-dark-grey list-disc list-inside space-y-1">
          {domain.details.map((detail, index) => <li key={index}>{detail}</li>)}
        </ul>
      </div>
      <div className="bg-gray-50 p-4 mt-auto flex justify-between space-x-2">
        <button
          onClick={() => onStartStudy(domain)}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-aws-sea-blue bg-aws-sea-blue/10 hover:bg-aws-sea-blue/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aws-sea-blue transition-colors duration-200"
        >
          <BookOpenIcon className="w-5 h-5 mr-2" />
          Study Guide
        </button>
        <button
          onClick={() => onStartExam(domain)}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-aws-orange hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aws-orange transition-colors duration-200"
        >
          <BeakerIcon className="w-5 h-5 mr-2" />
          Practice Exam
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onStartStudy, onStartExam }) => {
  return (
    <div className="min-h-screen bg-aws-light-grey p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <AwsIcon className="w-20 h-20 mx-auto text-aws-squid-ink mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-aws-squid-ink">AWS SAA-C03 Exam Simulator</h1>
          <p className="mt-4 text-lg text-aws-dark-grey max-w-3xl mx-auto">
            Your AI-powered assistant for mastering the AWS Certified Solutions Architect - Associate exam.
            Choose a domain below to start learning.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {EXAM_DOMAINS.map((domain) => (
            <DomainCard key={domain.id} domain={domain} onStartStudy={onStartStudy} onStartExam={onStartExam} />
          ))}
        </div>

        <footer className="text-center mt-12 text-aws-dark-grey text-sm">
          <p>&copy; {new Date().getFullYear()} AWS Exam Simulator. All rights reserved.</p>
          <p className="mt-1">Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
