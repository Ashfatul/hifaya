import { DuaCategory } from '@/types/dua';

export interface CategoryInfo {
  id: DuaCategory;
  name: string;
  englishName: string;
  description: string;
  iconName: string;
  badgeColor: string;
  accentColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'daily-protection',
    name: 'প্রতিদিনের নিত্য হেফাজত',
    englishName: 'Daily Essential Protection',
    description: 'সকাল ও সন্ধ্যার মৌলিক তিন কুল, আয়াতুল কুরসী ও নববী সুরক্ষার দোয়া',
    iconName: 'ShieldCheck',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentColor: '#2F6A4F',
  },
  {
    id: 'evil-eye',
    name: 'বদনজর ও হিংসা থেকে বাঁচা',
    englishName: 'Evil Eye & Nazar Protection',
    description: 'আল-আইন বা মানুষের কুদৃষ্টি ও বদনজর কাটানোর মাসনূন রুকইয়াহ ও ফুঁ',
    iconName: 'EyeOff',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: '#D4A373',
  },
  {
    id: 'crying-fear',
    name: 'কান্নাকাটি ও রাতের ভয়',
    englishName: 'Crying, Restlessness & Fear',
    description: 'শিশু অকারণে কাঁদলে, ঘুমের মধ্যে চমকে উঠলে বা ভয় পেলে শান্ত করার আমল',
    iconName: 'HeartPulse',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    accentColor: '#E07A5F',
  },
  {
    id: 'fever-illness',
    name: 'জ্বর, ব্যথা ও অসুস্থতা',
    englishName: 'Fever, Pain & Healing',
    description: 'শিশুর শারীরিক অসুস্থতায় ব্যথাস্থানে হাত রেখে পড়ার রোগমুক্তির দোয়া',
    iconName: 'Stethoscope',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: '#3D9970',
  },
  {
    id: 'bedtime',
    name: 'শান্তিপূর্ণ ঘুমের আমল',
    englishName: 'Peaceful Bedtime Routine',
    description: 'রাতের প্রশান্ত ঘুম এবং শয়তানের অনিষ্ট থেকে নিরাপদে থাকার নববী দোয়া',
    iconName: 'Moon',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    accentColor: '#5C6B73',
  },
  {
    id: 'parental-blessings',
    name: 'পিতা-মাতার মন জুড়ানো দোয়া',
    englishName: 'Parental Blessings for Children',
    description: 'সন্তানের নেক হায়াত, উত্তম চরিত্র ও দ্বীনদারিতার জন্য কোরআনী বিশেষ মোনাজাত',
    iconName: 'Sparkles',
    badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    accentColor: '#C49A45',
  },
];
