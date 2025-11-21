import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPublicMembers } from "@/lib/supabase/queries";
import Image from "next/image";

export const metadata = {
    title: "部員紹介 | 囲碁部",
    description: "囲碁部の部員を紹介します。",
};

export default async function MembersPage() {
    const members = await getPublicMembers();

    return (
        <div className="container py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">部員紹介</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    個性豊かな部員たちが活動しています。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-32 bg-slate-100 flex items-center justify-center text-4xl relative">
                            {member.avatar_url ? (
                                <Image
                                    src={member.avatar_url}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <span>{member.name[0]}</span>
                            )}
                        </div>
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary">{member.grade}年</Badge>
                                <span className="text-sm font-bold text-primary">{member.rank}</span>
                            </div>
                            <CardTitle>{member.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                よろしくお願いします！
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {members.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        部員データがありません。
                    </div>
                )}
            </div>
        </div>
    );
}
