import React, { useEffect, useState, useRef } from "react";
import * as S from "../styles/MusicList.styles";
import { ReactClientID, ReactClientSecret } from "../config";

const App = () => {
  const urlAuth = "https://accounts.spotify.com/api/token";
  const clientID = ReactClientID;
  const clientSecret = ReactClientSecret;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      clientID +
      "&client_secret=" +
      clientSecret,
  };

  const urlPlaylist =
    "https://api.spotify.com/v1/playlists/37i9dQZEVXbMXbN3EUUhlg";

  const [searchValue, setSearchValue] = useState("");
  const [respOptions, setRespOptions] = useState({});
  const [audioInfos, setAudioInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const audioRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [musicProgress, setMusicProgress] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);
  const [musicCurrentTime, setMusicCurrentTime] = useState(0);
  const [isMusicRunningVisible, setIsMusicRunningVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    fetch(urlAuth, options)
      .then((result) => result.json())
      .then((data) => {
        return fetch(urlPlaylist, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => setRespOptions(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (respOptions && respOptions.tracks && respOptions.tracks.items) {
      setAudioInfos([]);
      respOptions.tracks.items.map((tr) => {
        setAudioInfos((prevArr) => [
          ...prevArr,
          {
            name: tr.track.name,
            artirst: tr.track.artists.map((artist) => artist.name + "  "),
            audioFile: tr.track.preview_url,
            songCover: tr.track.album.images[0].url,
            fullSong: tr.track.external_urls.spotify,
          },
        ]);
      });
    }
  }, [respOptions]);

  useEffect(() => {
    audioRefs.current = audioInfos.map(
      (_, i) => audioRefs.current[i] ?? React.createRef()
    );
  }, [audioInfos]);

  const playAudio = (index) => {
    const audioRef = audioRefs.current[index];

    if (audioRef && audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      } else {
        audioRefs.current.forEach((ref) => {
          if (ref && ref.current && !ref.current.paused) {
            ref.current.pause();
          }
        });

        audioRef.current.play();
        setPlayingIndex(index);
        setMusicDuration(audioRef.current.duration);
      }
    }
  };

  const nextPage = () => {
    if (currentPage < 4) {
      setCurrentPage((prevPage) => prevPage + 1);
      setTimeout(() => {
        setIsMusicRunningVisible(false);
      }, 50);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
      setTimeout(() => {
        setIsMusicRunningVisible(false);
      }, 50);
    }
  };

  const musicProgressFunc = () => {
    const audioRef = audioRefs.current[playingIndex];

    if (audioRef && audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setMusicProgress(progress);
      setMusicCurrentTime(audioRef.current.currentTime);

      if (audioRef.current.currentTime === audioRef.current.duration)
        nextMusic();
    }
  };

  const changeMusicProgressOnClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.right - rect.left;
    const audioRef = audioRefs.current[playingIndex];

    if (audioRef && audioRef.current) {
      const newCurrentTime = (x / width) * audioRef.current.duration;
      audioRef.current.currentTime = newCurrentTime;
      const newProgress = (newCurrentTime / audioRef.current.duration) * 100;
      setMusicProgress(newProgress);
      setMusicCurrentTime(newCurrentTime);

      if (audioRef.current.currentTime === audioRef.current.duration)
        nextMusic();
    }
  };

  useEffect(() => {
    const interval = setInterval(musicProgressFunc, 1000);
    return () => clearInterval(interval);
  });

  const nextMusic = () => {
    if (playingIndex < audioInfos.length - 1) {
      playAudio(playingIndex + 1);
      setPlayingIndex(playingIndex + 1);
    }
  };

  const previousMusic = () => {
    if (playingIndex > 0) {
      playAudio(playingIndex - 1);
      setPlayingIndex(playingIndex - 1);
    }
  };

  const randomMusic = () => {
    const randomNumber = Math.floor(Math.random() * 50);

    if (randomNumber === playingIndex) randomMusic();

    playAudio(randomNumber);
    setPlayingIndex(randomNumber);
  };

  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsMusicRunningVisible(false);
      } else {
        setIsMusicRunningVisible(true);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      <S.Container>
        {audioInfos.map((audioInfo, idx) => {
          return (
            <audio
              ref={audioRefs.current[idx]}
              src={audioInfo.audioFile}
              key={idx}
            ></audio>
          );
        })}

        <S.TitleSearchWrapper>
          <S.PageTitle>{respOptions.name}</S.PageTitle>
          <S.SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
          />
        </S.TitleSearchWrapper>

        <S.MusicList>
          {audioInfos
            .filter(
              (audioInfo) =>
                audioInfo.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                audioInfo.artirst
                  .join("")
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            )
            .slice(currentPage * 10, currentPage * 10 + 10)
            .map((audioInfo, idx) => {
              audioInfo.index = currentPage * 10 + idx;
              return (
                <S.MusicItem key={audioInfo.index}>
                  <S.Icon src={audioInfo.songCover} />
                  <S.Text>
                    <S.SongTitle href={audioInfo.fullSong} target="_blank">
                      {audioInfo.name}
                    </S.SongTitle>
                    <S.Artist>{audioInfo.artirst}</S.Artist>
                  </S.Text>
                  <S.PlayButton
                    id={audioInfo.audioFile}
                    onClick={() => playAudio(audioInfo.index)}
                  >
                    {playingIndex === audioInfo.index ? (
                      <S.PauseIcon />
                    ) : (
                      <S.PlayIcon />
                    )}
                  </S.PlayButton>
                </S.MusicItem>
              );
            })}
        </S.MusicList>

        <S.PageButtonsWrapper>
          <S.ChangePageButton onClick={() => previousPage()}>
            &lt;
          </S.ChangePageButton>
          <S.CurrentPageNumber>{currentPage + 1}</S.CurrentPageNumber>
          <S.ChangePageButton onClick={() => nextPage()}>
            &gt;
          </S.ChangePageButton>
        </S.PageButtonsWrapper>
      </S.Container>

      {isMusicRunningVisible && (
        <S.MusicRunningWrapper>
          <S.p1>
            <S.MusicRunningIcon src={audioInfos[playingIndex]?.songCover} />

            <S.MusicRunningText>
              <S.MusicRunningTitle
                href={audioInfos[playingIndex]?.fullSong}
                target="_blank"
              >
                {audioInfos[playingIndex]?.name}
              </S.MusicRunningTitle>
              <S.MusicRunningArtist>
                {audioInfos[playingIndex]?.artirst}
              </S.MusicRunningArtist>
            </S.MusicRunningText>
          </S.p1>

          <S.p2>
            <S.MusicRunningPreviousButton onClick={() => previousMusic()}>
              <S.PreviousIcon />
            </S.MusicRunningPreviousButton>

            <S.ProgressInfos>
              <S.MusicRunningProgress
                progress={musicProgress}
                onClick={changeMusicProgressOnClick}
              >
                <S.MusicRunningTime>
                  {musicCurrentTime > 9
                    ? musicCurrentTime.toFixed(0)
                    : "0" + musicCurrentTime.toFixed(0)}
                </S.MusicRunningTime>
                <S.MusicRunningTime>
                  {musicDuration > 9
                    ? musicDuration.toFixed(0)
                    : "0" + musicDuration.toFixed(0)}
                </S.MusicRunningTime>
              </S.MusicRunningProgress>

              <S.CenteredDiv>
                <S.MusicRunningPlayPauseButton
                  onClick={() =>
                    audioRefs.current[playingIndex]?.current?.paused
                      ? audioRefs.current[playingIndex]?.current?.play()
                      : audioRefs.current[playingIndex]?.current?.pause()
                  }
                >
                  {audioRefs.current[playingIndex]?.current?.paused ? (
                    <S.MusicRunningPlayIcon />
                  ) : (
                    <S.MusicRunningPauseIcon />
                  )}
                </S.MusicRunningPlayPauseButton>

                <S.MusicRandomize onClick={() => randomMusic()}>
                  <S.MusicRandomizeIcon />
                </S.MusicRandomize>
              </S.CenteredDiv>
            </S.ProgressInfos>

            <S.MusicRunningNextButton onClick={() => nextMusic()}>
              <S.NextIcon />
            </S.MusicRunningNextButton>
          </S.p2>
        </S.MusicRunningWrapper>
      )}
    </>
  );
};

export default App;
