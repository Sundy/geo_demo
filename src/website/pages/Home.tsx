import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MarketAnalysis from '../components/MarketAnalysis';
import Solutions from '../components/Solutions';
import GlobalStrategy from '../components/GlobalStrategy';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            <Navbar />
            <main>
                <Hero />
                <MarketAnalysis />
                <Solutions />
                <GlobalStrategy />
                <CaseStudies />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
