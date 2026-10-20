import { useState, useEffect } from "react";
import Card from "./components/Card";

function Game() {
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    const apiKey = "1q3OBwHZyluAJJ77TLabqlnzNhHikWiA";
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cat&limit=12`;
    fetch(URL)
      .then((response) => response.json())
      .then((card) => {
        const newImages = card.data.map((item) => ({
          id: item.id,
          url: item.images.fixed_height_still.url,
        }));
        setImagesData(newImages);
      })
      .catch((error) => {
        console.error("Error fetching image", error);
      });
  }, []);

  return (
    <>
      <h1>Game</h1>
      {imagesData.map((image) => (
        <Card key={image.id} imageUrl={image.url} />
      ))}
    </>
  );
}

export default Game;
