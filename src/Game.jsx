import { useState, useEffect } from "react";
import Card from "./components/Card";
import TurnIndicator from "./components/TurnIndicator";
import { Medal, Zap } from "lucide-react";

function Game() {
  const [imagesData, setImagesData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  useEffect(() => {
    const apiKey = "1q3OBwHZyluAJJ77TLabqlnzNhHikWiA";
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cat&limit=12`;
    fetch(URL)
      .then((response) => response.json())
      .then((cards) => {
        const titleCounts = {};
        const newImages = cards.data.map((item) => {
          let baseTitle = item.title
            ? item.title.replace(/\s*GIF\s*$/i, "")
            : "Cat";

          if (titleCounts[baseTitle]) {
            titleCounts[baseTitle]++;
            baseTitle = `${baseTitle} (${titleCounts[baseTitle]})`;
          } else {
            titleCounts[baseTitle] = 1;
          }

          return {
            id: item.id,
            url: item.images.fixed_height_still.url,
            title: baseTitle,
          };
        });
        setImagesData(newImages);
      })
      .catch((error) => {
        console.error("Error fetching image", error);
      });
  }, []);

  function shuffleImages() {
    setIsShuffled(true);

    setIsScoreAnimating(true);
    setTimeout(() => {
      setIsScoreAnimating(false);
    }, 250);

    setIsFailure(true);
    setTimeout(() => {
      setIsFailure(false);
    }, 400);

    setTimeout(() => {
      setImagesData((prevImages) => {
        const shuffledImages = [...prevImages];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImages[i], shuffledImages[j]] = [
            shuffledImages[j],
            shuffledImages[i],
          ];
        }
        return shuffledImages;
      });
      setIsShuffled(false);
    }, 140);
  }

  function addScore(image) {
    const clickedCards = [...clicked];
    if (clickedCards.includes(image.id) || clickedCards.length === 12) {
      setScore(0);
      setClicked([]);
      return;
    }

    const newScore = score + 1;
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    clickedCards.push(image.id);
    setClicked(clickedCards);
  }

  return (
    <div className="w-full bg-background relative z-10 flex flex-col justify-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-x-space-md gap-y-space-md max-w-7xl mx-auto w-full px-margin-mobile md:px-margin py-space-md md:py-space-lg select-none">
        {/* Title & Description Header */}
        <header className="flex flex-col max-w-lg md:col-start-1 md:row-start-1">
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary tracking-tight leading-none mb-2">
            Memory Spark
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Select every unique entity without clicking the same card twice. The
            matrix scrambles spatial coordinates after every neural imprint.
          </p>
        </header>

        {/* Sticky Stats Bar */}
        <div className="sticky top-4 z-10 md:col-start-2 md:row-start-1 flex items-center justify-center gap-space-sm sm:gap-space-md py-2 -my-2">
          <div className="bg-surface-container-high/90 px-space-md py-space-sm rounded-xl shadow-md flex flex-col min-w-27.5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-md text-label-md uppercase">
                Current
              </span>
              <Zap size={16} />
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span
                className={`font-stat-counter text-stat-counter text-primary transition-all duration-300 
              ${score > 0 && isScoreAnimating && "scale-125 text-secondary"}
              ${score === 0 && isFailure && "text-error!"}
              `}
              >
                {score}
              </span>
              <span className="font-label-md text-label-md text-outline">
                / 12
              </span>
            </div>
          </div>
          <div className="bg-surface-container-high/90 px-space-md py-space-sm rounded-xl shadow-md flex flex-col min-w-27.5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-md text-label-md uppercase">
                Record
              </span>
              <Medal size={16} className="text-tertiary" />
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-stat-counter text-stat-counter text-tertiary">
                {bestScore}
              </span>
              <span className="font-label-md text-label-md text-outline">
                MAX
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Turn Indicator (Placed right under the stats bar with a matching sticky offset) */}
        <div className="sticky top-24 z-10 md:col-span-2 md:row-start-2 py-2 -my-2">
          <TurnIndicator score={score} bestScore={bestScore} />
        </div>

        {/* Main Card Grid */}
        <main
          className={`md:col-span-2 md:row-start-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-gutter-mobile md:gap-space-sm w-full transition-all duration-200 
            ${isShuffled && "scale-95 opacity-40"}`}
        >
          {imagesData.map((image) => (
            <Card
              key={image.id}
              imageUrl={image.url}
              imageTitle={image.title}
              shuffle={shuffleImages}
              addScore={() => addScore(image)}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default Game;
