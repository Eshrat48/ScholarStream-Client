import React from "react";
import HomeBanner from "./HomeBanner";
import TopScholarships from "./TopScholarships";
import HearFrom from "./HearFrom";
import FAQ from "./FAQ";

const Home = () => {
    return (
        <div>
            <HomeBanner />
            <TopScholarships />
            <HearFrom />
            <FAQ />
        </div>
    );
};

export default Home;