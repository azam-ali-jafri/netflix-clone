import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourite from "@/hooks/useFavourite";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface Props {
  movieId: string;
}

const FavouriteButton: React.FC<Props> = ({ movieId }) => {
  const { mutate: mutateFavourite } = useFavourite();
  const { data: user, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = user?.favouriteIds || [];

    return list.includes(movieId);
  }, [user, movieId]);

  const toggleFavourite = useCallback(async () => {
    let response;

    if (isFavourite) {
      response = await axios.delete("/api/handleFavourite", { data: { movieId } });
    } else {
      response = await axios.post("/api/handleFavourite", { movieId });
    }

    const updatedFavouriteIds = response?.data?.favouriteIds;

    mutate({
      ...user,
      favouriteIds: updatedFavouriteIds,
    });

    mutateFavourite();
  }, [movieId, isFavourite, user, mutate, mutateFavourite]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavouriteButton;
