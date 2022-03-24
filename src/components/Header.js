const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <h4>{props.subTitle}</h4>
    </header>
  );
};

Header.defaultProps = {
  title: "Default Title",
  subTitle: "",
};

export default Header;
