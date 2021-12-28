import SpotifyWebApi from "spotify-web-api-node";
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "streaming",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "user-follow-read",
  "user-follow-modify",
].join(",");

const params = {
  scope: scopes,
};
const queryParamString = new URLSearchParams(params);
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();
  
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
export default spotifyApi;
export { LOGIN_URL };
