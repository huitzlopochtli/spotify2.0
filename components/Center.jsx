import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Center({ session }) {
  // States
  // const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState();
  const [userName, setuserName] = useState();
  const [color, setColor] = useState();

  // Effects
  useEffect(() => {
    if (session) {
      setProfileImage(
        session.user.profileImage ||
          'https://avatars.githubusercontent.com/u/17343278?v=4'
      );

      setuserName(session.user.name || session.user.email);
    }
  }, [session]);

  // change color
  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return (
    <div className='flex-grow'>
      <header className='absolute top-5 right-8'>
        <div className='flex cursor-pointer items-center space-x-3 rounded-full bg-red-300 p-1 pr-2 opacity-90 hover:opacity-80'>
          <img className='h-10 w-10 rounded-full' src={profileImage} alt='' />
          <h2>{userName}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section
        className={`item-end flex h-80 space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      ></section>
    </div>
  );
}
export default Center;
