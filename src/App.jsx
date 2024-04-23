import { useCallback, useEffect, useState } from "react";

function App() {
  const [rangeCount, setRangeCount] = useState(8);
  const [password, setPassword] = useState("");
  const [numbers, setNumbers] = useState(true);
  const [charcter, setCharcter] = useState(false); 

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "1234567890";
    if (charcter) str += "!@#$%^&*()_+={[}]:'></?|";

    for (let index = 1; index <= rangeCount; index++) {
      let char = Math.floor(Math.random() * str.length); 
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [rangeCount, numbers, charcter]); 

  useEffect(() => {
    passwordGenerator();
  }, [rangeCount, numbers, charcter, passwordGenerator]); 

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl">Password Generator</h1>
        <div className="w-2/5 mt-4 p-3 bg-white rounded-md">
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
            <input
              className="w-3/5 h-11 rounded-md outline-none border-2 border-zinc-600 px-2 py-2 text-2xl"
              type="text"
              value={password} 
              readOnly 
            />
          </div>
          <div className="mt-3 w-full flex flex-col lg:flex-row justify-center items-center gap-4">
            <input
              className="w-3/5"
              type="range"
              value={rangeCount}
              onChange={(e) => setRangeCount(parseInt(e.target.value))}
              min={1} // Added minimum value for the range input
              max={20} // Added maximum value for the range input
            />
            <p>{rangeCount}</p>
          </div>
          <div className="mt-3 w-full flex flex-col lg:flex-row justify-center items-center gap-2">
            <input
              className="w-4 h-4"
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(prev => !prev)} // Fixed event handler for numbers checkbox
              id=""
            />
            <span className="text-xl">Numbers</span>
            <input
              className="w-4 h-4"
              type="checkbox"
              checked={charcter}
              onChange={() => setCharcter(prev => !prev)} 
              id=""
            />
            <span className="text-xl">Special Characters</span> 
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
