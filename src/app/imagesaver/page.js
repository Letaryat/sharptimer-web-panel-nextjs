import Image from 'next/image';
import SteamAvatarSaver from '../api/avatarsave/route';
export default function AvatarPage({ steamID }) {
  SteamAvatarSaver("76561199530072848");
  return (
    <div>
      <h1>User Avatar</h1>
      <Image
        src={`/api/checkavatar/76561199530072848`} // Dynamically load the image via the API
        alt="User Avatar"
        width={100}
        height={100}
      />
    </div>
  );
}
