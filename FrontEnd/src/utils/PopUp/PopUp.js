import React, { useEffect, useState, useRef } from "react";
import './PopUp.scss'

const PopUp = ({ }) => {

    const node = useRef();
    const [open, setOpen] = useState(false);
    const popUpClickHandler = (e) => {
        console.log("clicking anywhere");
        if (this.node.contains(e.target)) {
            console.log("click inside")
            return;
        }

        //outside click
        console.log("click outside")
        setOpen(false);
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
    }, [open]);


    return (
        <div className="util-popup-container">
            <div className="util-popup-inner" ref={node}>
            </div>
        </div>
    );


}


export default PopUp;