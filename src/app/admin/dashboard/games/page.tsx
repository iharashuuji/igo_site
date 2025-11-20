import { getMembers } from "@/app/actions/members";
import GameEntryClient from "./client";

export default async function GameEntryPage() {
    const members = await getMembers();

    return <GameEntryClient members={members} />;
}
