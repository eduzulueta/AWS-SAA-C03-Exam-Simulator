
import { ExamDomain } from './types';

export const EXAM_DOMAINS: ExamDomain[] = [
  {
    id: 'domain1',
    title: 'Design Secure Architectures',
    weighting: 30,
    description: 'This domain covers designing secure access to AWS resources and secure workloads and applications.',
    details: [
      "Design secure access to AWS resources",
      "Design secure workloads and applications",
      "Determine appropriate data security controls"
    ]
  },
  {
    id: 'domain2',
    title: 'Design Resilient Architectures',
    weighting: 26,
    description: 'This domain covers designing scalable, loosely coupled, highly available, and fault-tolerant architectures.',
     details: [
      "Design scalable and loosely coupled architectures",
      "Design highly available and/or fault-tolerant architectures",
    ]
  },
  {
    id: 'domain3',
    title: 'Design High-Performing Architectures',
    weighting: 24,
    description: 'This domain focuses on high-performing storage, compute, database, network, and data ingestion solutions.',
    details: [
      "Determine high-performing and/or scalable storage solutions",
      "Design high-performing and elastic compute solutions",
      "Determine high-performing database solutions",
      "Determine high-performing and/or scalable network architectures",
      "Determine high-performing data ingestion and transformation solutions"
    ]
  },
  {
    id: 'domain4',
    title: 'Design Cost-Optimized Architectures',
    weighting: 20,
    description: 'This domain covers cost-optimized storage, compute, database, and network architectures.',
    details: [
      "Design cost-optimized storage solutions",
      "Design cost-optimized compute solutions",
      "Design cost-optimized database solutions",
      "Design cost-optimized network architectures"
    ]
  },
];

export const TOTAL_PRACTICE_QUESTIONS = 10;
export const PASSING_PERCENTAGE = 72;
