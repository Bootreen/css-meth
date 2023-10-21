import { create } from 'zustand';
import { chilies } from '../chiliesdb/chiliesdb';

const sizesRange = ['small', 'medium', 'large'];
const spicinessRange = ['no heat', 'slightly hot', 'medium hot', 'hot', 'very hot', 'super hot'];

const mapChecks = (sourceArray, checkAll) =>
  sourceArray.map((e, i) => {
    const keyPair = {};
    keyPair[e] = i === 0 || checkAll ? true : false;
    return keyPair
});

const initialSizes = (() => mapChecks(sizesRange, true))();
const initialSpiciness = (() => mapChecks(spicinessRange, true))();

// fetch tabs from the species names in self-invoked function
const initialTabs = (() => {
  const newTabs = ['all'];
  chilies.forEach(e => {if (!newTabs.includes(e.species)) newTabs.push(e.species)});
  return newTabs;
})();

// fetch pod shapes and traits
const fetchedShapes = (() => {
  const shapes = ['all'];
  chilies.forEach(e => {
    const shape = e.fruitShape.split(' ')[0];
    if (!shapes.includes(shape)) shapes.push(shape);
  });
  return mapChecks(shapes);
})();

const fetchedShapeTraits = (() => {
  const shapeTraits = ['all'];
  chilies.forEach(e => {
    const traits = e.fruitShape.split(' ');
    traits.shift();
    traits.forEach(e => {if (!shapeTraits.includes(e)) shapeTraits.push(e)});
  });
  return mapChecks(shapeTraits);
})();

// fetch pod colors and traits
const fetchedColors = (() => {
  const colors = ['all'];
  chilies.forEach(e => {
    const color = e.fruitColor.split(' ')[0];
    if (!colors.includes(color)) colors.push(color);
  });
  return mapChecks(colors);
})();

const fetchedColorTraits = (() => {
  const colorTraits = ['all'];
  chilies.forEach(e => {
    const traits = e.fruitColor.split(' ');
    traits.shift();
    traits.forEach(e => {if (!colorTraits.includes(e)) colorTraits.push(e)});
  });
  return mapChecks(colorTraits);
})();

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

    setActiveTab: tabId => set({activeTab: tabId}),

    filterList: () => set({list: get().initialList.filter(e =>
      get().tabs[get().activeTab] === 'all' ? true : e.species === get().tabs[get().activeTab])
        .filter(e => e.name.toLocaleLowerCase().includes(get().searchString))
    }),

    setActiveListItem: itemId => set({activeListItem: itemId}),

    setSearchString: newSearchString => set({searchString: newSearchString}),

    toogleModalFilter: () => set(state => state.isModalVisible ?
      {isModalVisible: false} : {isModalVisible: true}),

    plantSizeChecks: key => {
      const newPlantSizeChecks = get().plantSizes.map(e => {
        const keyPair = {};
        keyPair[Object.keys(e)[0]] = Object.keys(e)[0] === key ? !Object.values(e)[0] : Object.values(e)[0];
        return keyPair
      })
      set({plantSizes: newPlantSizeChecks});
    },
  }
});

export const useDbStore = create(dbStore);
export const useStoreActions = () => useDbStore(state => state.actions);