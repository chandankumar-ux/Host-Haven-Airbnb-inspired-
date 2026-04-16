export default function ImageGallery({ images }) {
  const allImages = [
    ...(images.exterior || []),
    ...(images.bedroom || []),
    ...(images.bathroom || []),
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden mt-4">
      <img
        src={allImages[0]}
        className="col-span-2 row-span-2 object-cover w-full h-full"
      />
      {allImages.slice(1, 5).map((img) => (
        <img key={img} src={img} className="object-cover w-full h-full" />
      ))}
    </div>
  );
}
