"use client";

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Todos from './Todos';

// 필터 옵션 정의
const filterOptions = [
  { id: 1, name: '전체', value: null },
  { id: 2, name: '완료', value: true },
  { id: 3, name: '미완료', value: false },
];

const FilteredTodoList = () => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  return (
    <>
      <div className="max-w-md mx-auto mb-4 z-10 relative flex justify-end">
        <Listbox value={selectedFilter} onChange={setSelectedFilter}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-24 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-[#3C3C43] focus:outline-none focus:ring-1 focus:ring-[#3C3C43] sm:text-sm">
              <span className="block truncate text-[#3C3C43]">{selectedFilter.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="text-gray-400">▼</span>
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-1 w-24 overflow-auto rounded-md bg-white py-1 text-base shadow-lg border border-gray-300 focus:outline-none sm:text-sm">
                {filterOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${
                        active ? 'bg-[#F67373] text-white' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              selected ? 'text-white' : 'text-[#3C3C43]'
                            }`}
                          >
                            <span>✓</span>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <Todos filter={selectedFilter.value} />
    </>
  );
};

export default FilteredTodoList; 