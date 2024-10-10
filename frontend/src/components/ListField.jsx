import React from "react";

const ListField = ({label, arr}) => {
  return (
    <div>
      <h2 className="font-semibold mb-1">{label}</h2>
      <div className="flex gap-3 flex-wrap">
        {arr.map((i) => (
          <span className="p-2 rounded-full font-semibold bg-ray-200">{i}</span>
        ))}
      </div>
    </div>
  );
};

export default ListField;
