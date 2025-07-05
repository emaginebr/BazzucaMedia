import React from "react";

interface ShortLinkProps {
  url: string;
  maxLength?: number;
  copyOnClick?: boolean;
}

export const ShortLink: React.FC<ShortLinkProps> = ({ url, maxLength = 60, copyOnClick = true }) => {
  if (!url) return null;

  const shorten = (str: string, limit: number): string => {
    if (str.length <= limit) return str;
    const half = Math.floor((limit - 3) / 2);
    return str.slice(0, half) + "..." + str.slice(-half);
  };

  const handleClick = () => {
    if (copyOnClick) {
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }
  };

  return (
    <span
      onClick={handleClick}
      className="text-blue-500 hover:underline cursor-pointer select-none"
      title={url}
    >
      {shorten(url, maxLength)}
    </span>
  );
};
