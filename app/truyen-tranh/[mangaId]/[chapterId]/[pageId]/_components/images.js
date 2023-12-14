/* eslint-disable @next/next/no-img-element */
export const Images = ({ images }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      {images.map((item, index) => (
        <img src={item.url} key={index} alt={item.name} />
      ))}
    </div>
  );
};
