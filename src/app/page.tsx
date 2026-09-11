import { defaultInvitation } from "@/data/invitations";
import { InvitationPage } from "@/components/invitation/InvitationPage";
import { invitationMetadata } from "@/lib/metadata";

export const metadata = invitationMetadata(defaultInvitation);

export default function Home() {
  return <InvitationPage invitation={defaultInvitation} />;
}
