export const mobileLaunchReadiness = {
  distributionPhase: "PWA-first beta, then Apple App Store and Google Play review",
  applePlayCorrection: "Apple App Store / Google Play distribution is separate from Apple Pay wallet checkout.",
  pwaInstallPaths: {
    ios: "Open HomeBiz Kids in Safari, tap Share, then Add to Home Screen.",
    android: "Open HomeBiz Kids in Chrome, tap Install app or Add to Home screen.",
  },
  storeSubmissionNeeds: [
    "Apple Developer Program account",
    "Google Play Console account",
    "Capacitor wrapper only after real account/data flows are beta-proven",
    "Privacy policy URL and child/family data disclosures",
    "App icons, splash screens, and mobile screenshots",
  ],
  childSafetyPositioning: [
    "Parent-owned family workspace",
    "No public kid profiles",
    "No stranger marketplace",
    "Virtual tokens only, no in-app cash wallet",
  ],
} as const;
