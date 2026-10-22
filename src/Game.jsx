import { useState, useEffect } from "react";
import Card from "./components/Card";
import TurnIndicator from "./components/TurnIndicator";
import { Medal, Zap } from "lucide-react";

function Game() {
  const [imagesData, setImagesData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState([]);

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
    const shuffledImages = [...imagesData];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [
        shuffledImages[j],
        shuffledImages[i],
      ];
    }
    setImagesData(shuffledImages);
  }

  function addScore(image) {
    const clickedCards = [...clicked];
    if (clickedCards.includes(image.id)) {
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
      <div className="flex flex-col w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-md md:py-space-lg select-none">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col max-w-lg">
            <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary tracking-tight leading-none mb-2">
              Memory Spark
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Select every unique entity without clicking the same card twice.
              The matrix scrambles spatial coordinates after every neural
              imprint.
            </p>
          </div>
          <div className="flex items-center gap-space-sm sm:gap-space-md self-start md:self-end">
            <div className="bg-surface-container-high/90 px-space-md py-space-sm rounded-xl shadow-md flex flex-col min-w-27.5">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-md text-label-md uppercase">
                  Current
                </span>
                <Zap size={16} />
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-stat-counter text-stat-counter text-primary transition-all duration-300">
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
        </header>
        <TurnIndicator score={score} bestScore={bestScore} />
        <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-gutter-mobile md:gap-space-sm max-w-7xl mx-auto w-full transition-all duration-200">
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
      </div>{" "}
    </div>
  );
}

export default Game;
