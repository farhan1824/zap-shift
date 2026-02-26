import React from 'react'
import { Coracual } from './Coracual'
import CardContainer from './How it Works/CardContainer'
import ServiceContainer from './Services/ServiceContainer'
import LogoCarousel from '../../Components/Logo/LogoCoracual'
import CardList from './HorizontalCard/CardList'
import { Marchent } from './Merchent/Marchent'
import { CutomerReview } from './CustomerReview/CutomerReview'
import { useLoaderData } from 'react-router'

const Home = () => {
  const { customerservice, cardlistdata, services } = useLoaderData()
  return (
    <div className=''>
      <Coracual />
      <div className=''>
        <p className='text-2xl text-black' >How It Works</p>
        <CardContainer services={services} />
      </div>
      <section className='text-center rounded-xl bg-[#03373d]'>
        <div className='p-10'>
          <h1 className='text-4xl'> Our Services </h1>
          <ServiceContainer services={services} />
        </div>
      </section>
      <section>
        <LogoCarousel />
      </section>
      <section>
        <CardList cardlistdata={cardlistdata} />
      </section>
      <section>
        <Marchent />
      </section>
      <section className='py-9 '>
        <CutomerReview customerservice={customerservice} />
      </section>
    </div>
  )
}

export default Home