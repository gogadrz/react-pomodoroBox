import { DefaultTheme } from "styled-components";
import { ITheme, ThemeEnum } from "../models/ITheme";

export const baseTheme: ITheme = {
  colors: {
    primary: "#333",
    mutted: "#999",
    invers: "#fff",
    button: "#c4c4c4",
  },
  bgColors: {
    primary: "#fff",
    secondary: "#f4f4f4",
    third: "#c4c4c4",
  },
  shadow: {
    boxShadow: "0 10px 63px #00000012",
  },
  status: {
    idle: "black",
    paused: "yellow",
    running: "blue",
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.light,

  colors: {
    ...baseTheme.colors,
    primary: "#333",
    mutted: "#999",
    invers: "#fff",
    button: "#c4c4c4",
  },
  bgColors: {
    primary: "#fff",
    secondary: "#f4f4f4",
    third: "#c4c4c4",
  },
  shadow: {
    boxShadow: "0 10px 63px #00000012",
  },
  status: {
    idle: "black",
    paused: "yellow",
    running: "blue",
  },
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.dark,

  colors: {
    ...baseTheme.colors,
    primary: "#f4f4f4",
    mutted: "#999",
    invers: "#fff",
    button: "#c4c4c4",
  },
  bgColors: {
    primary: "#141414",
    secondary: "#777",
    third: "#555",
  },
  shadow: {
    boxShadow: "0 10px 63px #fff3",
  },
  status: {
    idle: "red",
    paused: "brown",
    running: "tomato",
  },
};
