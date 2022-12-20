import data from "./data.json";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import UsersList from "./components/UsersList";
import SearchInput from "./components/SearchInput";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState(data);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const handleKeyDown = useCallback(
    (e) => {
      // arrow up/down button should select next/previous list element
      if (e.keyCode === 38 && cursor > 0) {
        setCursor((prevCursor) => prevCursor - 1);
      } else if (e.keyCode === 40 && cursor < users.length - 1) {
        setCursor((prevCursor) => prevCursor + 1);
      }
    },
    [cursor, users]
  );

  const onFocusSearch = () => {
    setShowDropdown(true);
  };

  const onBlurSearch = () => {
    setShowDropdown(false);
  };

  const onChange = (e) => setQuery(e.target.value);

  const highlightQuery = (value) =>
    `<span class="query-highlight">${value}</span>`;

  useEffect(() => {
    const filteredUsers = data.filter(({ id, name, address, items }) => {
      if (id.includes(query)) return true;
      if (name.includes(query)) return true;
      if (address.includes(query)) return true;
      if (items.find((item) => item.includes(query))) return true;
      return false;
    });

    const formattedUsers = filteredUsers.map((userObj) => {
      let { id, name, address } = userObj;
      if (id.includes(query)) id = id.replace(query, highlightQuery(query));
      if (name.includes(query))
        name = name.replace(query, highlightQuery(query));
      if (address.includes(query))
        address = address.replace(query, highlightQuery(query));
      return { ...userObj, id, name, address };
    });

    setUsers(formattedUsers);
  }, [query]);

  return (
    <div className="App">
      <SearchInput
        {...{ handleKeyDown, onChange, onFocusSearch, onBlurSearch }}
      />
      {showDropdown && query && <UsersList {...{ users, cursor, query }} />}
    </div>
  );
}

export default App;
