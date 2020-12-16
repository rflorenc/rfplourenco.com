import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Alert, PageSection } from '@patternfly/react-core';
import { DynamicImport } from '@app/DynamicImport';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { About } from '@app/About/About';
import { Projects } from '@app/Projects/Projects';
import { BlogPost1 } from '@app/Blog/BlogPost1/BlogPost1';
import { BlogPost2 } from '@app/Blog/BlogPost2/BlogPost2';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';

let routeFocusTimer: number;

const getSupportModuleAsync = () => () => import(/* webpackChunkName: 'contact' */ '@app/Contact/Contact');

const Contact = (routeProps: RouteComponentProps): React.ReactElement => {
  const lastNavigation = useLastLocation();
  return (
    /* eslint-disable @typescript-eslint/no-explicit-any */
    <DynamicImport load={getSupportModuleAsync()} focusContentAfterMount={lastNavigation !== null}>
      {(Component: any) => {
        let loadedComponent: any;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        if (Component === null) {
          loadedComponent = (
            <PageSection aria-label="Loading Content Container">
              <div className="pf-l-bullseye">
                <Alert title="Loading" variant="info" className="pf-l-bullseye__item" />
              </div>
            </PageSection>
          );
        } else {
          loadedComponent = <Component.Contact {...routeProps} />;
        }
        return loadedComponent;
      }}
    </DynamicImport>
  );
};

export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: About,
    exact: true,
    label: 'About',
    path: '/about',
    title: 'About Page'
  },
  {
    component: Projects,
    exact: true,
    label: 'Projects',
    path: '/',
    title: 'PatternFly Seed | Projects Page',
  },
  {
    component: Contact,
    exact: true,
    isAsync: true,
    label: 'Contact',
    path: '/contact',
    title: 'Contact Page',
  },
  {
    label: 'Blog',
    routes: [
      {
        component: BlogPost1,
        exact: true,
        label: 'Post 1',
        path: '/blog/post1',
        title: 'Blog post 1 title',
      },
      {
        component: BlogPost2,
        exact: true,
        label: 'Post 2',
        path: '/blog/post2',
        title: 'Blog post 2 title',
      },
    ],
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
