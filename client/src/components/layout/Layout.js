const Layout = (props) => {
  return (
    <main className="container-fluid p-0">
      {props.children}
    </main>
  );
}

export default Layout;