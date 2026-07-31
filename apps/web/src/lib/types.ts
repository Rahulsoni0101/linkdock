export type User = {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatar: string | null;
};

export type Link = {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  enabled: boolean;
  pinned: boolean;
  position: number;
  clickCount: number;
  scheduleStart: string | null;
  scheduleEnd: string | null;
  createdAt: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  position: number;
};

export type ProfileSettings = {
  theme: string;
  primaryColor: string;
  accentColor: string;
  font: string;
  backgroundType: "gradient" | "image" | "color" | "pattern";
  backgroundValue: string;
  showSocial: boolean;
  showBranding: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type PublicPage = {
  user: {
    username: string;
    displayName: string | null;
    bio: string | null;
    avatar: string | null;
  };
  profile: ProfileSettings;
  links: {
    id: string;
    title: string;
    url: string;
    thumbnail: string | null;
    pinned: boolean;
  }[];
  socials: { platform: string; url: string }[];
};

export type AnalyticsSummary = {
  views: number;
  clicks: number;
  chart: { date: string; views: number; clicks: number }[];
  topLinks: {
    title: string;
    url: string;
    click_count: number;
    event_clicks: number;
  }[];
  devices: { device: string; count: number }[];
};
