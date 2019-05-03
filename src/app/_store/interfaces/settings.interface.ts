export interface ISettingsStore {
  options: IOption[];
  loaded: boolean;
  config: IConfig;
  roomId: string;
}

export interface IOptionsStore {
  collection: IOption[];
  selection: IOption[];
}

export interface IOption {
  _id?: string;
  label: string;
  text: string;
  isChecked?: boolean;
  isNewLine?: boolean;
}

export interface IConfig {
  connectGreetingsToTime: boolean;
  textGreetings: string;
  textEnd: string;
  textStart: string[];
  configAreaTheme: string;
  configAreaTextColor: string;
  textAreaTheme: string;
  textAreaTextColor: string;
  textAreaCopyBackground: string;
  isEnumerable: boolean;
  showStartText: boolean;
  showGreetings: boolean;
  showEndText: boolean;
}
