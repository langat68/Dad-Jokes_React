import { useReducer } from 'react';
import './App.scss';

// It defines an interface Joke with properties id, joke, and rate.
interface Joke {
  id: number;
  joke: string;
  rate: number;
}

type Action =
  | { type: 'ADD_JOKE'; payload: string }
  | { type: 'UPDATE_RATE'; payload: { id: number; rate: number } }
  | { type: 'DELETE_JOKE'; payload: { id: number } };

const initialState: Joke[] = [
  {
    id: 1,
    joke: 'What do you call a very small valentine? A valen-tiny!',
    rate: 3
  },
  {
    id: 2,
    joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!',
    rate: 2
  },
  {
    id: 3,
    joke: 'A termite walks into the bar and says, "Where is the bar tender?"',
    rate: 1
  },
  {
    id: 4,
    joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
    rate: 0
  },
  {
    id: 5,
    joke: 'Why was the math book sad? Because it had too many problems.',
    rate: 0
  }
];

function jokesReducer(state: Joke[], action: Action): Joke[] {
  switch (action.type) {
    case 'ADD_JOKE':
      const newJoke: Joke = { id: state.length + 1, joke: action.payload, rate: 0 };
      return [...state, newJoke];
    case 'UPDATE_RATE':
      return state.map((joke) =>
        joke.id === action.payload.id
          ? { ...joke, rate: action.payload.rate }
          : joke
      );
    case 'DELETE_JOKE':
      return state.filter((joke) => joke.id !== action.payload.id);
    default:
      return state;
  }
}

// Component is defined as a functional component using the useReducer hook with the jokesReducer function and initialState.
function App() {
  const [jokes, dispatch] = useReducer(jokesReducer, initialState);

  const updateRate = (id: number, rate: number) => {
    dispatch({ type: 'UPDATE_RATE', payload: { id, rate } });
  };

  const deleteJoke = (id: number) => {
    dispatch({ type: 'DELETE_JOKE', payload: { id } });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const joke = e.target[0].value;
    if (joke) {
      dispatch({ type: 'ADD_JOKE', payload: joke });
    }
  };

  return (
    <div className='container'>
      <h2 className='Title'>Jokes for you 🐰</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button type='submit'>Add Joke</button>
      </form>
      <div className="jokes">
        {jokes && jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
          <div key={joke.id} className='joke'>
            <div className='joke-text'>{joke.joke}</div>
            <div className='text'>{joke.rate}</div>
            <div className="joke-buttons">
              <button onClick={() => updateRate(joke.id, joke.rate + 1)}>🎉</button>
              <button onClick={() => updateRate(joke.id, joke.rate - 1)}>🤐</button>
              <button onClick={() => deleteJoke(joke.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
