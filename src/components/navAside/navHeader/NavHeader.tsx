import "./nav-header.scss";

function NavHeader({ title }: { title: string }) {
  return (
    <header id="nav-header">
      <div id="nav-header-wrapper">
        <div>
          <span>{title}</span>
        </div>
      </div>
    </header>
  );
}

export default NavHeader;
