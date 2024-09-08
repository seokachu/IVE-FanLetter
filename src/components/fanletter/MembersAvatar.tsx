import { membersData } from "@/data/members";
import {
  useSelectedActions,
  useSelectedMember,
} from "@/shared/store/MemberCheck";
import Image from "next/image";

const MembersAvatar = () => {
  const selectedMember = useSelectedMember();
  const { setSelectedMember } = useSelectedActions();

  const handleMembersAvatar = (item: string) => {
    setSelectedMember(item);
  };

  return (
    <div>
      <ul>
        {membersData.map((item) => (
          <li
            key={item.index}
            onClick={() => handleMembersAvatar(item.name)}
            className={selectedMember === item.name ? "active" : ""}
          >
            <Image src={item.image} alt={item.name} width={70} height={70} />
            <h3>{item.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersAvatar;
