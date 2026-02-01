// src/features/performanceMain/queries.ts
import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  getPerformanceMainOngoing,
  getPerformanceMainPast,
  getPerformanceMainUpComing,
} from "./api";

type SectionParams = { isUsed?: boolean };
type MainSectionParams = {
  ongoing?: SectionParams;
  upcoming?: SectionParams;
  past?: SectionParams;
};

export const performanceMainKeys = {
  all: ["performanceMain"] as const,

  ongoing: (params: SectionParams) => [...performanceMainKeys.all, "ongoing", params] as const,

  upcoming: (params: SectionParams) => [...performanceMainKeys.all, "upcoming", params] as const,

  past: (params: SectionParams) => [...performanceMainKeys.all, "past", params] as const,
};

const commonQueryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

export const usePerformanceMainSections = (params: MainSectionParams = {}) => {
  const ongoingParams = params.ongoing ?? {};
  const upcomingParams = params.upcoming ?? {};
  const pastParams = params.past ?? {};

  const results = useQueries({
    queries: [
      {
        queryKey: performanceMainKeys.ongoing(ongoingParams),
        queryFn: () => getPerformanceMainOngoing(ongoingParams),
        ...commonQueryOptions,
      },
      {
        queryKey: performanceMainKeys.upcoming(upcomingParams),
        queryFn: () => getPerformanceMainUpComing(upcomingParams),
        ...commonQueryOptions,
      },
      {
        queryKey: performanceMainKeys.past(pastParams),
        queryFn: () => getPerformanceMainPast(pastParams),
        ...commonQueryOptions,
      },
    ],
  });

  const [ongoing, upcoming, past] = results;

  return useMemo(
    () => ({
      ongoing: ongoing.data ?? [],
      upcoming: upcoming.data ?? [],
      past: past.data ?? [],

      section: {
        ongoing: {
          isLoading: ongoing.isLoading,
          isFetching: ongoing.isFetching,
          isError: ongoing.isError,
          error: ongoing.error,
        },
        upcoming: {
          isLoading: upcoming.isLoading,
          isFetching: upcoming.isFetching,
          isError: upcoming.isError,
          error: upcoming.error,
        },
        past: {
          isLoading: past.isLoading,
          isFetching: past.isFetching,
          isError: past.isError,
          error: past.error,
        },
      },
    }),
    [
      ongoing.data,
      upcoming.data,
      past.data,
      ongoing.isLoading,
      upcoming.isLoading,
      past.isLoading,
      ongoing.isFetching,
      upcoming.isFetching,
      past.isFetching,
      ongoing.isError,
      upcoming.isError,
      past.isError,
      ongoing.error,
      upcoming.error,
      past.error,
      results,
    ]
  );
};
