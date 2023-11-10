import { create } from 'zustand';
import { chilies } from '../chiliesdb/chiliesdb';
import {
  initialTabs,
  initialSizes,
  initialSpiciness,
  fetchedShapes,
  fetchedShapeTraits,
  fetchedColors,
  fetchedColorTraits,
  forceSelect,
  forceInitialState,
  renderNewState,
  arraysIntersection,
} from '../utils/db-utils';

// custom Array.prototype method for arrays intersection search
Array.prototype.includesOneOf = arraysIntersection;

const dbStore = (set, get) => ({
  sectionsTotal: 2,
  section: 0,
  tabs: initialTabs,
  activeTab: 0,
  initialList: chilies,
  list: chilies,
  activeListItem: 0,
  searchString: '',
  isModalVisible: false,
  plantSizes: initialSizes,
  fruitSizes: initialSizes,
  spiciness: initialSpiciness,
  shapes: fetchedShapes,
  shapeTraits: fetchedShapeTraits,
  colors: fetchedColors,
  colorTraits: fetchedColorTraits,

  actions: {

    isFirstSection: () => get().section === 0 ? true : false,

    isLastSection: () => get().sectionsTotal - get().section === 1 ? true : false,

    incSection: () => set(state => !get().actions.isLastSection() ?
        {section: state.section + 1} : {section: state.section}),

    decSection: () => set(state => !get().actions.isFirstSection() ?
        {section: state.section - 1} : {section: state.section}),

    changeSection: destination => {
      if (destination === "next") get().actions.incSection();
      if (destination === "prev") get().actions.decSection();
    },

    setActiveTab: tabId => set({activeTab: tabId}),

    filterList: () => set({list: get().initialList.filter(e =>

      // Tabs filtering
      get().tabs[get().activeTab] === 'all' ? true : e.species === get().tabs[get().activeTab])

        // Searchstring filtering
        .filter(e => e.name.toLocaleLowerCase().includes(get().searchString))

        // Spiciness filtering
        .filter(element => get().spiciness
          .filter(e => Object.values(e)[0])
          .map(e => Object.keys(e)[0])
          .includes(element.heatLevel))

        // Plant size filtering
        .filter(e => get().plantSizes
          .filter(e => Object.values(e)[0])
          .map(e => Object.keys(e)[0])
          .includesOneOf(e.plantSize.split(' ')))

        // Fruit size filtering
        .filter(e => get().fruitSizes
          .filter(e => Object.values(e)[0])
          .map(e => Object.keys(e)[0])
          .includes(e.fruitSize))

        // Fruit shape filtering
        // Check if "all" option is selected, if not - check every selected tag separately
        .filter(e => Object.values(get().shapes[0])[0] ? true : get().shapes
          .filter(e => Object.values(e)[0])
          .map(e => Object.keys(e)[0])
          .includes(e.fruitShape.split(' ')[0]))

        // Fruit shape traits filtering
        .filter(e => Object.values(get().shapeTraits[0])[0] ? true :
          // if "no trait" selected
          Object.values(get().shapeTraits[1])[0] ? !e.fruitShape.includes(' ') ? true :
            // process common cases
            get().shapeTraits
              .filter(e => Object.values(e)[0])
              .map(e => Object.keys(e)[0])
              .includesOneOf(e.fruitShape.split(' ')) : false)

        // Fruit color filtering
        .filter(e => Object.values(get().colors[0])[0] ? true : get().colors
          .filter(e => Object.values(e)[0])
          .map(e => Object.keys(e)[0])
          .includes(e.fruitColor.split(' ')[0]))

        // Fruit color traits filtering
        .filter(e => Object.values(get().colorTraits[0])[0] ? true :
          Object.values(get().colorTraits[1])[0] ? !e.fruitColor.includes(' ') ? true :
            get().colorTraits
              .filter(e => Object.values(e)[0])
              .map(e => Object.keys(e)[0])
              .includesOneOf(e.fruitColor.split(' ')) : false)
    }),

    setActiveListItem: itemId => set({activeListItem: itemId}),

    setSearchString: newSearchString => set({searchString: newSearchString}),

    toogleModalFilter: () => set(state => state.isModalVisible ?
      {isModalVisible: false} : {isModalVisible: true}),

    plantSizeChecks: key => {
      set({plantSizes: renderNewState(get().plantSizes, key)});
      get().actions.filterList();
    },

    fruitSizeChecks: key => {
      set({fruitSizes: renderNewState(get().fruitSizes, key)});
      get().actions.filterList();
    },

    spicinessChecks: key => {
      set({spiciness: renderNewState(get().spiciness, key)});
      get().actions.filterList();
    },

    shapeChecks: key => {
      if (key === 'all' && !Object.values(get().shapes[0])[0])
        {set({shapes: forceInitialState(get().shapes, true)})} else
          {set({shapes: renderNewState(get().shapes, key)})};
      get().actions.filterList();
    },

    shapeTraitChecks: key => {
      if (key === 'all' && !Object.values(get().shapeTraits[0])[0])
        {set({shapeTraits: forceInitialState(get().shapeTraits, true)})} else
          {set({shapeTraits: renderNewState(get().shapeTraits, key)})};
      get().actions.filterList();
    },

    colorChecks: key => {
      if (key === 'all' && !Object.values(get().colors[0])[0])
        {set({colors: forceInitialState(get().colors, true)})} else
          {set({colors: renderNewState(get().colors, key)})};
      get().actions.filterList();
    },

    colorTraitChecks: key => {
      if (key === 'all' && !Object.values(get().colorTraits[0])[0])
        {set({colorTraits: forceInitialState(get().colorTraits, true)})} else
          {set({colorTraits: renderNewState(get().colorTraits, key)})};
      get().actions.filterList();
    },

    selectAllFilters: select => {
      set({plantSizes: forceSelect(get().plantSizes, select)});
      set({fruitSizes: forceSelect(get().fruitSizes, select)});
      set({spiciness: forceSelect(get().spiciness, select)});
      set({shapes: forceInitialState(get().shapes, select)});
      set({shapeTraits: forceInitialState(get().shapeTraits, select)});
      set({colors: forceInitialState(get().colors, select)});
      set({colorTraits: forceInitialState(get().colorTraits, select)});
      get().actions.filterList();
    }
  }
});

export const useDbStore = create(dbStore);
export const useStoreActions = () => useDbStore(state => state.actions);