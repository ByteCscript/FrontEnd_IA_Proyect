// src/pages/DashboardPage/DashboardPage.jsx
import React from "react";
import styles from "./DashboardPage.module.css";

// IMPORTA AQUÍ tus componentes de gráficos:
import RevenueChart from "../../components/charts/RevenueChart";
import CalendarWidget from "../../components/CalendarWidget";
import InstallsChart from "../../components/charts/InstallsChart";
import WorkoutsList from "../../components/WorkoutsList";
import AgeRangeChart from "../../components/charts/AgeRangeChart";
import ImpressionsMap from "../../components/ImpressionsMap";

export default function DashboardPage() {
 

  return (
    <div className={styles.dashboardWrapper}>
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
  );
}
