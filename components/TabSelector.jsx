import { useState } from "react";
import PastAttendance from "/components/PastView";
import TodayAttendance from "/components/TodayView";

function TabSelector() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div class="max-w-3xl mx-auto px-8 sm:px-0">
      <div class="sm:w-7/12 sm:mx-auto">
        <div
          role="tablist"
          aria-label="tabs"
          class="relative w-max mx-auto h-12 grid grid-cols-2 sm:grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
        >
          <div
            class={`absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md transition-all ${
              selectedTab === 1 ? "left-0" : selectedTab === 2 ? "left-1/2" : "left-full"
            }`}
          ></div>
          <button
            role="tab"
            aria-selected={selectedTab === 1}
            aria-controls="panel-1"
            id="tab-1"
            tabindex={selectedTab === 1 ? "0" : "-1"}
            class={`relative block h-10 px-6 tab rounded-full transition-all ${
              selectedTab === 1 ? "bg-white text-gray-800 shadow-md" : "bg-gray-200 text-gray-600 hover:bg-blue-200"
            }`}
            onClick={() => handleTabChange(1)}
          >
            <span class="text-gray-800">Today</span>
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 2}
            aria-controls="panel-2"
            id="tab-2"
            tabindex={selectedTab === 2 ? "0" : "-1"}
            class={`relative block h-10 px-6 tab rounded-full transition-all ${
              selectedTab === 2 ? "bg-white text-gray-800 shadow-md" : "bg-gray-200 text-gray-600 hover:bg-blue-200"
            }`}
            onClick={() => handleTabChange(2)}
          >
            <span class="text-gray-800">Previous</span>
          </button>
        </div>
        <div class="mt-6 relative rounded-3xl bg-purple-50">
          <div
            role="tabpanel"
            id="panel-1"
            class={`tab-panel p-6 transition duration-300 ${
              selectedTab === 1 ? "opacity-100" : "opacity-0 absolute top-0 left-0 pointer-events-none"
            }`}
          >
            <TodayAttendance />
          </div>
          <div
            role="tabpanel"
            id="panel-2"
            class={`tab-panel p-6 transition duration-300 ${
              selectedTab === 2 ? "opacity-100" : "opacity-0 absolute top-0 left-0 pointer-events-none"
            }`}
          >
            <PastAttendance />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabSelector;
