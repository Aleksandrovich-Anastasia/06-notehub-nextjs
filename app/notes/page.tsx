import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NotesListClient from './Notes.client';


const NotesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1 }],
    queryFn: () => fetchNotes({ page: 1, perPage: 10 }),
  });

  return (
    <NotesListClient
      dehydratedState={dehydrate(queryClient)}
    />
  );
};

export default NotesPage;
