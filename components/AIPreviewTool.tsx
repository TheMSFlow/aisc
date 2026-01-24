
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import Button from './Button';

export const AIPreviewTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReframing = useCallback(async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a leader struggling with this AI-related issue: "${input}". 
        Act as a strategic advisor for the AI Stakeholder Challenge. 
        Reframe this problem from a "tools/tech" problem to a "leadership/judgment" problem. 
        Provide a concise, punchy 3-sentence reframe that creates clarity. Use the tone of a high-end executive coach.`,
      });
      setOutput(response.text || "Unexpected response. Please try again.");
    } catch (err) {
      console.error(err);
      setOutput("Please enter a specific challenge for a strategic response.");
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return (
    <div className="bg-white p-8 md:p-12 shadow-2xl border border-msblue/10 rounded-sm">
      <div className="mb-8">
        <label className="block text-sm font-bold uppercase tracking-widest text-msblue mb-4">What's your biggest AI-related leadership friction right now?</label>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., My team is using ChatGPT for everything and I'm losing oversight..."
          className="w-full h-32 p-4 border border-slate-200 focus:border-msblue focus:ring-1 focus:ring-msblue outline-none transition-all resize-none text-lg"
        />
      </div>
      
      <div className="flex justify-between items-center flex-wrap gap-4">
        <Button 
          onClick={handleReframing} 
          className="w-full md:w-auto"
          variant="primary"
        >
          {isLoading ? 'Processing Strategy...' : 'Request Strategic Response'}
        </Button>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Powered by Michael Steve Intelligence Center</span>
      </div>

      {output && (
        <div className="mt-12 p-8 bg-msaccent/50 border-l-4 border-warning animate-fade-in">
          <h4 className="font-heading text-lg text-warning uppercase mb-4 tracking-wider">The Leadership Reframe:</h4>
          <p className="text-xl md:text-2xl text-dark-blue italic font-medium leading-relaxed">
            {output}
          </p>
        </div>
      )}
    </div>
  );
};
