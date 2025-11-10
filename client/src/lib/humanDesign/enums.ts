// Translated from SharpAstrology.HumanDesign C# library
// https://github.com/CReizner/SharpAstrology.HumanDesign

export enum HDType {
  Manifestor,
  ManifestingGenerator,
  Generator,
  Projector,
  Reflector
}

export enum Center {
  Root,
  Sacral,
  Emotions,
  Spleen,
  Heart,
  Self,
  Throat,
  Mind,
  Crown
}

export enum Gate {
  Key1 = 1, Key2 = 2, Key3 = 3, Key4 = 4, Key5 = 5, Key6 = 6, Key7 = 7, Key8 = 8,
  Key9 = 9, Key10 = 10, Key11 = 11, Key12 = 12, Key13 = 13, Key14 = 14, Key15 = 15, Key16 = 16,
  Key17 = 17, Key18 = 18, Key19 = 19, Key20 = 20, Key21 = 21, Key22 = 22, Key23 = 23, Key24 = 24,
  Key25 = 25, Key26 = 26, Key27 = 27, Key28 = 28, Key29 = 29, Key30 = 30, Key31 = 31, Key32 = 32,
  Key33 = 33, Key34 = 34, Key35 = 35, Key36 = 36, Key37 = 37, Key38 = 38, Key39 = 39, Key40 = 40,
  Key41 = 41, Key42 = 42, Key43 = 43, Key44 = 44, Key45 = 45, Key46 = 46, Key47 = 47, Key48 = 48,
  Key49 = 49, Key50 = 50, Key51 = 51, Key52 = 52, Key53 = 53, Key54 = 54, Key55 = 55, Key56 = 56,
  Key57 = 57, Key58 = 58, Key59 = 59, Key60 = 60, Key61 = 61, Key62 = 62, Key63 = 63, Key64 = 64
}

export enum Channel {
  Key1Key8, Key2Key14, Key3Key60, Key4Key63, Key5Key15, Key6Key59, Key7Key31,
  Key9Key52, Key10Key20, Key10Key34, Key10Key57, Key11Key56, Key12Key22, Key13Key33,
  Key16Key48, Key17Key62, Key18Key58, Key19Key49, Key20Key34, Key20Key57, Key21Key45,
  Key23Key43, Key24Key61, Key25Key51, Key26Key44, Key27Key50, Key28Key38, Key29Key46,
  Key30Key41, Key32Key54, Key34Key57, Key35Key36, Key37Key40, Key39Key55, Key42Key53,
  Key47Key64
}

export enum Strategy {
  Emotional,
  Sacral,
  Spleen,
  Heart,
  Self,
  Outer
}

export enum Profile {
  OneThree, OneFour, TwoFour, TwoFive, ThreeFive, ThreeSix,
  FourSix, FourOne, FiveOne, FiveTwo, SixTwo, SixThree
}

export enum Line {
  One = 1, Two = 2, Three = 3, Four = 4, Five = 5, Six = 6
}

// Gate to Center mapping (from Gates.cs GetCenter method)
export const GATE_TO_CENTER: Record<number, Center> = {
  1: Center.Self, 2: Center.Self, 3: Center.Sacral, 4: Center.Mind,
  5: Center.Sacral, 6: Center.Emotions, 7: Center.Self, 8: Center.Throat,
  9: Center.Sacral, 10: Center.Self, 11: Center.Mind, 12: Center.Throat,
  13: Center.Self, 14: Center.Sacral, 15: Center.Self, 16: Center.Throat,
  17: Center.Mind, 18: Center.Spleen, 19: Center.Root, 20: Center.Throat,
  21: Center.Heart, 22: Center.Emotions, 23: Center.Throat, 24: Center.Mind,
  25: Center.Self, 26: Center.Heart, 27: Center.Sacral, 28: Center.Spleen,
  29: Center.Sacral, 30: Center.Emotions, 31: Center.Throat, 32: Center.Spleen,
  33: Center.Throat, 34: Center.Sacral, 35: Center.Throat, 36: Center.Emotions,
  37: Center.Emotions, 38: Center.Root, 39: Center.Root, 40: Center.Heart,
  41: Center.Root, 42: Center.Sacral, 43: Center.Mind, 44: Center.Spleen,
  45: Center.Throat, 46: Center.Self, 47: Center.Mind, 48: Center.Spleen,
  49: Center.Emotions, 50: Center.Spleen, 51: Center.Heart, 52: Center.Root,
  53: Center.Root, 54: Center.Root, 55: Center.Emotions, 56: Center.Throat,
  57: Center.Spleen, 58: Center.Root, 59: Center.Sacral, 60: Center.Root,
  61: Center.Crown, 62: Center.Throat, 63: Center.Crown, 64: Center.Crown
};

