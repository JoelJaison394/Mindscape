import React, { useState, useEffect } from "react";




function Header({location}) {

  const date = new Date();
  const normalDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;



  

  return (
    <>
    <div className="Header container w-full flex  flex-row justify-between pl-2 pr-2 border-2 border-slate-900 border-solid">
      <div className="logo pr-1">MindScape</div>
      <div className="feature_box flex flex-col justify-center  border-slate-900 border-solid border-l-2 pl-1">
        <p className="location mb-2 sm:text-sm lg:text-3xl">{location}</p>
        <p className="date sm:text-base lg:text-xl">{normalDate}</p>
      </div>
    </div>

    </>
    
  );
}

export default Header;
