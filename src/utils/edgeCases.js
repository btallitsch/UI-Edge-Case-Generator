// A baseline "Happy Path" state
export const defaultState = {
  id: 1,
  name: "Jane Doe",
  role: "Software Engineer",
  bio: "Loves building React apps and hiking on weekends.",
  avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
  metrics: { followers: 245, views: 1024 }
};

// Our collection of UI-breaking mutations
export const edgeCases = {
  longText: {
    ...defaultState,
    name: "Jane Elizabeth Rosalind Von Derenburg-Smithington III",
    bio: "Loves building React apps, but also spends an inordinate amount of time writing paragraphs that never seem to end, wrapping around containers, breaking flex layouts, and generally causing a nuisance for frontend developers who forgot to use the break-words CSS property."
  },
  missingImages: {
    ...defaultState,
    avatar: "https://this-image-does-not-exist.com/404.png"
  },
  nullUndefined: {
    id: null,
    name: undefined,
    role: null,
    bio: undefined,
    avatar: undefined,
    metrics: null 
  },
  extremeNumbers: {
    ...defaultState,
    metrics: { followers: -999999999999, views: 3.14159265358979323846 }
  },
  localizationOverflow: {
    ...defaultState,
    role: "Hauptstellenleiterin", // German words often lack spaces
    bio: "Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft"
  }
};
