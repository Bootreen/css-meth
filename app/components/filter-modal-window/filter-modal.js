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
  } = useStoreActions();

  const isModalVisible = useDbStore(state => state.isModalVisible);
  const spiciness = useDbStore(state => state.spiciness);
  const plantSizes = useDbStore(state => state.plantSizes);
  const fruitSizes = useDbStore(state => state.fruitSizes);
  const shapes = useDbStore(state => state.shapes);
  const shapeTraits = useDbStore(state => state.shapeTraits);
  const colors = useDbStore(state => state.colors);
  const colorTraits = useDbStore(state => state.colorTraits);

  const spicinessFilter = event => spicinessChecks(event.target.id.split('_')[1]);
  const plantSizeFilter = event => plantSizeChecks(event.target.id.split('_')[1]);
  const fruitSizeFilter = event => fruitSizeChecks(event.target.id.split('_')[1]);
  const shapesAddFilter = event => shapeChecks(event.target.value);
  const shapesRemoveFilter = event => shapeChecks(event.currentTarget.getAttribute('customvalue'));
  const shapeTraitsAddFilter = event => shapeTraitChecks(event.target.value);
  const shapeTraitsRemoveFilter = event => shapeTraitChecks(event.currentTarget.getAttribute('customvalue'));
  const colorsAddFilter = event => colorChecks(event.target.value);
  const colorsRemoveFilter = event => colorChecks(event.currentTarget.getAttribute('customvalue'));
  const colorTraitsAddFilter = event => colorTraitChecks(event.target.value);
  const colorTraitsRemoveFilter = event => colorTraitChecks(event.currentTarget.getAttribute('customvalue'));
  const selectAll = () => selectAllFilters(true);
  const selectNone = () => selectAllFilters(false);

  return (
    <div className={isModalVisible ? tmpl.modalWndVis : tmpl.modalWnd}>
      <h4 className={tmpl.modalHdr}>
        Filters<span className={tmpl.modalCloseBtn} onClick={modalHandler}>&times;</span>
      </h4>
      <div className={tmpl.modalColumnsCont}>
        <div className={tmpl.modalColumn}>
          <h5 className={tmpl.modalSubHdr}>Spiciness</h5>
          <CheckboxGroup
            array={spiciness}
            handler={spicinessFilter}
            label='spiciness'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn}>
          <h5 className={tmpl.modalSubHdr}>Plant size</h5>
          <CheckboxGroup
            array={plantSizes}
            handler={plantSizeFilter}
            label='spiciness'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn}>
          <h5 className={tmpl.modalSubHdr}>Fruit size</h5>
          <CheckboxGroup
            array={fruitSizes}
            handler={fruitSizeFilter}
            label='spiciness'
            tmpl={tmpl}
          />
        </div>
        <div className={tmpl.modalColumn}>
          <h5 className={tmpl.modalSubHdr}>Fruit shape</h5>
          <select
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
        <div className={tmpl.modalColumn}>
          <h5 className={tmpl.modalSubHdr}>Fruit color</h5>
          <select
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