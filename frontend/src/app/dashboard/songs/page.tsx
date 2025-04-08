import Songs from "@/components/song";
import { currentUser, song } from "@/lib/api";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const auth = await currentUser();
  const id = auth?.artist_id;
  const page = Number((await searchParams).page) || 0;
  const songs = await song.listByArtist(id, page);
  return <Songs artist={id} data={songs.data} />;
};

export default Page;
