export interface Spin {
  id: number
  startTime: string
  time: string
  startDelta: number
  startDeltaUs: number
  fakeStartDelta: number
  duration: number
  result: number
  outcome: string
}

export interface WheelConfiguration {
  name: string
  slots: number
  results: string[]
  colors: ('red' | 'black' | 'green')[]
  positionToId: number[]
}

export interface ResultStatList {
  result: number
  count: number
}
;[]

export interface ResultStat {
  result: Number
  count: Number
}

export interface ActionLogEntry {
  timestamp: Date;
  action: string;
}

export interface GameResult {
  id: number;
  result: string;
}