export interface Spin {
  id: string
  startTime: string
  time: string
  startDelta: Number
  startDeltaUs: Number
  fakeStartDelta: Number
  duration: Number
  result: Number
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