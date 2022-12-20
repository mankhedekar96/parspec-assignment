import "../../styles.css";
import searchLogo from "./search-icon.svg";

export default function SearchInput({
  handleKeyDown,
  onChange,
  onFocusSearch,
  onBlurSearch
}) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by ID, address, name"
        onFocus={onFocusSearch}
        onBlur={onBlurSearch}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <img className="search-icon" src={searchLogo} alt="search" />
    </div>
  );
}
