(function () {

  const Router = window.Router;
  const GameView = window.GameView;
  const LoginView = window.LoginView;
  const ScoreBoardView = window.ScoreBoardView;
  const SignupView = window.SignupView;
  const SingleGameView = window.SingleGameView;
  const MainView = window.MainView;
  const Model = window.Model;


  if (typeof exports === 'object') {
    exports.hello = hello;
    exports.plural = plural;
    exports.filter = filter;
  }


  if (typeof window === 'object') {

    window.router = (new Router)
      .addRoute('/menu', MainView)
      .addRoute('/game', GameView)
      .addRoute('/sgame', SingleGameView)
      .addRoute('/score', ScoreBoardView)
      .addRoute('/signup', SignupView)
      .addRoute('/', LoginView)
      .start();
  }
})();
