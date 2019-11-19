import React from "react";
import OpenedSvg from "../images/opened";
import ClosedSvg from "../images/closed";
import config from "../../../config";
import Link from "../link";

const TreeNode = ({
  className = "",
  setCollapsed,
  collapsed,
  url,
  title,
  items,
}) => {
  const isCollapsed = collapsed[url];
  const collapse = () => {
    setCollapsed(url);
  };
  const hasChildren = items.length !== 0;
  return (
    <li className={`${className} item`}>
      {!config.sidebar.frontLine && title && hasChildren ? (
        <button onClick={collapse} className="collapser">
          {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
        </button>
      ) : null}

      {title && (
        <Link to={url} activeClassName="active">
          {title}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map(item => (
            <TreeNode
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};
export default TreeNode;
