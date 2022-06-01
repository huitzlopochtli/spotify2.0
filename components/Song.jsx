import { PlayIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className='mt-5 grid cursor-pointer grid-cols-2 rounded-md text-[#929292] hover:bg-[#2b2d30] hover:text-white'
      onClick={playSong}
    >
      <div className='flex items-center space-x-4 py-1 pl-3'>
        {currentTrackId !== track.track.id && <p>{order + 1}</p>}
        {currentTrackId === track.track.id && <p>Playing...</p>}
        <img
          className='h-10 w-10'
          src={track.track.album.images[0].url}
          alt={track.track.album.name}
        />
        <div className=''>
          <p className='w-36 truncate text-white lg:w-[20rem]'>
            {track.track.name}
          </p>
          <p className='w-40'>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className='ml-auto flex items-center justify-between pr-10 md:ml-0'>
        <p className='hidden w-40 truncate md:inline lg:w-96'>
          {track.track.album.name}
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
