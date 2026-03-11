export type PageInfo = {
  title: string;
  pageLocation: string;
  hero: string;
};

export type Media = {
  id: string;
  name: string;
  url: string;
  alternativeText: string;
  caption: string;
};

export type IconHub = {
  iconName?: string;
  iconData?: string;
  width?: number;
  height?: number;
  color?: string;
};
