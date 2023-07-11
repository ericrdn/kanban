import styled from "styled-components";

export const Content = styled.div<{}>`
  display: flex;
  width: 100%;
  background-color: #ffffff;
  height: 100vh;
  flex-direction: column;
`;

export const Title = styled.div<{}>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Card = styled.div<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #fffdfd;
  margin: 5px;
  border: 1px;
  border-style: solid;
  border-color: #b2b2b2;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19) !important;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: #f0eeee;
  }
`;

export const Column = styled.div<{}>`
  display: flex;
  justify-content: center;
  background-color: rgb(247, 248, 249);
  width: 30vw;
  margin: 10px;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
`;

export const ScrollArea = styled.div<{}>`
  height: 90vh;
  overflow: auto;
`;

export const TitleGroup = styled.div<{}>`
  height: 30px;
  align-items: center;
  background-color: rgb(247, 248, 249);
  margin: 10px;
  display: flex;
  padding: 5px;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
`;