// Channel definitions (gate pairs)
export const CHANNEL_GATES: Record<Channel, [number, number]> = {
  [Channel.Key1Key8]: [1, 8],
  [Channel.Key2Key14]: [2, 14],
  [Channel.Key3Key60]: [3, 60],
  [Channel.Key4Key63]: [4, 63],
  [Channel.Key5Key15]: [5, 15],
  [Channel.Key6Key59]: [6, 59],
  [Channel.Key7Key31]: [7, 31],
  [Channel.Key9Key52]: [9, 52],
  [Channel.Key10Key20]: [10, 20],
  [Channel.Key10Key34]: [10, 34],
  [Channel.Key10Key57]: [10, 57],
  [Channel.Key11Key56]: [11, 56],
  [Channel.Key12Key22]: [12, 22],
  [Channel.Key13Key33]: [13, 33],
  [Channel.Key16Key48]: [16, 48],
  [Channel.Key17Key62]: [17, 62],
  [Channel.Key18Key58]: [18, 58],
  [Channel.Key19Key49]: [19, 49],
  [Channel.Key20Key34]: [20, 34],
  [Channel.Key20Key57]: [20, 57],
  [Channel.Key21Key45]: [21, 45],
  [Channel.Key23Key43]: [23, 43],
  [Channel.Key24Key61]: [24, 61],
  [Channel.Key25Key51]: [25, 51],
  [Channel.Key26Key44]: [26, 44],
  [Channel.Key27Key50]: [27, 50],
  [Channel.Key28Key38]: [28, 38],
  [Channel.Key29Key46]: [29, 46],
  [Channel.Key30Key41]: [30, 41],
  [Channel.Key32Key54]: [32, 54],
  [Channel.Key34Key57]: [34, 57],
  [Channel.Key35Key36]: [35, 36],
  [Channel.Key37Key40]: [37, 40],
  [Channel.Key39Key55]: [39, 55],
  [Channel.Key42Key53]: [42, 53],
  [Channel.Key47Key64]: [47, 64]
};

// Helper functions
export function typeToText(type: HDType): string {
  switch (type) {
    case HDType.Manifestor: return "Manifestor";
    case HDType.ManifestingGenerator: return "Manifesting Generator";
    case HDType.Generator: return "Generator";
    case HDType.Projector: return "Projector";
    case HDType.Reflector: return "Reflector";
  }
}

export function profileToText(profile: Profile): string {
  switch (profile) {
    case Profile.OneThree: return "1 / 3";
    case Profile.OneFour: return "1 / 4";
    case Profile.TwoFour: return "2 / 4";
    case Profile.TwoFive: return "2 / 5";
    case Profile.ThreeFive: return "3 / 5";
    case Profile.ThreeSix: return "3 / 6";
    case Profile.FourSix: return "4 / 6";
    case Profile.FourOne: return "4 / 1";
    case Profile.FiveOne: return "5 / 1";
    case Profile.FiveTwo: return "5 / 2";
    case Profile.SixTwo: return "6 / 2";
    case Profile.SixThree: return "6 / 3";
  }
}

export function linesToProfile(conscious: Line, unconscious: Line): Profile {
  const key = `${conscious}${unconscious}`;
  const profileMap: Record<string, Profile> = {
    '13': Profile.OneThree, '14': Profile.OneFour,
    '24': Profile.TwoFour, '25': Profile.TwoFive,
    '35': Profile.ThreeFive, '36': Profile.ThreeSix,
    '46': Profile.FourSix, '41': Profile.FourOne,
    '51': Profile.FiveOne, '52': Profile.FiveTwo,
    '62': Profile.SixTwo, '63': Profile.SixThree
  };
  return profileMap[key] || Profile.OneThree;
}

export function centerToText(center: Center): string {
  switch (center) {
    case Center.Root: return "Root";
    case Center.Sacral: return "Sacral";
    case Center.Emotions: return "Solar Plexus";
    case Center.Spleen: return "Spleen";
    case Center.Heart: return "Heart (Ego)";
    case Center.Self: return "G Center (Self)";
    case Center.Throat: return "Throat";
    case Center.Mind: return "Ajna (Mind)";
    case Center.Crown: return "Head (Crown)";
  }
}
