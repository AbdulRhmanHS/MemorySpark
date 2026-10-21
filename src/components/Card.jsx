export default function Card({ imageUrl, imageTitle, shuffle, addScore }) {
  return (
    <div
      onClick={() => {
        shuffle();
        addScore();
      }}
    >
      {imageUrl ? (
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <img
            src={imageUrl}
            alt=""
            className="object-cover w-56 aspect-square overflow-hidden"
          />
          <p>{imageTitle}</p>
        </div>
      ) : (
        <p>Failed to load image</p>
      )}
    </div>
  );
}
