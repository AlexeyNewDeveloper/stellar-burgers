import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs(props) {
    const [current, setCurrent] = React.useState("bulki");
    return (
        <div style={{ display: "flex" }} className="mb-10">
            <div style={{ outline: "1px dashed #4c4cff" }}>
                <Tab
                    value="bulki"
                    active={current === "bulki"}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
            </div>
            <div style={{ outline: "1px dashed #4c4cff" }}>
                <Tab
                    value="souces"
                    active={current === "souces"}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
            </div>
            <div style={{ outline: "1px dashed #4c4cff" }}>
                <Tab
                    value="fillings"
                    active={current === "fillings"}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
        </div>
    );
}
