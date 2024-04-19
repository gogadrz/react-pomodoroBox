export enum ThemeEnum {
  light = "light",
  dark = "dark",
}

export interface ITheme {
  colors: {
    primary: string;
    mutted: string;
    invers: string;
    button: string;
  };
  bgColors: {
    primary: string;
    secondary: string;
    third: string;
  };
  shadow: {
    boxShadow: string;
  };
  status: {
    idle: string;
    paused: string;
    running: string;
  };
}
