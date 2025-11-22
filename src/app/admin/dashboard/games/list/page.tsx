import { getGames } from "@/app/actions/games";
import { getMembers } from "@/app/actions/members";
import GameListClient from "./client";

export default async function GameListPage() {
    const games = await getGames();
    const members = await getMembers();

    return <GameListClient games={games} members={members} />;
}
