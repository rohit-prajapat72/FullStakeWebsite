import HeroSection from '../component/HeroSection'
import Trusted from '../component/Trusted'
import Services from '../component/Services'
import FeaturedProducts from '../component/FeaturedProducts'


const Home = () => {

  const data ={
    name :'Prajapat_Store'
  }
  return (
    <>
      <HeroSection data= {data}/>
      <FeaturedProducts/>
      <Services/>
      <Trusted/>
    </>
  )
}

export default Home
