import { useSession } from 'next-auth/react';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className=''>
      <main className='flex h-screen overflow-hidden bg-black'>
        <Sidebar session={session} />
        <Center session={session} />
      </main>
      <div>{/* player */}</div>
    </div>
  );
};

export default Home;
