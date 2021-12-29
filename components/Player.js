import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  ReplyIcon,
} from "@heroicons/react/solid";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce, forEach } from "lodash";
const Player = () => {
  const SpotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrakId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      SpotifyApi.getMyCurrentPlayingTrack().then((res) => {
        console.log("Now pLaying", res.body?.item?.id);
        setCurrentTrakId(res.body?.item?.id);
        SpotifyApi.getMyCurrentPlaybackState().then((res) => {
          setIsPlaying(res.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (SpotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, SpotifyApi, session]);

  const handlePlayPause = () => {
    SpotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body.is_playing) {
        SpotifyApi.pause();
        setIsPlaying(false);
      } else {
        SpotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      SpotifyApi.setVolume(volume);
    }, 500),
    []
  );
  useEffect(() => {
    SpotifyApi.getMyDevices().then(
        function (data) {
          let availableDevices = data.body.devices;
          console.log(availableDevices);
          if (availableDevices.some(d => d.is_active === true)) {
            if (volume > 0 && volume < 100) {
                debouncedAdjustVolume(volume);
              }
          }
          })
  }, [volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4 ">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly">
        {/* Custom css class buttons */}
        <SwitchHorizontalIcon className="button"></SwitchHorizontalIcon>
        <RewindIcon
          className="button"
          //onClick={()=>SpotifyApi.skipToPrevious()} API CALL IS BROKEN
        ></RewindIcon>
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          ></PauseIcon>
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          ></PlayIcon>
        )}
        <FastForwardIcon
          //onClick={()=>SpotifyApi.skipToNext()} API CALL IS BROKEN
          className="button"
        ></FastForwardIcon>
        <ReplyIcon className="button"></ReplyIcon>
      </div>
      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5 ">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        ></VolumeDownIcon>
        <input
          className="w-14 md:w-28"
          type="range"
          name="volume"
          id="volume"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        ></VolumeUpIcon>
      </div>
    </div>
  );
};

export default Player;
