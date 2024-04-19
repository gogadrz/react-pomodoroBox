import { useEffect, useState } from "react";
import styles from "./errorroute.module.css";
import { Link, useNavigate } from "react-router-dom";

export function ErrorRoute() {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    isActive &&
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

    if (!isActive) return navigate("/timer");

    if (seconds < 2) setIsActive(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.mainTitle}>
        Запрашиваемая страница не существует!
      </h1>
      <p>
        Через {seconds} секунд, Вы будете перенаправлены на&nbsp;
        <Link to="/timer" className={styles.pomodoroLink}>
          главную страницу.
        </Link>
      </p>
    </div>
  );
}
