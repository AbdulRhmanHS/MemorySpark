export default function Card({ imageUrl, shuffle, addScore }) {
  return (
    <div
      onClick={() => {
        shuffle();
        addScore();
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="object-cover w-56 aspect-square overflow-hidden"
        />
      ) : (
        <p>Failed to load image</p>
      )}
    </div>
  );
}
