import styled from "styled-components";
import {
  BsFillPlayFill,
  BsPauseFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsShuffle,
} from "react-icons/bs";

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TitleSearchWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const PageTitle = styled.h1`
  font-size: 5rem;

  @media (max-width: 650px) {
    margin-bottom: 2rem;
  }
`;

export const SearchBar = styled.input`
  font-size: 2rem;

  padding: 0.5rem 3rem;
  outline: 0;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

export const MusicList = styled.ul`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MusicItem = styled.li`
  width: 100rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  margin: 2rem 0;
  border-bottom: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 1010px) {
    width: calc(100% - 2rem);
  }
`;

export const Icon = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;

export const Text = styled.div`
  width: 50rem;
  margin: 0 3rem;

  text-align: center;
`;

export const SongTitle = styled.a`
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Artist = styled.h3`
  font-size: 1.5rem;
  font-weight: lighter;
  color: #0000008e;
`;

export const PlayButton = styled.button`
  width: min-content;
  background-color: transparent;
  border: none;

  cursor: pointer;
`;

export const PauseIcon = styled(BsPauseFill)`
  color: black;
  font-size: 2.8rem;
`;

export const PlayIcon = styled(BsFillPlayFill)`
  color: black;
  font-size: 2.8rem;
`;

export const PageButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CurrentPageNumber = styled.h2`
  margin: 0 4rem;
  font-size: 3rem;
`;

export const ChangePageButton = styled.button`
  width: 6rem;
  height: 6rem;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;

  font-size: 4rem;
  font-weight: bolder;
  text-align: center;
  color: grey;

  cursor: pointer;
  transition: color 300ms, transform 300ms;

  &:hover {
    transform: scale(1.2);
    color: black;
  }
`;

export const MusicRunningWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  border-bottom: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.1);

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  bottom: 0;
  position: fixed;
`;

export const p1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;
`;

export const p2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MusicRunningIcon = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;

export const MusicRunningText = styled.div`
  max-width: max-content;
  margin: 0 3rem;

  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MusicRunningTitle = styled.a`
  max-width: max-content;
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const MusicRunningArtist = styled.h3`
  max-width: 30rem;
  font-size: 1.5rem;
  font-weight: lighter;
  color: #0000008e;
`;

export const ProgressInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MusicRunningPreviousButton = styled.button`
  width: 6rem;
  height: 6rem;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;

  font-size: 4rem;
  font-weight: bolder;
  text-align: center;
  color: grey;

  cursor: pointer;
  transition: color 300ms, transform 300ms;

  &:hover {
    transform: scale(1.2);
    color: black;
  }
`;

export const MusicRunningNextButton = styled.button`
  width: 6rem;
  height: 6rem;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;

  font-size: 4rem;
  font-weight: bolder;
  text-align: center;
  color: grey;

  cursor: pointer;
  transition: color 300ms, transform 300ms;

  &:hover {
    transform: scale(1.2);
    color: black;
  }
`;

export const PreviousIcon = styled(BsFillSkipStartFill)`
  color: grey;
  font-size: 4rem;
`;

export const NextIcon = styled(BsFillSkipEndFill)`
  color: grey;
  font-size: 4rem;
`;

export const MusicRunningProgress = styled.div`
  width: 20rem;
  height: 2rem;
  background-color: #80808037;

  border-radius: 1rem;
  padding: 0.5rem;

  overflow: hidden;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  &::before {
    content: "";
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: black;

    top: 0;
    left: 0;
    position: absolute;

    transition: width 300ms;
  }
`;

export const MusicRunningTime = styled.span`
  font-size: 1.5rem;
  z-index: 99;
`;

export const MusicRunningPlayPauseButton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  background-color: transparent;

  cursor: pointer;
`;

export const MusicRunningPlayIcon = styled(BsFillPlayFill)`
  color: black;
  font-size: 2.8rem;
`;

export const MusicRunningPauseIcon = styled(BsPauseFill)`
  color: black;
  font-size: 2.8rem;
`;

export const MusicRandomize = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  background-color: transparent;

  cursor: pointer;
`;

export const MusicRandomizeIcon = styled(BsShuffle)`
  color: black;
  font-size: 2.1rem;
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
