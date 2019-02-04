import {Router} from 'aurelia-router';

export class Index {
  router;

  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'list', moduleId: './routes/list', title: 'Currencies List' },
      { route: '/:currency', name: 'details', moduleId: './routes/details', title: 'Currency Details' },
    ]);

    this.router = router;
  }
}
