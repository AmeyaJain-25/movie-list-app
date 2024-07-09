import baseColors from './baseColors';

const colors = {
  /************ BASE COLORS ************/
  ...baseColors,

  /************ BG ************/
  // NEGATIVE
  BG_NEGATIVE_WEAKEST: baseColors.red[5],
  BG_NEGATIVE_WEAKER: baseColors.red[10],
  BG_NEGATIVE_WEAK: baseColors.red[40],
  BG_NEGATIVE_NORMAL: baseColors.red[50],
  BG_NEGATIVE_STRONG: baseColors.red[60],

  // NEUTRAL
  BG_SURFACE: baseColors.grey[0],
  BG_NEUTRAL_WEAKEST: baseColors.grey[5],
  BG_NEUTRAL_WEAKER: baseColors.grey[10],
  BG_NEUTRAL_WEAK: baseColors.grey[20],
  BG_NEUTRAL_NORMAL: baseColors.grey[30],
  BG_NEUTRAL_STRONG: baseColors.grey[90],
  BG_INVERTED: baseColors.grey[100],

  /************ TEXT ************/
  // NEGATIVE
  TEXT_NEGATIVE_WEAKEST: baseColors.red[20],
  TEXT_NEGATIVE_WEAK: baseColors.red[40],
  TEXT_NEGATIVE_NORMAL: baseColors.red[50],
  TEXT_NEGATIVE_STRONG: baseColors.red[60],

  // NEUTRAL
  TEXT_INVERTED: baseColors.grey[0],
  TEXT_NEUTRAL_WEAKEST: baseColors.grey[30],
  TEXT_NEUTRAL_WEAKER: baseColors.grey[40],
  TEXT_NEUTRAL_WEAK: baseColors.grey[50],
  TEXT_NEUTRAL_NORMAL: baseColors.grey[70],
  TEXT_NEUTRAL_STRONG: baseColors.grey[90],

  /************ BORDER ************/

  // NEGATIVE
  BORDER_NEGATIVE_WEAKEST: baseColors.red[10],
  BORDER_NEGATIVE_WEAK: baseColors.red[30],
  BORDER_NEGATIVE_NORMAL: baseColors.red[50],
  BORDER_NEGATIVE_STRONG: baseColors.red[60],

  // NEUTRAL
  BORDER_INVERTED: baseColors.grey[0],
  BORDER_NEUTRAL_WEAKEST: baseColors.grey[10],
  BORDER_NEUTRAL_WEAK: baseColors.grey[20],
  BORDER_NEUTRAL_NORMAL: baseColors.grey[50],
  BORDER_NEUTRAL_STRONG: baseColors.grey[60],

  /************ ICON ************/

  // NEGATIVE
  ICON_NEGATIVE_WEAKEST: baseColors.red[20],
  ICON_NEGATIVE_WEAK: baseColors.red[40],
  ICON_NEGATIVE_NORMAL: baseColors.red[50],
  ICON_NEGATIVE_STRONG: baseColors.red[60],

  // NEUTRAL
  ICON_INVERTED: baseColors.grey[0],
  ICON_NEUTRAL_WEAKEST: baseColors.grey[30],
  ICON_NEUTRAL_WEAKER: baseColors.grey[40],
  ICON_NEUTRAL_WEAK: baseColors.grey[50],
  ICON_NEUTRAL_NORMAL: baseColors.grey[70],
  ICON_NEUTRAL_STRONG: baseColors.grey[90],
};

export default colors;
