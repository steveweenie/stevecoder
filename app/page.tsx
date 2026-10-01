import { Suspense } from "react";
import { Boot } from "@/components/home/Boot";
import { Hud } from "@/components/home/Hud";
import { TitleScreen } from "@/components/home/TitleScreen";
import { Continue } from "@/components/home/Continue";
import { QuestLog } from "@/components/home/QuestLog";
import { LevelSelect } from "@/components/home/LevelSelect";
import { Achievements } from "@/components/home/Achievements";
import { Reviews } from "@/components/home/Reviews";
import { Inventory } from "@/components/home/Inventory";
import { SideQuests, SideQuestsLoading } from "@/components/home/SideQuests";
import { Guestbook } from "@/components/home/Guestbook";
import { Contact } from "@/components/home/Contact";
import { DevRoom, Footer, LiveCursors } from "@/components/home/Extras";
import { listApproved } from "@/lib/guestbook";
import { statusFor } from "@/lib/site";

// ISR: live widgets and the guestbook refresh every 10 minutes.
export const revalidate = 600;

export default async function Home() {
  const entries = await listApproved();
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <Boot />
      <LiveCursors />
      <Hud initialStatus={statusFor()} />
      <main>
        <TitleScreen />
        <Continue />
        <QuestLog />
        <LevelSelect />
        <Achievements />
        <Reviews />
        <Inventory />
        <Suspense fallback={<SideQuestsLoading />}>
          <SideQuests />
        </Suspense>
        <Guestbook entries={entries} />
        <Contact />
        <DevRoom />
      </main>
      <Footer />
    </div>
  );
}
