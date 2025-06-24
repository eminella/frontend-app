// frontend-app/components/ImageUploader.tsx
'use client';

import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

type Props = {
  maxNumber?: number;
  onImagesChange: (files: File[]) => void;
};

export default function ImageUploader({
  maxNumber = 3,
  onImagesChange,
}: Props) {
  const [images, setImages] = React.useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
    onImagesChange(imageList.map((img) => img.file as File));
  };

  return (
    <div className="p-4 border rounded-md">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={['jpg', 'jpeg', 'png', 'webp']}
        inputProps={{ name: 'images' }} // 🔥 EKLENDİ! multer bunu istiyor
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            {/* Yükle / Temizle butonları */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={onImageUpload}
                {...dragProps}
                className={`px-4 py-2 rounded text-white ${
                  isDragging ? 'bg-yellow-800' : 'bg-yellow-700'
                }`}
              >
                Görsel Yükle
              </button>
              {imageList.length > 0 && (
                <button
                  type="button"
                  onClick={onImageRemoveAll}
                  className="px-4 py-2 rounded bg-gray-500 text-white"
                >
                  Temizle
                </button>
              )}
            </div>

            {/* Önizleme ızgarası */}
            <div className="grid grid-cols-3 gap-2">
              {imageList.map((image, index) => (
                <div key={index} className="relative border rounded p-1">
                  <img
                    src={image.data_url}
                    alt={`görsel-${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => onImageUpdate(index)}
                      className="text-blue-600 hover:underline"
                    >
                      Değiştir
                    </button>
                    <button
                      type="button"
                      onClick={() => onImageRemove(index)}
                      className="text-red-600 hover:underline"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </ImageUploading>
    </div>
  );
}
