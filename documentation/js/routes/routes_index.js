var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","loadChildren":"./modules/dashboard/dashboard.module#DashboardModule","canActivate":["AuthGuardService"],"children":[{"kind":"module","children":[],"module":"DashboardModule"}]},{"path":"profile","loadChildren":"./modules/profile/profile.module#ProfileModule","canActivate":["AuthGuardService"],"children":[{"kind":"module","children":[],"module":"ProfileModule"}]},{"path":"login","loadChildren":"./modules/login/login.module#LoginModule","children":[{"kind":"module","children":[],"module":"LoginModule"}]},{"path":"**","redirectTo":"","pathMatch":"full"}],"kind":"module"}]}