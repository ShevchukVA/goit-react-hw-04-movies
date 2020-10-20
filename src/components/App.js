import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import routes from '../routes';
import Loader from 'react-loader-spinner';

const App = () => (
  <>
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path={routes.homePage}
            exact
            component={lazy(() =>
              import('../views/HomePage' /* webpackChunkName: 'home-page' */),
            )}
          />
          <Route
            path={routes.moviesPage}
            exact
            component={lazy(() =>
              import(
                '../views/MoviesPage' /* webpackChunkName: 'movies-page' */
              ),
            )}
          />
          <Route
            path={routes.movieDetailsPage}
            component={lazy(() =>
              import(
                '../views/MovieDetailsPage' /* webpackChunkName: 'movie-details-page' */
              ),
            )}
          />
          <Route
            component={lazy(() =>
              import('../views/NotFound' /* webpackChunkName: 'not-found' */),
            )}
          />
        </Switch>
      </Suspense>
    </Layout>
  </>
);

export default App;
