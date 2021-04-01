export type Joke = {
  setup: string;
  punchline: string;
  joke_type: string;
};

export type JokeRow = Joke & {
  _id: string;
};
