import GoTopButton from "@/utils/GoTopButton";
import LetterForm from "../fanletter/LetterForm";
import LetterList from "../fanletter/LetterList";
import MainTitle from "../fanletter/MainTitle";
import S from "@/styles/common.module.scss";

const Main = () => {
  return (
    <main className={S.main}>
      <MainTitle />
      <LetterForm />
      <LetterList />
      <GoTopButton />
    </main>
  );
};

export default Main;
