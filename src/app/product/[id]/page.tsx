"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  discountPercent?: number;
  code?: string;
  category?: string;
  imageUrl?: string;
  paymentInfo?: string;
  recommendation?: string;
  returnPolicy?: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://backend-api-rvzd.onrender.com/products/${id}`);
        if (!res.ok) throw new Error('Ürün bulunamadı');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!product) return <p>Ürün bulunamadı.</p>;

  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <main style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </div>
      <div style={{ flex: 2 }}>
        <h1>{product.name}</h1>
        <p><strong>Ürün Kodu:</strong> {product.code || 'Yok'}</p>
        <p><strong>Kategori:</strong> {product.category || 'Yok'}</p>

        <div style={{ marginTop: '20px' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e91e63' }}>
            {product.discountedPrice ?? product.price} TL
          </span>
          {product.discountedPrice && (
            <span style={{ marginLeft: 10, textDecoration: 'line-through', color: '#888' }}>
              {product.price} TL
            </span>
          )}
          {product.discountPercent && (
            <span style={{
              backgroundColor: '#e91e63',
              color: 'white',
              borderRadius: '50%',
              padding: '5px 10px',
              marginLeft: '10px',
              fontWeight: 'bold',
            }}>
              %{product.discountPercent} İNDİRİM
            </span>
          )}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            style={{
              backgroundColor: '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            SEPETE EKLE
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={decrement} style={{ fontSize: '1.5rem' }}>-</button>
            <span style={{ fontSize: '1.2rem' }}>{quantity}</span>
            <button onClick={increment} style={{ fontSize: '1.5rem' }}>+</button>
          </div>
        </div>

        <div style={{ marginTop: '15px', display: 'flex', gap: '30px', fontSize: '1.5rem', color: '#777' }}>
          <span role="img" aria-label="like">👍</span>
          <span role="img" aria-label="notification">🔔</span>
          <span role="img" aria-label="share">📤</span>
        </div>

        <Tabs product={product} />
      </div>
    </main>
  );
}

function Tabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = React.useState('description');

  return (
    <>
      <nav style={{ display: 'flex', gap: '20px', borderBottom: '2px solid #ddd' }}>
        <button style={tabStyle(activeTab === 'description')} onClick={() => setActiveTab('description')}>Ürün Açıklaması</button>
        <button style={tabStyle(activeTab === 'payment')} onClick={() => setActiveTab('payment')}>Ödeme Seçenekleri</button>
        <button style={tabStyle(activeTab === 'recommend')} onClick={() => setActiveTab('recommend')}>Tavsiye Et</button>
        <button style={tabStyle(activeTab === 'return')} onClick={() => setActiveTab('return')}>İade Koşulları</button>
      </nav>
      <section style={{ padding: '20px', border: '1px solid #ddd', borderTop: 'none' }}>
        {activeTab === 'description' && <p>{product.description || 'Açıklama yok'}</p>}
        {activeTab === 'payment' && <p>{product.paymentInfo || 'Ödeme bilgisi yok'}</p>}
        {activeTab === 'recommend' && <p>{product.recommendation || 'Tavsiye yok'}</p>}
        {activeTab === 'return' && <p>{product.returnPolicy || 'İade bilgisi yok'}</p>}
      </section>
    </>
  );
}

function tabStyle(active: boolean) {
  return {
    backgroundColor: active ? '#e91e63' : 'transparent',
    color: active ? 'white' : '#555',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    borderBottom: active ? '4px solid #e91e63' : 'none',
  };
}
