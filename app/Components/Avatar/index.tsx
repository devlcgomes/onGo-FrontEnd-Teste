import React from "react";
import IconAvatar from "@/assets/avatar.jpg";

const Avatar = () => {
  return (
    <div className="flex items-center gap-6">
      <img className="w-10" src={IconAvatar.src} alt="Icone Usuario" />
      <span className="text-texGray">Luciano Gomes</span>
    </div>
  );
};

export default Avatar;
