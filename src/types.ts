//interface tag can be any object as long as it has an id
export interface ValidTag {
  id: string | number;
  value: string;
}

//any object that implements HasId can be a tag
export interface Tag extends ValidTag {}
