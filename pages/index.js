import React, { useState, useEffect, useCallback } from "react";

import { HeroSection } from "../Components/index";

const Home = () => {
  return (
    <div>
      <HeroSection accounts="hey" tokenData="DATA" />
    </div>  
  );
};

export default Home;