import React, {useState, useEffect, useRef} from 'react'

const Stopwatch = () => {
  const [isrunning, setIsrunning] = useState(false)
  const [elsaspedtime, setElsaspedtime] = useState(0)
  const intervalIdref = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
      if(isrunning){
       intervalIdref.current =  setInterval(() => {
          setElsaspedtime(Date.now() - startTimeRef.current)
        }, 10);
      }

      return ()=>{
        clearInterval(intervalIdref.current)
      }
  
  }, [isrunning])

  function start(){
    setIsrunning(true)
    startTimeRef.current = Date.now() - elsaspedtime
    console.log(startTimeRef.current);
  }
  function stop(){
    setIsrunning(false)

  }
  function reset(){
      setElsaspedtime(0)
      setIsrunning(false)
  }
  function formatTime(){
    let hours = Math.floor(elsaspedtime / (1000 * 60 * 60))
    let min = Math.floor(elsaspedtime / (1000 *60) % 60)
    let sec = Math.floor(elsaspedtime / (1000) % 60)
    let millisec = Math.floor((elsaspedtime % 1000) / 10)

    hours = String(hours).padStart(2, "0");
    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    millisec = String(millisec).padStart(2, "0");
    return `${min}:${sec}:${millisec}`;
  }
  

  return (
    <div className='stopwatch'>
      <div className="display">
        {formatTime()}
      </div>
      <div className='controls'>
    <button className='start-button' onClick={start}>Start</button>
    <button className='stop-button' onClick={stop}>Stop</button>
    <button className='reset-button' onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch
