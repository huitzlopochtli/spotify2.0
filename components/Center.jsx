import { useEffect, useState } from 'react';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistAtoms';
import SpotifyAPI from '../lib/spotify';
import Songs from './Songs';

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
  const [playlistId] = useRecoilState(playlistIdState);
  const [playlist, setPlayList] = useRecoilState(playlistState);
  const [isActive, setActive] = useState('false');

  // Effects
  // set user info
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
  }, [playlistId]);

  // set playlist from playlistid
  useEffect(() => {
    if (SpotifyAPI.getAccessToken() && playlistId) {
      SpotifyAPI.getPlaylist(playlistId)
        .then((data) => {
          setPlayList(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [playlistId, SpotifyAPI]);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className='scrollbar-hide relative h-screen flex-grow select-none overflow-y-scroll'>
      <header className='absolute top-5 right-8' onClick={handleToggle}>
        <div className='flex cursor-pointer items-center space-x-3 rounded-full bg-[#2e2e2e] pr-2 opacity-90 hover:opacity-80'>
          <img
            className='h-10 w-10 rounded-full p-1'
            src={profileImage}
            alt='user image'
          />
          <h2 className='text-white'>{userName}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <div
        className={
          `h-10 w-52 rounded-sm bg-[#2e2e2e] text-white absolute right-8 top-[4.3rem] flex-col` +
          ' ' +
          `${isActive ? 'hidden' : 'flex'}`
        }
      >
        <div
          className="flex items-center justify-between cursor-pointer px-3 py-2"
          onClick={signOut}
        >
          <p className="hover:bg-[#2b2d30]">Log out</p>
          <LogoutIcon className="w-5 h-5" />
        </div>
      </div>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-[15rem] border-[.5px] pl-5 pb-5 text-white md:h-80`}
      >
        {playlist?.images?.[0]?.url && (
          <img
            className='w-[100px] shadow-2xl md:h-44 md:w-44'
            src={playlist?.images?.[0]?.url}
            alt='album image'
          />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className='truncate text-xl md:text-3xl xl:text-5xl'>
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}
export default Center;
