import { create } from 'zustand';

export const useStore = create(() => ({
  sectionsTotal: 2,
  section: 0,
}));

export const firstSection = () => useStore.getState().section === 0 ? true : false;
export const lastSection = () =>
  useStore.getState().sectionsTotal - useStore.getState().section === 1 ? true : false;
export const decSection = () => useStore.setState(state =>
  (!firstSection() ? { section: state.section - 1 } : {section: state.section}));
export const incSection = () => useStore.setState(state =>
  (!lastSection() ? { section: state.section + 1 } : {section: state.section}));
