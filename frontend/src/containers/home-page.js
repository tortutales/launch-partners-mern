// @packages
import React from 'react';

// @scripts
import HomePage from '../pages/home-page';
import { config } from '../config';

const HomePageContainer = () =>
    <HomePage content={config.text.homePage.content} />;

export default HomePageContainer;
