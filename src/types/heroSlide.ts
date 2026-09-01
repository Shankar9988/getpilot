export interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string | null;
  badge_text?: string | null;
  image_url: string;
  button_text?: string | null;
  button_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HeroSlidePayload {
  title: string;
  subtitle?: string | null;
  badge_text?: string | null;
  image_url: string;
  button_text?: string | null;
  button_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}
