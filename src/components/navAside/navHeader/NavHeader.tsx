import "./nav-header.scss";

function NavHeader({ title }: { title: string }) {
  return (
    <header id="nav-header">
      <div>
        <span>{title}</span>
      </div>
    </header>
  );
}

export default NavHeader;
