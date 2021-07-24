import { scrollToTop } from '../../lib/scrollingTop';

const Layout = (props) => {
  return (
    <main className="container-fluid p-0">
      {props.children}
      <div className="scrollTop" onClick={() => scrollToTop()}></div>
    </main>
  );
}

export default Layout;