function Navigation(): JSX.Element {
  return (
    <div className="container main-index">
      <img src="./img/svg/logo.svg" width="300" alt="Логотип проекта"/>
      <h1>Список страниц</h1>
      <ol>
        <li><a href="ui-kit.html">UI-kit — ui-kit.html</a></li>
        <li><a href="catalog">Каталог — main.html</a></li>
        <li><a href="cart.html">Корзина — cart.html</a></li>
        <li><a href="guitar/:id">Товар — product.html</a></li>
      </ol>
    </div>
  );
}

export default Navigation;
