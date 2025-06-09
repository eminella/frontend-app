"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description2: string;
  price: number;
  discountedPrice2: number;
  discountPercent: number;
  code2: string;
  category2: string;
  imageUrl: string;
  paymentInfo2: string;
  recommendation2: string;
  returnPolicy2: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: PageProps) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Diğer alanları buraya koyabilirsin */}
    </div>
  );
}
