import Image from "next/image";
import TopBar from "./_components/nav/TopBar";

export default function Home() {
  return (
    <main>
      <TopBar>
      <div className=" flex items-center flex-grow text-center">
        <h1 className="text-xl font-bold text-center self-center">All Notes</h1>
      </div>
      </TopBar>
    </main>
  );
}
