export interface authData {
  id: string;
  username: string;
  name: string | null;
  avatar: string | null;
  avatarUrl: string | null;
  banned: boolean;
  bannedUntil: Date | null;
  bannedReason: string | null;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string | null;
  emailVisibility: boolean;
  firstName: string | null;
  lastName: string | null;
  lastActive: Date;
  roles: string[] | null;
  showOnline: boolean;
  updated: string;
  verified: boolean;
}
