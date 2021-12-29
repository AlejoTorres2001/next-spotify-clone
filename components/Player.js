import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState,isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const SpotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrakId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume,setVolume] = useState(50);
  const songInfo = useSongInfo();
  console.log("song info", songInfo);
  return (
    <div>
      {/* left */}
      <div>
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
      </div>
    </div>
  );
};

export default Player;
