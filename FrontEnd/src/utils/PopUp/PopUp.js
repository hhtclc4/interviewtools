import React, { useEffect, useState, useRef } from "react";
import './PopUp.scss'

const PopUp = ({ children, openPop }) => {

    const node = useRef();
    const [open, setOpen] = useState(true);
    let popUpClickHandler = (e) => {
        // console.log("click inside");
        if (node.current.contains(e.target)) {
            return;
        }

        //outside click
        // console.log("click outside")
        setOpen(false);
        openPop(open);
    }
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", popUpClickHandler);
        } else {
            document.removeEventListener("mousedown", popUpClickHandler);
        }
        return () => {
            document.removeEventListener("mousedown", popUpClickHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        < div className="util-popup-container" >
            <div className={open ? "util-popup-inner" : "util-popup-inner popup-exit"} ref={node}
                style={open ? { animation: 'animatebottomSetPopUp 0.4s ease' } : { animation: 'animatebottomDisappearPopUp both 0.4s ease' }}
            >
                {children}
            </div>
        </div >
    );


}


export default PopUp;