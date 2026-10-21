import { useState, useEffect } from "react";
import Card from "./components/Card";

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
    <>
      <header className="flex justify-between items-center w-full py-4 px-10">
        <h1 className="text-4xl font-bold">Memory Card Game</h1>
        <div>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      <main className="flex flex-col h-screen w-full justify-center items-center">
        <div className="grid grid-cols-6 gap-12">
          {imagesData.map((image) => (
            <Card
              key={image.id}
              imageUrl={image.url}
              imageTitle={image.title}
              shuffle={shuffleImages}
              addScore={() => addScore(image)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default Game;
