export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: 'employee' | 'admin';
  team: 'hp' | 'restore';
  created_at: string;
}

export interface W9Submission {
  id: number;
  user_id: number;
  name: string;
  business_name: string;
  federal_tax_classification: string;
  address: string;
  city_state_zip: string;
  ssn_or_ein: string;
  signature: string;
  date_signed: string;
  submitted_at: string;
}

export interface Document {
  id: number;
  user_id: number;
  file_name: string;
  file_path: string;
  doc_type: string;
  uploaded_at: string;
}

export interface ChecklistItem {
  id: number;
  team: 'hp' | 'restore';
  title: string;
  description: string;
  order_num: number;
}

export interface ChecklistProgress {
  id: number;
  user_id: number;
  checklist_item_id: number;
  completed: boolean;
  completed_at: string | null;
}

export interface BrandConfig {
  name: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  logo: string;
}
