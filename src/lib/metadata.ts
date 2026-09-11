import type { Metadata } from "next";
import type { Invitation } from "@/types/invitation";
import { safeExternalUrl } from "./urls";

export function invitationMetadata(invitation: Invitation): Metadata {
  const origin = safeExternalUrl(process.env.NEXT_PUBLIC_SITE_URL ?? null);
  const images = invitation.seo.ogImage
    ? [{ url: invitation.seo.ogImage, alt: invitation.seo.title }]
    : undefined;
  return {
    ...(origin
      ? {
          metadataBase: new URL(origin),
          alternates: { canonical: `/${invitation.slug}` },
        }
      : {}),
    title: invitation.seo.title,
    description: invitation.seo.description,
    robots: {
      index: invitation.seo.indexable,
      follow: invitation.seo.indexable,
    },
    openGraph: {
      title: invitation.seo.title,
      description: invitation.seo.description,
      locale: "id_ID",
      type: "website",
      images,
      ...(origin ? { url: `/${invitation.slug}` } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: invitation.seo.title,
      description: invitation.seo.description,
      images,
    },
  };
}
