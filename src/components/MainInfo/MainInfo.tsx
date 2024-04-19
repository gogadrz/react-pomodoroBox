import { useSelector } from "react-redux";
import styles from "./maininfo.module.css";
import { RootState } from "../../store";
import { ThemeEnum } from "../../models/ITheme";

export function MainInfo() {
  const currentTheme = useSelector(
    (state: RootState) => state.pomodoros.pomodoros.theme
  );
  return (
    <div
      className={
        currentTheme === ThemeEnum.light
          ? styles.mainInfoBlock
          : styles.mainInfoBlockDark
      }
    >
      <h1 className={styles.h1title}>Ура! Теперь можно начать работать:</h1>
      <ul className={styles.listItems}>
        <li>Выберите категорию и напишите название текущей задачи</li>
        <li>Запустите таймер(&laquo;помидор&raquo;)</li>
        <li>Работайте пока &laquo;помидор&raquo; не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>
          Продолжайте работать &laquo;помидор&raquo; за &laquo;помидором&raquo;,
          пока задача не будет выполнена. Каждые 4 &laquo;помидора&raquo;
          делайте длинный перерыв (15-30 минут)
        </li>
      </ul>
    </div>
  );
}
