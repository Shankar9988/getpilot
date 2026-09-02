export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'agent' | 'user';
  avatar?: string;
  status: 'active' | 'suspended';
  company_name?: string;
  license_number?: string;
  bio?: string;
  is_prime?: boolean;
  prime_plan?: 'Free' | 'Basic' | 'Pro' | 'Cancelled';
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
