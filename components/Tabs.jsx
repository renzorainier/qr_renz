import { useState } from "react";
import PastAttendance from "/components/PastView";
import TodayAttendance from "/components/TodayView";
import { Transition } from "@headlessui/react";

function TabSelector() {
  const [selectedTab, setSelectedTab] = useState("a");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center pt-8 space-x-5 mb-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedTab === "a" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-blue-200 transition duration-500 ease-in-out"
          }`}
          onClick={() => handleTabChange("a")}
        >
          Today
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedTab === "b" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-blue-200 transition duration-500 ease-in-out"
          }`}
          onClick={() => handleTabChange("b")}
        >
          Previous
        </button>
      </div>
      <div className={`${selectedTab === "a" ? "block" : "hidden-component"}`}>
        <Transition
          show={selectedTab === "a"}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <TodayAttendance />
        </Transition>
      </div>
      <div className={`${selectedTab === "b" ? "block" : "hidden-component"}`}>
        <Transition
          show={selectedTab === "b"}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PastAttendance />
        </Transition>
      </div>
    </div>
  );
}

export default TabSelector;
