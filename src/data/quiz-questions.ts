// Quiz questions designed for maximum completion rate
// Strategy: Start easy, build investment, get personal data last

export interface QuizQuestion {
  id: string;
  step: number;
  type: 'text' | 'select' | 'slider' | 'multi-slider' | 'radio';
  question: string;
  subtext?: string;
  field: string;
  options?: { value: string; label: string; emoji?: string }[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    labels: string[];
    fields: string[];
  };
  validation?: {
    required?: boolean;
    minLength?: number;
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'job-title',
    step: 1,
    type: 'text',
    question: "What's your job title?",
    subtext: 'Be specific — "Senior Marketing Manager" is better than "Marketing"',
    field: 'jobTitle',
    validation: { required: true, minLength: 2 },
  },
  {
    id: 'job-category',
    step: 1,
    type: 'select',
    question: 'Which best describes your field?',
    field: 'jobCategory',
    options: [
      { value: 'software-engineering', label: 'Software Engineering', emoji: '💻' },
      { value: 'product-management', label: 'Product Management', emoji: '📋' },
      { value: 'data-entry', label: 'Data Entry / Admin', emoji: '📊' },
      { value: 'customer-service', label: 'Customer Service', emoji: '🎧' },
      { value: 'accounting', label: 'Accounting / Bookkeeping', emoji: '🧮' },
      { value: 'legal-research', label: 'Legal / Paralegal', emoji: '⚖️' },
      { value: 'copywriting', label: 'Copywriting', emoji: '✍️' },
      { value: 'graphic-design', label: 'Graphic Design', emoji: '🎨' },
      { value: 'sales', label: 'Sales', emoji: '🤝' },
      { value: 'marketing', label: 'Marketing', emoji: '📢' },
      { value: 'hr', label: 'Human Resources', emoji: '👥' },
      { value: 'healthcare', label: 'Healthcare', emoji: '🏥' },
      { value: 'education', label: 'Education / Teaching', emoji: '📚' },
      { value: 'trades', label: 'Skilled Trades', emoji: '🔧' },
      { value: 'executive', label: 'Executive / C-Suite', emoji: '👔' },
      { value: 'research', label: 'Research / Science', emoji: '🔬' },
      { value: 'finance', label: 'Finance / Banking', emoji: '💰' },
      { value: 'consulting', label: 'Consulting', emoji: '💡' },
      { value: 'operations', label: 'Operations / Logistics', emoji: '📦' },
      { value: 'content-creation', label: 'Content Creation', emoji: '🎥' },
      { value: 'translation', label: 'Translation / Localization', emoji: '🌍' },
      { value: 'journalism', label: 'Journalism / Media', emoji: '📰' },
      { value: 'real-estate', label: 'Real Estate', emoji: '🏠' },
      { value: 'other', label: 'Other', emoji: '📌' },
    ],
    validation: { required: true },
  },
  {
    id: 'task-breakdown',
    step: 2,
    type: 'multi-slider',
    question: 'How does your typical workday break down?',
    subtext: 'Adjust the sliders so they roughly add up to 100%',
    field: 'taskBreakdown',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 5,
      labels: [
        'Routine / Repetitive tasks',
        'Creative thinking',
        'People interaction',
        'Physical / Hands-on work',
        'Data analysis / Processing',
      ],
      fields: ['routine', 'creative', 'interpersonal', 'physical', 'analytical'],
    },
  },
  {
    id: 'ai-usage',
    step: 3,
    type: 'radio',
    question: 'How much do you use AI tools at work?',
    subtext: 'ChatGPT, Copilot, Midjourney, Claude, etc.',
    field: 'aiToolUsage',
    options: [
      { value: 'none', label: "I don't use any AI tools", emoji: '🚫' },
      { value: 'experimenting', label: "I've tried them a few times", emoji: '🧪' },
      { value: 'regular', label: 'I use them weekly', emoji: '🔄' },
      { value: 'daily-driver', label: 'They are central to my workflow', emoji: '🚀' },
    ],
    validation: { required: true },
  },
  {
    id: 'industry-adoption',
    step: 3,
    type: 'radio',
    question: 'How fast is your industry adopting AI?',
    field: 'industryAdoption',
    options: [
      { value: 'slow', label: 'Barely started', emoji: '🐢' },
      { value: 'moderate', label: 'Starting to experiment', emoji: '🚶' },
      { value: 'fast', label: 'Actively deploying AI', emoji: '🏃' },
      { value: 'bleeding-edge', label: 'AI is transforming everything', emoji: '⚡' },
    ],
    validation: { required: true },
  },
  {
    id: 'decision-making',
    step: 4,
    type: 'radio',
    question: 'How much decision-making authority do you have?',
    subtext: 'Roles with more autonomy are harder to automate',
    field: 'decisionMaking',
    options: [
      { value: 'none', label: 'I follow instructions / procedures', emoji: '📋' },
      { value: 'some', label: 'I make some independent decisions', emoji: '🤔' },
      { value: 'significant', label: 'I shape strategy for my team', emoji: '🎯' },
      { value: 'primary', label: 'I make high-stakes decisions', emoji: '👑' },
    ],
    validation: { required: true },
  },
  {
    id: 'experience',
    step: 4,
    type: 'radio',
    question: 'How many years of experience do you have?',
    field: 'yearsExperience',
    options: [
      { value: '1', label: '0-2 years', emoji: '🌱' },
      { value: '5', label: '3-7 years', emoji: '🌿' },
      { value: '10', label: '8-15 years', emoji: '🌳' },
      { value: '20', label: '15+ years', emoji: '🏔️' },
    ],
    validation: { required: true },
  },
];

export const TOTAL_STEPS = 4;
