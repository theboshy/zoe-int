import React, { useEffect, useState } from "react";
import { MarkableBox } from "../components/markable.box";

export function TicTacView(props: any) {
    let gameSize = props.size;
    const [gameMatrix, setGameMatrix] = useState([[""]]);
    const [mark, setMark] = useState("X");

    function boxClicked(position: any) {
        if (gameMatrix[position[0]][position[1]] === null) {
            gameMatrix[position[0]][position[1]] = mark;
            setGameMatrix(gameMatrix);
            if (mark === "X") {
                setMark("O");
            } else {
                setMark("X");
            }
        }
    }

   async function someStuff(params: any) {
       
   }

    useEffect(() => {
        let gameMatrix = Array(gameSize).fill(null).map(row => new Array(gameSize).fill(null));
        setGameMatrix(gameMatrix);
    }, []);

    const getTiTacBoxes = () => {
        let gameView;
        gameView = gameMatrix.map((items, i) => {
            return (
                <tr id={i.toString()} key={i.toString()}>
                    {items.map((subItem, subIndex) => {
                        return (
                            <td id={subIndex.toString()} key={subIndex.toString()}>
                                <MarkableBox value={subItem} index={[i, subIndex]} onClick={boxClicked} />
                            </td>
                        );
                    })}
                </tr>
            );
        });
        return <table><tbody>{gameView}</tbody></table>;
    };

    return <div id="game">
        {getTiTacBoxes()}
    </div>;
}

