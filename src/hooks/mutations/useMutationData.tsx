import { deleteLetter, patchLetter } from "@/lib/api/letter";
import { Letters } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMutationData = () => {
  const queryClient = useQueryClient();

  //letters 삭제 query
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => deleteLetter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  //letters 수정 query
  const { mutate: editMutate } = useMutation({
    mutationFn: async (letter: Letters) =>
      await patchLetter(letter.id, {
        id: letter.id,
        title: letter.title,
        content: letter.content,
        writeTo: letter.writeTo,
        nickname: letter.nickname,
        avatar: letter.avatar,
        createdAt: letter.createdAt,
        userId: letter.userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  return { deleteMutate, editMutate };
};

export default useMutationData;
