import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Footer from '../components/Footer';

export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([])
  const [formInputs, setFormInputs] = useState()
  const [searchTerm, setSearchTerm] = useState('cats')
  useEffect(() => {
    setSearchResults(initialData.catsGiphy?.data)
  }, [initialData])
  useEffect(() => {
    console.log(initialData);
  })

  const search = async (event) => {
    event.preventDefault();
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=kVNTfm9VoHqnB9fVCkRAjildISc9x7nq&limit=10`)
    giphys = await giphys.json()
    setSearchResults(giphys.data)
    setSearchTerm(formInputs.searchTerm)
  }

  const handleInput = (e) => {
    let { name, value } = e.target
    setFormInputs({ ...formInputs, [name]: value });
  }
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <h1>Search App</h1>

      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInput} type="text" required />
        <button>Search</button>
      </form>
      <h1>Search results for: {searchTerm}</h1>

      <p>Share this search with others:

        <Link
          href="/search/[pid]"
          as={`/search/${searchTerm}`}>
          <a>
            {`http://localhost:3000/search/${searchTerm}`}
          </a>
        </Link>

      </p>


      <div class="giphy-search-results-grid">
        {searchResults.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  let catsGiphy = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=kVNTfm9VoHqnB9fVCkRAjildISc9x7nq&limit=10');
  catsGiphy = await catsGiphy.json();
  return { props: { catsGiphy: catsGiphy } }
}


// export async function getServerSideProps() {
//   let catsGiphy = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=kVNTfm9VoHqnB9fVCkRAjildISc9x7nq&limit=10');
//   catsGiphy = await catsGiphy.json();
//   return { props: { catsGiphy: catsGiphy } }
// }

