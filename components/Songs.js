import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playListAtom";
import Song from "./Song";

const Songs = () => {
  const playList = useRecoilValue(playListState);
  console.log(playList);
  return (
    <div className="px-8 flex flex-col pace-y-1 pb-28 text-white">
      {playList?.tracks.items.map((track,index) => {
        return( 
            <Song key={track.track.id} order={index+1} track={track}></Song>
            );
      })}
    </div>
  );
};

export default Songs;
