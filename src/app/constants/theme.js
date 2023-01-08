import {AppColors} from './colors';
export const FontFamily = {
  bold: 'Inter-Bold',
  semiBold: 'Inter-SemiBold',
  regular: 'Inter-Regular',
};

export const FontSizes = {
  h1: 24,
  h2: 20,
  h3: 16,
  regular: 12,
  medium: 10,
  small: 8,
  xSmall: 6,
  xLarge: 30,
  xxLarge: 40,
};
export const FontStyles = {
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.h1,
    color: AppColors.white,
  },
  h2: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.h2,
    color: AppColors.white,
  },
  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.h3,
    color: AppColors.white,
  },
  h4: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.medium,
    color: AppColors.white,
  },
  normal: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.regular,
    color: AppColors.white,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.medium,
    color: AppColors.white,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.h3,
  },
  lightH3: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.h3,
    color: AppColors.white,
  },
  descriptionLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.large,
    color: AppColors.white,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    color: AppColors.subtitle,
  },
  subtitleLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xLarge,
    color: AppColors.subtitle,
  },
  bigHeading: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.xxLarge,
  },
};

export const Layouts = {
  xxSmall: 0.5,
  xSmall: 2,
  small: 4,
  regular: 8,
  medium: 12,
  large: 16,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 50,
  giant: 200,
  giant2: 160,
};

export const GlobalStyles = {
  rowSpread: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: Layouts.xxxLarge,
    ...FontStyles.h3,
    alignSelf: 'center',
    width: '100%',
    borderRadius: Layouts.large,
    padding: Layouts.large,
    backgroundColor: AppColors.searchBarBg,
    marginBottom: Layouts.large
  },
};
