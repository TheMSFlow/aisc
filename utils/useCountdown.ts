import { useEffect, useState } from "react";

type Countdown = {
  label: string;
};

export function useCountdown(targetISO: string | null): Countdown {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (!targetISO) return;

    function update() {
      const now = Date.now();
      const target = new Date(targetISO).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setLabel("Now live");
        return;
      }

      const totalMinutes = Math.floor(diff / 1000 / 60);
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      if (days > 0) {
        setLabel(`Starts in ${days} day${days > 1 ? "s" : ""}`);
      } else if (hours > 0) {
        setLabel(`Starts in ${hours} hour${hours > 1 ? "s" : ""}`);
      } else {
        setLabel(`Starts in ${minutes} min`);
      }
    }

    update();
    const id = setInterval(update, 60_000); // update every minute

    return () => clearInterval(id);
  }, [targetISO]);

  return { label };
}
