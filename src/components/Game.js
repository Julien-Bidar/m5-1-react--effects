import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Items from "./Items";
import cookieSrc from "../cookie.svg";
import { useState } from "react";
import useInterval from "../hooks/use-interval.hook";
import UseKeydown from "../hooks/useKeydown";
import useDocumentTitle from "../hooks/useDocumentTitle";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, firstName: true },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // done: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const title = `${numCookies} cookies - Cookie Clicker Workshop`;
  const fallbackTitle = "Cookie Clicker Workshop";
  useDocumentTitle(title, fallbackTitle);

  const handleClickButton = () => {
    setNumCookies(numCookies + 1);
  };

  UseKeydown("space", handleClickButton);

  const calculateCookiesPerTick = (object) => {
    const arrayOfValues = Object.values(object);
    let cookiesProduced =
      arrayOfValues[0] * 1 + arrayOfValues[1] * 10 + arrayOfValues[2] * 80;
    return cookiesProduced;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // Add this number of cookies to the total
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const handleClickItems = (id, cost) => {
    if (numCookies < cost) {
      window.alert("you can't afford that");
      return;
    } else {
      setNumCookies(numCookies - cost);
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
    }
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button onClick={handleClickButton}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item) => {
          const { name, cost, value, id, firstName } = item;
          return (
            <Items
              firstName={firstName}
              id={id}
              key={id}
              name={name}
              cost={cost}
              value={value}
              numOwned={purchasedItems[id]}
              handleClick={handleClickItems}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
