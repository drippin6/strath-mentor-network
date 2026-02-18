export const COLORS = {
  blue: '#004684',
  gold: '#D4AF37',
  red: '#C8102E',
  green: '#00843D',
  blueLight: '#0046841a',
  goldLight: '#D4AF371a',
  redLight: '#C8102E1a',
  greenLight: '#00843D1a',
};

export const PALETTES = [
  {
    id: 'strathmore-classic',
    name: 'Strathmore Classic',
    primary: '#004684', // Blue
    secondary: '#D4AF37', // Gold
    accent: '#C8102E', // Red
  },
  {
    id: 'strathmore-vibrant',
    name: 'Strathmore Vibrant',
    primary: '#C8102E', // Red
    secondary: '#D4AF37', // Gold
    accent: '#004684', // Blue
  },
  {
    id: 'nature-heritage',
    name: 'Nature Heritage',
    primary: '#00843D', // Green
    secondary: '#D4AF37', // Gold
    accent: '#004684', // Blue
  },
  {
    id: 'royal-navy',
    name: 'Royal Navy',
    primary: '#002D56', // Darker Blue
    secondary: '#D4AF37', // Gold
    accent: '#00843D', // Green
  }
];

export const IMAGES = {
  logo: 'https://storage.googleapis.com/dala-prod-public-storage/attachments/7a53508a-1e9b-413b-9bdc-1c273e3a9ab7/1771080284420_images.png',
  bgLogin: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/university-background-620e3f03-1771080753642.webp',
  bgMentorship: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/mentorship-community-d3d58763-1770886687452.webp',
  campusLife: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/campus-life-984be110-1770886681170.webp',
};

export const ALUMNI_HIGHLIGHTS = [
  { name: 'Dr. John Doe', achievement: 'CEO of TechCorp, Y14 Graduate', year: 'Class of 2014' },
  { name: 'Jane Smith', achievement: 'Lead Researcher at AI Lab', year: 'Class of 2018' },
  { name: 'Alex Mwangi', achievement: 'Founded Strathmore Innovation Hub', year: 'Class of 2010' },
  { name: 'Sarah Omari', achievement: 'UN Policy Advisor', year: 'Class of 2016' }
];

export const COURSES = [
  "Bachelor of Commerce (BCom)",
  "Bachelor of Science in Finance",
  "Bachelor of Science in Finance",
  "Bachelor of Science in Financial Economics",
  "Bachelor of Science in Economics and Statistics",
  "Bachelor of Business Science in Actuarial Science",
  "Bachelor of Business Science in Financial Engineering",
  "Bachelor of Business Science in Financial Economics",
  "Bachelor of Science in Informatics and Computer Science",
  "Bachelor of Science in Computer Science",
  "Bachelor of Business Information Technology (BBIT)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Arts in International Studies",
  "Bachelor of Arts in Communication (Specializations: Public Relations, Print & Digital Media)",
  "Bachelor of Arts in Philosophy and Ethics",
  "Bachelor of Arts in Development Studies and Philosophy",
  "Bachelor of Science in Hospitality Management",
  "Bachelor of Science in Tourism Management",
  "Diploma in Business Information Technology (DBIT)",
  "Diploma in Business Management",
  "Diploma in International Studies",
  "Diploma in Journalism and New Media",
  "CPA (Certified Public Accountant)",
  "ACCA (Association of Chartered Certified Accountants)",
  "CFA (Chartered Financial Analyst)",
  "CIM (Certified Institute of Marketing)",
  "CISA (Certified Information Systems Auditor)",
  "Advanced Management Program (AMP)",
  "Owner Manager Program (OMP)",
  "Senior Management Program (SMP)",
  "Program for Management Development (PMD)",
  "Leading High-Performing Teams"
];

export const PROGRESS_THRESHOLD = {
  ELITE: 80,
  ON_TRACK: 40,
};

export const ACTIVITY_BOOKING_TITLE = 'Book Activity';

export const SAFE_SPACE_CATEGORIES = [
  { label: 'Harassment', value: 'harassment' },
  { label: 'Discrimination', value: 'discrimination' },
  { label: 'Mental Health Support', value: 'mental_health' },
  { label: 'Academic Stress', value: 'academic_stress' },
  { label: 'Safety Concern', value: 'safety' },
  { label: 'Other', value: 'other' }
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const DEFAULT_LANGUAGE = 'en';

export const SUPABASE_URL = "https://ccxbyhdvhvrgtdlwscqw.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_js984-uaW9QAUe86EthISg_INJz1Nf5";