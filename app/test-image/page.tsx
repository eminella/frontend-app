import Image from 'next/image';

export default function TestImage() {
  return (
    <div style={{ width: 300, height: 300, position: 'relative' }}>
      <Image
        src="https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg"
        alt="Test Image"
        fill
        sizes="100vw"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
