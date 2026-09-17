'use client';

import { useLocalStorage } from './useLocalStorage';
import { BabyProfile, ChildGender } from '@/types/dua';

const DEFAULT_PROFILE: BabyProfile = {
  name: 'মাশফিয়া',
  gender: 'girl',
  avatarColor: '#2F6A4F',
};

export function useBabyProfile() {
  const [profile, setProfile, isInitialized] = useLocalStorage<BabyProfile>(
    'hifaya_baby_profile',
    DEFAULT_PROFILE
  );

  const updateGender = (gender: ChildGender) => {
    setProfile((prev) => ({
      ...prev,
      gender,
    }));
  };

  const updateName = (name: string) => {
    setProfile((prev) => ({
      ...prev,
      name: name.trim() || 'আমার সোনামণি',
    }));
  };

  return {
    profile,
    setProfile,
    updateGender,
    updateName,
    isInitialized,
  };
}
