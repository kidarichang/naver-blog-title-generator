
import React, { useState } from 'react';
import { GenerationResult } from '../types';
import { Icons } from '../constants';

interface ResultTableProps {
  results: GenerationResult[];
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllAsCSV = () => {
    const header = "구/동,선불폰 제목,선불유심 제목\n";
    const content = results.map(r => `${r.districtOrDong},${r.titlePrepaidPhone},${r.titlePrepaidUSIM}`).join('\n');
    navigator.clipboard.writeText(header + content);
    setCopiedId('all');
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (results.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-800">생성된 제목 리스트 ({results.length}건)</h3>
        <button
          onClick={copyAllAsCSV}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          {copiedId === 'all' ? <Icons.Check /> : <Icons.Copy />}
          전체 복사 (CSV 형식)
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">구 / 동</th>
              <th className="px-6 py-4">제목 (선불폰 중심)</th>
              <th className="px-6 py-4">제목 (선불유심 중심)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((result, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 align-top">
                  {result.districtOrDong}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-start justify-between gap-2">
                    <span className="max-w-[300px] leading-relaxed">{result.titlePrepaidPhone}</span>
                    <button
                      onClick={() => copyToClipboard(result.titlePrepaidPhone, `phone-${idx}`)}
                      className="text-gray-400 hover:text-emerald-600 p-1 opacity-0 group-hover:opacity-100 transition-all"
                      title="복사하기"
                    >
                      {copiedId === `phone-${idx}` ? <Icons.Check /> : <Icons.Copy />}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-start justify-between gap-2">
                    <span className="max-w-[300px] leading-relaxed">{result.titlePrepaidUSIM}</span>
                    <button
                      onClick={() => copyToClipboard(result.titlePrepaidUSIM, `usim-${idx}`)}
                      className="text-gray-400 hover:text-emerald-600 p-1 opacity-0 group-hover:opacity-100 transition-all"
                      title="복사하기"
                    >
                      {copiedId === `usim-${idx}` ? <Icons.Check /> : <Icons.Copy />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
