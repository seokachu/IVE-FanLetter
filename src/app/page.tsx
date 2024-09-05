import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
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
