import "styled-components";
import { ITheme, ThemeEnum } from "./models/ITheme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {
    type: ThemeEnum;
  }
}
