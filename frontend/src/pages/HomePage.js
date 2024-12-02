import React, { useState, useEffect, useRef } from 'react';
import heroimage from '../assets/img/herosec.mp4';
import homedata from '../dataset/homedata';

const HomePage = () => {
  const [temproduct, setTemproduct] = useState(homedata[0].title);  // Text to be typed
  const [displayedCharacter, setDisplayedCharacter] = useState(""); // State to hold the currently typed characters
  const indexRef = useRef(0); // Mutable index reference to avoid resetting on rerenders

  const handleOnChange = (character) => {
    setDisplayedCharacter((prev) => prev + character); // Append the new character to the displayed text
  };

  // Typing effect (handles character-by-character typing)
  useEffect(() => {
    if (temproduct === "") return; // Only start typing if temproduct is set
    const typingInterval = setInterval(() => {
      const currentIndex = indexRef.current;

      if (currentIndex < temproduct.length) {
        handleOnChange(temproduct[currentIndex]); // Update the displayed characters
        indexRef.current = currentIndex + 1; // Increment the index
      } else {
        // Once the typing is done, clear the interval and reset the index
        clearInterval(typingInterval); 
        indexRef.current = 0; // Reset the index for the next round
          setTemproduct("");
          setDisplayedCharacter("");
          let tempindex=Math.floor(Math.random() * homedata.length);
          if(tempindex){
            setTemproduct(homedata[tempindex].title);
          }
          else{
            setTemproduct(homedata[0].title);
          }
         
          
      }
    }, 600); // Typing speed of 100ms per character

    return () => clearInterval(typingInterval); // Clean up interval
  }, [temproduct]); // Only trigger when temproduct changes

  console.log("displayed character -> ", displayedCharacter);
  return (
    <div className="h-[36rem] w-full relative">
      {/* Video background */}
      <video
        className="h-full w-full object-cover"
        src={heroimage}
        autoPlay
        loop
        muted
      />
      
      {/* Text overlay */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold flex flex-col items-center">
        <p>LOOKING FOR</p>

        {/* Typing effect title */}
        <p className="text-7xl font-mono whitespace-nowrap  h-[4rem]">
          {displayedCharacter}
        </p>

        <button className="bg-white text-black rounded-lg px-4 py-2 mt-4">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;