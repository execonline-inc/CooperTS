export interface Milliseconds {
  kind: "milliseconds";
  milliseconds: number;
}

export interface Seconds {
  kind: "seconds";
  seconds: number;
}

export interface Minutes {
  kind: "minutes";
  minutes: number;
}

export type Time = Minutes | Seconds | Milliseconds;

export const seconds = (value: number): Seconds => ({
  kind: "seconds",
  seconds: value
});

export const minutes = (value: number): Minutes => ({
  kind: "minutes",
  minutes: value
});

export const milliseconds = (value: number): Milliseconds => ({
  kind: "milliseconds",
  milliseconds: value
});

export const toSeconds = (time: Time): Seconds => {
  switch (time.kind) {
    case "milliseconds":
      return seconds(Math.floor(time.milliseconds / 1000));
    case "seconds":
      return time;
    case "minutes":
      return seconds(Math.floor(time.minutes * 60));
  }
};

export const toMinutes = (time: Time): Minutes => {
  switch (time.kind) {
    case "milliseconds":
      return minutes(Math.floor(time.milliseconds / 60000));
    case "seconds":
      return minutes(Math.floor(time.seconds / 60));
    case "minutes":
      return time;
  }
};

export const toMilliseconds = (time: Time): Milliseconds => {
  switch (time.kind) {
    case "milliseconds":
      return time;
    case "seconds":
      return milliseconds(Math.floor(time.seconds * 1000));
    case "minutes":
      return milliseconds(Math.floor(time.minutes * 60 * 1000));
  }
};

export const toJS = (time: Time): number => toMilliseconds(time).milliseconds;
