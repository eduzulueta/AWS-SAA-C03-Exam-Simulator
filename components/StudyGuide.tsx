
import React, { useState, useEffect } from 'react';
import { ExamDomain } from '../types';
import { generateStudyGuide } from '../services/geminiService';
import Spinner from './Spinner';
import { ChevronLeftIcon } from './Icons';

interface StudyGuideProps {
  domain: ExamDomain;
  onBack: () => void;
}

const StudyGuide: React.FC<StudyGuideProps> = ({ domain, onBack }) => {
  const [guideContent, setGuideContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGuide = async () => {
      setIsLoading(true);
      const content = await generateStudyGuide(domain);
      setGuideContent(content);
      setIsLoading(false);
    };
    fetchGuide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const renderFormattedContent = (content: string) => {
    const parseInline = (text: string) => {
      // Split by **...** first.
      const doubleStarParts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
      
      return doubleStarParts.flatMap((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Return as an array for flatMap
          return [<strong key={i}>{part.substring(2, part.length - 2)}</strong>];
        }
        
        // Now for the parts that are not double-starred, split by *...*
        const singleStarParts = part.split(/(\*.*?\*)/g).filter(Boolean);
        return singleStarParts.map((subPart, j) => {
            if (subPart.startsWith('*') && subPart.endsWith('*')) {
                return <strong key={`${i}-${j}`}>{subPart.substring(1, subPart.length - 1)}</strong>;
            }
            return subPart;
        });
      });
    };

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc space-y-2 my-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="ml-6 text-base text-aws-dark-grey">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-aws-squid-ink mt-6 mb-2">
            {parseInline(trimmedLine.substring(3))}
          </h2>
        );
      } else if (trimmedLine.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-3xl font-extrabold text-aws-squid-ink mt-8 mb-4 border-b-2 border-aws-orange pb-2">
            {parseInline(trimmedLine.substring(2))}
          </h1>
        );
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        const itemContent = trimmedLine.substring(2);
        listItems.push(itemContent);
      } else if (trimmedLine === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={index} className="text-base text-aws-dark-grey my-4">
            {parseInline(line)}
          </p>
        );
      }
    });

    flushList(); // Flush any remaining list items

    return elements;
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-aws-sea-blue hover:text-aws-orange font-semibold transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-extrabold text-aws-squid-ink mt-4">{domain.title}</h1>
          <p className="text-lg text-aws-dark-grey">AI-Generated Study Guide</p>
        </header>

        {isLoading ? (
          <Spinner text="Generating your personalized study guide..." />
        ) : (
          <article className="prose prose-lg max-w-none">
            {renderFormattedContent(guideContent)}
          </article>
        )}
      </div>
    </div>
  );
};

export default StudyGuide;
