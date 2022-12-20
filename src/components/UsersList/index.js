import "../../styles.css";

export default function UsersList({ users, cursor, query }) {
  return (
    <ul className="users-list">
      {users.map(({ id, name, address, items }, index) => (
        <li
          key={`user-${index + 1}`}
          className={cursor === index ? "user-item active" : "user-item"}
        >
          <label>
            <strong dangerouslySetInnerHTML={{ __html: id }} />
          </label>
          <p>
            <i dangerouslySetInnerHTML={{ __html: name }} />
          </p>
          {items.find((item) => item.includes(query)) ? (
            <p className="items-highlight">"{query}" found in items</p>
          ) : null}
          <p dangerouslySetInnerHTML={{ __html: address }} />
        </li>
      ))}
      {users.length === 0 && <li className="no-user-item"> No User Found</li>}
    </ul>
  );
}
