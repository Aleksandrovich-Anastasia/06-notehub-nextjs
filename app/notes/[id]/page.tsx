import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api'; 
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id?: string };
}

const NoteDetailsPage = async ({ params }: PageProps) => {
  const id = params?.id;
  if (!id) return notFound();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <NoteDetailsClient
      id={id}
      dehydratedState={dehydrate(queryClient)}
    />
  );
};

export default NoteDetailsPage;
