import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

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

  return (
    <div>
      {/* left */}
      <div>
        <img
          className="hidden md:inline h-10 w-10 p-2"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
      </div>
    </div>
  );
};

export default Player;
