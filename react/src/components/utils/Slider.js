// import AwesomeSlider from 'react-awesome-slider';
// import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import 'react-awesome-slider/dist/styles.css';

import Video1 from "../../assets/images/Login/video1.mp4"
import Video2 from "../../assets/images/Login/video2.mp4"
import Video3 from "../../assets/images/Login/video3.mp4"
import Video4 from "../../assets/images/Login/video4.mp4"

// const AutoplaySlider = withAutoplay(AwesomeSlider);

// const Slider = (
//   <AutoplaySlider
//     play={true}
//     cancelOnInteraction={false} // should stop playing on user interaction
//     interval={6000}
//   >
//     {/* <div data-src="/path/to/image-0.png" /> */}
//     <div data-src={Video1}/>
//     <div data-src={Video2}/>
//     <div data-src={Video3}/>
//     <div data-src={Video4}/>
//   </AutoplaySlider>
// );

// export default Slider;

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Video } from "react-feather"

// const slides=[
//     Video1,Video2,Video3,Video4
// ]

export default function Slider({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
        <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        {/* <Video className="flex items-center justify-center gap-2"> */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
        {/* </Video> */}
      </div>
    </div>
  )
}