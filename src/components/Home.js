import Nav from "./Nav";
import Header from "./Header";

const Home = () => {
  return (
    <div className="Home">
      <Header title="PNA" subTitle="Personal Note App" />;
      <Nav />
      <main></main>
    </div>
  );
};

export default Home;
