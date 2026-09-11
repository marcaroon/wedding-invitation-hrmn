import { vickyRoihatul } from "./vicky-roihatul";
import type { Invitation } from "@/types/invitation";

export const invitations: Record<string, Invitation> = {
  [vickyRoihatul.slug]: vickyRoihatul,
};

export const defaultInvitation = vickyRoihatul;
