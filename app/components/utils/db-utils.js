import { chilies } from '../chiliesdb/chiliesdb';

const sizesRange = ['small', 'medium', 'large'];
const spicinessRange = ['no heat', 'slightly hot', 'medium hot', 'hot', 'very hot', 'super hot'];

const mapChecks = (sourceArray, checkAll) =>
  sourceArray.map((e, i) => {
    const keyPair = {};
    keyPair[e] = i === 0 || checkAll ? true : false;
    return keyPair;
});

export const forceSelect = (sourceArray, select) =>
  sourceArray.map(e => {
    const keyPair = {};
    const key = Object.keys(e)[0];
    keyPair[key] = select ? true : false;
    return keyPair;
});

export const forceInitialState = (sourceArray, select) =>
  sourceArray.map((e, i) => {
    const keyPair = {};
    const key = Object.keys(e)[0];
    keyPair[key] = i === 0 && select ? true : false;
    return keyPair;
});

export const renderNewState = (oldState, sourceKey) => oldState.map(e => {
  const keyPair = {};
  const key = Object.keys(e)[0];
  const value = Object.values(e)[0];
  keyPair[key] = key === sourceKey ? !value : value;
  return keyPair;
});

export const arraysIntersection = function(array) {
  return this.filter(e => array.includes(e)).length === 0 ? false : true;
}

export const initialSizes = (() => mapChecks(sizesRange, true))();
export const initialSpiciness = (() => mapChecks(spicinessRange, true))();

// fetch tabs from the species names in self-invoked function
export const initialTabs = (() => {
  const newTabs = ['all'];
  chilies.forEach(e => {if (!newTabs.includes(e.species)) newTabs.push(e.species)});
  return newTabs;
})();

// fetch pod shapes and traits
export const fetchedShapes = (() => {
  const shapes = ['all'];
  chilies.forEach(e => {
    const shape = e.fruitShape.split(' ')[0];
    if (!shapes.includes(shape)) shapes.push(shape);
  });
  return mapChecks(shapes);
})();

export const fetchedShapeTraits = (() => {
  const shapeTraits = ['all', 'no\xa0trait'];
  chilies.forEach(e => {
    const traits = e.fruitShape.split(' ');
    traits.shift();
    traits.forEach(e => {if (!shapeTraits.includes(e)) shapeTraits.push(e)});
  });
  return mapChecks(shapeTraits);
})();

// fetch pod colors and traits
export const fetchedColors = (() => {
  const colors = ['all'];
  chilies.forEach(e => {
    const color = e.fruitColor.split(' ')[0];
    if (!colors.includes(color)) colors.push(color);
  });
  return mapChecks(colors);
})();

export const fetchedColorTraits = (() => {
  const colorTraits = ['all', 'no\xa0trait'];
  chilies.forEach(e => {
    const traits = e.fruitColor.split(' ');
    traits.shift();
    traits.forEach(e => {if (!colorTraits.includes(e)) colorTraits.push(e)});
  });
  return mapChecks(colorTraits);
})();