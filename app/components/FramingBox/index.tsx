import { ReactNode } from "react";

export default function FramingBox(props) {
    return (
        <div className="border-t-35 border-b-35 border-l-40 border-r-40 border-black rounded-md shadow-custom">
            {props.children}
        </div>
    );
}