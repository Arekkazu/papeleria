export const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBox>
          <h1>NAVBAR</h1>
        </NavBox>
      </header>
      <main>
        <Box
          sx={{
            px: 4,
            py: 4,
            backgroundColor: "#e0e0e0",
            minHeight: "100vh",
          }}
        >
          <Grid container spacing={2}>
            {/* EDITAR ACA */}
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <div style={{ backgroundColor: "red", width: "50px" }}>
                <p>asd</p>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <div style={{ backgroundColor: "red", width: "50px" }}>
                <p>asd</p>
              </div>
            </Grid>
            {/* ---- */}
          </Grid>
        </Box>
      </main>
      <footer>
        <FooterBox>
          <h1>FOOTER</h1>
        </FooterBox>
      </footer>
    </Box>
  );
};
