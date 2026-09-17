export type ChildGender = 'boy' | 'girl' | 'multiple';

export type RoutineSlot = 'morning' | 'evening' | 'bedtime';

export type DuaCategory = 
  | 'daily-protection'
  | 'evil-eye'
  | 'crying-fear'
  | 'fever-illness'
  | 'bedtime'
  | 'parental-blessings';

export interface GenderVariations {
  arabic: {
    boy: string;
    girl: string;
    multiple: string;
  };
  transliteration: {
    boy: string;
    girl: string;
    multiple: string;
  };
}

export interface DuaItem {
  id: string;
  title: string;
  subtitle?: string;
  category: DuaCategory;
  routineSlots?: RoutineSlot[];
  targetCount: number;
  hasGenderVariation: boolean;
  arabic: string; // Default or base
  transliteration: string; // Default or base
  genderVariations?: GenderVariations;
  meaning: string;
  reference: string;
  fazilat?: string;
  instructions: string;
  audioUrl?: string; // Optional audio recitation link
  tags: string[];
}

export interface BabyProfile {
  name: string;
  gender: ChildGender;
  avatarColor?: string;
}

export interface RoutineProgress {
  date: string; // YYYY-MM-DD
  completedDuaIds: string[];
}

export interface ReminderConfig {
  morningEnabled: boolean;
  morningTime: string;
  maghribEnabled: boolean;
  maghribTime: string;
  bedtimeEnabled: boolean;
  bedtimeTime: string;
}
