import React from "react";

import { Video } from "expo-av";

import styled from "styled-components/native";

const Play = styled(Video)`
  height: 100%;
`;
const Poster = styled.ImageBackground`
  height: 100%;
`;

const VideoPlayer = ({ video, poster, isPlay }) => {
  return (
    <Play
      rate={1.0}
      volume={1.0}
      isMuted={true}
      isLooping
      shouldPlay={isPlay}
      useNativeControls={false}
      posterSource={poster}
      source={{ uri: video }}
      resizeMode="cover"
    />
  );
};

export default VideoPlayer;
