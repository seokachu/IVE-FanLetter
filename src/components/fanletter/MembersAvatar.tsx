import { membersData } from "@/data/members";
import Image from "next/image";

const MembersAvatar = () => {
  return (
    <div>
      <ul>
        {membersData.map((item) => (
          <li key={item.index}>
            <Image src={item.image} alt={item.name} width={70} height={70} />
            <h3>{item.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersAvatar;
