import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import CustomerServiceChart from "./TotalUserChart";
import RevenueAnalysis from "./RevenueAnalysis";
import TinyChart from "./TinyChart";
import TotalUserChart from "./TotalUserChart";
dayjs.extend(customParseFormat);

const stats = [
  {
    label: "Total Post",
    value: "3765",
    percent: +2.6,
    color: "#00a76f",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
  {
    label: "Active Users",
    value: "3765",
    percent: +2.6,
    color: "#00b8d9",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
  {
    label: "Total Revenue",
    value: "3765",
    percent: +2.6,
    color: "#18a0fb",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
];

export const Card = ({ item }) => {
  return (
    <div
      className={`flex w-full items-center justify-evenly h-32 rounded-xl bg-white gap-10 ${item.bg}`}
    >
      <div className="h-[80%] py-1.5 flex flex-col items-start justify-between">
        <p className="text-base">{item.label}</p>
        <p className="text-[30px] font-extrabold">{item.value}</p>
        {item.percent > 0 ? (
          <p>
            <span className="text-green-400 flex gap-2">
              {item.icon[0]}% last 7 days
            </span>
          </p>
        ) : (
          <p>
            <span className="text-red-400 flex gap-2">
              {item.icon[1]}% last 7 days
            </span>
          </p>
        )}
      </div>
      <div className="h-[60%] flex items-center justify-end  w-20 ">
        <TinyChart color={item.color} />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="">
      <div className="flex flex-col flex-wrap items-end gap-5 justify-between w-full bg-transparent rounded-md">
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 w-full">
          {stats.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="w-full h-[330px]  bg-white rounded-lg mt-4 relative flex flex-col justify-evenly">
        <TotalUserChart />
      </div>
      <div className="w-full h-[300px] mt-4 flex items-center justify-between bg-transparent rounded-lg">
        <RevenueAnalysis />
      </div>
    </div>
  );
};

export default Home;
