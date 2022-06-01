import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/Center';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className=''>
      <Head>
        <title>Vibify</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex h-screen overflow-hidden bg-black'>
        <Sidebar session={session} />
        <Center session={session} />
      </main>

      <div className='sticky bottom-0'>
        <Player session={session} />
      </div>
    </div>
  );
};

export default Home;
