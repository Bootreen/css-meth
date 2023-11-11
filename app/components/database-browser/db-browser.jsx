import Image from 'next/image';
import { imgPref } from '../chiliesdb/chiliesdb';
import { useDbStore, useStoreActions } from '../store/store';
import { MenuTabs } from '../menu-tabs/menu-tabs';
import { ListItems } from '../list-items/list-items';

export const DatabaseBrowser = ({ modalHandler, tmpl }) => {

  const { setActiveTab, setActiveListItem, filterList, setSearchString } = useStoreActions();

  const activeTab = useDbStore(state => state.activeTab);
  const tabs = useDbStore(state => state.tabs);
  const searchString = useDbStore(state => state.searchString);
  const list = useDbStore(state => state.list);
  const activeListItem = useDbStore(state => state.activeListItem);

  const menuHandler = event => {
    // extract the number from the supplement class "...menu-item--${number}"
    setActiveTab(Number(event.target.className.replace(/\D+/g, '')) - 1);
    filterList();
    setActiveListItem(0);
  };
  const searchHandler = event => {
    setSearchString(event.target.value.toLocaleLowerCase());
    filterList();
    setActiveListItem(0);
  };
  const listHandler = event => setActiveListItem(Number(event.target.id));

  return (
    <div className={tmpl.db}>
      <div className={tmpl.dbHdr}>
        <h2 className={tmpl.dbTitle}>Sample database: Chilies</h2>
      </div>
      <div className={tmpl.dbMenu}>
        <MenuTabs
          array={tabs}
          handler={menuHandler}
          param={activeTab}
          tmpl={tmpl}
        />
        <div className={tmpl.dbMenuItemPhld}></div>
      </div>
      <div className={tmpl.dbBrowser}>
        <div className={tmpl.dbSearchCont}>
          <button
            className={tmpl.dbFilterBtn}
            onClick={modalHandler}
          >Filter</button>
          <input
            id='search'
            type='search'
            placeholder='Quick search'
            onChange={searchHandler}
            className={tmpl.dbSearchField}
          ></input>
        </div>
        <div className={tmpl.dbListCont}>
          {list.length > 0 && <div className={tmpl.dbListCol}>
            <ListItems
              array={list}
              handler={listHandler}
              param={activeListItem}
              searchString={searchString}
              tmpl={tmpl}
            />
          </div>}
        </div>
        {list.length > 0 && <div className={tmpl.dbPrevCol}>
          <h3 className={tmpl.dbPrevTitle}>{list[activeListItem].name}</h3>
          <div className={tmpl.dbPrevImgCont}>
            <Image
              className={tmpl.dbPrevImg}
              placeholder='blur'
              blurDataURL={imgPref + list[activeListItem].image}
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={500}
              loading='eager'
              src={imgPref + list[activeListItem].image}
              alt={list[activeListItem].name}
            />
          </div>
          <ul className={tmpl.dbPrvSpecs}>
            <li className={tmpl.dbPrvSpecsItem}>
              <span className={tmpl.dbPrvSpecsItemStrong}>C. {list[activeListItem].species}</span>
            </li>
            <li className={tmpl.dbPrvSpecsItem}>
              Plant: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].plantSize}</span>
            </li>
            <li className={tmpl.dbPrvSpecsItem}>
              Fruit: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].fruitSize}</span>
            </li>
            <li className={tmpl.dbPrvSpecsItem}>
              Spiciness: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].heatLevel}</span>
            </li>
            <li className={tmpl.dbPrvSpecsItem}>
              Shape: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].fruitShape}</span>
            </li>
            <li className={tmpl.dbPrvSpecsItem}>
              Color: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].fruitColor}</span>
            </li>
          </ul>
          <p className={tmpl.dbPrvDesc}>{list[activeListItem].description}</p>
        </div>}
      </div>
    </div>
  )
};