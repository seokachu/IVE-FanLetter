import Main from "@/components/layout/Main";
import Header from "@/components/common/Header";
import QueryProvider from "@/components/layout/QueryProvider";
import Footer from "@/components/common/Footer";

const Home = () => {
  return (
    <>
      <QueryProvider>
        <Header />
        <Main />
      </QueryProvider>
      <Footer />
    </>
  );
};

export default Home;
