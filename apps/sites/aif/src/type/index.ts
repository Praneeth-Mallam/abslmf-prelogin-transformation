
export const assetUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export interface RichTextChild {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export interface RichTextBlock {
  type: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: RichTextChild[]
}

export interface MediaFile {
  url: string;
  mime: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}
export interface ServiceCard {
  id?: number;
  layoutType?: string;
  title?: RichTextBlock[];
  subtitle?: string;
  tag?: string[];
  image?: {
    url: string;
    alternativeText?: string;
  };
  buttonText?: string;
  imageRight?: boolean;

}
