// src/pages/DashboardPage/DashboardPage.jsx
import React, { useState } from "react";
import styles from "./DashboardPage.module.css";
import { useAuth } from "../../hooks/useAuth";

// IMPORTA AQUÍ tus componentes de gráficos:
import RevenueChart from "../../components/charts/RevenueChart";
import CalendarWidget from "../../components/CalendarWidget";
import InstallsChart from "../../components/charts/InstallsChart";
import WorkoutsList from "../../components/WorkoutsList";
import AgeRangeChart from "../../components/charts/AgeRangeChart";
import ImpressionsMap from "../../components/ImpressionsMap";

// Material UI Accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { stringAvatar } from "../../utils/avatarHelper";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const name = user?.name || user?.email || "";

  return (
    <div className={styles.dashboardWrapper}>
      <header className={styles.dashboardHeader}>
        <div className={styles.logo}>fitonist</div>
        <nav className={styles.nav}>
          <div className={styles.navItem}>Overview</div>
          <div className={styles.navItem}>Analytics</div>
          <div className={styles.navItem}>Finance</div>
          <div className={styles.navItem}>Workouts</div>
        </nav>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          disableGutters
          elevation={0}
          square
          sx={{ width: "auto", bgcolor: "transparent" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            aria-controls="profile-content"
            id="profile-header"
            sx={{
              p: 0,
              m: 0,
              minHeight: 0,
              "& .MuiAccordionSummary-content": {
                margin: 0,
                alignItems: "center",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar {...stringAvatar(name)} />
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              HOLA MUNDO
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0, mt: 1 }}>
            <Paper
              elevation={3}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <List component="nav" disablePadding>
                <ListItemButton onClick={signOut}>
                  <ListItemText primary="Cerrar sesión" />
                </ListItemButton>
                {/* Si quieres más opciones, añádelas aquí como ListItemButton */}
              </List>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </header>
      <div className={styles.gridContainer}>
        <div className={styles.dashboardGrid}>
          {/* Revenue */}
          <div className={`${styles.card} ${styles.cardRevenue}`}>
            <header>
              <h2>Revenue</h2>
            </header>
            <RevenueChart />
          </div>

          {/* Calendar */}
          <div className={`${styles.card} ${styles.cardCalendar}`}>
            <header>
              <h2>Calendar</h2>
            </header>
            <CalendarWidget />
          </div>

          {/* Installs */}
          <div className={`${styles.card} ${styles.cardInstalls}`}>
            <header>
              <h2>Installs</h2>
            </header>
            <InstallsChart />
          </div>

          {/* Popular Workouts */}
          <div className={`${styles.card} ${styles.cardWorkouts}`}>
            <header>
              <h2>Popular Workouts</h2>
            </header>
            <WorkoutsList />
          </div>

          {/* Age Range */}
          <div className={`${styles.card} ${styles.cardAgeRange}`}>
            <header>
              <h2>Age Range</h2>
            </header>
            <AgeRangeChart />
          </div>

          {/* Impressions */}
          <div className={`${styles.card} ${styles.cardImpressions}`}>
            <header>
              <h2>Impressions</h2>
            </header>
            <ImpressionsMap />
          </div>
        </div>
      </div>
    </div>
  );
}
