import { Outlet } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <SideBar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              width: { xs: "100%", md: "calc(100% - 250px)" },
            }}
          >
            <Container maxWidth="lg" disableGutters sx={{ pt: 2 }}>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
