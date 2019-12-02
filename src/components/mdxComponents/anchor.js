import React from "react";
import isAbsoluteUrl from "is-absolute-url";
import { Link } from "gatsby";

const AnchorTag = ({ children: link, ...props }) => {
  const { href } = props;

  return isAbsoluteUrl(href) ? (
    <a href={href} target="_blank" rel="noopener">
      {link}
    </a>
  ) : (
    <Link to={href} {...props}>
      {link}
    </Link>
  );
};

export default AnchorTag;
