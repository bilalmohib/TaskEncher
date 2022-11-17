import React, { useState, useRef } from "react";
const drag = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dragItem = useRef<any>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dragOverItem = useRef<any>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [list, setList] = useState([1, 2, 3, 4, 5, 6]);
  const dragStart = (e:any, position:any) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
  const dragEnter = (e:any, position:any) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
  const drop = (e:any) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
  return (
    <>
      {list &&
        list.map((item, index) => (
          <div
            style={{
              backgroundColor: "lightblue",
              cursor: "pointer",
              margin: "20px 25%",
              textAlign: "center",
              fontSize: "40px"
            }}
            onDragStart={e => dragStart(e, index)}
            onDragEnter={e => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            draggable
          >
            {item}
          </div>
        ))}
    </>
  );
};
export default drag;
