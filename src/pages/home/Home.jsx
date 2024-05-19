import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import ChartHumid from "../../components/chart/ChartHumid";
import ChartSoil from "../../components/chart/ChartSoil";
import ChartLight from "../../components/chart/ChartLight";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Chart title="Temperature" aspect={2/1} />
          <ChartHumid title="Humid" aspect={2/1} />
        </div>
        <div className="charts">
          <ChartSoil title="Soil" aspect={2/1} />
          <ChartLight title="Light" aspect={2/1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
