export interface Spin {
  id: number;
  startTime: string;
  time: string;
  startDelta: number;
  startDeltaUs: number;
  fakeStartDelta: number;
  duration: number;
  result: number;
  outcome: string;
}

export interface WheelConfiguration {
  name: string;
  slots: number;
  results: string[];
  colors: ('red' | 'black' | 'green')[];
  positionToId: number[];
}

export interface ResultStatList {
  result: number;
  count: number;
}
[];

export interface GameResult {
  id: number;
  result: string;
}

export interface ResultStat {
  result: Number;
  count: Number;
}
