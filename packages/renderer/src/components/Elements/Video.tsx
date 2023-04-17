import React, { FC, useEffect } from "react";
import { customElementProp } from "../../types";
import styled from "styled-components";

const VideoContainer = styled.div<{ videoExists: boolean }>`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) => !props.videoExists && 'background-image: url("/no-video.png");'}
`;

const VideoPlayer = styled.video`
  max-width: 100%;
  width: 100%;
  height: 100%;
  max-height: 100%;
`;

const Video: FC<customElementProp> = ({ element, parent, className }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (element.props.autoPlay && videoRef.current) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  }, [element.props.autoPlay]);

  return (
    <VideoContainer
      videoExists={element.props.videoSrc}
      className={`element ${className}`}
      data-testid={element["data-testid"]}
    >
      {element.props.videoSrc && (
        <VideoPlayer
          controls={element.props.showControls}
          muted={element.props.muted}
          autoPlay={element.props.autoPlay}
          loop={element.props.loop}
          playsInline
          ref={videoRef}
        >
          <source src={element.props.videoSrc} type="video/mp4" />
          Your browser doesn't support HTML5 video tag.
        </VideoPlayer>
      )}
    </VideoContainer>
  );
};

export default Video;

export const VideoElement = {
  id: "0.1.1",
  uuid: "0.1.6",
  type: "Video",
  isFunctionComponent: true,
  contentIsEditable: false,
  className: "fr-video",
  props: {
    name: "Video",
    height: "200px",
    maxHeight: "100%",
    width: "200px",
    maxWidth: "100%",
    padding: "0px",
    margin: "0px",
    backgroundColor: "white",
    visibility: "visible",
    videoSrc: "",
    showControls: false,
    muted: false,
    autoPlay: false,
    loop: false,
  },
  children: [],
};
