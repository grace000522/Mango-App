
import React, { useState, useRef } from 'react';
import { Camera, Loader2, CheckCircle2, AlertCircle, Sparkles, Heart } from 'lucide-react';
import { classifyWaste } from '../services/geminiService';

const RequestPage: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if (!description && !image) return;
    setIsClassifying(true);
    
    let base64 = image ? image.split(',')[1] : undefined;
    const result = await classifyWaste(description, base64);
    setClassificationResult(result);
    setIsClassifying(false);
  };

  const resetForm = () => {
    setDescription('');
    setImage(null);
    setClassificationResult(null);
  };

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-6 duration-700">
      <section>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight font-cute">New Request! ✨</h2>
        <p className="text-pink-300 font-bold text-sm">Snap a photo or tell us about it~</p>
      </section>

      <div className="space-y-8">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-square bg-pink-50/40 rounded-[3rem] border-4 border-dashed border-pink-100 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden group hover:border-pink-300 hover:bg-pink-50/60 transition-all duration-500 shadow-inner"
        >
          {image ? (
            <img src={image} alt="Upload preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <>
              <div className="p-6 bg-white rounded-full text-pink-300 group-hover:text-pink-400 group-hover:rotate-12 transition-all duration-500 shadow-md">
                <Camera size={40} />
              </div>
              <span className="text-pink-300 font-black text-sm uppercase tracking-[0.2em] animate-pulse">Snap Snap!</span>
            </>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-pink-300 ml-2 uppercase tracking-widest">Little Details</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A cute but wobbly wooden chair..."
            className="w-full p-6 bg-gray-50/50 rounded-[2rem] border border-pink-50 focus:outline-none focus:ring-4 focus:ring-pink-100 min-h-[140px] resize-none placeholder:text-gray-300 text-gray-700 font-medium transition-all"
          />
        </div>

        {!classificationResult && (
          <button
            onClick={handleClassify}
            disabled={isClassifying || (!description && !image)}
            className="w-full py-5 bg-pink-300 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-pink-100 hover:bg-pink-400 transition-all squishy-button disabled:opacity-40 disabled:shadow-none flex items-center justify-center gap-3"
          >
            {isClassifying ? (
              <Loader2 className="animate-spin" />
            ) : (
              <><Sparkles size={20} /> Magic Analysis</>
            )}
          </button>
        )}

        {classificationResult && (
          <div className="p-8 bg-white rounded-[3rem] border border-pink-50 shadow-2xl shadow-pink-200/20 animate-in zoom-in-90 duration-500 space-y-6">
            <div className="flex items-center gap-2 text-pink-400 font-bold justify-center mb-2">
              <Sparkles size={20} className="fill-pink-100" />
              <span className="font-cute text-2xl tracking-wide">Result is here!</span>
              <Sparkles size={20} className="fill-pink-100" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-50/30 p-4 rounded-[2rem] text-center">
                <p className="text-[10px] text-pink-300 font-bold uppercase tracking-widest mb-1">Item</p>
                <p className="font-bold text-gray-700 font-cute text-xl">{classificationResult.itemName}</p>
              </div>
              <div className="bg-emerald-50/30 p-4 rounded-[2rem] text-center">
                <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mb-1">Cost</p>
                <p className="font-bold text-emerald-500 font-cute text-xl">{classificationResult.estimatedValue}</p>
              </div>
            </div>

            <div className="bg-blue-50/30 p-5 rounded-[2rem] space-y-2">
              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">How to Dispose</p>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{classificationResult.disposalMethod}</p>
            </div>

            {classificationResult.precautions && (
              <div className="flex gap-2 p-4 bg-rose-50/50 rounded-[2rem] text-rose-400 text-xs font-bold items-center border border-rose-100">
                <AlertCircle size={16} className="shrink-0" />
                <p>{classificationResult.precautions}</p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full py-4 bg-pink-300 text-white font-black rounded-full shadow-lg squishy-button hover:bg-pink-400">
                Finish & Request!
              </button>
              <button 
                onClick={resetForm}
                className="w-full py-3 bg-white text-pink-300 font-bold text-sm rounded-full hover:text-pink-400 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
