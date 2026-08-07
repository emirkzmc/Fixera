export const workshopKeys = {
  all: ['workshops'] as const,
  me: () => [...workshopKeys.all, 'me'] as const,
  public: () => [...workshopKeys.all, 'public'] as const,
  publicDetail: (id: string) => [...workshopKeys.public(), id] as const,
};
