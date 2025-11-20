import { getMembers } from "@/app/actions/members";
import MemberManagementClient from "./client";

export default async function MemberManagementPage() {
    const members = await getMembers();

    return <MemberManagementClient initialMembers={members} />;
}
