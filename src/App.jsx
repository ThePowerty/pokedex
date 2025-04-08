import './App.css'
import { Footer, Header, Hero } from './components'
import { PokemonContainer } from './pokemons/PokemonContainer.jsx'


function App() {

  return (
    <>
      <Header/>
      <Hero/>
      <PokemonContainer/>
      <Footer/>
    </>
  )
}

export default App
