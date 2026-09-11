import { notFound } from "next/navigation";
import { invitations } from "@/data/invitations";
import { InvitationPage } from "@/components/invitation/InvitationPage";
import { invitationMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return Object.keys(invitations).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = Object.hasOwn(invitations, slug)
    ? invitations[slug]
    : undefined;
  return invitation
    ? invitationMetadata(invitation)
    : { title: "Undangan Tidak Ditemukan" };
}

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = Object.hasOwn(invitations, slug)
    ? invitations[slug]
    : undefined;
  if (!invitation) notFound();
  return <InvitationPage invitation={invitation} />;
}
