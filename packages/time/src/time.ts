export interface Seconds {
  kind: "seconds";
  seconds: number;
}

export interface Minutes {
  kind: "minutes";
  minutes: number;
}

export type Time = Minutes | Seconds;

export const seconds = (value: number): Seconds => ({
  kind: "seconds",
  seconds: value
});

export const minutes = (value: number): Minutes => ({
  kind: "minutes",
  minutes: value
});

export const toSeconds = (time: Time): Seconds => {
  switch (time.kind) {
    case "seconds":
      return time;
    case "minutes":
      return seconds(Math.floor(time.minutes * 60));
  }
};

export const toMinutes = (time: Time): Minutes => {
  switch (time.kind) {
    case "seconds":
      return minutes(Math.floor(time.seconds / 60));
    case "minutes":
      return time;
  }
};

export const toMilliseconds = (time: Time): number => {
  switch (time.kind) {
    case "seconds":
      return Math.floor(time.seconds * 1000);
    case "minutes":
      return Math.floor(time.minutes * 60 * 1000);
  }
};
