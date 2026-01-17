export type RegisterPerformancePayload = {
    poster: File;
    title: string;
    place: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    link: string;
    isUsed?: boolean;  // default false
  };
  
  export type RegisterPerformanceResponse = boolean;
  
  export type RegisterPerformanceErrorResponse = {
    error: string;
    data: null;
  };
  