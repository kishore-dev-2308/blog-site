import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Box,
  Stack,
  IconButton,
  Link,
} from "@mui/material";

const AboutUs = () => {
  const team = [
    {
      name: "Kishore Kumar",
      role: "Founder & Full Stack Developer",
      img: "",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#fafafa" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #137fec, #6ea8fe)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            The Story Behind Our Words
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>
            At TechStream, we simplify technology and turn complex ideas into
            practical knowledge for developers and tech enthusiasts.
          </Typography>
        </Container>
      </Box>

      {/* MISSION SECTION */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Mission 🚀
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 16 }}>
              We bridge the gap between innovation and developers by delivering
              high-quality tutorials, insights, and real-world solutions that
              empower your tech journey.
            </Typography>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                mx: "auto",
                width: 220,
                height: 220,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(19, 127, 236, 0.1)",
              }}
            >
              <i className="bi bi-rocket-takeoff fs-1 text-primary"></i>
            </Box>
          </Grid> */}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "#fff", py: { xs: 8, md: 12 } }}>
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Meet the Team
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto", mb: 6 }}
          >
            The passionate mind behind TechStream, dedicated to building and
            sharing impactful tech content.
          </Typography>

          <Grid container justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={8} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    borderRadius: 4,
                    p: 2,
                    border: "1px solid #eee",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      src={member.img}
                      alt={member.name}
                      sx={{
                        width: 110,
                        height: 110,
                        mx: "auto",
                        mb: 2,
                        bgcolor: "#137fec",
                        fontSize: 40,
                      }}
                    >
                      {member.name[0]}
                    </Avatar>

                    <Typography variant="h6" fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography color="text.secondary" mb={2}>
                      {member.role}
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center">
                      {/* <IconButton
                        component={Link}
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <i className="bi bi-twitter text-primary fs-5"></i>
                      </IconButton> */}

                      <IconButton
                        component={Link}
                        href="https://www.instagram.com/kishore_steyn/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram text-danger fs-5"></i>
                      </IconButton>

                      <IconButton
                        component={Link}
                        href="https://www.linkedin.com/in/kishore-kumar-1a793b232/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <i className="bi bi-linkedin text-primary fs-5"></i>
                      </IconButton>

                      <IconButton
                        component={Link}
                        href="https://github.com/kishore-dev-2308"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <i className="bi bi-github text-dark fs-5"></i>
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 8, md: 10 },
          textAlign: "center",
          bgcolor: "#f5f8ff",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Join Our Community
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Stay updated with the latest articles, tutorials, and insights from
            the tech world.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#137fec",
              px: 5,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 10,
              "&:hover": { bgcolor: "#0e63b3" },
            }}
          >
            Read the Blog
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;
