import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LineChart = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='vehicles' fill='#0f5288' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChart;
