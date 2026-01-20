
export enum Difficulty {
  Step1 = 'Step 1: Foundation',
  Step2 = 'Step 2: Application',
  Step3 = 'Step 3: Risk Mitigation'
}

export interface TrimItem {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  content: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
}

export interface FailureCase {
  caseId: string;
  trimType: string;
  claimType: string;
  rca: string;
  standards: string;
  severity: 'Low' | 'Medium' | 'High';
  prevention: string;
}

export interface NavigationSection {
  id: string;
  step: string;
  title: string;
  target: string;
  goal: string;
  icon: string;
}
