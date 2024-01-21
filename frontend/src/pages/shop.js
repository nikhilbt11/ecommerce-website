import Hero from "../component/Hero/hero"
import Popular from "../component/Popular/popular"
import Offers from "../component/Offers/offers"
import NewCollections from "../component/New_Collections/new_collections"
import NewsLettter from "../component/News_Letter/new_letter"


export default function Shop(){



    return(
        <div>
          <Hero/>
          <Popular/>
          <Offers/>
          <NewCollections/>
          <NewsLettter/>
        </div>
    )
}