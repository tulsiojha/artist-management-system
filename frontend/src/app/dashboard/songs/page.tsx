import Songs from "@/components/song";
import { currentUser, song } from "@/lib/api";

const Page = async (props) => {
  const auth = await currentUser();
  const id = auth?.artist_id;
  const sp = await props.searchParams;
  const songs = await song.listByArtist(id, sp?.page);
  return <Songs artist={id} data={songs.data} />;
};

export default Page;
