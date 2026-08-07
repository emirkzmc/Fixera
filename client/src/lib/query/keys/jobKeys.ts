export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...jobKeys.lists(), { filters }] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  tracks: () => [...jobKeys.all, 'track'] as const,
  track: (trackingCode: string) => [...jobKeys.tracks(), trackingCode] as const,
};
