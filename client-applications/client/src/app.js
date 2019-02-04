import {BalancesService} from 'services/balances';
import {UsersService} from 'services/users';
import {DataStore} from 'services/data-store';
import {Balance} from 'models/balance';

export class App {
  static inject = [BalancesService, UsersService, DataStore];
  constructor(balancesService, usersService, dataStore) {
    this.balancesService = balancesService;
    this.usersService = usersService;
    this.dataStore = dataStore;
  }

  getCurrencyRoutes(currencyBalances) {
    return currencyBalances.map(currencyBalance => {
      let currencyName = currencyBalance.currency.toLowerCase();

      const route = {
        route: currencyName,
        name: currencyName,
        href: `#/currency/${currencyName}`,
        nav: true,
        title: currencyBalance.currency,
        settings: {
          icon: `fa fa-${currencyName}`,
          lastValue: currencyBalance.available
        }
      };

      return route;
    });
  }
  updateBalances() {
    return this.balancesService.getBalance().then(currencyBalances => {
      const balances = currencyBalances.map(currencyBalance => {
        return new Balance(currencyBalance);
      });
      this.dataStore.balances = balances;
      this.updateCurrencyRouteBalances(balances);
      return balances;
    });
  }
  updateCurrencyRouteBalances(balances) {
    if (this.router.currentInstruction && this.router.routes.length > 0) {
      let currentInstruction = this.router.currentInstruction;
      currentInstruction.config.settings.subroutes = this.getCurrencyRoutes(balances);
    }
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Accounting Hub';

    const user = this.usersService.getUser();

    if (!user) {
      config.map([
        {
          route: ['', 'login'],
          name: 'login',
          moduleId: 'routes/accounts/login',
          title: 'Login'
        }, {
          route: 'register',
          name: 'register',
          moduleId: 'routes/accounts/register',
          title: 'Register'
        }
      ]);

      config.mapUnknownRoutes('routes/accounts/login');
      return;
    }

    this.usersService.setHeader(user.token);

    return this.updateBalances().then(currencyBalances => {
      const currencyRoutes = this.getCurrencyRoutes(currencyBalances);

      config.map([
        {
          route: ['', 'home'],
          name: 'home',
          moduleId: 'routes/home/index',
          nav: true,
          title: 'Home',
          settings: {
            icon: 'fa fa-address-card-o'
          }
        }, {
          route: 'currency',
          name: 'currency',
          moduleId: 'routes/currency/index',
          nav: true,
          title: 'Currencies',
          settings: {
            icon: 'fa fa-money',
            subroutes: currencyRoutes
          }
        }, {
          route: 'users',
          name: 'users',
          moduleId: 'routes/users/index',
          nav: true,
          title: 'Users',
          settings: {
            icon: 'fa fa-user'
          }
        }, {
          route: 'order-requests',
          name: 'order-requests',
          moduleId: 'routes/order-requests/index',
          nav: true,
          title: 'Order Requests',
          settings: {
            icon: 'fa fa-envelope-open-o'
          }
        }
      ]);
      config.mapUnknownRoutes('routes/home/index');
    });
  }
}
