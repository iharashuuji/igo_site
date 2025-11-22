import { getMemberById, getMemberStats, getGamesForMember } from "@/app/actions/members";
import { notFound } from "next/navigation";
import MemberProfileClient from "./client";

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 16: params is now a Promise and must be awaited
    const { id } = await params;

    const member = await getMemberById(id);

    if (!member) {
        notFound();
    }

    const stats = await getMemberStats(id);
    const games = await getGamesForMember(id);

    return <MemberProfileClient member={member} stats={stats} games={games} />;
}
