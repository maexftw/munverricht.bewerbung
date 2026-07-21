export type HeroCapabilityInput = {
  reducedMotion: boolean;
  saveData: boolean;
  viewportWidth: number;
  webglAvailable: boolean;
};

export const resolveHeroExperienceMode = ({
  reducedMotion,
  saveData,
  viewportWidth,
  webglAvailable,
}: HeroCapabilityInput): 'static' | 'shader' => {
  if (reducedMotion || saveData || viewportWidth < 900 || !webglAvailable) return 'static';
  return 'shader';
};
