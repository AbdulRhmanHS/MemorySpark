export default function Card({ imageUrl }) {
  return (
    <div className="">
      {imageUrl ? <img src={imageUrl} alt="" /> : <p>Failed to load image</p>}
    </div>
  );
}
