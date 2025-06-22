export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
}

export interface TalentProfile {
  name: string;
  role: string;
  company: string;
  location: string;
  about: string;
  skills: string[];
  experience: Experience[];
  certifications: Certification[];
}
