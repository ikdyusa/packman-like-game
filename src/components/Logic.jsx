import { useState, useEffect, useRef } from "react";
import GridLayout from "./GridLayout";
import './logic.css'

function Logic() {
    const [layout, setLayout] = useState(GridLayout())
    const [points, setPoints] = useState(1000)
    const ref = useRef(null);
    let indexOfArray
    let indexOfElement
    let oldValue
    function upHandler() {
        return setLayout(prev => {
            prev.forEach((x, y) => {
                x.forEach((a, b) => {
                    if (a === 4) {
                        indexOfArray = y
                        indexOfElement = b
                    }
                })
            })
            return prev.map((x, y) => {
                    if (indexOfArray-1 === -1) return x
                    if (indexOfArray-1 === y ) {
                        oldValue = x[indexOfElement]
                        if (oldValue === 0) return x
                        x.splice(indexOfElement, 1, 4)
                    }
                    if (indexOfArray === y ){
                        if (oldValue === 0) return x
                        if (oldValue === 2 || oldValue === 3) {
                            x.splice(indexOfElement, 1, 1)
                            oldValue === 2? setPoints(prev => prev + 30): setPoints(prev => "You Win!!")
                            return x   
                        }
                        setPoints(prev => prev - 10)
                        x.splice(indexOfElement, 1, oldValue)
                        return x
                    }
                    return x
                })
            })
        }
    
    function leftHandler() {
        return setLayout(prev => {
            return prev.map(x => {
                const four = x.indexOf(4)
                if ( four === -1) return x
                if (x[four] === x[0]) return x
                if (x[four-1] === 0) return x
                if (x[four-1] === 2 || x[four-1] === 3) {
                    x[four-1] === 2? setPoints(prev => prev + 30): setPoints(prev => "You Win!!")
                    x.splice(four, 1 , 1)
                    x.splice(four - 1, 1, 4)
                    return x
                }
                setPoints(prev => prev - 10)
                x.splice(four, 1 , x[four - 1])
                x.splice(four - 1, 1, 4)
                return x
            })
            
        })
    }
    
    function rightHandler() {
        return setLayout(prev => {
            return prev.map(x => {
                const four = x.indexOf(4)
                if ( four === -1) return x
                if (x[four] === x[x.length-1]) return x
                if (x[four+1] === 0) return x
                if (x[four+1] === 2 || x[four+1] === 3) {
                    x[four+1] === 2? setPoints(prev => prev + 30): setPoints(prev => "You Win!!")
                    x.splice(four, 1 , 1)
                    x.splice(four + 1, 1, 4)
                    return x
                }
                setPoints(prev => prev - 10)
                x.splice(four, 1 , x[four + 1])
                x.splice(four + 1, 1, 4)
                return x
            })
            
        })
    }
    
    function downHandler() {
        return setLayout(prev => {
            prev.reverse().forEach((x, y) => {
                x.forEach((a, b) => {
                    if (a === 4) {
                        indexOfArray = y
                        indexOfElement = b
                    }
                })
            })
            return prev.map((x, y) => {
                    if (indexOfArray-1 === -1) return x
                    if (indexOfArray-1 === y ) {
                        oldValue = x[indexOfElement]
                        if (oldValue === 0) return x
                        x.splice(indexOfElement, 1, 4)
                    }
                    if (indexOfArray === y ){
                        if (oldValue === 0) return x
                        if (oldValue === 2 || oldValue === 3) {
                            oldValue === 2? setPoints(prev => prev + 30): setPoints(prev => "You Win!!")
                            x.splice(indexOfElement, 1, 1)
                            return x   
                        }
                        setPoints(prev => prev - 10)
                        x.splice(indexOfElement, 1, oldValue)
                        return x
                    }
                    return x
                }).reverse()
            })
    }

    function keyDownHandler(e) {

        switch(e.key.toLowerCase()) {
            case "w":
            case 'arrowup':
                return upHandler()
            case "a":
            case 'arrowleft':
                return leftHandler()
            case "d":
            case 'arrowright':
                return rightHandler()
            case "s":
            case 'arrowdown':
                return downHandler()
            default:
                return e.key
        }
    }
    function windowClickHandler() {
        ref.current.focus()
        return
    }
    
    useEffect(() => {
        window.addEventListener("click", windowClickHandler)
        return () => window.removeEventListener("click", windowClickHandler)
    }, [windowClickHandler])

    useEffect(() => {
        ref.current.focus()
    }, [])
    
    return (
        <>
        <div className="game">
            <div className="game-container">
                <div className="game-score-board">
                    <a href="/" className="title">flatman</a>
                    <p>{typeof points === "number"?
                        (points <= 0)?'YOU LOSE!!':`Score ${points}`: points}</p>
                </div>
                <div className="game-board">
                    <table>
                        <tbody>
                            {layout.map((x, y) => <tr key={y}>
                                {x.map((a, b) => <td data-layout-number={a} key={b + 100}></td>)}
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="game-controller" ref={ref} tabIndex={-1} onKeyDown={keyDownHandler}>
                    <button type="button" onClick={upHandler}>&#8593;</button>
                    <br />
                    <button type="button" onClick={leftHandler}>&#8592;</button>
                    <button className="layout">&#8594;</button>
                    <button type="button" onClick={rightHandler}>&#8594;</button>
                    <br />
                    <button type="button" onClick={downHandler}>&#8595;</button>
                </div>
            </div>
        </div>
        
        </>
    )
}




export default Logic