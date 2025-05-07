import React, { useEffect, useState } from "react";

function MoodToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("isDark") === "true"
  );
  
  const toggleMood = () => {
    let newMood = !dark; // true
    setDark(newMood);
    document.body.classList.add(newMood ? "dark" : "light");
    document.body.classList.remove(!newMood ? "dark" : "light");
    localStorage.setItem("isDark", newMood);
  };

  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    setDark(isDark);
    document.body.classList.add(isDark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="mode position-absolute">
      <button
        onClick={toggleMood}
        className="btn-mode rounded-3 p-2 text-white fw-bold"
      >
        {dark ? (
          <>
            {" "}
            <i className="ri-moon-fill me-2"></i>
            <span>Dark</span>
          </>
        ) : (
          <>
            {" "}
            <i className="ri-sun-fill me-2"></i>
            <span>Light</span>
          </>
        )}
      </button>
    </div>
  );
}

export default MoodToggle;
