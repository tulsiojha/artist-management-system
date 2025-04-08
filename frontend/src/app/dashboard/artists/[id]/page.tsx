import Songs from "@/components/song";
import { song } from "@/lib/api";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const id = (await params).id;
  const page = Number((await searchParams).page || "0");
  const songs = await song.listByArtist(id, page);
  return <Songs artist={id} data={songs.data} />;
};

export default Page;
