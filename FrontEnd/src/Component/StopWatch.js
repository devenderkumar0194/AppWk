import { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [miliSec, setMiliSec] = useState(0);
  const [sec, setSec] = useState(0);
  const [minute, setMinute] = useState(0);
  const intervalRef = useRef(null); 

  const startTime = () => {

    if (intervalRef.current) {
        return;
    } 

    intervalRef.current = setInterval(() => {
      
        setMiliSec((prev) => {
        if (prev >= 99) {
          setSec((s) => {
            if (s >= 59) {  
                setMinute((m) => m + 1);
              return 0;
            }
            
            return s + 1;
          });

          return 0;
        }
        return prev + 1;
      });

    }, 10);
    
  };

  const stopTime = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTime = () => {
    stopTime();
    setMiliSec(0);
    setSec(0);
    setMinute(0);
  };



  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <div className="row text-center">
        <h2>Stop Watch</h2>
        <p>
          Minute: {minute} | 
          Second: {sec} | 
          Millisecond: {miliSec}
        </p>

        <div className="col-12">
            <button className="mx-2" onClick={startTime}>Start</button>
            <button className="mx-2" onClick={stopTime}>Stop</button>
            <button className="mx-2" onClick={resetTime}>Reset</button>
        </div>  
        
      </div>
    </>
  );
};

export default StopWatch;
