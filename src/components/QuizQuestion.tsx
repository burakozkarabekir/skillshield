"use client";

import { useState, useMemo } from "react";
import { AssessmentQuestion } from "@/lib/types";

interface QuizQuestionProps {
  question: AssessmentQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export default function QuizQuestion({
  question,
  value,
  onChange,
}: QuizQuestionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (question.type !== "search" || !searchQuery) return question.options;
    return question.options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [question, searchQuery]);

  const handleSingleSelect = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleMultiSelect = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter((v) => v !== optionValue));
    } else if (
      !question.maxSelections ||
      currentValues.length < question.maxSelections
    ) {
      onChange([...currentValues, optionValue]);
    }
  };

  const isSelected = (optionValue: string) => {
    if (Array.isArray(value)) return value.includes(optionValue);
    return value === optionValue;
  };

  const isMulti = question.type === "multi";
  const currentSelections = Array.isArray(value) ? value.length : 0;

  return (
    <div className="w-full">
      <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
        {question.title}
      </h2>
      <p className="mb-6 text-sm text-gray-400">
        {question.subtitle}
        {isMulti && question.maxSelections && (
          <span className="ml-1 text-shield-400">
            ({currentSelections}/{question.maxSelections} selected)
          </span>
        )}
      </p>

      {/* Search input for searchable questions */}
      {question.type === "search" && (
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your role..."
            className="w-full rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-shield-600 focus:ring-1 focus:ring-shield-600/30"
          />
        </div>
      )}

      {/* Options grid */}
      <div
        className={`grid gap-2 ${
          question.type === "single" && question.options.length <= 4
            ? "grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {filteredOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              isMulti
                ? handleMultiSelect(option.value)
                : handleSingleSelect(option.value)
            }
            className={`quiz-option ${
              isSelected(option.value) ? "quiz-option-selected" : ""
            } ${
              isMulti &&
              question.maxSelections &&
              currentSelections >= question.maxSelections &&
              !isSelected(option.value)
                ? "cursor-not-allowed opacity-40"
                : ""
            }`}
          >
            {/* Selection indicator */}
            <span
              className={`mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-${
                isMulti ? "md" : "full"
              } border-2 transition-colors ${
                isSelected(option.value)
                  ? "border-shield-500 bg-shield-500"
                  : "border-gray-600"
              }`}
            >
              {isSelected(option.value) && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            {option.label}
          </button>
        ))}
      </div>

      {filteredOptions.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          No roles found. Try a different search term.
        </p>
      )}
    </div>
  );
}
