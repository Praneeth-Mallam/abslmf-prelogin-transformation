import { bannerSlideOne } from "../components";

export type BannerTabKey =
  | 'alternate'
  | 'equity'
  | 'fixedIncome'
  | 'realEstate'
  | 'giftCity';

export interface BannerData {
  key: BannerTabKey
  tabLabel: string
  italicTitleBig: string
  titleBig: string
  image: string
}

const titleSmall = "Invest in India via"
const description = "Access Indian and global equity markets through IFSC-domiciled funds designed for NRIs and foreign investors, offering a globally aligned, regulated investment route."
const ctaPrimary = 'Explore Now'
// const ctaSecondary = 'Explore Now'

export {
    titleSmall,
    description,
    ctaPrimary,
    // ctaSecondary
}

export const HOME_BANNER_DATA: BannerData[] = [
  {
    key: 'alternate',
    tabLabel: 'Alternate Investments',
    italicTitleBig: 'Alternate ',
    titleBig: 'Investments',
    image: bannerSlideOne,
  },
  {
    key: 'equity',
    tabLabel: 'Equity Offerings',
    italicTitleBig: 'PMS ',
    titleBig: '- Equity',
    image: bannerSlideOne,
  },
  {
    key: 'fixedIncome',
    tabLabel: 'Fixed Income Offerings',
    italicTitleBig: 'Fixed Income ',
    titleBig: 'Offerings',
    image: bannerSlideOne,
  },
  {
    key: 'realEstate',
    tabLabel: 'Real Estate Offerings',
    italicTitleBig: 'Real ',
    titleBig: 'Estate',
    image: bannerSlideOne,
  },
  {
    key: 'giftCity',
    tabLabel: 'Gift City Offerings',
    italicTitleBig: 'GIFT ',
    titleBig: 'City',
    image: bannerSlideOne,
  },
];