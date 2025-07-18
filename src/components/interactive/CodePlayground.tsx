'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Maximize2, 
  Minimize2,
  Code,
  Terminal,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-secondary-100 dark:bg-secondary-800 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
        <p className="text-secondary-600 dark:text-secondary-400 text-sm">Loading Editor...</p>
      </div>
    </div>
  )
});

interface CodePlaygroundProps {
  defaultCode?: string;
  language?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  height?: number;
  showConsole?: boolean;
  onCodeChange?: (code: string) => void;
  onCodeRun?: (code: string) => Promise<string>;
  className?: string;
}

interface TestCase {
  id: string;
  name: string;
  input: any;
  expected: any;
  actual?: any;
  passed?: boolean;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  defaultCode = '// Write your code here\nconsole.log("Hello, World!");',
  language = 'javascript',
  theme = 'light',
  readOnly = false,
  height = 400,
  showConsole = true,
  onCodeChange,
  onCodeRun,
  className = ''
}) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOutput, setShowOutput] = useState(true);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [activeTab, setActiveTab] = useState<'console' | 'tests'>('console');
  const [editorOptions, setEditorOptions] = useState({
    fontSize: 14,
    minimap: { enabled: false },
    lineNumbers: true,
    wordWrap: 'on' as const,
    autoClosingBrackets: 'always' as const,
    autoClosingQuotes: 'always' as const,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: { enabled: true },
    formatOnType: true,
    formatOnPaste: true
  });
  
  const editorRef = useRef<any>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure JavaScript/TypeScript specific settings
    if (language === 'javascript' || language === 'typescript') {
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: 'React',
        allowJs: true,
        typeRoots: ['node_modules/@types']
      });
    }
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRunCode();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Prevent default save
      return null;
    });
  };

  const handleRunCode = async () => {
    if (isRunning || readOnly) return;
    
    setIsRunning(true);
    setError(null);
    setOutput('');
    
    try {
      if (onCodeRun) {
        const result = await onCodeRun(code);
        setOutput(result);
      } else {
        // Default JavaScript execution
        const result = await executeJavaScript(code);
        setOutput(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const executeJavaScript = async (code: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputs: string[] = [];
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      
      // Override console methods
      console.log = (...args: any[]) => {
        outputs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };
      
      console.error = (...args: any[]) => {
        outputs.push(`ERROR: ${args.map(arg => String(arg)).join(' ')}`);
      };
      
      console.warn = (...args: any[]) => {
        outputs.push(`WARN: ${args.map(arg => String(arg)).join(' ')}`);
      };
      
      try {
        // Create a safe execution environment
        const safeEval = new Function('console', code);
        safeEval({ log: console.log, error: console.error, warn: console.warn });
        
        resolve(outputs.join('\n') || 'Code executed successfully (no output)');
      } catch (error) {
        reject(error);
      } finally {
        // Restore original console methods
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }
    });
  };

  const handleReset = () => {
    setCode(defaultCode);
    setOutput('');
    setError(null);
    setTestCases([]);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };

  const runTests = async () => {
    if (!testCases.length) return;
    
    setIsRunning(true);
    const updatedTestCases = [...testCases];
    
    for (let i = 0; i < updatedTestCases.length; i++) {
      const testCase = updatedTestCases[i];
      try {
        // Create a test function that includes the user's code
        const testFunction = new Function('input', `
          ${code}
          
          // Assuming the main function is the last defined function
          const functions = Object.getOwnPropertyNames(this).filter(name => 
            typeof this[name] === 'function' && !name.startsWith('_')
          );
          const mainFunction = functions[functions.length - 1];
          
          if (typeof this[mainFunction] === 'function') {
            return this[mainFunction](input);
          }
          
          throw new Error('No main function found');
        `);
        
        const result = testFunction(testCase.input);
        testCase.actual = result;
        testCase.passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
      } catch (error) {
        testCase.actual = error instanceof Error ? error.message : 'Error';
        testCase.passed = false;
      }
    }
    
    setTestCases(updatedTestCases);
    setIsRunning(false);
  };

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      name: `Test Case ${testCases.length + 1}`,
      input: '',
      expected: ''
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: any) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
            <Code size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
            Code Playground
          </h3>
          <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 text-xs rounded-full capitalize">
            {language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isRunning || readOnly}
            className="flex items-center gap-2 px-4 py-2 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Run Code (Ctrl+Enter)"
          >
            {isRunning ? <Square size={16} /> : <Play size={16} />}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </motion.button>
          
          {!readOnly && (
            <>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                title="Reset Code"
              >
                <RotateCcw size={16} />
              </button>
              
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                title="Download Code"
              >
                <Download size={16} />
              </button>
              
              <label className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors cursor-pointer" title="Upload Code">
                <Upload size={16} />
                <input
                  type="file"
                  accept=".js,.ts,.jsx,.tsx,.txt"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </>
          )}
          
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
            title={showOutput ? 'Hide Output' : 'Show Output'}
          >
            {showOutput ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
      
      {/* Editor */}
      <div className="relative">
        <MonacoEditor
          height={isFullscreen ? window.innerHeight - 200 : height}
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          options={{
            ...editorOptions,
            readOnly
          }}
        />
      </div>
      
      {/* Output Panel */}
      <AnimatePresence>
        {showOutput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-secondary-200 dark:border-secondary-700"
          >
            {/* Output Tabs */}
            <div className="flex items-center gap-1 p-2 bg-secondary-50 dark:bg-secondary-800">
              <button
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  activeTab === 'console'
                    ? 'bg-white dark:bg-secondary-700 shadow-sm'
                    : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                <Terminal size={14} />
                <span className="text-sm">Console</span>
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  activeTab === 'tests'
                    ? 'bg-white dark:bg-secondary-700 shadow-sm'
                    : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                <FileText size={14} />
                <span className="text-sm">Tests ({testCases.length})</span>
              </button>
            </div>
            
            {/* Console Output */}
            {activeTab === 'console' && (
              <div className="p-4 max-h-48 overflow-y-auto">
                {error ? (
                  <div className="text-error-600 dark:text-error-400 font-mono text-sm whitespace-pre-wrap">
                    {error}
                  </div>
                ) : output ? (
                  <div className="text-secondary-900 dark:text-secondary-100 font-mono text-sm whitespace-pre-wrap">
                    {output}
                  </div>
                ) : (
                  <div className="text-secondary-500 dark:text-secondary-400 text-sm italic">
                    No output. Run your code to see results.
                  </div>
                )}
              </div>
            )}
            
            {/* Test Cases */}
            {activeTab === 'tests' && (
              <div className="p-4 max-h-48 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                    Test Cases
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={addTestCase}
                      className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-colors"
                    >
                      Add Test
                    </button>
                    <button
                      onClick={runTests}
                      disabled={!testCases.length || isRunning}
                      className="px-3 py-1 bg-success-600 hover:bg-success-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Run Tests
                    </button>
                  </div>
                </div>
                
                {testCases.length === 0 ? (
                  <div className="text-center py-8 text-secondary-500 dark:text-secondary-400 text-sm">
                    No test cases yet. Add a test case to get started.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testCases.map(testCase => (
                      <div key={testCase.id} className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="text"
                            value={testCase.name}
                            onChange={(e) => updateTestCase(testCase.id, 'name', e.target.value)}
                            className="font-medium text-sm bg-transparent border-none focus:ring-0 p-0 text-secondary-900 dark:text-secondary-100"
                          />
                          <div className="flex items-center gap-2">
                            {testCase.passed !== undefined && (
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                testCase.passed 
                                  ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400'
                                  : 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400'
                              }`}>
                                {testCase.passed ? 'PASS' : 'FAIL'}
                              </span>
                            )}
                            <button
                              onClick={() => removeTestCase(testCase.id)}
                              className="text-error-600 hover:text-error-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <label className="block text-xs text-secondary-600 dark:text-secondary-400 mb-1">
                              Input
                            </label>
                            <input
                              type="text"
                              value={testCase.input}
                              onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                              className="w-full px-2 py-1 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-600 rounded text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Input value"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs text-secondary-600 dark:text-secondary-400 mb-1">
                              Expected
                            </label>
                            <input
                              type="text"
                              value={testCase.expected}
                              onChange={(e) => updateTestCase(testCase.id, 'expected', e.target.value)}
                              className="w-full px-2 py-1 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-600 rounded text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Expected result"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs text-secondary-600 dark:text-secondary-400 mb-1">
                              Actual
                            </label>
                            <input
                              type="text"
                              value={testCase.actual || ''}
                              readOnly
                              className="w-full px-2 py-1 bg-secondary-100 dark:bg-secondary-600 border border-secondary-200 dark:border-secondary-500 rounded text-secondary-700 dark:text-secondary-300"
                              placeholder="Run tests to see result"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodePlayground;