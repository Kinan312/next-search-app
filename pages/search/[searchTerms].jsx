import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer';

export default function Search(initialData) {
    const router = useRouter();
    useEffect(() => {
        console.log('router', router)
    })

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <Head>
                <title>Search results for: {router.query.searchTerms}</title>
                <meta name="description" content={initialData.catsGiphy.map((each, index) => each.title + ' ')}></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Go <Link href="/"><a>home</a></Link></p>
            <h1>Search results for: {router.query.searchTerms}</h1>

            <div className="giphy-search-results-grid">
                {initialData.catsGiphy.map((each, index) => {
                    return (
                        <div key={index}>
                            <h3>{each.title}</h3>
                            <Image src={each.images.original.url} alt={each.title} width={300} height={300} loader={myLoader} />
                        </div>
                    )
                })}
            </div>

            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const searchTerm = context.query.searchTerms

    let catsGiphy = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=kVNTfm9VoHqnB9fVCkRAjildISc9x7nq&limit=10`);
    catsGiphy = await catsGiphy.json();
    return { props: { catsGiphy: catsGiphy.data } }
}