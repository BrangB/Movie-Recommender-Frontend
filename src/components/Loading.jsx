import React from 'react'
import { useLottie } from "lottie-react";
import animamtion from "../lottie/generating.json"

const Loading = () => {
    const options = {
        animationData: animamtion,
        loop: true
      };
    
      const { View } = useLottie(options);
  return (
    <div>{View}</div>
  )
}

export default Loading