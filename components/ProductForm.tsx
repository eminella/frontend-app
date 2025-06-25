// frontend-app/components/ProductForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type FormValues = {
  name: string;
  webCode: string;
  barcode: string;
  supplierSku: string;
  stock: number;
  stockUnit: string;
  price: number;
  vat: number;
  description: string;
  image: FileList;
};

const stockUnits = ['Adet', 'Çift', 'Kg', 'Metre'];

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      stock: 1,
      vat: 20,
      stockUnit: 'Adet',
    },
  });

  const imageFile = watch('image')?.[0];

  const onSubmit = async (data: FormValues) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value instanceof FileList) {
        fd.append('image', value[0]);
      } else {
        fd.append(key, String(value));
      }
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: 'POST',
      body: fd,
    });

    if (res.ok) {
      alert('✅ Ürün eklendi');
      reset();
    } else {
      alert('❌ Ürün eklenemedi');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-gray-200 bg-[#0F1D40] p-6 rounded-lg shadow-lg"
    >
      {/* Ürün Adı */}
      <div>
        <label className="block font-bold mb-1">
          Ürün Adı <span className="text-red-500">*</span>
        </label>
        <input {...register('name', { required: true })} className="form-input-dark" />
      </div>

      {/* Envanter */}
      <div className="grid md:grid-cols-2 gap-4 border border-[#1d345f] p-4 rounded">
        <h2 className="md:col-span-2 font-bold text-lg mb-2">Envanter Bilgisi</h2>

        <div>
          <label className="block mb-1 font-bold">Webservis Kodu</label>
          <input {...register('webCode')} className="form-input-dark" />
        </div>

        <div>
          <label className="block mb-1 font-bold">Barkod</label>
          <input {...register('barcode')} className="form-input-dark" />
        </div>

        <div>
          <label className="block mb-1 font-bold">Tedarikçi Ürün Kodu (SKU)</label>
          <input {...register('supplierSku')} className="form-input-dark" />
        </div>

        <div>
          <label className="block mb-1 font-bold">Stok</label>
          <input type="number" {...register('stock', { valueAsNumber: true })} className="form-input-dark" />
        </div>

        <div>
          <label className="block mb-1 font-bold">Stok Birimi</label>
          <select {...register('stockUnit')} className="form-input-dark">
            {stockUnits.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Fiyatlandırma */}
      <div className="grid md:grid-cols-2 gap-4 border border-[#1d345f] p-4 rounded">
        <h2 className="md:col-span-2 font-bold text-lg mb-2">Fiyatlandırma</h2>

        <div>
          <label className="block mb-1 font-bold">
            Satış Fiyatı <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('price', { required: true, valueAsNumber: true })}
            className="form-input-dark"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">KDV (%)</label>
          <input type="number" {...register('vat', { valueAsNumber: true })} className="form-input-dark" />
        </div>
      </div>

      {/* Açıklama */}
      <div>
        <label className="block mb-1 font-bold">Açıklama</label>
        <ReactQuill
          value={watch('description')}
          onChange={(value) => setValue('description', value)}
          theme="snow"
          className="[&_.ql-toolbar]:bg-[#13254f] [&_.ql-container]:bg-[#0F1D40] [&_.ql-editor]:min-h-[150px]"
        />
      </div>

      {/* Görsel */}
      <div>
        <label className="block font-bold mb-1">Ürün Görseli</label>
        <input
          type="file"
          accept="image/*"
          {...register('image', { required: true })}
          className="text-gray-300"
        />
        {imageFile && (
          <p className="text-sm text-green-400 font-bold mt-1">
            Seçilen dosya: {imageFile.name}
          </p>
        )}
      </div>

      {/* Kaydet Butonu */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-bold disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
        Kaydet
      </button>
    </form>
  );
}
