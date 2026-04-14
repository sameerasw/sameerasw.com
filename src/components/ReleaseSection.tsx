import { getAllReleaseNotes } from "@/lib/releaseNotes";
import ReleaseFeed from "@/components/ReleaseFeed";

export default async function ReleaseSection() {
  const notes = await getAllReleaseNotes();
  return <ReleaseFeed notes={notes} filter="all" />;
}
