import { useState } from "react";
import GridLayout from "./GridLayout";
import './logic.css'

function Logic() {
    const [layout, setLayout] = useState(GridLayout())
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
                            return x   
                        }
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
                    x.splice(four, 1 , 1)
                    x.splice(four - 1, 1, 4)
                    return x
                }
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
                    x.splice(four, 1 , 1)
                    x.splice(four + 1, 1, 4)
                    return x
                }
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
                        console.log(oldValue)
                        if (oldValue === 0) return x
                        x.splice(indexOfElement, 1, 4)
                    }
                    if (indexOfArray === y ){
                        if (oldValue === 0) return x
                        if (oldValue === 2 || oldValue === 3) {
                            x.splice(indexOfElement, 1, 1)
                            return x   
                        }
                        x.splice(indexOfElement, 1, oldValue)
                        return x
                    }
                    return x
                }).reverse()
            })
    }


    return (
        <>
        <div className="game-container">
            <div className="game-board">
                <table>
                    <tbody>
                        {layout.map((x, y) => <tr key={y}>
                            {x.map((a, b) => <td data-layout-number={a} key={b + 100}></td>)}
                            </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="game-controller">
                <button type="button" onClick={upHandler}>Up</button>
                <br />
                <button type="button" onClick={leftHandler} >Left</button>
                <button type="button" onClick={rightHandler}>Right</button>
                <br />
                <button type="button" onClick={downHandler}>Down</button>
            </div>
        </div>
        
        </>
    )
}




export default Logic