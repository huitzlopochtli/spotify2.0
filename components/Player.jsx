import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { VolumeUpIcon } from '@heroicons/react/outline';
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/playlistAtoms';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';

function Player({ session }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [counter] = useState(0);

  const songInfo = useSongInfo(currentTrackId);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
          setVolume(data.body?.device?.volume_percent);
          setProgress(data.body?.progress_ms + 200);
          setDuration(data.body?.item?.duration_ms);
          console.log(data);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 300),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (!counter) {
      const timer = setTimeout(() => {
        isPlaying && setProgress(progress + 100);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      <div className='grid h-24 grid-cols-3 bg-gradient-to-b from-gray-900 to-black px-2 text-sm text-white md:px-8 md:text-base'>
        <div className='flex items-center space-x-4'>
          <img
            className='hidden h-12 w-12 md:inline'
            src={songInfo?.album?.images?.[0].url}
            alt=''
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p className='text-sm text-gray-500'>
              {songInfo?.artists?.[0]?.name}
            </p>
          </div>
        </div>
        <div className='flex items-center justify-evenly'>
          <SwitchHorizontalIcon className='h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125' />
          <RewindIcon className='h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125' />
          {isPlaying ? (
            <PauseIcon
              className='h-10 w-10 transform cursor-pointer text-[#18D860] transition duration-100 ease-out hover:scale-125'
              onClick={handlePlayPause}
            />
          ) : (
            <PlayIcon
              className='h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125'
              onClick={handlePlayPause}
            />
          )}
          <FastForwardIcon className='h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125' />
          <ReplyIcon className='h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125' />
        </div>

        <div className='flex items-center justify-end space-x-3 p-5 md:space-x-4'>
          <VolumeDownIcon
            className='h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125'
            onClick={() => volume > 0 && setVolume(volume - 10)}
          />
          <input
            type='range'
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            min={0}
            max={100}
            className='w-14 md:w-36 '
          />
          <VolumeUpIcon
            className='h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125'
            onClick={() => volume < 100 && setVolume(volume + 10)}
          />
        </div>
      </div>
      <input
        type='range'
        value={progress}
        min={0}
        max={duration}
        onChange={(e) => setProgress(Number(e.target.value))}
        className='w-screen'
      />
    </>
  );
}

export default Player;
