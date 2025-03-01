import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type ModuleId, type ModuleProgress } from '@shared/schema';

interface State {
  progress: Record<ModuleId, ModuleProgress>;
  updateProgress: (moduleId: string, completed: boolean) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      progress: {
        locators: { id: 'locators', completed: false },
        iframes: { id: 'iframes', completed: false },
        alerts: { id: 'alerts', completed: false },
        forms: { id: 'forms', completed: false },
        calendar: { id: 'calendar', completed: false },
        hover: { id: 'hover', completed: false },
        'drag-drop': { id: 'drag-drop', completed: false },
        waits: { id: 'waits', completed: false },
        windows: { id: 'windows', completed: false }
      },
      updateProgress: (moduleId, completed) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [moduleId]: {
              ...state.progress[moduleId],
              completed,
              lastAttempt: new Date()
            }
          }
        })),
    }),
    {
      name: 'quality-sensei-storage',
    }
  )
);