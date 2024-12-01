import React from "react";
import raining from "../assets/images/raining.png";
import WeatherApp from "../components/WeatherApp";
interface GlassBoxProps {
  //   children: React.ReactNode;
}

const GlassBox: React.FC<GlassBoxProps> = ({}) => {
  return (
    <div className="flex items-center justify-center h-screen px-4 sm:px-0">
      <div className="bg-white border  bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8">
        {/* {children} */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src={raining} />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <p className="uppercase">FForecast</p>
            </div>
          </div>
        </div>
        <WeatherApp/>
      </div>
    </div>
  );
};

export default GlassBox;
