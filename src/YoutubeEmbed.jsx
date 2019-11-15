import React from "react";
import "./components/styles.scss";

const YoutubeEmbed = ({ link }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="750"
        height="422"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
