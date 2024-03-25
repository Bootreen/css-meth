import { useDbStore, useStoreActions } from '../store/store';
import { CheckboxGroup } from '../checkbox-group/checkbox-group';
import { DropDown } from '../dropdown/dropdown';
import { TagSet } from '../tag-set/tag-set';

export const FilterModalWindow = ({ modalHandler, tmpl }) => {

  const {
    spicinessChecks,
    plantSizeChecks,
    fruitSizeChecks,
    shapeChecks,
    shapeTraitChecks,
    colorChecks,
    colorTraitChecks,
    selectAllFilters,
    setActiveListItem
  } = useStoreActions();

  const isModalVisible = useDbStore(state => state.isModalVisible);
  const spiciness = useDbStore(state => state.spiciness);
  const plantSizes = useDbStore(state => state.plantSizes);
  const fruitSizes = useDbStore(state => state.fruitSizes);
  const shapes = useDbStore(state => state.shapes);
  const shapeTraits = useDbStore(state => state.shapeTraits);
  const colors = useDbStore(state => state.colors);
  const colorTraits = useDbStore(state => state.colorTraits);

  const spicinessFilter = event => {
    spicinessChecks(event.target.id.split('_')[1]);
    setActiveListItem(0);
  };
  const plantSizeFilter = event => {
    plantSizeChecks(event.target.id.split('_')[1]);
    setActiveListItem(0);
  };
  const fruitSizeFilter = event => {
    fruitSizeChecks(event.target.id.split('_')[1]);
    setActiveListItem(0);
  };
  const shapesAddFilter = event => {
    shapeChecks(event.target.value);
    setActiveListItem(0);
  };
  const shapesRemoveFilter = event => {
    shapeChecks(event.currentTarget.getAttribute('customvalue'));
    setActiveListItem(0);
  };
  const shapeTraitsAddFilter = event => {
    shapeTraitChecks(event.target.value);
    setActiveListItem(0);
  };
  const shapeTraitsRemoveFilter = event => {
    shapeTraitChecks(event.currentTarget.getAttribute('customvalue'));
    setActiveListItem(0);
  };
  const colorsAddFilter = event => {
    colorChecks(event.target.value);
    setActiveListItem(0);
  };
  const colorsRemoveFilter = event => {
    colorChecks(event.currentTarget.getAttribute('customvalue'));
    setActiveListItem(0);
  };
  const colorTraitsAddFilter = event => {
    colorTraitChecks(event.target.value);
    setActiveListItem(0);
  };
  const colorTraitsRemoveFilter = event => {
    colorTraitChecks(event.currentTarget.getAttribute('customvalue'));
    setActiveListItem(0);
  };
  const selectAll = () => {
    selectAllFilters(true);
    setActiveListItem(0);
  };
  const selectNone = () => {
    selectAllFilters(false);
    setActiveListItem(0);
  };

  return (
    <div className={isModalVisible ? tmpl.modalWndVis : tmpl.modalWnd}>
      <h4 className={tmpl.modalHdr}>
        Filters<span className={tmpl.modalCloseBtn} onClick={modalHandler}>&times;</span>
      </h4>
      <div className={tmpl.modalColumnsCont}>
        <div className={tmpl.modalColumn1}>
          <h5 className={tmpl.modalSubHdr}>Spiciness</h5>
          <CheckboxGroup
            array={spiciness}
            handler={spicinessFilter}
            label='spiciness'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn2}>
          <h5 className={tmpl.modalSubHdr}>Plant size</h5>
          <CheckboxGroup
            array={plantSizes}
            handler={plantSizeFilter}
            label='plant-size'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn3}>
          <h5 className={tmpl.modalSubHdr}>Fruit size</h5>
          <CheckboxGroup
            array={fruitSizes}
            handler={fruitSizeFilter}
            label='fruit-size'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn4}>
          <h5 className={tmpl.modalSubHdr}>Fruit shape</h5>
          <select
            name='shapes'
            className={tmpl.modalDropDn}
            disabled={shapes[0].all}
            onChange={shapesAddFilter}
          >
            <option defaultValue>select shape</option>
            <DropDown array={shapes} label='shape-dropdown-item' />
          </select>
          <TagSet
            array={shapes}
            handler={shapesRemoveFilter}
            label='shape-tag'
            tmpl={tmpl}
          />
          <br/>
          <h5 className={tmpl.modalSubHdr}>Shape trait</h5>
          <select
            name='shape-traits'
            className={tmpl.modalDropDn}
            disabled={shapeTraits[0].all}
            onChange={shapeTraitsAddFilter}
          >
            <option defaultValue>select trait</option>
            <DropDown array={shapeTraits} label='shape-trait-dropdown-item' />
          </select>
          <TagSet
            array={shapeTraits}
            handler={shapeTraitsRemoveFilter}
            label='shape-trait-tag'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn5}>
          <h5 className={tmpl.modalSubHdr}>Fruit color</h5>
          <select
            name='colors'
            className={tmpl.modalDropDn}
            disabled={colors[0].all}
            onChange={colorsAddFilter}
          >
            <option defaultValue>select color</option>
            <DropDown array={colors} label='color-dropdown-item' />
          </select>
          <TagSet
            array={colors}
            handler={colorsRemoveFilter}
            label='color-tag'
            tmpl={tmpl}
          />
          <br/>
          <h5 className={tmpl.modalSubHdr}>Color trait</h5>
          <select
            name='color-traits'
            className={tmpl.modalDropDn}
            disabled={colorTraits[0].all}
            onChange={colorTraitsAddFilter}
          >
            <option defaultValue>select trait</option>
            <DropDown array={colorTraits} label='color-trait-dropdown-item' />
          </select>
          <TagSet
            array={colorTraits}
            handler={colorTraitsRemoveFilter}
            label='color-trait-tag'
            tmpl={tmpl}
          />
        </div>
      </div>
      <div className={tmpl.modalControlsCont}>
        <button className={tmpl.modalControlBtn} onClick={selectAll}>Select all</button>
        <button className={tmpl.modalControlBtn} onClick={selectNone}>Select none</button>
        <button className={tmpl.modalControlBtn} onClick={modalHandler}>Done</button>
      </div>
    </div>
  )
};