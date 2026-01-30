export interface UserData {
  id: string;
  field: string;
  value: string;
  category: 'essential' | 'optional' | 'sensitive';
  hasConsent: boolean;
  retentionDays: number;
  isAnonymized: boolean;
  isDeleted: boolean;
}

export interface ConsentOption {
  id: string;
  label: string;
  description: string;
  category: 'essential' | 'optional' | 'sensitive';
  required: boolean;
}

export interface PrivacyConcept {
  id: string;
  title: string;
  icon: string;
  description: string;
  example: string;
  gdprArticle: string;
}
