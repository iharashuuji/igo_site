import { Metadata } from "next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: "よくある質問 | 大学囲碁部",
    description: "大学囲碁部によく寄せられる質問と回答をまとめました。初心者の方、入部検討中の方はこちらをご覧ください。",
};

// FAQ Data
const FAQS = [
    {
        question: "囲碁のルールを全く知りませんが、入部できますか？",
        answer: "はい、大歓迎です！現在の部員の約半数は大学から囲碁を始めました。先輩が基本ルールから丁寧に教えますので、ご安心ください。",
    },
    {
        question: "部費はいくらですか？",
        answer: "部費は半期で3,000円です。主に合宿の積立や、棋譜並べ用の棋書購入、大会参加費の補助などに充てられます。",
    },
    {
        question: "兼部（他のサークルとの掛け持ち）は可能ですか？",
        answer: "はい、可能です。当部は活動日が週2回あり、参加は自由ですので、他のサークルやアルバイトと両立している部員も多数います。",
    },
    {
        question: "自分の碁盤や碁石を買う必要はありますか？",
        answer: "いいえ、必要ありません。部室に十分な数の用具が揃っています。自宅で勉強したい場合も、最近は無料のスマホアプリで十分学習できます。",
    },
    {
        question: "見学や体験に行きたいのですが、予約は必要ですか？",
        answer: "予約は必須ではありませんが、事前にTwitterのDMやお問い合わせフォームからご連絡いただけると、スムーズにご案内できます。",
    },
];

export default function FAQPage() {
    // Generate JSON-LD for FAQPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <div className="container py-12 md:py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">よくある質問</h1>
                    <p className="text-muted-foreground text-lg">
                        入部に関する疑問や、活動についての質問にお答えします。
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {FAQS.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
