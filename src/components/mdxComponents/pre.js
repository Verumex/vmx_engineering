import system from "@rebass/components";

const Pre = system(
  {
    is: "pre",
    fontSize: 1,
    // fontFamily: "mono",
    m: 0,
  },
  {
    overflow: "auto",
  },
  "fontFamily",
  "space",
  "color"
);
Pre.displayName = "Pre";

export default Pre;
