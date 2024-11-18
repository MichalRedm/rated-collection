import "./App.scss";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import ListItemData from "./types/ListItemData";
import ListItem from "./components/ListItem";

enum TopBarTab {
  main, search, sort
}

function App() {
  const [list, setList] = useState<ListItemData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [topBarTab, setTopBarTab] = useState(TopBarTab.main);
  const [sortingMethod, setSortingMethod] = useState("rating-desc");

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("./list.json")
      .then(res => res.json())
      .then(setList)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (topBarTab === TopBarTab.search) {
      searchInputRef.current?.focus();
    }
  }, [topBarTab]);

  const handleAddItem = () =>
    setList(
      prev => [
        ...prev,
        {
          id: prev.length,
          name: "",
          imgSrc: "",
          description: "",
          rating: 0,
          new: true
        }
      ]
    );

  const handleDeleteItem = (index: number) =>
    setList(prev =>
      prev.filter(
        item => item.id !== index
      )
    );
  
  const handleCloseSearch = () => {
    setTopBarTab(TopBarTab.main);
    setSearchText("");
  };

  const getListItemSetter = (index: number) =>
    (value: ListItemData) => {
      setList(
        prev => prev.map(
          item =>
            item.id === index
              ? value
              : item
        )
      )
    };

  const sortingFunction = (a: ListItemData, b: ListItemData) => {
    if (a.new && !b.new) return -1;
    if (b.new && !a.new) return 1;
    const [property, order] = sortingMethod.split("-");
    let difference;
    if (property === "rating") {
      difference = a.rating - b.rating;
    } else {
      difference = a.id - b.id;
    }
    return difference * (order === "asc" ? 1 : -1);
  };
  
  const filteredList = list.filter(
    item => item.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <div className="app">
      <div className="buttons-container">
        {topBarTab === TopBarTab.main &&
          <>
            <button className="btn" onClick={handleAddItem}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="btn" onClick={() => setTopBarTab(TopBarTab.search)}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="btn" onClick={() => setTopBarTab(TopBarTab.sort)}>
              <FontAwesomeIcon icon={faSort} />
            </button>
          </>
        }
        {topBarTab === TopBarTab.sort &&
          <>
            <select
              className="input"
              value={sortingMethod}
              onChange={e => setSortingMethod(e.target.value)}
            >
              <option value="rating-desc">From highest to lowest rated</option>
              <option value="rating-asc">From lowest to highest rated</option>
              <option value="id-asc">From oldest to newest</option>
              <option value="id-desc">From newest to oldest</option>
            </select>
            <button className="btn-small" onClick={() => setTopBarTab(TopBarTab.main)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        }
        {topBarTab === TopBarTab.search &&
          <>
            <input
              type="text"
              className="input"
              placeholder="Search..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              ref={searchInputRef}
            />
            <button className="btn-small" onClick={handleCloseSearch}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        }
      </div>
      <div className="list">
        {filteredList.length > 0
          ? filteredList
            .sort(sortingFunction)
            .map(listItem =>
              <ListItem
                key={listItem.id}
                listItem={listItem}
                setListItem={getListItemSetter(listItem.id)}
                onDelete={() => handleDeleteItem(listItem.id)}
              />
            )
          : <div className="list__no-items-found"></div>
        }
      </div>
    </div>
  );
}

export default App;
