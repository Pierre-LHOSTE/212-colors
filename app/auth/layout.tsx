function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
