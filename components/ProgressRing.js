import { Dimensions } from "react-native";
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import React from 'react';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get("window").width;

// each value represents a goal ring in Progress chart
const data = {
    labels: ["Beginner", "Inter", "Advanced"], // optional
    data: [0.4, 0.6, 0.8]
  };

const chartConfig = {
backgroundGradientFrom: "#1E2923",
backgroundGradientFromOpacity: 0,
backgroundGradientTo: "#08130D",
backgroundGradientToOpacity: 0.9,
color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
strokeWidth: 2, // optional, default 3
barPercentage: 0.5,
useShadowColorFromDataset: false // optional
};


const ProgressRing = () => (

  <ProgressChart
  data={data}
  width={screenWidth}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
/>
  );

export default ProgressRing;