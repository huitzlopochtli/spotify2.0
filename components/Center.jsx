import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

function Center({ session }) {
  // States
  const [profileImage, setProfileImage] = useState();
  const [userName, setuserName] = useState();

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

  useEffect;

  return (
    <div className='flex flex-grow'>
      <header className='absolute top-5 right-8'>
        <div className='flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80'>
          <img className='h-10 w-10 rounded-full' src={profileImage} alt='' />
          <h2>{userName}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex item-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}>
        <h1>hello</h1>
      </section>
    </div>
  );
}
export default Center;
