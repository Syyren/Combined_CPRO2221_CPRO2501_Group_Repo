import React from "react";
import ArcadeShooterHeader from "./ArcadeShooterHeader";
import ArcadeShooterFooter from "./ArcadeShooterFooter";
import ArcadeShooterGame from "./ArcadeShooterGame";

const ArcadeShooter = () => {
  return (
    <div className="arcade-shooter-page">
      <ArcadeShooterHeader />
      <main>
        <ArcadeShooterGame />
      </main>
      <ArcadeShooterFooter />
    </div>
  );
};

export default ArcadeShooter;
