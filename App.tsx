
import React, { useState, useCallback } from 'react';
import { AppState, GenerationResult } from './types';
import { APP_INFO } from './constants';
import { generateTitles } from './services/geminiService';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    city: '',
    dongs: '', 
    isGenerating: false,
    results: [],
    error: null,
  });

  const handleGenerate = useCallback(async () => {
    if (!state.city) return;

    setState(prev => ({ ...prev, isGenerating: true, error: null, results: [] }));
    
    try {
      const data = await generateTitles(state.city);
      setState(prev => ({
        ...prev,
        isGenerating: false,
        results: data,
        error: null
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: "제목 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      }));
    }
  }, [state.city]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      <header className="text-center mb-12">
        <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          AI SEO Title Engine
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          {APP_INFO.title}
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {APP_INFO.description}
        </p>
      </header>

      <main>
        <InputForm
          city={state.city}
          setCity={(val) => setState(prev => ({ ...prev, city: val }))}
          isLoading={state.isGenerating}
          onSubmit={handleGenerate}
        />

        {state.error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-semibold shadow-sm">
            {state.error}
          </div>
        )}

        {state.isGenerating && (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
              <div className="animate-bounce mb-4 text-emerald-600">
                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-800">60개의 맞춤형 제목을 설계하고 있습니다</p>
              <p className="text-gray-500 mt-2">잠시만 기다려 주세요...</p>
            </div>
          </div>
        )}

        <ResultTable results={state.results} />

        {state.results.length === 0 && !state.isGenerating && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm">
            <div className="text-gray-300 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium">상단에서 지역을 선택하여 시작하세요.</p>
          </div>
        )}
      </main>

      <footer className="mt-20 pt-10 border-t border-gray-100 text-center text-gray-400 text-sm">
        <div className="flex flex-col gap-4">
          <p className="font-medium text-gray-500">© 2024 Naver SEO Helper Pro. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-300">
            <span>#Auto_Title_Engine</span>
            <span>#Prepaid_Mobile</span>
            <span>#SEO_Optimizer</span>
            <span>#Large_Scale_Generation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
