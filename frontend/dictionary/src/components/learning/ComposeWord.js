import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: "center",
        padding: theme.spacing(3),  
    },
    wordsField: {
        marginTop: "50px",
        marginLeft: "10%",
        minWidth: "80%",
        fontSize: "xxx-large",
        display: "flex",
        justifyContent: "left",
        overflow: 'hidden',
        border: "3px solid #82b1ff",
        borderRadius: "10px",
        height: "84px",
        padding: "1px 20px"
    },
    dumpField: {
        marginTop: "20px",
        marginLeft: "10%",
        minWidth: "80%",
        fontSize: "xxx-large",
        display: "flex",
        justifyContent: "center",
        overflow: 'hidden',
        height: "84px",
        padding: "1px"
    },
    word: {
        flexBasis: "100px",
        backgroundColor: "#eef0f0",
        border: "0 solid gray",
        borderRadius: "15%",
        margin: "1px",
        height: "75px"
    },
    wordCorrect: {
        flexBasis: "100px",
        backgroundColor: "#bdfe65",
        border: "0 solid gray",
        borderRadius: "15%",
        margin: "1px",
        height: "75px",
    },
    alert: {
        fontWeight: "bold",
        fontSize: "large",
        textAlign: "center",
    }
  }));

export default function ComposeWord(props) {
    const onDone = props.onDone;
    const classes = useStyles();
    const [aries, setAries] = useState({d:[], t:[]})
    const [done, setDone] = useState(false);
    const [word, setWord] = useState(props.word);
    const [count, setCount] = useState(props.count);

    console.log(props.word+' : '+props.count);

    if (props.word && (word !== props.word || props.count !== count)) {
        console.log(props.count);
        setDone(false);
        setWord(props.word);
        if (!props.count) {
            setCount(0)
        }
        setCount(props.count);
        setAries({d:[...randomWords(props.word)], t:[]});
    }

    const getWordStyle = () => {
        if (done) {
            return classes.wordCorrect
        }
        return classes.word
        
    }
    
    const getAlert = () => {
        if (done) {
            return <Alert severity="success">
                <span className={classes.alert}>
                    Все верно! Молодец! :)
                </span>
            </Alert>
        }
        return <Alert severity="info">
            <span className={classes.alert}>
                Перетяни буквы вверх чтобы получилось правильное слово
            </span>
        </Alert>
    }
    
    useEffect(() => {
        setAries({d:randomWords(word),t: []});
    },[])
    
    const targetArea = () => {
        return getAreaItems("target", aries.t)
    }

    const dumpArea = () => {
        return getAreaItems("dump", aries.d)
    }
    
    const getAreaItems = (areaName, areaItems) => {
        let data = [];
        areaItems.forEach((w,n) => {
            data.push(
                <Draggable draggableId={areaName+'-'+n.toString()} index={n} key={areaName+'-'+n.toString()+'-draggable'}>
                    {(provided) => (
                        <div className={getWordStyle()} 
                            ref={provided.innerRef} 
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={areaName+'-'+n.toString()+'-div'}
                        >
                            {w}
                        </div>
                    )}
                </Draggable>
            )
        })
        return data
    }

    const doMove = (r) => {
        const {source, destination} = r;

        if (!destination) {
            return false
        }

        let areaTarget = aries.t;
        let areaDump = aries.d;
        
        switch (destination.droppableId) {
            case "dump": {
                if (source.droppableId === "dump") {
                    moveToArea(areaDump, source.index, areaDump, destination.index)
                } else {
                    moveToArea(areaTarget, source.index, areaDump, destination.index)
                }
                break;
            }
            case "target": {
                if (source.droppableId === "target") {
                    moveToArea(areaTarget, source.index, areaTarget, destination.index)
                } else {
                    moveToArea(areaDump, source.index, areaTarget, destination.index)
                }
                break;
            }
            default: {
                return false
            }
        }
        setAries({d:areaDump, t:areaTarget})

        if (aries.t.join('') === word) {
            setDone(true);
            setTimeout(() => {
                onDone();
            }, 2000)
        }
    }

    return (
        <DragDropContext onDragEnd={doMove}>
            <Paper elevation={3} className={classes.paper}>
                    <div style={{width: "100%"}}>{getAlert()}</div>
                    <Droppable droppableId="target" direction="horizontal" key="target">
                        {(provided) =>(
                            <div className={classes.wordsField} 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                key="target-div"
                            >
                                {targetArea()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="dump" direction="horizontal" key="dump">
                        {(provided)=>(
                            <div className={classes.dumpField} 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                key="dump-div"
                            >
                                {dumpArea()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            </Paper>
        </DragDropContext>
    );
}

function randomWords(word) {
    word = [...word];
    let charSet = [];
    while (word.length > 0) {
        charSet.push(word.splice(word.length * Math.random() << 0,1));
    }
    
    return charSet;
}

function moveToArea(arrFrom, fromIndex, arrTo, toIndex) {
    var element = arrFrom[fromIndex];
    arrFrom.splice(fromIndex, 1);
    arrTo.splice(toIndex, 0, element);
}