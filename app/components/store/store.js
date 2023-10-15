import { create } from 'zustand';
import { chilies } from '../chiliesdb/chiliesdb';

// filter tabs from the species names in self-invoked function
const initialTabs = (() => {
  const newtabs = ['all'];
  chilies.forEach(e => {if (!newtabs.includes(e.species)) newtabs.push(e.species)});
  return newtabs;
})();

const dbStore = (set, get) => ({
  sectionsTotal: 2,
  section: 0,
  tabs: initialTabs,
  activeTab: 0,
  initialList: chilies,
  list: chilies,
  activeListItem: 0,

  actions: {

    firstSection: () => get().section === 0 ? true : false,

    lastSection: () => get().sectionsTotal - get().section === 1 ? true : false,

    incSection: () => set(state => !get().actions.lastSection() ?
        {section: state.section + 1} : {section: state.section}),

    decSection: () => set(state => !get().actions.firstSection() ?
        {section: state.section - 1} : {section: state.section}),

    changeSection: destination => {
      if (destination === "next") get().actions.incSection();
      if (destination === "prev") get().actions.decSection();
    },

    setActiveTab: (tabId) => set({activeTab: tabId}),

    filterList: filterPhrase => set({list: get().initialList.filter(e =>
      get().tabs[get().activeTab] === 'all' ? true : e.species === get().tabs[get().activeTab])
      .filter(e => filterPhrase ? e.name.toLocaleLowerCase().includes(filterPhrase) : true)
    }),

    setActiveListItem: (itemId) => set({activeListItem: itemId}),
  }
});

export const useDbStore = create(dbStore);
export const useStoreActions = () => useDbStore(state => state.actions);