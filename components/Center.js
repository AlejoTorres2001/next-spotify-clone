import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playListIdState, playListState } from "../atoms/playListAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const Center = () => {
  const colors = [
    "from-indigo-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500",
    "from-green-500",
    "from-teal-500",
    "from-blue-500",
    "from-red-500",
    "from-yellow-500",
  ];
  const { data: session } = useSession();
  const SpotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playListId = useRecoilValue(playListIdState);
  const [playList,setPlayList] = useRecoilState(playListState);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playListId]);

  useEffect(() => {
    SpotifyApi.getPlaylist(playListId)
      .then((data) => {
        setPlayList(data.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [SpotifyApi, playListId]);
  console.log(playList);
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8 ">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10 "
            src={session?.user.image}
            alt="usr_img"
          ></img>

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 `}
      >
        <img className="h-44 w-44 shadow-2xl" src={playList?.images?.[0]?.url} alt="" />
        <div>
            <p>PLAYLIST</p>
            <h2 className="text-2xl md:text-3xl xl:text-5x font-bold">Playlist Name</h2>
        </div>
      </section>
      <div>
          <Songs></Songs>
      </div>
    </div>
  );
};

export default Center;
