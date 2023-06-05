import React, { useEffect, useState, useRef } from "react";
import {
  BoardWrapper,
  Button,
  Container,
  FlexBetween,
  FlexBetweenStart,
  FlexColumn,
  HeaderWrapper,
  IMG,
  Indicators,
  MinesInput,
  Section,
  Text,
} from "./MinesWeeper.style";
import { images } from "./images";

let minesLocation = []; //the coordination of row and column

let sectionClicked = [];

const rows = 8;
const columns = 8;

export function MinesWeeper() {
  const [flag, setFlag] = useState(false);
  const [rowsValue, setRowsValue] = useState([]);
  const [gameState, setGameState] = useState({ lost: false, won: false }); //To prevent the player of clicking of any other Spots
  const [minesCount, setMinesCount] = useState(5);
  const [minesApplied, setMinesApplied] = useState(5);
  const [resultMessage, setResultMessage] = useState("");
  const [smileState, setSmileState] = useState(images.smile);

  const isDirty = useRef(minesApplied);

  function handleHasChanges() {
    if (isDirty.current !== minesApplied) {
      return true;
    }

    return false;
  }

  function handleChangeMines() {
    if (minesCount > 0 && minesCount <= 20) {
      setMinesApplied(minesCount);
    } else if (minesCount === 0) {
      alert("Please apply at least 1 mine!");
    } else if (minesCount > 20) {
      alert("Sorry, You can't apply more than 20 mines!");
    }
  }

  function setMines() {
    let coords = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let location = r.toString() + "-" + c.toString();

        coords.push(location);
      }
    }

    for (let i = 0; i < minesApplied; i++) {
      const randomCoords = Math.floor(Math.random() * coords.length);

      minesLocation.push(coords[randomCoords.toString()]);
    }
  }

  function containsDuplicates(array) {
    if (array.length !== new Set(array).size) {
      newGame();
    }

    return false;
  }

  function newGame() {
    let row = [];
    isDirty.current = minesApplied;

    setGameState({ lost: false, won: false });
    setSmileState(images.smile);
    setFlag(false);
    minesLocation = [];
    setResultMessage("");
    setMines();
    containsDuplicates(minesLocation);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let location = {
          location: r.toString() + "-" + c.toString(),
          flag: false,
          mine: false,
        };

        if (minesLocation.includes(r.toString() + "-" + c.toString())) {
          location.mine = true;
        }

        row.push(location);
      }
    }

    setRowsValue(row);
  }

  useEffect(() => {
    newGame();
  }, []);

  function onClickSection(sectionData, index) {
    setSmileState(images.sad);
    const newRowValue = [...rowsValue];

    sectionClicked.push(sectionData.location);

    if (flag) {
      if (!sectionData.flag) {
        newRowValue[index] = {
          ...sectionData,
          flag: true,
        };
      } else {
        newRowValue[index] = {
          ...sectionData,
          flag: false,
        };
      }
    } else {
      if (minesLocation.includes(sectionData.location)) {
        newRowValue[index] = {
          ...sectionData,
          flag: false,
          isExploded: true,
        };
        setGameState({ lost: true, won: false });
        setSmileState(images.gameOver);
        setResultMessage("GAME OVER");
      } else {
        setTimeout(() => {
          if (!gameState.lost) {
            setSmileState(images.smile);
          }
        }, 200);
      }
    }

    const coords = sectionData.location.split("-");
    const rowCoords = parseInt(coords[0]);
    const columnCoords = parseInt(coords[1]);

    handleCheckMine(rowCoords, columnCoords, index, sectionData, newRowValue);

    const flagCoords = [];
    const flagsApplied = [];

    newRowValue.forEach((data) => {
      if (data.flag) {
        data.mine &&
          flagCoords.push({ location: data.location, mine: data.mine });
        flagsApplied.push(data.flag);
      }

      if (
        flagCoords.length !== 0 &&
        flagCoords.length === parseInt(minesApplied) &&
        flagsApplied.length === parseInt(minesApplied)
      ) {
        setResultMessage("Congrats! you won!");
        setGameState({ lost: false, won: true });
        setSmileState(images.cool);
      }
    });

    setRowsValue(newRowValue);
  }

  function handleCheckMine(
    rowCoords,
    columnCoords,
    index,
    sectionData,
    newRowValue
  ) {
    if (
      rowCoords < 0 ||
      rowCoords >= rows ||
      columnCoords < 0 ||
      columnCoords >= columns
    ) {
      return;
    }

    let minesFound = 0;

    //TOP
    minesFound += checkLocation(rowCoords - 1, columnCoords - 1); //top left
    minesFound += checkLocation(rowCoords - 1, columnCoords); //top
    minesFound += checkLocation(rowCoords - 1, columnCoords + 1); //top right

    //BOTTOM
    minesFound += checkLocation(rowCoords + 1, columnCoords - 1); //bottom left
    minesFound += checkLocation(rowCoords + 1, columnCoords); //bottom
    minesFound += checkLocation(rowCoords + 1, columnCoords + 1); //bottom right

    //LEFT
    minesFound += checkLocation(rowCoords, columnCoords - 1);

    //RIGHT
    minesFound += checkLocation(rowCoords, columnCoords + 1);

    if (minesFound > 0 && !flag && !sectionData.mine) {
      newRowValue[index] = {
        ...sectionData,
        minesNearby: minesFound,
      };
    } else if (
      !flag &&
      !sectionData.mine &&
      !gameState.lost &&
      minesFound === 0
    ) {
      newRowValue[index] = {
        ...sectionData,
        emptySections: true,
      };
    }

    setRowsValue(newRowValue);
  }

  function checkLocation(rowCoords, columnCoords) {
    if (
      rowCoords < 0 ||
      rowCoords >= rows ||
      columnCoords < 0 ||
      columnCoords >= columns
    ) {
      return 0;
    }

    if (
      minesLocation.includes(
        rowCoords.toString() + "-" + columnCoords.toString()
      )
    ) {
      return 1;
    }
    return 0;
  }

  function handleContainsFlag(data) {
    if (flag) {
      return true;
    } else if (!flag && data.flag) {
      return false;
    }

    return true;
  }

  return (
    <Container>
      <FlexColumn>
        <h2>Minesweeper</h2>
        <FlexBetweenStart>
          <HeaderWrapper type={"input"}>
            <FlexColumn>
              <Text>Number of mines</Text>

              <FlexBetween>
                <MinesInput
                  value={minesCount}
                  onChange={(e) => setMinesCount(e.target.value)}
                  type="number"
                />
                <Button onClick={() => handleChangeMines()} type="input">
                  Apply
                </Button>
              </FlexBetween>
            </FlexColumn>
          </HeaderWrapper>

          <HeaderWrapper>
            <FlexColumn>
              <Text type={gameState.lost ? "gameOver" : "won"}>
                {resultMessage}
              </Text>
              <IMG onClick={() => setFlag(!flag)} src={smileState} />
            </FlexColumn>
          </HeaderWrapper>

          <HeaderWrapper type={"mines"}>
            <Text>Mines: </Text> <Text type={"mines"}>{minesApplied}</Text>
          </HeaderWrapper>
        </FlexBetweenStart>

        <BoardWrapper>
          {rowsValue.map((data, index) => {
            return (
              <Section
                indicatorNumber={data.minesNearby}
                isEmpty={data.emptySections}
                isExploded={gameState.lost && data.isExploded && data.mine}
                onClick={() =>
                  !gameState.lost && !gameState.won && handleContainsFlag(data)
                    ? onClickSection(data, index)
                    : {}
                }
                key={index}
              >
                {data.flag && (
                  //&& gameState.lost && !data.isExploded &&
                  <IMG src={images.flag} />
                )}

                {gameState.lost && data.mine && <IMG src={images.mine} />}

                {data.minesNearby ? (
                  <Indicators indicatorNumber={data.minesNearby}>
                    {data.minesNearby}
                  </Indicators>
                ) : (
                  <></>
                )}
              </Section>
            );
          })}
        </BoardWrapper>
        <FlexBetween>
          <Button flag={flag} onClick={() => setFlag(!flag)}>
            <IMG onClick={() => setFlag(!flag)} src={images.flag} />
          </Button>

          <Button hasChanges={handleHasChanges()} onClick={() => newGame()}>
            New game
          </Button>
        </FlexBetween>
      </FlexColumn>
    </Container>
  );
}
