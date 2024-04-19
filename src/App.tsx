import "./App.css";
import { Header } from "./components/Header";
import { LeftBlock } from "./components/LeftBlock";
import { Main } from "./components/Main";
import { RightBlock } from "./components/RightBlock";
import { Navigate, Route, Routes } from "react-router-dom";
import { Statistics } from "./components/Statistics";
import { ErrorRoute } from "./components/ErrorRoute";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { ThemeEnum } from "./models/ITheme";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const theme = useSelector(
    (state: RootState) => state.pomodoros.pomodoros.theme
  );

  return (
    <ThemeProvider theme={theme === ThemeEnum.light ? lightTheme : darkTheme}>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/react-pomodoroBox"
            element={<Navigate to="/timer" replace />}
          />
          <Route path="/" element={<Navigate to="/timer" replace />} />
          <Route
            path="/timer"
            element={
              <>
                <Main>
                  <LeftBlock />
                  <RightBlock />
                </Main>
              </>
            }
          />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<ErrorRoute />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
