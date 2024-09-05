import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Main from "@/components/layout/Main";
import QueryProvider from "@/components/layout/QueryProvider";

const Home = () => {
  return (
    <QueryProvider>
      <Header />
      <Main />
      <Footer />
    </QueryProvider>
  );
};

export default Home;
