import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import starFilled from "../../assets/image/post/list/ic_star_filled.svg";
import starOutlined from "../../assets/image/post/list/ic_star_outlined.svg";

import { ReviewStatistics } from "@/types/review";

interface ReviewSummaryProps {
  stats: ReviewStatistics;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ stats }) => {
  // 없으면 에러
  if (!stats) {
    return null;
  }

  const {
    reviewAverageRating,
    totalReviewCount,
    fiveStarPercent,
    fourStarPercent,
    threeStarPercent,
    twoStarPercent,
    oneStarPercent,
    characterPercent,
    relationPercent,
    storyPercent,
  } = stats;

  const StarAxisTick: React.FC<{
    x: number;
    y: number;
    payload: { value: number };
  }> = ({ x, y, payload }) => {
    const count = payload.value;
    const iconWidth = 16.542;
    const iconHeight = 15.797;
    const totalWidth = iconWidth * 5;
    return (
      <g transform={`translate(${x - totalWidth},${y - iconHeight / 2})`}>
        {Array.from({ length: 5 }, (_, i) => (
          <image
            key={i}
            href={i < count ? starFilled : starOutlined}
            x={i * iconWidth}
            y={0}
            width={iconWidth}
            height={iconHeight}
          />
        ))}
      </g>
    );
  };

  const starIcons = Array.from({ length: 5 }, (_, i) =>
    i < reviewAverageRating ? starFilled : starOutlined
  );

  // 별점 분포 데이터: 수평 바 차트용
  const distributionData = [
    { name: 5, value: fiveStarPercent },
    { name: 4, value: fourStarPercent },
    { name: 3, value: threeStarPercent },
    { name: 2, value: twoStarPercent },
    { name: 1, value: oneStarPercent },
  ];

  // 3) full 트랙 + isMax flag 추가
  const distributionDataWithFull = distributionData.map((d) => ({
    ...d,
    full: 100,
    isMax: d.value === Math.max(...distributionData.map((d) => d.value)),
  }));

  // 특징별 데이터: 수직 바 차트용
  const featureData = [
    { name: "캐릭터가\n매력적이에요", value: characterPercent },
    { name: "관계성이\n탄탄해요", value: relationPercent },
    { name: "스토리가\n좋아요", value: storyPercent },
  ];

  const featureLookup = new Map<string, number>();
  featureData.forEach((d) => featureLookup.set(d.name, d.value));

  const featureDataWithFull = featureData.map((d) => ({
    ...d,
    full: 100,
    isMax: d.value === Math.max(...featureData.map((d) => d.value)),
  }));

  interface FeatureAxisTickProps {
    x: number;
    y: number;
    payload: {
      value: string;
      offset?: number;
    };
  }

  const FeatureAxisTick: React.FC<FeatureAxisTickProps> = ({
    x,
    y,
    payload,
  }) => {
    if (!payload.value) return null;

    const label = payload.value as string;
    const percent = featureLookup.get(label) ?? 0;
    const lines = label.split("\n");
    const lineHeight = 16;
    const isMax = featureDataWithFull.find((d) => d.name === label)?.isMax;

    return (
      <text
        x={x}
        y={y + lineHeight}
        textAnchor="middle"
        fontSize={12}
        fill="#000"
      >
        {lines.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
        <tspan x={x} dy={lineHeight} fill={isMax ? "#6A39C0" : "#000"}>
          {percent.toFixed(1)}%
        </tspan>
      </text>
    );
  };

  return (
    <div className="flex relative pt-[50px] pb-[45px] bg-white border-[3px] border-[#E2E2E2] rounded-[9px] ">
      <div className="flex flex-col items-center w-1/2">
        <p className="mb-[16px] p-medium-bold">평점</p>
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center">
            {starIcons.map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`Star ${index + 1}`}
                className="w-[20.678px] h-[19.746px]"
              />
            ))}
          </div>
          <span className="flex items-end">
            <p className="p-large-bold">{reviewAverageRating.toFixed(1)}</p>
            <p className="p-medium-regular">&nbsp;/ 5</p>
          </span>
        </div>
        <ResponsiveContainer width={303} height={160}>
          <BarChart
            data={distributionDataWithFull}
            barGap={-8}
            layout="vertical"
            margin={{ top: 10, right: 60, left: 20, bottom: 10 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={(props) => <StarAxisTick {...props} />}
              axisLine={false}
              tickLine={false}
            />
            {/* <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} /> */}
            <Bar
              dataKey="full"
              fill="#E5E5E5"
              barSize={8}
              radius={[4, 4, 4, 4]}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                content={(props: any) => {
                  const { x, y, width, value, index, height } = props;
                  const { isMax } = distributionDataWithFull[index];
                  return (
                    <text
                      x={x + width + 35 + 20}
                      y={y + height / 2 + 4} // 세로 중앙
                      fill={isMax ? "#6A39C0" : "#000"}
                      fontSize={12}
                      textAnchor="end"
                    >
                      {`${value.toFixed(1)}%`}
                    </text>
                  );
                }}
              />

              <Bar
                dataKey="value"
                fill="#6A39C0"
                barSize={8}
                radius={[4, 4, 4, 4]}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 mt-[-10px] w-[1px] h-[267px] bg-[#9E9E9E]"></div>

      <div className="flex flex-col items-center w-1/2">
        <h3 className="p-medium-regular mb-[48px]">
          이 작품은 특히{" "}
          <span className="relative p-medium-bold">
            캐릭터가 매력적이에요
            <div className="absolute right-[0px] my-[0px] w-full h-[1px] bg-[#6A39C0]" />
          </span>
        </h3>
        <ResponsiveContainer width={339} height={200}>
          <BarChart
            data={featureDataWithFull}
            barGap={-8}
            margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
          >
            <XAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={(props) => <FeatureAxisTick {...props} />}
              interval={0}
              height={60}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              hide
            />
            {/* <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} /> */}
            <Bar
              dataKey="full"
              fill="#E5E5E5"
              barSize={8}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="value"
              fill="#6A39C0"
              barSize={8}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReviewSummary;
