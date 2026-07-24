"use client";

import Button from "@/components/global/Button";
import TextArea from "./fields/TextArea";

export default function OpenPrompt({
  prompt,
  value,
  onChange,
  onContinue,
  continueLabel = "Continue",
  continueIcon,
}) {
  const canContinue = prompt.required ? value.trim().length > 0 : true;

  return (
    <div>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
        {prompt.eyebrow}
      </p>
      <h1 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
        {prompt.question}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-dark-blue/55 sm:text-base">
        {prompt.hint}
      </p>
      <div className="mt-8">
        <TextArea
          id={prompt.id}
          value={value}
          onChange={onChange}
          maxLength={prompt.maxLength}
          autoFocus
        />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="dark"
          className="px-8 py-3"
          disabled={!canContinue}
          onClick={onContinue}
          iconLeft={continueIcon}
        >
          {continueLabel}
        </Button>
      </div>
    </div>
  );
}
