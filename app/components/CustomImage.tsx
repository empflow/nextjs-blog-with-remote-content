import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function CustomImage({
  src,
  alt,
  priority,
  width,
  height,
}: CustomImageProps) {
  const priorityToUse = priority ? true : false;
  const defaultWidth = 650;
  const defaultHeight = 650;

  return (
    <div className="w-full h-full">
      <Image
        className="rounded mx-auto"
        src={src}
        alt={alt}
        width={width ?? defaultWidth}
        height={height ?? defaultHeight}
        priority={priorityToUse}
      />
    </div>
  );
}
