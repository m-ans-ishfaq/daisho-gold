"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      contentRefs.current[activeIndex]?.style.setProperty('max-height', `${contentRefs.current[activeIndex]?.scrollHeight}px`);
    }
  }, [activeIndex]);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="mb-2 border-b">
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            onClick={() => handleToggle(index)}
          >
            <span className="text-left font-medium">{item.question}</span>
            <FaChevronDown
              className={`transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          <div
            ref={(el) => { contentRefs.current[index] = el; }}
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
              activeIndex === index ? 'max-h-screen' : 'max-h-0'
            }`}
            style={{ maxHeight: activeIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px' }}
          >
            <p className="p-4">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
