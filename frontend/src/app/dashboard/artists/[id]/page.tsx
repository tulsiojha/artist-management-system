import Songs from "@/components/song";
import { song } from "@/lib/api";

const Page = async (props) => {
  const params = await props.params;
  const id = params.id;
  const sp = await props.searchParams;
  const songs = await song.listByArtist(id, sp?.page);
  return <Songs artist={id} data={songs.data} />;
};

export default Page;
