import { artist } from "@/lib/api";
import Artists from "./artist";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page = Number((await searchParams).page) || 0;
  const artists = await artist.list(page);
  return <Artists data={artists.data} />;
};

export default Page;
