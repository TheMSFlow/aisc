import Header from "@/components/layout/Header";
import BriefingsFooter from "@/components/awakening-blog/BriefingsFooter";

export const metadata = {
  title: {
    template: "%s | The Awakening",
    default: "The Awakening",
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/awakening/feed.xml", title: "The Awakening" },
      ],
    },
  },
};

export default function AwakeningLayout({ children }) {
  return (
    <>
      <Header />
      <main className="bg-offwhite">{children}</main>
      <BriefingsFooter
        awakeningInviteUrl={process.env.THE_AWAKENING_WHATSAPP_INVITE_URL}
      />
    </>
  );
}
