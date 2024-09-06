import { LetterProps } from "@/types";

const LetterItems = ({ item }: LetterProps) => {
  const { createAt, title, content, writeTo, avatar } = item;
  return (
    <div>
      <h3>To{writeTo}</h3>
      <p>{avatar}</p>
      <p>{title}</p>
      <p>{content}</p>
      <time>{createAt}</time>
    </div>
  );
};

export default LetterItems;
