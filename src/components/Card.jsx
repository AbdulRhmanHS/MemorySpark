export default function Card({ imageUrl, imageTitle, shuffle, addScore }) {
  return (
    <div
      onClick={() => {
        shuffle();
        addScore();
      }}
      className="memory-card group cursor-pointer relative bg-surface-container-low/90 rounded-xl overflow-hidden shadow-lg p-space-sm md:p-space-md flex flex-col items-center justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-surface-container-high active:scale-95"
    >
      <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      {imageUrl ? (
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <img
            src={imageUrl}
            className="w-56 aspect-square overflow-hidden rounded-lg bg-surface-container-lowest/80 flex items-center justify-center relative mb-space-sm"
          />
          <p className="font-label-lg text-label-lg text-on-surface group-hover:text-primary-fixed transition-colors tracking-wide">
            {imageTitle}
          </p>
        </div>
      ) : (
        <p>Failed to load image</p>
      )}
    </div>
  );
}
