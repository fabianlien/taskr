import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "../../styles/Detail.module.css"

const DueCountdown = ({due_by}) => {
  const overdue = new Date(due_by).getTime() < new Date().getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const onMount = async () => {
      const countDown = setInterval(() => {
        const reamingTime = new Date(due_by).getTime() - new Date().getTime();
        const days = Math.floor(reamingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (reamingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (reamingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((reamingTime % (1000 * 60)) / 1000);

        setTimeLeft((prevState) => ({
          ...prevState,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        }));

        if (overdue) {
          clearInterval(countDown);
        }
      }, 1000);
    };
    onMount();
  }, [setTimeLeft, due_by, overdue]);

  return (
    <Card.Text className={styles.TimeRemainingBox}>
      {`Due In: ${timeLeft.days} days, ${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
    </Card.Text>
  );
};

export default DueCountdown;
