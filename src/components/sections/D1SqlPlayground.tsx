import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { flagshipAslAdemcoData } from '../../data/flagshipAslAdemco';
import {
  Database,
  Play,
  CheckCircle2,
  Table as TableIcon,
  Code2,
  Clock,
} from 'lucide-react';
import { SteppedButton } from '../ui/SteppedButton';
import { CodeBlock } from '../ui/CodeBlock';

export const D1SqlPlayground: React.FC = () => {
  const { language } = useLanguage();
  const queries = flagshipAslAdemcoData.sqlQueries;
  const schemas = flagshipAslAdemcoData.sqlSchemas;

  const [activeTab, setActiveTab] = useState<'queries' | 'schemas'>('queries');
  const [selectedQueryId, setSelectedQueryId] = useState(queries[0]?.id || 'exact-sku');
  const [selectedSchemaTable, setSelectedSchemaTable] = useState(schemas[0]?.tableName || 'products');
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);

  const activeQuery = queries.find((q) => q.id === selectedQueryId) || queries[0]!;
  const activeSchema = schemas.find((s) => s.tableName === selectedSchemaTable) || schemas[0]!;

  const handleRunQuery = () => {
    setIsExecuting(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 450);
  };

  return (
    <div className="bg-[var(--bgInverse)] text-[var(--bg1)] rounded-2xl p-5 sm:p-7 border border-[var(--bgInverse2)] shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--bgInverse2)]/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent2)] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent2)]">
              EDGE SQL DATABASE RUNTIME
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-[var(--accent2)]" />
            <span>Cloudflare D1 SQL Playground</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-mono">
            {language === 'de'
              ? 'Interaktiver SQL-Query Explorer & Schema-Inspector über 1.460+ D1 Katalog-Datensätze.'
              : 'Interactive SQL Query Explorer & Schema Inspector over 1,460+ D1 catalog records.'}
          </p>
        </div>

        {/* View Mode Tabs (Queries vs Schemas) */}
        <div className="flex items-center gap-2 bg-[var(--darkDarker)] p-1 rounded-lg border border-white/10" role="group" aria-label="Playground Mode Selector">
          <button
            type="button"
            aria-pressed={activeTab === 'queries'}
            onClick={() => setActiveTab('queries')}
            className={`touch-target px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
              activeTab === 'queries'
                ? 'bg-[var(--accent2)] text-[var(--bgInverse)] shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{language === 'de' ? 'SQL Queries' : 'SQL Queries'}</span>
          </button>

          <button
            type="button"
            aria-pressed={activeTab === 'schemas'}
            onClick={() => setActiveTab('schemas')}
            className={`touch-target px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
              activeTab === 'schemas'
                ? 'bg-[var(--accent2)] text-[var(--bgInverse)] shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>{language === 'de' ? 'D1 Schemas' : 'D1 Schemas'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'queries' ? (
        /* QUERIES VIEW */
        <div className="space-y-6">
          {/* Query Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="D1 SQL Query Presets">
            {queries.map((q) => (
              <button
                key={q.id}
                type="button"
                aria-pressed={selectedQueryId === q.id}
                onClick={() => setSelectedQueryId(q.id)}
                className={`touch-target px-3.5 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border min-h-[44px] ${
                  selectedQueryId === q.id
                    ? 'bg-[var(--accent1)] text-white border-[var(--accent1)] shadow-md'
                    : 'bg-[var(--bgInverse2)] text-gray-300 hover:text-white border-white/10'
                }`}
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Query Info & Explanation */}
          <div className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[10px] text-[var(--accent2)] font-bold uppercase tracking-wider block">
                {activeQuery.stage}
              </span>
              <p className="text-gray-200 font-sans text-xs sm:text-sm">
                {activeQuery.explanation}
              </p>
            </div>

            <SteppedButton
              size="sm"
              variant="secondary"
              steppedShadow="none"
              onClick={handleRunQuery}
              disabled={isExecuting}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              {isExecuting
                ? language === 'de'
                  ? 'Führe aus...'
                  : 'Running...'
                : language === 'de'
                ? 'Query Ausführen'
                : 'Execute Query'}
            </SteppedButton>
          </div>

          {/* SQL Editor CodeBlock */}
          <CodeBlock
            code={activeQuery.query}
            language="sql"
            title={`Cloudflare D1 SQL — ${activeQuery.stage}`}
            executionTimeMs={activeQuery.mockExecutionTimeMs}
            showLineNumbers={true}
          />

          {/* Formatted Query Results Table */}
          {hasExecuted && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'de' ? 'Abfrageergebnis' : 'Query Result'}:{' '}
                    {activeQuery.resultSummary}
                  </span>
                </span>

                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>D1 Latency: {activeQuery.mockExecutionTimeMs}ms</span>
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[var(--darkInverse2)] bg-[var(--darkBg1)] shadow-inner">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--darkDarker)] text-[var(--accent2)] border-b border-[var(--darkInverse2)]">
                      {Object.keys(activeQuery.mockResults[0] || {}).map((col) => (
                        <th key={col} className="p-3 uppercase tracking-wider font-bold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--darkInverse2)] text-gray-200">
                    {activeQuery.mockResults.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                        {Object.entries(row).map(([k, val], cIdx) => (
                          <td key={cIdx} className="p-3 whitespace-nowrap">
                            {k === 'price_netto' ? (
                              <span className="font-bold text-[var(--accent2)]">
                                {typeof val === 'number' ? val.toFixed(2) : String(val)} €
                              </span>
                            ) : k === 'in_stock' ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                {String(val)} Stk.
                              </span>
                            ) : k === 'relation_type' ? (
                              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                                {String(val)}
                              </span>
                            ) : (
                              String(val)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* SCHEMAS VIEW */
        <div className="space-y-6">
          {/* Table Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="D1 Database Tables">
            {schemas.map((s) => (
              <button
                key={s.tableName}
                type="button"
                aria-pressed={selectedSchemaTable === s.tableName}
                onClick={() => setSelectedSchemaTable(s.tableName)}
                className={`touch-target px-3.5 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border min-h-[44px] ${
                  selectedSchemaTable === s.tableName
                    ? 'bg-[var(--accent2)] text-[var(--bgInverse)] border-[var(--accent2)] shadow-md'
                    : 'bg-[var(--bgInverse2)] text-gray-300 hover:text-white border-white/10'
                }`}
              >
                TABLE: {s.tableName} ({s.sampleRowsCount} rows)
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] space-y-1 font-mono text-xs">
            <span className="text-[10px] text-[var(--accent2)] font-bold uppercase tracking-wider block">
              SCHEMA DESCRIPTION
            </span>
            <p className="text-gray-200 font-sans text-xs sm:text-sm">
              {activeSchema.description}
            </p>
          </div>

          {/* DDL Schema CodeBlock */}
          <CodeBlock
            code={activeSchema.ddl}
            language="sql"
            title={`SQLite DDL — ${activeSchema.tableName}`}
            showLineNumbers={true}
          />

          {/* Column Specifications Grid */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              {language === 'de' ? 'Spalten-Spezifikationen' : 'Column Specifications'}
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--darkInverse2)] bg-[var(--darkBg1)]">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--darkDarker)] text-[var(--accent2)] border-b border-[var(--darkInverse2)]">
                    <th className="p-2.5 uppercase">Column</th>
                    <th className="p-2.5 uppercase">Type</th>
                    <th className="p-2.5 uppercase">Key</th>
                    <th className="p-2.5 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--darkInverse2)] text-gray-200">
                  {activeSchema.columns.map((col) => (
                    <tr key={col.name} className="hover:bg-white/5">
                      <td className="p-2.5 font-bold text-white">{col.name}</td>
                      <td className="p-2.5 text-[var(--accent1)]">{col.type}</td>
                      <td className="p-2.5">
                        {col.isPrimary && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">
                            PRIMARY
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-gray-300 font-sans text-xs">
                        {col.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default D1SqlPlayground;
