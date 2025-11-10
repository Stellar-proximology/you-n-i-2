import { useState, useEffect } from 'react';

export type PlatformType = 'mobile' | 'tablet' | 'desktop';
export type OSType = 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'unknown';

interface PlatformInfo {
  type: PlatformType;
  os: OSType;
  isTouchDevice: boolean;
  isStandalone: boolean;
  screenWidth: number;
  screenHeight: number;
}

export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>(() => detectPlatform());

  useEffect(() => {
    const handleResize = () => {
      setPlatform(detectPlatform());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return platform;
}

function detectPlatform(): PlatformInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const userAgent = navigator.userAgent.toLowerCase();

  // Detect platform type
  let type: PlatformType = 'desktop';
  if (width < 768) {
    type = 'mobile';
  } else if (width < 1024) {
    type = 'tablet';
  }

  // Detect OS
  let os: OSType = 'unknown';
  if (/iphone|ipad|ipod/.test(userAgent)) {
    os = 'ios';
  } else if (/android/.test(userAgent)) {
    os = 'android';
  } else if (/windows/.test(userAgent)) {
    os = 'windows';
  } else if (/mac os/.test(userAgent)) {
    os = 'macos';
  } else if (/linux/.test(userAgent)) {
    os = 'linux';
  }

  // Detect touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Detect standalone mode (PWA)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

  return {
    type,
    os,
    isTouchDevice,
    isStandalone,
    screenWidth: width,
    screenHeight: height,
  };
}
