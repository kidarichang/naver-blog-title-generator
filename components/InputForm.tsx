
import React from 'react';
import { MAJOR_CITIES, Icons } from '../constants';

interface InputFormProps {
  city: string;
  setCity: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ city, setCity, onSubmit, isLoading }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
      <div className="mb-8">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
          <Icons.Map />
          지역(도시) 선택
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {MAJOR_CITIES.map((name) => (
            <button
              key={name}
              onClick={() => setCity(name)}
              className={`py-2.5 px-2 rounded-xl text-sm font-medium transition-all border ${
                city === name
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="직접 입력도 가능합니다 (예: 부산 영도구)"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-lg font-medium"
          />
        </div>
        
        <button
          onClick={onSubmit}
          disabled={isLoading || !city}
          className={`w-full md:w-auto px-10 py-4 rounded-2xl font-bold text-white transition-all shadow-xl text-lg whitespace-nowrap ${
            isLoading || !city
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2008/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              60개 제목 생성 중...
            </span>
          ) : (
            "제목 60개 일괄 생성"
          )}
        </button>
      </div>
      
      <p className="mt-4 text-xs text-gray-400 text-center">
        ※ 시 단위 10개 + 무작위 하위 지역(동/구) 50개가 자동으로 배정되어 생성됩니다.
      </p>
    </div>
  );
};

export default InputForm;
