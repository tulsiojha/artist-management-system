import { artist } from "@/lib/api";
import Artists from "./artist";

const Page = async (props) => {
  const sp = await props.searchParams;
  const artists = await artist.list(sp?.page);
  return <Artists data={artists.data} />;
};

export default Page;
