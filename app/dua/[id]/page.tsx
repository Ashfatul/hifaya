import { notFound } from 'next/navigation';
import { DUAS } from '@/data/duas';
import { DuaDetailView } from '@/components/dua/DuaDetailView';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DUAS.map((dua) => ({
    id: dua.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dua = DUAS.find((d) => d.id === id);

  if (!dua) {
    return {
      title: 'দোয়া পাওয়া যায়নি — Hifaya',
    };
  }

  return {
    title: `${dua.title} — Hifaya (হিফায়া)`,
    description: `${dua.meaning.slice(0, 160)}... দলিল: ${dua.reference}`,
  };
}

export default async function DuaPage({ params }: PageProps) {
  const { id } = await params;
  const dua = DUAS.find((d) => d.id === id);

  if (!dua) {
    notFound();
  }

  return <DuaDetailView dua={dua} />;
}
