import type { Schema, Struct } from '@strapi/strapi';

export interface AifInvestmentPartnerComponent extends Struct.ComponentSchema {
  collectionName: 'components_aif_investment_partner_components';
  info: {
    displayName: 'InvestmentPartnerComponent';
    icon: 'user';
  };
  attributes: {
    BackgroundVideo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    CTA: Schema.Attribute.Component<'elements.link-with-image', false>;
    investment_partners: Schema.Attribute.Relation<
      'oneToMany',
      'api::investment-partner.investment-partner'
    >;
    Title: Schema.Attribute.Component<'elements.heading', false>;
  };
}

export interface ElementsHeading extends Struct.ComponentSchema {
  collectionName: 'components_elements_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    Heading: Schema.Attribute.String;
    SubHeading: Schema.Attribute.Text;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    LinkText: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface ElementsLinkWithImage extends Struct.ComponentSchema {
  collectionName: 'components_elements_link_with_images';
  info: {
    displayName: 'LinkWithImage';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Link: Schema.Attribute.Component<'elements.link', false>;
  };
}

export interface ElementsTitleWithDescription extends Struct.ComponentSchema {
  collectionName: 'components_elements_title_with_descriptions';
  info: {
    displayName: 'TitleWithDescription';
  };
  attributes: {
    Description: Schema.Attribute.RichText;
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SharedInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_cards';
  info: {
    displayName: 'InfoCard';
  };
  attributes: {
    Content: Schema.Attribute.Component<
      'elements.title-with-description',
      false
    >;
    CTA: Schema.Attribute.Component<'elements.link-with-image', false>;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'aif.investment-partner-component': AifInvestmentPartnerComponent;
      'elements.heading': ElementsHeading;
      'elements.link': ElementsLink;
      'elements.link-with-image': ElementsLinkWithImage;
      'elements.title-with-description': ElementsTitleWithDescription;
      'shared.info-card': SharedInfoCard;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
