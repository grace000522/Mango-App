
import React, { useState, useRef } from 'react';
import { Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { classifyWaste } from '../services/geminiService.ts';

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
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <section>
        <h2 className="text-2xl font-bold text-gray-800">배출 신청하기</h2>
        <p className="text-gray-500">폐기물을 촬영하거나 설명을 적어주세요.</p>
      </section>

      <div className="space-y-6">
        {/* Photo Upload */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden group hover:border-yellow-400 transition-colors"
        >
          {image ? (
            <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="p-4 bg-white rounded-full text-gray-400 group-hover:text-yellow-500 transition-colors">
                <Camera size={32} />
              </div>
              <span className="text-gray-500 font-medium">사진 촬영 또는 업로드</span>
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

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">상세 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="예: 다리가 부러진 목재 의자 1개"
            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[100px] resize-none"
          />
        </div>

        {/* AI Action Button */}
        {!classificationResult && (
          <button
            onClick={handleClassify}
            disabled={isClassifying || (!description && !image)}
            className="w-full py-4 bg-yellow-400 text-white font-black rounded-2xl shadow-lg shadow-yellow-200 hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isClassifying ? (
              <Loader2 className="animate-spin" />
            ) : (
              'AI 분류 및 비용 산정하기'
            )}
          </button>
        )}

        {/* Results Section */}
        {classificationResult && (
          <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 animate-in zoom-in-95 duration-300 space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
              <CheckCircle2 size={20} />
              <span>AI 분석 결과</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">분류 품목</p>
                <p className="font-bold text-gray-700">{classificationResult.itemName}</p>
              </div>
              <div className="bg-white p-3 rounded-xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">예상 수거비용</p>
                <p className="font-bold text-orange-600">{classificationResult.estimatedValue}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl space-y-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">배출 방법</p>
              <p className="text-sm text-gray-600 leading-relaxed">{classificationResult.disposalMethod}</p>
            </div>

            {classificationResult.precautions && (
              <div className="flex gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-xs">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p>{classificationResult.precautions}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button 
                onClick={resetForm}
                className="flex-1 py-3 bg-white border border-orange-200 text-orange-500 font-bold rounded-xl"
              >
                다시 찍기
              </button>
              <button className="flex-2 py-3 bg-orange-500 text-white font-bold rounded-xl px-8 shadow-md">
                신청 완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
